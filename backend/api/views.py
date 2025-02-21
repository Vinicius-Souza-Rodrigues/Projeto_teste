from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Item
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UsuarioSerializer, TarefasSerializer
from django.contrib.auth import authenticate

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
        
class TarefasCreateVIew(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TarefasSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(usuario=request.user)
            return Response({"message": "Tarefa criada com sucesso!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Erro na criação da tarefa!"}, status=status.HTTP_400_BAD_REQUEST)
        
class TarefasGetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = TarefasSerializer(data=request.data, many=True)

        if serializer.is_valid():
            return serializer
        else:
            return Response({"message": "Algo deu errado na busca!"}, status=status.HTTP_400_BAD_REQUEST)
        
#class TarefasEditarView(APIView):

#class TarefasDeletarView(APIView):

