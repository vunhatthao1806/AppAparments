from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class ECabinet(models.Model):
    name = models.CharField(max_length=255, unique=True)


class Flat(models.Model):
    floor = models.CharField(max_length=20)
    block = models.CharField(max_length=20)
    apartment_number = models.CharField(max_length=20, unique=True)

    e_cabinet = models.OneToOneField(ECabinet, on_delete=models.CASCADE)

    def __str__(self):
        return self.apartment_number





