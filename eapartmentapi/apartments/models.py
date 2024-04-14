from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from django.utils import timezone


class User(AbstractUser):
    pass


class BaseModel(models.Model):
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(default=timezone.now)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ['-id']


class ECabinet(BaseModel):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Flat(BaseModel):
    floor = models.CharField(max_length=20)
    block = models.CharField(max_length=20)
    apartment_number = models.CharField(max_length=20, unique=True)

    e_cabinet = models.OneToOneField(ECabinet, on_delete=models.CASCADE)

    def __str__(self):
        return self.apartment_number


class Complaint(BaseModel):
    title = models.CharField(max_length=255)
    content = RichTextField()
    image = CloudinaryField()

    def __str__(self):
        return self.title

