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
            print(request)
            return Response({"message": "Tarefa criada com sucesso!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Erro na criação da tarefa!"}, status=status.HTTP_400_BAD_REQUEST)
        
class TarefasGetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tarefas = Item.objects.filter(usuario=request.user)
        serializer = TarefasSerializer(tarefas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class TarefasEditarView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            tarefa = Item.objects.get(id=id, usuario=request.user)
            serializer = TarefasSerializer(tarefa)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Item.DoesNotExist:
            return Response({"error": "Tarefa não encontrada!"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, id): 
        try:
            tarefa = Item.objects.get(id=id, usuario=request.user)
        except Item.DoesNotExist:
            return Response({"error": "Tarefa não encontrada!"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TarefasSerializer(tarefa, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Tarefa atualizada com sucesso!",
                "tarefa": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class TarefasDeletarView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        try:
            tarefa = Item.objects.get(usuario=request.user ,id=id)
            tarefa.delete()
            return Response({"message": "Tarefa deletada com sucesso!"}, status=status.HTTP_204_NO_CONTENT)
        
        except Item.DoesNotExist:
            return Response({"error": "Tarefa não encontrada"}, status=status.HTTP_404_NOT_FOUND)

