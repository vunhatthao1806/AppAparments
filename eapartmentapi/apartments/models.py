from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from django.utils import timezone
from django.db.models import Count


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now_add=True) # default=timezone.now
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['id']


class User(AbstractUser):
    avatar = CloudinaryField(null=True)
    first_login = models.BooleanField(default=True)

    survey_user_done = models.ManyToManyField('Survey', related_name='survey_user_done')
    expo_push_token = models.CharField(max_length=255, null=True, blank=True)


class ECabinet(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    phone_number = models.ForeignKey('PhoneNumber', on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.name


class PhoneNumber(models.Model):
    number = models.CharField(max_length=20)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.number


class Flat(models.Model):
    floor = models.CharField(max_length=20)
    block = models.CharField(max_length=20)
    apartment_number = models.CharField(max_length=20, unique=True)

    e_cabinet = models.OneToOneField(ECabinet, on_delete=models.PROTECT)
    user = models.ForeignKey('User', on_delete=models.PROTECT)

    def __str__(self):
        return self.apartment_number


class CarCard(BaseModel):
    type = models.CharField(max_length=255)
    number_plate = models.CharField(max_length=50)
    image_mrc_m1 = CloudinaryField(null=True)
    image_mrc_m2 = CloudinaryField(null=True)
    image_idcard_m1 = CloudinaryField(null=True)
    image_idcard_m2 = CloudinaryField(null=True)

    flat = models.ForeignKey(Flat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.number_plate


class Item(BaseModel):
    name = models.CharField(max_length=255)
    image = CloudinaryField(null=True)

    e_cabinet = models.ForeignKey(ECabinet, on_delete=models.CASCADE)
    status_tag = models.ForeignKey('Tag', on_delete=models.PROTECT, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class Tag(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Complaint(BaseModel):
    title = models.CharField(max_length=255)
    content = RichTextField()
    image = CloudinaryField()

    status_tag = models.ForeignKey(Tag, on_delete=models.CASCADE, null=True, related_name='status_tag')
    complaint_tag = models.ForeignKey(Tag, on_delete=models.CASCADE, null=True, related_name='complaint_tag')

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title


class Receipt(BaseModel):
    title = models.CharField(max_length=255)
    total = models.CharField(max_length=255, null=True)
    status = models.BooleanField()

    flat = models.ForeignKey(Flat, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.PROTECT, null=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.title


class Interaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # user mà xóa thì interaction giữ lại cũng ko có ý nghĩa gì
    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Like(Interaction):
    class Meta:
        unique_together = ('complaint', 'user')


class Comment(Interaction):
    content = models.CharField(max_length=255)


class Survey(BaseModel):
    title = models.CharField(max_length=255)
    content = RichTextField()

    user_create = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='user_create')

    def __str__(self):
        return self.title


class Question(BaseModel):
    name = models.CharField(max_length=255)
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class Choice(models.Model):
    name = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name


class AnswerUser(models.Model):

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE, null=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)

