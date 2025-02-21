from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UsuarioManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

class Usuario(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UsuarioManager()


class Item(models.Model):
    STATUS_CHOICES = [
        ('em_andamento', 'Em andamento'),
        ('pendente', 'Pendente'),
        ('finalizado', 'Finalizado')
    ]
    
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    state = models.CharField(choices=STATUS_CHOICES, default="pendente", max_length=12)
    description = models.TextField(null=False)
    date = models.DateField(null=False)
