from django.contrib import admin
from django.urls import re_path, path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path(r"admin/", admin.site.urls),
    path("api/news/", include('news.urls')),
]
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

