from rest_framework.generics import ListAPIView
from news.models import Article
from news.serializers import ArticleSerializer, ArticleListSerializer

class ArticleListView(ListAPIView):
    queryset = Article.objects.order_by('-date_created')
    serializer_class = ArticleListSerializer
    lookup_field = 'slug'

class ArticleDetailView(ListAPIView):
    serializer_class = ArticleSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        slug = self.kwargs['slug']
        queryset = Article.objects.filter(slug__iexact=slug)
        return queryset.order_by('-date_created')

class FeaturedArticleView(ListAPIView):
    queryset = Article.objects.filter(featured=True)
    serializer_class = ArticleListSerializer
    lookup_field = 'slug'

class ArticleCategoryView(ListAPIView):
    serializer_class = ArticleListSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        category = self.kwargs['category']
        queryset = Article.objects.filter(category__iexact=category)
        return queryset.order_by('-date_created')
