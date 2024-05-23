from django.contrib import admin
from django.utils.html import mark_safe
from apartments.models import Flat, ECabinet, Complaint, Tag, Receipt, Item, User, Comment, Survey, Question, Choice, \
    CarCard, Like
import cloudinary


class ApartmentAppAdminSite(admin.AdminSite):
    site_header = "HỆ THỐNG QUẢN LÝ CHUNG CƯ"


admin_site = ApartmentAppAdminSite('myapartment')


class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


class FlatAdmin(admin.ModelAdmin):
    list_display = ['id', 'floor', 'block', 'apartment_number']
    search_fields = ['floor', 'block', 'apartment_number']
    list_filter = ['apartment_number']

    class Media:
        css = {
            'all': ['/static/css/style.css']
        }


class ECabinetAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'user', 'active']
    search_fields = ['name']


class ItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'e_cabinet', 'status_tag','image']
    search_fields = ['name']


class ComplaintAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'active', 'created_date', 'updated_date']
    search_fields = ['title']
    readonly_fields = ['my_image']

    def my_image(self, complaint):
        if complaint.image:
            if type(complaint.image) is cloudinary.CloudinaryResource:
                return mark_safe(f"<img width='300' src='{complaint.image.url}' />")
            return mark_safe(f"<img width='300' src='{complaint.image.title}' />")


class ReceiptAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'status', 'created_date', 'updated_date']
    search_fields = ['title', 'status']


class CarCardAdmin(admin.ModelAdmin):
    list_display = ['id', 'type', 'number_plate', 'flat']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'user', 'complaint_id']


class LikeAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'complaint', 'active']


admin.site.register(Flat, FlatAdmin)
admin.site.register(ECabinet, ECabinetAdmin)
admin.site.register(Complaint, ComplaintAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Receipt, ReceiptAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(User)
admin.site.register(Like,LikeAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(CarCard, CarCardAdmin)