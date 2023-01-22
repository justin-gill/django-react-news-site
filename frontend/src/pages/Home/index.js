import ArticleGrid from './ArticleGrid';
import FeaturedArticle from './FeaturedArticle';
import Subheader from '../../components/Subheader';
import Row from 'react-bootstrap/Row';

const Home = () => {
  return (
    <div className='container'>
      <Row>
        <Subheader />
      </Row>
      <Row>
        <FeaturedArticle />
      </Row>
      <ArticleGrid />
    </div>
  );
};

export default Home;