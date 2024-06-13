from rest_framework import pagination


class ItemPaginator(pagination.PageNumberPagination):
    page_size = 5


class ReceiptPaginator(pagination.PageNumberPagination):
    page_size = 8


class ComplaintPaginator(pagination.PageNumberPagination):
    page_size = 4


class SurveyPaginator(pagination.PageNumberPagination):
    page_size = 4


class AdminPaginator(pagination.PageNumberPagination):
    page_size = 4