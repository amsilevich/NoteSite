# Generated by Django 4.0 on 2021-12-19 16:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_note'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Note',
        ),
    ]
