from django.db import models
from django.contrib.auth.models import AbstractUser,Group,Permission
# # Create your models here.
# 

#class User(AbstractUser):
 #   image = models.ImageField(upload_to='profile_pictures',blank=True,null=True,default='')
  #  groups = models.ManyToManyField(Group,related_name="custom_user_set",blank=True) 
   # user_permissons = models.ManyToManyField(Permission,related_name="custom_user_permissions_set",blank=True)                