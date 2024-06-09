import json
import djf_surveys.models
import requests
from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, generics, status, parsers, permissions
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from apartments.models import Flat, ECabinet, Item, Receipt, Complaint, User, Comment, Like, Tag, Choice, Question, \
    CarCard
from apartments import serializers, paginators, perms
from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
    PushServerError
)


class FlatViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Flat.objects.all()
    serializer_class = serializers.FlatSerializer

    # tìm kiếm flat active
    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):
            flat_id = self.request.query_params.get('flat_id')
            if flat_id:
                queryset = queryset.filter(active=True)

        return queryset


class CarCardViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView, generics.CreateAPIView):
    queryset = CarCard.objects.all()
    serializer_class = serializers.CarCardSerializer
    permission_classes = [perms.CarCardOwner]

    def perform_create(self, serializer):
        user = self.request.user
        flat = Flat.objects.filter(user_id=user.id).first()
        serializer.save(flat=flat)

    # tìm kiếm tủ đồ
    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)
        return queryset


class ECabinetViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = ECabinet.objects.filter(active=True)
    serializer_class = serializers.ECabinetSerializer

    def get_permissions(self):
        if self.action in ['add_items']:
            return [permissions.IsAdminUser()]
        return [perms.EcabinetOwner()]

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
        item = self.get_object().item_set.all()

        return Response(serializers.ItemSerializer(item, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='add_item', detail=True)
    def add_items(self, request, pk):
        item = self.get_object().item_set.create(name=request.data.get('name'), status=False)

        return Response(serializers.ItemSerializer(item).data, status=status.HTTP_201_CREATED)


class ItemViewSet(viewsets.ViewSet, generics.ListAPIView, generics.UpdateAPIView):
    queryset = Item.objects.all()
    serializer_class = serializers.ItemSerializer
    pagination_class = paginators.ItemPaginator
    permission_classes = [perms.AdminOwner]


class TagViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer


class ReceiptViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView, generics.CreateAPIView):
    queryset = Receipt.objects.select_related('tag').all()
    serializer_class = serializers.ReceiptDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if (request.user.is_staff):
            return self.create(request, *args, **kwargs)

    def get_object(self):
        receipt = super().get_object()
        if receipt.user != self.request.user:
            self.permission_denied(self.request)
        return receipt

    def get_queryset(self):
        queryset = self.queryset.filter(status=True)

        # lọc hóa đơn theo tên hóa đơn
        q = self.request.query_params.get('q')
        if q:
            queryset = queryset.filter(name__icontains=q)

        # lọc hóa đơn theo từng căn hộ
        flat_id = self.request.query_params.get('flat_id')
        if flat_id:
            queryset = queryset.filter(flat_id=flat_id)

        return queryset


class AddComplaintViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = Complaint.objects.filter(active=True)  # tag lúc nào cũng cần dùng khi vào chi tiết complaint
    serializer_class = serializers.AddComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        # complaint = Complaint.objects.filter(user_id=user.id).first()
        serializer.save(user=user)


class ComplaintViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView, generics.CreateAPIView):
    queryset = Complaint.objects.filter(active=True) # tag lúc nào cũng cần dùng khi vào chi tiết complaint
    pagination_class = paginators.ComplaintPaginator
    serializer_class = serializers.ComplaintDetailSerializer

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return serializers.AuthenticatedComplaintDetailSerializer

        return self.serializer_class

    def get_queryset(self):
        queryset = self.queryset

        if self.action.__eq__('list'):

            complaint_tag_id = self.request.query_params.get('complaint_tag_id')
            if complaint_tag_id:
                queryset = queryset.filter(complaint_tag_id=complaint_tag_id)

        return queryset

    def get_permissions(self):
        if self.action in ['add_comment', 'like']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='get_likes', detail=True)
    def get_likes(self, request, pk):
        complaint = self.get_object()
        likes = Like.objects.filter(complaint=complaint, active=True).count()

        return Response({likes}, status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='comments', detail=True)
    def get_comments(self, request, pk):
        comments = self.get_object().comment_set.all() # select_related('user').

        # paginator = paginators.CommentPaginator()
        # page = paginator.paginate_queryset(comments, request)
        # if page is not None:
        #     serializer = serializers.CommentSerializer(page, many=True)
        #     return paginator.get_paginated_response(serializer.data)

        return Response(serializers.CommentSerializer(comments, many=True).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='add_comment', detail=True)
    def add_comment(self, request, pk):  # chỉ chứng thực mới được vô
        c = self.get_object().comment_set.create(user=request.user, content=request.data.get('content'))
                # get_object() : trả về đối tượng complaint đại diện cho khóa chính mà gửi lên
        return Response(serializers.CommentSerializer(c).data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], url_path='like', detail=True)
    def like(self, request, pk):
        li, created = Like.objects.get_or_create(complaint=self.get_object(), user=request.user)

        if not created:
            li.active = not li.active
            li.save()

        return Response(serializers.AuthenticatedComplaintDetailSerializer(self.get_object()).data)


