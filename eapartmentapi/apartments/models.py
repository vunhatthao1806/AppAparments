from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from django.utils import timezone


class BaseModel(models.Model):
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(default=timezone.now)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['id']


class ECabinet(BaseModel):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Flat(models.Model):
    floor = models.CharField(max_length=20)
    block = models.CharField(max_length=20)
    apartment_number = models.CharField(max_length=20, unique=True)

    e_cabinet = models.OneToOneField(ECabinet, on_delete=models.PROTECT)

    def __str__(self):
        return self.apartment_number


class CarCard(BaseModel):
    type = models.CharField(max_length=255)
    number_plate = models.CharField(max_length=50)

    flat = models.ForeignKey(Flat, on_delete=models.CASCADE)


class User(AbstractUser):
    avatar = CloudinaryField(null=True)


class Tag(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=255)
    status = models.BooleanField()

    e_cabinet = models.ForeignKey(ECabinet, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def status_text(self):
        return "received" if self.status else "dismissed"


class Complaint(BaseModel):
    title = models.CharField(max_length=255)
    content = RichTextField()
    image = CloudinaryField()
    tag = models.ManyToManyField(Tag)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Survey(BaseModel):
    title = models.CharField(max_length=255)
    content = RichTextField()

    user = models.ManyToManyField(User)

    def __str__(self):
        return self.title


class Receipt(BaseModel):
    name = models.CharField(max_length=255)
    status = models.BooleanField()

    flat = models.ForeignKey(Flat, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


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
