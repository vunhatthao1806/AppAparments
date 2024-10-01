from django.contrib import admin
from django.db.models import Count, Prefetch
from django.template.response import TemplateResponse
from django.urls import path
from django.utils.html import mark_safe
from apartments.models import Flat, ECabinet, Complaint, Tag, Receipt, Item, User, Comment, Survey, Question, Choice, \
    CarCard, Like, AnswerUser, PhoneNumber, PaymentDetail, SurveyUserDone
import cloudinary
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class ApartmentAppAdminSite(admin.AdminSite):
    site_header = "HỆ THỐNG QUẢN LÝ CHUNG CƯ"

    # class MyAdminSite(admin.AdminSite):
    #     site_header = 'THỐNG KÊ'

    def get_urls(self):
        return [path('stats/', self.stats_view)] + super().get_urls()

    def stats_view(self, request):
        #Đếm số lượng người dung thực hiện khảo sát trên từng khảo sát
        survey_stats = SurveyUserDone.objects.values('survey__id', 'survey__title').annotate(count=Count('id'))
        # Lấy các khảo sát kèm theo câu hỏi và lựa chọn tương ứng
        surveys = Survey.objects.prefetch_related(
            Prefetch('questions', queryset=Question.objects.prefetch_related('choices'))
        )
        survey_questions_choices = []
        for survey in surveys:
            questions_choices = []
            for question in survey.questions.all():  # Sử dụng 'questions'
                choices = question.choices.all()  # Sử dụng 'choices'
                # Đếm số lượng câu trả lời cho câu hỏi này
                answer_count = AnswerUser.objects.filter(question=question).count()
                questions_choices.append({
                    'question': question.name,
                    'choices': [choice.name for choice in choices],
                    'answer_count': answer_count  # Đếm số lượng câu trả lời cho câu hỏi
                })
            survey_questions_choices.append({
                'survey_id': survey.id,
                'survey_title': survey.title,
                'questions_choices': questions_choices
            })

        return TemplateResponse(request, 'admin/stats.html', {
            'survey_stats': survey_stats,
            'survey_questions_choices': survey_questions_choices
        })


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
    list_display = ['id', 'name', 'user', 'active', 'phone_number_id']
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
    search_fields = ['name', 'status']


class CarCardAdmin(admin.ModelAdmin):
    list_display = ['id', 'type', 'number_plate', 'flat']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'user', 'complaint_id']


class LikeAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'complaint', 'active']


class PhoneNumberAdmin(admin.ModelAdmin):
    list_display = ['id', 'number', 'user']


class AnswerAdmin(admin.ModelAdmin):
    list_display = ['id', 'survey', 'question', 'user', 'choice']


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'question_id']


class ChoiceInLineAdmin(admin.StackedInline):
    model = Choice
    fk_name = 'question'


class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'survey_id']
    inlines = [ChoiceInLineAdmin, ]


class QuestionInlineAdmin(admin.StackedInline):
    model = Question
    fk_name = 'survey' # tên khoá ngoại (tuỳ chọn)


class SurveyAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'user_create']
    inlines = [QuestionInlineAdmin, ]


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    list_display = ['username', 'first_name', 'last_name']
    search_fields = ['username']
    list_filter = ['username', 'first_name', 'last_name']
    readonly_fields = ['my_avatar']
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'avatar')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2', 'avatar'),
        }),
    )

    def my_avatar(self, user):
        if user.avatar:
            if isinstance(user.avatar, cloudinary.CloudinaryResource):
                return mark_safe(f"<img width='300' src='{user.avatar.url}' />")

    class Media:
        css = {
            'all': ['/static/css/style.css']
        }


class SurveyUserDoneAdmin(admin.ModelAdmin):
    list_display = ['id', 'survey', 'user', 'active']


admin_site.register(Flat, FlatAdmin)
admin_site.register(ECabinet, ECabinetAdmin)
admin_site.register(Complaint, ComplaintAdmin)
admin_site.register(Tag, TagAdmin)

admin_site.register(Receipt, ReceiptAdmin)
admin_site.register(PaymentDetail)

admin_site.register(Item, ItemAdmin)
admin_site.register(User, UserAdmin)
admin_site.register(SurveyUserDone, SurveyUserDoneAdmin)

admin_site.register(Like,LikeAdmin)
admin_site.register(Comment, CommentAdmin)
admin_site.register(CarCard, CarCardAdmin)
admin_site.register(PhoneNumber, PhoneNumberAdmin)

admin_site.register(Survey, SurveyAdmin)
admin_site.register(Question, QuestionAdmin)
admin_site.register(Choice, ChoiceAdmin)
admin_site.register(AnswerUser, AnswerAdmin)
