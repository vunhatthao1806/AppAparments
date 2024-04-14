from django.db.models import Count

from apartments.models import Flat, Receipt, Tag


# cư dân tra cứu hóa đơn đã thanh toán
def get_receipt_paid():
    receipts_paid = Receipt.objects.filter(status=True)

    return receipts_paid.order_by('id')


# thống kê
def count_receipts_paid():
    return Receipt.objects.annotate(counter=Count('tag__id')).values('id', 'name', 'active').filter(status=True).all()