from django.core.mail import send_mail
from apartments.models import User


def send_survey_email():
    # Lấy các user không phải là ban quản trị
    user = User.objects.filter(is_staff=False)
    # Lặp qua mảng user, lấy email của user và gửi mail cho từng user
    for u in user:
        email = u.email
        if email:
            subject = 'Bạn có một khảo sát mới cần thực hiện'
            message = f'Xin chào {u.first_name + " " + u.last_name},\nVui lòng truy cập ứng dụng để thực hiện bài khảo sát.\nXin cám ơn.\nBan quản trị tòa nhà'
            send_mail(
                subject,
                message,
                'yanghara2611@gmail.com',
                [u.email],
                fail_silently=False,
            )


def send_confirmcarcard_email(user):
    if user.email:
        subject = 'Xác thực thẻ xe'
        message = f'Xin chào {user.first_name + " " + user.last_name},\nThẻ xe của bạn đã được xác thực thành công.\nXin cám ơn.\nBan quản trị tòa nhà'
        send_mail(
            subject,
            message,
            'yanghara2611@gmail.com',
            [user.email],
            fail_silently=False,
        )
