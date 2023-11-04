from rest_framework.generics import ListAPIView
from rest_framework import pagination, status, response
from news.models import Article
from news.serializers import ArticleSerializer, ArticleListSerializer, FeaturedArticleListSerializer

class CustomPagination(pagination.PageNumberPagination):
    page_size = 9
    page_query_param = 'page'

class ArticleListView(ListAPIView):
    pagination_class = CustomPagination
    serializer_class = ArticleListSerializer
    lookup_field = 'slug'
    queryset = Article.objects.order_by('-date_created')

class ArticleDetailView(ListAPIView):
    serializer_class = ArticleSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        slug = self.kwargs['slug']
        queryset = Article.objects.filter(slug__iexact=slug)
        return queryset.order_by('-date_created')

class FeaturedArticleView(ListAPIView):
    queryset = Article.objects.filter(featured=True)
    serializer_class = FeaturedArticleListSerializer
    lookup_field = 'slug'

class ArticleCategoryView(ListAPIView):
    serializer_class = ArticleListSerializer
    pagination_class = CustomPagination
    lookup_field = 'slug'

    def get_queryset(self):
        category = self.kwargs['category']
        queryset = Article.objects.filter(category__iexact=category)
        return queryset.order_by('-date_created')

class CategoryChoicesView(ListAPIView):      
    def get(self, request):         
        choices = []         
        choice_dict = dict(Article.Category.choices)  

        for k, v in choice_dict.items():             
            value = {'key': k, 'value': v}             
            choices.append(value)         
        return response.Response(choices, status=status.HTTP_200_OK)

