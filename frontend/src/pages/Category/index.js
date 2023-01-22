import CategoryArticleGrid from './CategoryArticleGrid';
import CategoryFeaturedArticle from './CategoryFeaturedArticle';
import Subheader from '../../components/Subheader';
import Row from 'react-bootstrap/Row';

const Home = () => {
  return (
    <div className='container'>
      <Row>
        <Subheader />
      </Row>
      <Row>
        <CategoryFeaturedArticle />
      </Row>
      <CategoryArticleGrid />
    </div>
  );
};

export default Home;