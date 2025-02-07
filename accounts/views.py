from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse
from .forms import SignupForm,LoginForm
from django.contrib import messages
from django.contrib.auth.models import  User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.forms import UserCreationForm
# Create your views here.
def signup(request):
    form = SignupForm()
    if request.method  == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            User = form.save()
            messages.success(request,'you have successfully signed up. ')
            return redirect('login')
        else:
            messages.error(request,'oops! something is wrong try again')
    return render(request,'accounts/sign-up.html',{'form' : form})

def user_login(request):
    form =  LoginForm()
    if request.method == 'POST':
        form = LoginForm(request,data=request.POST)
        if form.is_valid():
            username=form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request,username=username,password=password)
            if user is not None:
                login(request,user)
                messages.success(request,'you are now logged in now.')
                return redirect('home')
            else:
                messages.error(request,'incorrect username or password try again')
                return redirect('login')
    return  render(request,'accounts/login.html',{'form' : form})

def user_logout(request):
    logout(request)
    messages.success(request,'You have been logged out successfully')
    return redirect('home')
    

def profile(request):
    return render(request,'accounts/profile.html')

def delete_account(request,accntID):
    account = get_object_or_404(User,id=accntID)
    if request.method ==  'POST':
            account.delete()
    return redirect('home')
    return render(request,'accounts/delete-account.html')
    