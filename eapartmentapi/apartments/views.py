from rest_framework import viewsets, generics
from apartments.models import Flat, ECabinet, Item, Receipt
from apartments import serializers, paginators


class FlatViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Flat.objects.all()
    serializer_class = serializers.FlatSerializer


class ECabinetViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = ECabinet.objects.filter(active=True)
    serializer_class = serializers.ECabinetSerializer


class ItemViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Item.objects.filter(status=False)
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