import djf_surveys.models
from django.db.models import Count
from rest_framework import viewsets, generics, status, parsers, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from apartments.models import Flat, ECabinet, Item, Receipt, Complaint, User, Comment, Like, Survey, Choice, Question
from apartments import serializers, paginators, perms


class FlatViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Flat.objects.all()
    serializer_class = serializers.FlatSerializer


class ECabinetViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = ECabinet.objects.filter(active=True)
    serializer_class = serializers.ECabinetDetailSerializer
    permission_classes = [perms.EcabinetOwner]

    def get_permissions(self):
        if self.action in ['add_items']:
            return [permissions.IsAdminUser()]

    # tìm kiếm tủ đồ
    def get_queryset(self):
        queryset = self.queryset

        # lọc ecabinet theo ten ecabinet ma khong anh huong den item trong ecabinet
        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)
        return queryset

    @action(methods=['get'], url_path='items', detail=True)
    def get_items(self, request, pk):
        items = self.get_object().item_set.all()

        return Response(serializers.ItemSerializer(items, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='add_item', detail=True)
    def add_items(self, request, pk):
        item = self.get_object().item_set.create(name=request.data.get('name'), status=False)

        return Response(serializers.ItemSerializer(item).data, status=status.HTTP_201_CREATED)


class ItemViewSet(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView):
    queryset = Item.objects.all()
    serializer_class = serializers.ItemSerializer
    pagination_class = paginators.ItemPaginator
    permission_classes = [perms.AdminOwner]


class ReceiptViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Receipt.objects.filter(active=True)
    serializer_class = serializers.ReceiptSerializer
    pagination_class = paginators.ReceiptPaginator

    def get_queryset(self):
        queryset = self.queryset

        # lọc hóa đơn theo tên hóa đơn
        q = self.request.query_params.get('q')
        if q:
            queryset = queryset.filter(name__icontains=q)

        # lọc hóa đơn theo từng căn hộ
        flat_id = self.request.query_params.get('flat_id')
        if flat_id:
            queryset = queryset.filter(flat_id=flat_id)

        return queryset


class ComplaintViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Complaint.objects.prefetch_related('tag').filter(active=True) # tag lúc nào cũng cần dùng khi vào chi tiết complaint
    serializer_class = serializers.ComplaintDetailSerializer

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return serializers.AuthenticatedComplaintDetailSerializer

        return self.serializer_class

    def get_permissions(self):
        if self.action in ['add_comment', 'like']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='comment', detail=True)
    def get_comments(self, request, pk):
        comments = self.get_object().comment_set.select_related('user').all()

        paginator = paginators.CommentPaginator()
        page = paginator.paginate_queryset(comments, request)
        if page is not None:
            serializer = serializers.CommentSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        return Response(serializers.CommentSerializer(comments, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='comments', detail=True)
    def add_comment(self, request, pk):  # chỉ chứng thực mới được vô
        c = self.get_object().comment_set.create(user=request.user, content=request.data.get(
            'content'))  # get_object() : trả về đối tượng complaint đại diện cho khóa chính mà gửi lên
        return Response(serializers.CommentSerializer(c).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], url_path='like', detail=True)
    def like(self, request, pk):
        li, created = Like.objects.get_or_create(complaint=self.get_object(), user=request.user)

        if not created:
            li.active = not li.active
            li.save()

        return Response(serializers.AuthenticatedComplaintDetailSerializer(self.get_object()).data)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView, generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    permission_classes = [perms.CommentOwner]


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['current_user']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current_user', detail=False) # khong cho truyen id user khac len vi nguy hiem
    def current_user(self, request):
        user = request.user
        if request.method.__eq__('PATCH'): # vi tri cap nhat
            for k, v in request.data.items():
                setattr(user, k, v)
            user.save()
        return Response(serializers.UserSerializer(request.user).data)


class AdminViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser, ]
    permission_classes = [perms.AdminOwner]


class SurveyViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = djf_surveys.models.Survey.objects.all()
    serializer_class = serializers.SurveySerializer

    @action(methods=['get'], url_path='questions', detail=True)
    def get_surveys(self, request, pk):
        questions = self.get_object().questions.all()

        return Response(serializers.QuestionSerializer(questions, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='questions_count', detail=True)
    def get_survey_questions_count(self, request, pk):
        survey = self.get_object()
        question_count = survey.questions.count()

        return Response({'question_count': question_count}, status=status.HTTP_200_OK)
