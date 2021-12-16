from django.db.models import query
from django.http import response
from rest_framework import generics
from rest_framework import permissions
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import NoteSerializer


class NoteCreate(APIView):

    def get(self, request):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return serializer.errors


class NoteList(APIView):
    def get(self,request):
        notes = Note.objects.order_by('-isPinned','id')  
        serializer_class = NoteSerializer(notes, many=True)
        return Response(serializer_class.data)


class NoteDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()


class HelloView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        content = {'message': 'Hello, world!'}
        return Response(content)
