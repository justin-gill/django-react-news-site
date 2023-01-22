from django.db import models
from django.template.defaultfilters import slugify
from django.utils import timezone

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
    category = models.CharField(max_length=50, choices=Category.choices, default=Category.WORLD, blank=True)
    thumbnail = models.ImageField(upload_to="photos/", blank=True)
    excerpt = models.CharField(max_length=150, blank=True)
    month = models.CharField(max_length=3, blank=True)
    day = models.CharField(max_length=2, blank=True)
    content = models.TextField(blank=True)
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=timezone.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = Article.objects.all().filter(slug__iexact=original_slug).count()
        if queryset == 0:
            self.slug = original_slug
        else:
            self.slug = original_slug + '-' + str(queryset - 1)

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
