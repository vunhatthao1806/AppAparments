from django.urls import path, include
from rest_framework import routers
from apartments import views

r = routers.DefaultRouter()

r.register('flats', views.FlatViewSet, 'flats')
r.register('ecabinets', views.ECabinetViewSet, 'ecabinets')
r.register('items', views.ItemViewSet, 'items')
r.register('receipts', views.ReceiptViewSet, 'receipts')

urlpatterns = [
    path('', include(r.urls))
]