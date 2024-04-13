from django.contrib import admin
from apartments.models import User, Flat, ECabinet

admin.site.register(User)
admin.site.register(Flat)
admin.site.register(ECabinet)

# Register your models here.
