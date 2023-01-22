from django.urls import path

from .views import ArticleListView, ArticleCategoryView, ArticleDetailView, FeaturedArticleView

urlpatterns = [
    path('all', ArticleListView.as_view(), name='article_list'),
    path('featured', FeaturedArticleView.as_view(), name='featured_article'),
    path('category/<str:category>', ArticleCategoryView.as_view(), name='article_category'),
    path('article/<str:slug>', ArticleDetailView.as_view(), name='article_detail'),
]
