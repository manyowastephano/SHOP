from django.db import models
#from django.contrib.auth.models import User
from django.conf import settings
from datetime import datetime
# Create your models here.
class Upload(models.Model):
    name = models.CharField(max_length=30,blank=False)
    price = models.IntegerField(blank=False)
    description = models.CharField(max_length=50,blank=True)
    image =models.ImageField(upload_to='products_to_sell',default='defaut.jpg')
    uploded =models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    def __str__(self):
        return self.name

    
    