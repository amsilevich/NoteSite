from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView



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
from django.conf import settings
import jwt

from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)


class NoteCreate(APIView):

    def get(self, request):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request):
        token = request.headers['Authorization'][4:]
        print(token)
        payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
        # user = CustomUser.objects.get(id=payload['user_id'])
        print(payload)
        data=request.data
        data['author'] = payload['user_id']
        print(data)
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return serializer.errors


class NoteList(APIView):
    def get(self, request):
        token = request.headers['Authorization'][4:]
        print(token)
        payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
        notes = Note.objects.filter(author=payload['user_id']).order_by('-isPinned', 'id')  
        print(notes)
        serializer_class = NoteSerializer(notes, many=True)
        return Response(serializer_class.data)


class NoteDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    queryset = Note.objects.all()
