# Generated by Django 5.0.4 on 2024-05-28 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apartments', '0007_remove_tag_type_tag_delete_typetag'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='complaint',
            options={'ordering': ['-created_date']},
        ),
        migrations.AddField(
            model_name='user',
            name='expo_push_token',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
