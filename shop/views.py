from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.contrib import messages
from .forms import UploadForm
from .models import Upload
# Create your views here.def
def index(request):
    time = datetime.now().hour
    if 5<= time < 12:
        greeting = ' Good morning! '
    elif 12< time < 18 :
        greeting = 'Good afternoon!'
    elif 18 <= time < 22:
        greeting = 'Good evening!'
    else:
        greeting = 'Good night!'
    return render(request,'shop/index.html',{'greeting':greeting})

def shopitems(request):
    uploaded_items = Upload.objects.all()
    return render(request,'shop/shop-items.html',{'uploaded_items':uploaded_items})

@login_required(login_url='login')
def upload_items(request):
    form = UploadForm()
    uploaded_items = Upload.objects.filter(user=request.user)
    if request.method == 'POST':
        form = UploadForm(request.POST,request.FILES)
        if form.is_valid():
           item = form.save(commit=False)  
           item.user = request.user 
           item.save()         
           return redirect('upload-items')
        else:
            messages.error(request,'something is wrong try again')
       
    return render(request,'shop/upload.html',{'form':form, 'uploaded_items':uploaded_items})

def delete_item(request,item_id):
    items = get_object_or_404(Upload,id=item_id)
    if request.method == 'POST':
        items.delete()
        return redirect('upload-items')
    return render(request,'shop/delete.html',{'items':items})

def edit_item(request,item_id):
    item = get_object_or_404(Upload,id=item_id)
    form = UploadForm(instance=item)
    if request.method == 'POST':
        form = UploadForm(request.POST,instance=item)
        if form.is_valid():
            form.save()
            return redirect('upload-items')
    return render(request,'shop/edit-item.html',{'form':form})
