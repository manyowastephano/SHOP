from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
#from . models import User
from django.contrib.auth.models import User
from django import forms
#from .models import User
class SignupForm(UserCreationForm):
    class Meta:
        model=User
        fields=('first_name','last_name','username','email','password1','password2')
    def __init__(self, *args, **kwargs):
        super(SignupForm,self).__init__(*args, **kwargs)
        for field_name,field in self.fields.items():
            field.help_text = ''
            field.widget.attrs.update({'class':'form-control','placeholder':f'Enter {field.label}'})
            field.label=""
class LoginForm(AuthenticationForm):
    username = forms.CharField( max_length=50, required=True,widget=forms.TextInput(attrs={'class ':'form-contro','placeholder':'Enter your username'}))
    password =forms.CharField(max_length=50,required=True,widget=forms.PasswordInput(attrs={'Class ': 'form-contro','placeholder':'Enter your password'}))
    
    
