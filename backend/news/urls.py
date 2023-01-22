from django.urls import path

from .views import ArticleListView, ArticleCategoryView, ArticleDetailView

urlpatterns = [
    path('all', ArticleListView.as_view(), name='article_list'),
    path('category/<str:category>', ArticleCategoryView.as_view(), name='article_category'),
    path('<str:slug>', ArticleDetailView.as_view(), name='article_detail'),
]
