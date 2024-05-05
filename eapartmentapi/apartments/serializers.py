import djf_surveys.models
from rest_framework import serializers
from apartments.models import Flat, ECabinet, Tag, Receipt, Item, Complaint, User, Comment


class FlatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flat
        fields = '__all__'


class ECabinetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ECabinet
        fields = ['id', 'name', 'user', 'active']


class ECabinetDetailSerializer(ECabinetSerializer):

    class Meta:
        model = ECabinetSerializer.Meta.model
        fields = ECabinetSerializer.Meta.fields


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


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
        fields = ['id', 'title']


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
        fields = ['id', 'first_name', 'last_name', 'username', 'password', 'avatar', 'is_active']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'status', 'e_cabinet']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'user', 'complaint']


class ComplaintDetailSerializer(ComplaintSerializer):
    tag = TagSerializer(many=True)

    class Meta:
        model = ComplaintSerializer.Meta.model
        fields = ComplaintSerializer.Meta.fields + ['content', 'tag']


class AuthenticatedComplaintDetailSerializer(ComplaintDetailSerializer):
    liked = serializers.SerializerMethodField()

    def get_liked(self, complaint):
        request = self.context.get('request')
        if request:
            return complaint.like_set.filter(user=request.user, active=True).exists()

    class Meta:
        model = ComplaintDetailSerializer.Meta.model
        fields = ComplaintDetailSerializer.Meta.fields + ['liked']


class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = djf_surveys.models.Survey
        fields = ['id', 'name', 'description']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = djf_surveys.models.Question
        fields = ['id', 'label', 'type_field', 'choices']
