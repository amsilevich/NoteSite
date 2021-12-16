from django.urls import path
from .views import NoteCreate, NoteList, NoteDetails, HelloView

urlpatterns = [
    path('create/', NoteCreate.as_view()),
    path('get_all/', NoteList.as_view()),
    path('drop/<int:pk>', NoteDetails.as_view()),
    path('hello/', HelloView.as_view()),

]
