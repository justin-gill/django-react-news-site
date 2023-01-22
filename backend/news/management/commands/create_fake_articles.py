from django.core.management.base import BaseCommand
from news.models import Article
from essential_generators import DocumentGenerator
from django.core.files.uploadedfile import UploadedFile

class Command(BaseCommand):
    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument(
            'num_articles', type=int, help='Indicates the number of articles to be created')

    def handle(self, *args, **kwargs):
        num_articles = kwargs['num_articles']
        gen = DocumentGenerator()

        for i in range(num_articles):
            Article.objects.create(title=gen.sentence(),
                category=Article.Category.names[i % len(Article.Category.names)],
                thumbnail=UploadedFile(file=open("static/temp.jpg", 'rb')))
        print(f"[create_fake_articles] Finished creating {num_articles} Articles")
