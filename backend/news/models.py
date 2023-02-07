from django.db import models
from django.template.defaultfilters import slugify
from django.utils import timezone
from django.core.files.base import ContentFile
import openai
from django.conf import settings
import requests
from google.cloud import storage


class Article(models.Model):

    class Category(models.TextChoices):
        WORLD = 'world'
        ENVIRONMENT = 'environment'
        TECHNOLOGY = 'technology'
        DESIGN = 'design'
        CULTURE = 'culture'
        BUSINESS = 'business'
        POLITICS = 'politics'
        OPINION = 'opinion'
        SCIENCE = 'science'
        HEALTH = 'health'
        STYLE = 'style'
        TRAVEL = 'travel'

    title = models.CharField(max_length=150, blank=True)
    slug = models.SlugField(max_length=150, unique=True)
    category = models.CharField(
        max_length=50, choices=Category.choices, default=Category.WORLD, blank=True)
    thumbnail = models.ImageField(upload_to="photos/", blank=True)
    excerpt = models.CharField(max_length=150, blank=True)
    month = models.CharField(max_length=3, blank=True)
    day = models.CharField(max_length=2, blank=True)
    content = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        if len(self.content) == 0:
            openai.api_key = settings.OPENAI_API_KEY
            self.content = openai.Completion.create(model="text-davinci-003",
                                                    prompt=f"Write an article with the title '{self.title}'",
                                                    temperature=0.3, max_tokens=1000)['choices'][0]['text']
        original_slug = slugify(self.title)
        queryset = Article.objects.all().filter(slug__iexact=original_slug).count()
        if queryset == 0:
            self.slug = original_slug
        else:
            self.slug = original_slug + '-' + str(queryset - 1)

        if not self.thumbnail:
            openai.api_key = settings.OPENAI_API_KEY
            response = openai.Image.create(
                prompt=self.title,
                n=1,
                size="1024x1024"
            )
            image_url = response['data'][0]['url']
            image_content = ContentFile(requests.get(image_url).content)
            self.thumbnail.save(self.slug + ".png", image_content)

        # allow for only one featured Article
        if self.featured:
            try:
                temp = Article.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save(update_fields=["featured"])
            except Article.DoesNotExist:
                pass
        super(Article, self).save(*args, **kwargs)
