import djf_surveys.models
from rest_framework import serializers

from apartments.models import Flat, ECabinet, Tag, Receipt, Item, Complaint, User, Comment, CarCard, Like,Survey, Question,\
    Choice, AnswerUser, PhoneNumber, PaymentDetail, SurveyUserDone, CarCardTemp


class ImageSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        req = super().to_representation(instance)
        if instance.image:
            req['image'] = instance.image.url

        return req


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


class EcabinetDetailSerializer(ECabinetSerializer):
    class Meta:
        model = ECabinetSerializer.Meta.model
        fields = ECabinetSerializer.Meta.fields + ['phone_number']


class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = ['id', 'number', 'user']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['id', 'title', 'created_date']


class ReceiptDetailSerializer(serializers.ModelSerializer):
    tag = TagSerializer()
    flat = FlatSerializer()

    class Meta:
        model = ReceiptSerializer.Meta.model
        fields = ReceiptSerializer.Meta.fields + ['tag', 'total', 'flat']


class PaymentDetailSerializer(ImageSerializer):

    class Meta:
        model = PaymentDetail
        fields = ['image']


class CarCardSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        req = super().to_representation(instance)
        image_fields = ['image_mrc_m1', 'image_mrc_m2', 'image_idcard_m1', 'image_idcard_m2']

        for field in image_fields:
            if hasattr(instance, field) and getattr(instance, field):
                req[field] = getattr(instance, field).url

        return req

    class Meta:
        model = CarCard
        fields = ['id', 'type', 'number_plate', 'image_mrc_m1', 'image_mrc_m2', 'image_idcard_m1', 'image_idcard_m2']


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
        fields = ['id', 'username', 'avatar', 'is_active', 'first_login', 'is_staff', 'first_name', 'last_name', 'email']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

class CarCardTempSerializer(serializers.ModelSerializer):
    flat = FlatSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    def to_representation(self, instance):
        req = super().to_representation(instance)
        image_fields = ['image_mrc_m1', 'image_mrc_m2', 'image_idcard_m1', 'image_idcard_m2']

        for field in image_fields:
            if hasattr(instance, field) and getattr(instance, field):
                req[field] = getattr(instance, field).url

        return req

    class Meta:
        model = CarCardTemp
        fields = ['id', 'type', 'number_plate', 'image_mrc_m1', 'image_mrc_m2', 'image_idcard_m1', 'image_idcard_m2', 'flat', 'user', 'active']

class AddComplaintSerializer(ImageSerializer):

    class Meta:
        model = Complaint
        fields = ['id', 'title', 'created_date', 'content', 'status_tag', 'complaint_tag', 'image']


class ComplaintSerializer(ImageSerializer):
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


class ItemSerializer(ImageSerializer):

    class Meta:
        model = Item
        fields = ['id', 'name', 'e_cabinet', 'image']


class ItemDetailSerializer(ItemSerializer):
    status_tag = TagSerializer()

    class Meta:
        model = ItemSerializer.Meta.model
        fields = ItemSerializer.Meta.fields + ['status_tag']


class AddItemSerializer(ItemSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'status_tag', 'e_cabinet', 'image']


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


# djf_surveys.models.Survey
class SurveySerializer(serializers.ModelSerializer):
    count_users = serializers.SerializerMethodField()
    user_count = serializers.SerializerMethodField()
    user_create = UserSerializer()

    class Meta:
        model = Survey
        fields = ['id', 'title', 'created_date', 'active', 'content', 'user_create', 'count_users', 'user_count']

    def get_count_users(self, obj):
        return obj.survey_user_done.count()

    def get_user_count(self, obj):
        return AnswerUser.objects.filter(survey=obj).values('user_id').distinct().count()


class SurveyUserDoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyUserDone
        fields = ['id', 'survey', 'active']


class CreateSurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ['id', 'title', 'content']


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ['id', 'name', 'survey']


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'name', 'question']


class CreateQuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'name', 'survey']


class AnswerDetailSerializer(serializers.ModelSerializer):
    question = QuestionSerializer()
    survey = SurveySerializer()
    choice = ChoiceSerializer()
    class Meta:
        model = AnswerUser
        fields = ['id', 'question', 'survey', 'choice']
class AnswerSerializer(serializers.ModelSerializer):
    # question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    # survey = serializers.PrimaryKeyRelatedField(queryset=Survey.objects.all())
    # choice = serializers.PrimaryKeyRelatedField(queryset=Choice.objects.all())

    class Meta:
        model = AnswerUser
        fields = ['id', 'question', 'survey', 'choice']

    # def perform_create(self, serializer):
    #     user = self.context['request'].user
    #     serializer.save(user=user)  # Lưu thông tin người dùng