from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        lookup_field = 'slug'

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['title', 'slug', 'category', 'thumbnail', 'excerpt', 'month', 'day', 'featured']
        lookup_field = 'slug'

