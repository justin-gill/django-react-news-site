from django.urls import path

from .views import ArticleListView, ArticleCategoryView, ArticleDetailView, FeaturedArticleView, CategoryChoicesView

urlpatterns = [
    path('all/', ArticleListView.as_view(), name='article_list'),
    path('categories/', CategoryChoicesView.as_view(), name='category_list'),
    path('featured/', FeaturedArticleView.as_view(), name='featured_article'),
    path('category/<str:category>/', ArticleCategoryView.as_view(), name='article_category'),
    path('article/<str:slug>/', ArticleDetailView.as_view(), name='article_detail'),
]
