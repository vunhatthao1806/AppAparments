from rest_framework import viewsets, generics, status, parsers
from rest_framework.decorators import action
from rest_framework.response import Response
from apartments.models import Flat, ECabinet, Item, Receipt, Complaint, User
from apartments import serializers, paginators


class FlatViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Flat.objects.all()
    serializer_class = serializers.FlatSerializer


class ECabinetViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ECabinet.objects.filter(active=True)
    serializer_class = serializers.ECabinetSerializer

    # tìm kiếm tủ đồ
    def get_queryset(self):
        queryset = self.queryset

        # lọc ecabinet theo ten ecabinet ma khong anh huong den item trong ecabinet
        if self.action.__eq__('list'):
            q = self.request.query_params.get('q')
            if q:
                queryset = queryset.filter(name__icontains=q)

        return queryset

    # lấy items trong tủ đồ điện tử /ecabinet/{ecabinet_id}/items/
    @action(methods=['get'], url_path='items', detail=True)
    def get_items(self, request, pk):
        items = self.get_object().item_set.all()

        return Response(serializers.ItemSerializer(items, many=True).data, status=status.HTTP_200_OK)


class ItemViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = serializers.ItemSerializer
    pagination_class = paginators.ItemPaginator


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


class ComplaintViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Complaint.objects.prefetch_related('tag').filter(active=True) # tag lúc nào cũng cần dùng khi vào chi tiết complaint
    serializer_class = serializers.ComplaintDetailSerializer

    @action(methods=['get'], url_path='comments', detail=True)
    def get_comments(self, request, pk):
        comment = self.get_object().comment_set.select_related('user').all()
        return Response(serializers.CommentSerializer(comment, many=True).data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser, ]

