from rest_framework import serializers
from .models import Article

# TODO: more classes here to limit fields
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
        lookup_field = 'slug'
