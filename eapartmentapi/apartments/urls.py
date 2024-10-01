from django.urls import path, include
from rest_framework import routers
from apartments import views

r = routers.DefaultRouter()

r.register('flats', views.FlatViewSet, 'flats')
r.register('ecabinets', views.ECabinetViewSet, 'ecabinets')
r.register('ecabinet', views.EcabinetAdminViewSet, 'ecabinet')
r.register('items', views.ItemViewSet, 'items')
r.register('additem', views.AddItemViewSet, 'additem')

r.register('receipts', views.ReceiptViewSet, 'receipts')
r.register('payments', views.PaymentViewSet, 'payments')
r.register('paymentdetails', views.PaymentDetailViewSet, 'paymentdetails'),


r.register('phonenumbers', views.PhoneNumberViewSet, 'phonenumbers')

r.register('complaints', views.ComplaintViewSet, 'complaints')
r.register('addcomplaints', views.AddComplaintViewSet, 'addcomplaints')

r.register('users', views.UserViewSet, 'users')
r.register('admins', views.AdminViewSet, 'admins')

r.register('comments', views.CommentViewSet, 'comments')
r.register('carcards', views.CarCardViewSet, 'carcards')
r.register('tags', views.TagViewSet, 'tags')

r.register('surveys', views.SurveyViewSet, 'surveys')
r.register('surveys_user_done', views.SurveyUserDoneViewSet, 'surveys_user_done')
r.register('createsurveys', views.CreateSurveyViewSet, 'createsurveys')
r.register('questions', views.QuestionViewSet, 'questions')
r.register('createquestions', views.CreateQuestionViewSet, 'createquestions')
r.register('choices', views.ChoiceViewSet, 'choices')
r.register('answers', views.AnswerViewSet, 'answers')
r.register('carcardtemp', views.CarCardTempViewSet, 'carcardtemp')
# r.register('createanswers', views.CreateAnswerViewSet, 'createanswers')
# r.register('createanswers', views.CreateAnswerViewSet, 'createanswers')
r.register('reset-password', views.PasswordResetRequestViewSet,'reset-password')



urlpatterns = [
    path('', include(r.urls)),
    # path('save-token/', views.save_token, name='save_token'),
    # path('send-notification/', views.send_notification, name='send_notification'),
    # Truyền 2 tham số uid và token vào viewset, retrieve sẽ get html, create sẽ post set lại pass
    path('reset-password/<str:uid>/<str:token>/', views.PasswordResetConfirmViewSet.as_view({'get': 'retrieve', 'post': 'create'}), name='reset_password_confirm'),
]