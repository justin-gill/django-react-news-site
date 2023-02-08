from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient

from news.models import Article

from essential_generators import DocumentGenerator

def create_random_articles(num_articles):
    articles_list = []
    gen = DocumentGenerator()
    for i in range(num_articles):
        article = Article.objects.create(title=gen.sentence(),
            category=(Article.Category.names[i % len(Article.Category.names)]))
        articles_list.append(article)
    return articles_list

class ArticleListTest(TestCase):

    def setUp(self):
        self.client = APIClient()

        num_articles = 9
        self.article_list = create_random_articles(num_articles)

    def test_article_list(self):
        url = reverse('article_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        articles_expected_list = self.article_list
        # reverse list to test order by descending date
        articles_expected_list.reverse()
        articles_result_list = response.data['results']
        self.assertEqual(len(articles_result_list), len(articles_expected_list))

        for i in range(len(articles_expected_list)):
            article_exp = articles_expected_list[i]
            article_res = articles_result_list[i]

            self.assertEqual(article_exp.title, article_res['title'])
            self.assertEqual(article_exp.slug, article_res['slug'])
            self.assertEqual(article_exp.category, article_res['category'])
            self.assertEqual(article_exp.excerpt, article_res['excerpt'])
            self.assertEqual(article_exp.month, article_res['month'])
            self.assertEqual(article_exp.day, article_res['day'])
            self.assertEqual(article_exp.featured, article_res['featured'])

    def test_article_category_list(self):
        url = reverse('article_category', kwargs={'category': 'world'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        articles_expected_list = [article for article in self.article_list if article.category == 'WORLD']
        articles_result_list = response.data['results']
        self.assertEqual(len(articles_result_list), len(articles_expected_list))

    def test_article_detail_view(self):
        url = reverse('article_detail', kwargs={'slug' : self.article_list[0].slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.data), 1)


class ArticleCreationTest(TestCase):

    def setUp(self):
        self.client = APIClient()

        self.article_one = Article.objects.create(title='Same Title', featured=True)
        self.article_two = Article.objects.create(title='Same Title', featured=True)

    def test_duplicate_slug(self):
        url = reverse('article_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        articles_result_list = response.data['results']
        self.assertNotEqual(articles_result_list[0]['slug'], articles_result_list[1]['slug'])

    def test_single_featured(self):
        url = reverse('article_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        articles_result_list = response.data['results']
        self.assertNotEqual(articles_result_list[0]['featured'], articles_result_list[1]['featured'])
