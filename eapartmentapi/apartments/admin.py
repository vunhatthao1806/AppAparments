from django.contrib import admin
from django.utils.html import mark_safe
from apartments.models import User, Flat, ECabinet, Complaint
import cloudinary


class FlatAdmin(admin.ModelAdmin):
    list_display = ['id', 'floor', 'block', 'apartment_number']
    search_fields = ['floor', 'block', 'apartment_number']
    list_filter = ['apartment_number']

    class Media:
        css = {
            'all': ['/static/css/style.css']
        }


class ComplaintAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'active', 'created_date', 'updated_date']
    readonly_fields = ['my_image']

    def my_image(self, complaint):
        if complaint.image:
            if type(complaint.image) is cloudinary.CloudinaryResource:
                return mark_safe(f"<img width='300' src='/static/{complaint.image.url}' />")
            return mark_safe(f"<img width='300' src='/static/{complaint.image.title}' />")


admin.site.register(User)
admin.site.register(Flat, FlatAdmin)
admin.site.register(ECabinet)
admin.site.register(Complaint, ComplaintAdmin)
