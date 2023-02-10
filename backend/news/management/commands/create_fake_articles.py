from django.core.management.base import BaseCommand
from django.core.files.uploadedfile import UploadedFile
from news.models import Article
from essential_generators import DocumentGenerator

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
                category=Article.Category.choices[i % len(Article.Category.choices)][0],
                thumbnail=UploadedFile(file=open("backend/static/temp.jpg", 'rb')),
                featured=True)
        print(f"[create_fake_articles] Finished creating {num_articles} Articles")