class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    permission_classes = [perms.CommentOwner]


class UserViewSet(viewsets.ViewSet):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

    def get_permissions(self):
        if self.action in ['current_user']:
            return [permissions.IsAuthenticated]

        return [permissions.AllowAny()]

    @action(methods=['get', 'patch'], url_path='current_user', detail=False)
    def update_current_user(self, request):
        user = request.user
        for k, v in request.data.items():
            if k == 'password':
                user.set_password(v)
            elif k == 'avatar':
                user.avatar = v
            else:
                setattr(user, k, v)
        user.save()
        return Response(serializers.UserSerializer(user).data)

    @action(methods=['get'], url_path='ecabinets', detail=False)
    def get_ecabinets(self, request):
        user = request.user

        ecabinets =  ECabinet.objects.filter(user_id=user.id)
        return Response(serializers.ECabinetSerializer(ecabinets, many=True).data, status=status.HTTP_200_OK);

    @action(methods=['get'], url_path='carcards', detail=False)
    def get_carcards(self, request):
        user = request.user
        carcards = CarCard.objects.filter(user_id=user.id)
        paginator = PageNumberPagination()
        paginator.page_size = 4
        result_page = paginator.paginate_queryset(carcards, request)
        serializer = serializers.CarCardSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class SurveyViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = djf_surveys.models.Survey.objects.all()
    serializer_class = serializers.SurveySerializer
    # permission_classes = [perms.ManageSurveys]

    def post(self, request):
        if not request.user.is_staff:  # Hoặc sử dụng logic phù hợp với yêu cầu của bạn
            return Response("Bạn không có quyền thực hiện thao tác này.", status=status.HTTP_403_FORBIDDEN)

    def delete(self, request):
        if not request.user.is_staff:  # Hoặc sử dụng logic phù hợp với yêu cầu của bạn
            return Response("Bạn không có quyền thực hiện thao tác này.", status=status.HTTP_403_FORBIDDEN)

    @action(methods=['get'], url_path='questions', detail=True)
    def get_surveys(self, request, pk):
        questions = self.get_object().questions.all()

        return Response(serializers.QuestionSerializer(questions, many=True).data, status=status.HTTP_200_OK)

    @action(methods=['get'], url_path='questions_count', detail=True)
    def get_survey_questions_count(self, request, pk):
        survey = self.get_object()
        question_count = survey.questions.count()

        return Response({'question_count': question_count}, status=status.HTTP_200_OK)


# @csrf_exempt
# def save_token(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         expo_push_token = data.get('expo_push_token')
#         user_id = data.get('user_id')
#
#         if expo_push_token and user_id:
#             user = get_object_or_404(User, id=user_id)
#             push_token, created = User.objects.get_or_create(user=user)
#             push_token.token = expo_push_token
#             push_token.save()
#             return JsonResponse({'message': 'Token saved successfully'})
#         else:
#             return JsonResponse({'error': 'Token or user ID is missing'}, status=400)
#
#
# @csrf_exempt
# def send_notification(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         expo_push_token = data.get('token')
#         title = data.get('title')
#         body = data.get('body')
#         user_id = data.get('user_id')
#
#         if expo_push_token and title and body and user_id:
#             user = get_object_or_404(User, id=user_id)
#
#             try:
#                 message = PushMessage(to=expo_push_token, title=title, body=body)
#                 response = PushClient().publish([message])
#                 response.validate_response()
#                 return JsonResponse({'message': 'Notification sent successfully'})
#             except (DeviceNotRegisteredError, PushServerError) as exc:
#                 return JsonResponse({'message': 'Error sending notification', 'error': str(exc)}, status=500)
#         else:
#             return JsonResponse({'error': 'Token, title, body, or user ID is missing'}, status=400)
