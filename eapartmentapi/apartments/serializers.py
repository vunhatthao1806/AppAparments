from rest_framework import serializers
from apartments.models import Flat, ECabinet, Tag, Receipt, Item, Complaint


class FlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flat
        fields = '__all__'


class ECabinetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ECabinet
        fields = ['id', 'name', 'active']


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'


class ComplaintSerializer(serializers.ModelSerializer):

    # chỉnh đường dẫn trực tiếp cloudinary cho ảnh
    def to_representation(self, instance):
        req = super().to_representation(instance)
        req['image'] = instance.image.url

        return req

    class Meta:
        model = Complaint
        fields = '__all__'