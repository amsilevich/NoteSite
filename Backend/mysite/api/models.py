from django.db import models

class Note(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(verbose_name='Заголовок', max_length=32, blank=True)
    text = models.TextField(verbose_name='Текст', blank=True)
    isPinned = models.BooleanField(verbose_name='Закреплено', default=False )

    def __str__(self):
        return self.title 