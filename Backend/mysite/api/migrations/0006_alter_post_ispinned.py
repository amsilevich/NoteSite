# Generated by Django 4.0 on 2021-12-11 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_delete_topic_alter_post_ispinned'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='isPinned',
            field=models.BooleanField(default=False, verbose_name='Закреплено'),
        ),
    ]
