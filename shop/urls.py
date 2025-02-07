from django.urls import  path
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns=[
   path('',views.index,name='home'),
   path('shop-items/',views.shopitems,name='shop-items'),
   path('upload-items/',views.upload_items,name='upload-items'),
   path('profile/',views.profile,name='profile'),
   path('delete/<int:item_id>/',views.delete_item,name='delete-item'),
   path('edit/<int:item_id>/',views.edit_item,name='edit-item'),
] 