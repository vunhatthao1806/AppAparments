from rest_framework import pagination


class ItemPaginator(pagination.PageNumberPagination):
    page_size = 5


class ReceiptPaginator(pagination.PageNumberPagination):
    page_size = 10


class ComplaintPaginator(pagination.PageNumberPagination):
    page_size = 4

# class CommentPaginator(pagination.PageNumberPagination):
#     page_size = 3