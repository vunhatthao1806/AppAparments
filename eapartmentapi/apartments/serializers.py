import djf_surveys.models
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from apartments.models import Flat, ECabinet, Tag, Receipt, Item, Complaint, User, Comment, CarCard, Like


class FlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flat
        fields = '__all__'


class ECabinetSerializer(serializers.ModelSerializer):
    count_items = serializers.SerializerMethodField()


    class Meta:
        model = ECabinet
        fields = ['id', 'name', 'user', 'active', 'count_items']

    def get_count_items(self, obj):
        return obj.item_set.count()


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['title', 'created_date']


class ReceiptDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many= True)

    class Meta:
        model = ReceiptSerializer.Meta.model
        fields = ReceiptSerializer.Meta.fields + ['tags', 'total']


class CarCardSerializer(serializers.ModelSerializer):

    class Meta:
        model = CarCard
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        data = validated_data.copy()
        u = User(**data)
        u.set_password(u.password)

        u.save()

        return u

    def to_representation(self, instance):
        req = super().to_representation(instance)
        if instance.avatar:
            req['avatar'] = instance.avatar.url

        return req

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar', 'is_active']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class AddComplaintSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        req = super().to_representation(instance)
        if instance.image:
            req['image'] = instance.image.url

        return req

    class Meta:
        model = Complaint
        fields = ['id', 'title', 'created_date', 'content', 'status_tag', 'complaint_tag', 'image']


class ComplaintSerializer(serializers.ModelSerializer):
    # chỉnh đường dẫn trực tiếp cloudinary cho ảnh
    def to_representation(self, instance):
        req = super().to_representation(instance)
        if instance.image:
            req['image'] = instance.image.url

        return req

    user = UserSerializer()

    class Meta:
        model = Complaint
        fields = ['id', 'title', 'user', 'created_date']


class ComplaintDetailSerializer(ComplaintSerializer):
    status_tag = TagSerializer()
    complaint_tag = TagSerializer()

    class Meta:
        model = ComplaintSerializer.Meta.model
        fields = ComplaintSerializer.Meta.fields + ['content', 'status_tag', 'complaint_tag']


class ItemSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        req = super().to_representation(instance)
        if instance.image:
            req['image'] = instance.image.url

        return req
    status_tag = TagSerializer()

    class Meta:
        model = Item
        fields = ['id', 'name', 'status', 'e_cabinet', 'status_tag', 'image']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'user', 'complaint']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id']


class AuthenticatedComplaintDetailSerializer(ComplaintDetailSerializer):
    liked = serializers.SerializerMethodField()

    def get_liked(self, complaint):
        request = self.context.get('request')
        if request:
            return complaint.like_set.filter(user=request.user, active=True).exists()

    class Meta:
        model = ComplaintDetailSerializer.Meta.model
        fields = ComplaintDetailSerializer.Meta.fields + ['liked']

    # def get_count_likes(self, obj):
    #     return obj.like_set.count()


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = djf_surveys.models.Survey
        fields = ['id', 'name', 'description']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = djf_surveys.models.Question
        fields = ['id', 'label', 'type_field', 'choices']