from django.core.management.base import BaseCommand
from django.core.files.uploadedfile import UploadedFile
from django.conf import settings
from news.models import Article
from essential_generators import DocumentGenerator
import openai
import random as rand

class Command(BaseCommand):
    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument(
            'num_articles', type=int, help='Indicates the number of articles to be created')

    def handle(self, *args, **kwargs):
        openai.api_key = settings.OPENAI_API_KEY
        num_articles = kwargs['num_articles']
        gen = DocumentGenerator()

        for i in range(num_articles):
            category=Article.Category.choices[rand.randint(0, len(Article.Category.choices) - 1)][0],
            Article.objects.create(
                category=category[0],
                generate_content=True,
                title = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": f"Create a unique, satirical, and non-political article title with the category of '{category[0]}'. Make sure the idea is original and comedic in nature. It must be less than 140 characters in total."}], temperature=1.1, max_tokens=1000)['choices'][0]['message']['content'],
                featured=True)
        print(f"[create_fake_articles] Finished creating {num_articles} Articles")

