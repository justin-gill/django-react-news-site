from django.db import models
from django.template.defaultfilters import slugify
from django.utils import timezone
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.conf import settings

from PIL import Image
from io import BytesIO
import openai
import requests

class Article(models.Model):

    class ImageLocation(models.TextChoices):
        '''
        Image location for the Hero banner
        '''
        TOP = 'top'
        CENTER = 'center'
        BOTTOM = 'bottom'

    class Category(models.TextChoices):
        BUSINESS = 'business'
        HEALTH = 'health'
        OPINION = 'opinion'
        POLITICS = 'politics'
        SCIENCE = 'science'
        SPORTS = 'sports'
        STYLE = 'style'
        TECHNOLOGY = 'technology'
        TRAVEL = 'travel'

    title = models.CharField(max_length=150, blank=True)
    slug = models.SlugField(max_length=150, unique=True)
    category = models.CharField(
        max_length=50, choices=Category.choices, default=Category.BUSINESS)
    thumbnail = models.ImageField(upload_to="photos/", blank=True)
    excerpt = models.CharField(max_length=150, blank=True)
    month = models.CharField(max_length=3, blank=True)
    day = models.CharField(max_length=2, blank=True)
    content = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    image_position = models.CharField(
        max_length=15, choices=ImageLocation.choices, default=ImageLocation.CENTER, blank=True)
    date_created = models.DateTimeField(default=timezone.now, blank=True)
    generate_content = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # allow for only one featured Article
        if self.featured:
            try:
                temp = Article.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save(update_fields=["featured"])
            except Article.DoesNotExist:
                pass

        # Ensure that each slug is unique
        original_slug = slugify(self.title)
        queryset = Article.objects.all().filter(slug__iexact=original_slug)
        if queryset.count() == 0 or (queryset.count() == 1 and queryset[0] == self):
            self.slug = original_slug
        else:
            self.slug = original_slug + '-' + str(queryset.count() - 1)

        # Auto generated content
        if self.generate_content:
            if len(self.content) == 0:
                try:
                    openai.api_key = settings.OPENAI_API_KEY
                    self.content = openai.Completion.create(model="text-davinci-003",
                                                        prompt=f"Write an article with the title '{self.title}'",
                                                        temperature=0.3, max_tokens=1000)['choices'][0]['text']
                except Exception as e:
                    print(f"Unable to generate article: {e}")

            if not self.thumbnail:
                openai.api_key = settings.OPENAI_API_KEY
                response = openai.Image.create(
                    prompt=self.title,
                    n=1,
                    size="1024x1024"
                )
                try:
                    # generate image from open ai and optimize file size
                    image_url = response['data'][0]['url']
                    response = requests.get(image_url, stream=True)
                    image_content = Image.open(response.raw)
                    image_io = BytesIO()
                    image_content = image_content.resize((800,800),Image.ANTIALIAS)
                    image_content.save(image_io, format='JPEG', quality=70)
                    image_io.seek(0)
                    self.thumbnail = InMemoryUploadedFile(image_io, 'ImageField', self.slug + ".jpg", 'image/jpeg', len(image_io.getbuffer()), None)
                except Exception as e:
                    print(f'Unable to generate image: {e}')
                    print(response)
    
        super(Article, self).save(*args, **kwargs)
