import ArticleGrid from './ArticleGrid';
import Subheader from '../../components/Subheader';
import Row from 'react-bootstrap/Row';

const Home = () => {
  return (
    <div className='container'>
      <Row>
        <Subheader />
      </Row>
      <ArticleGrid />
    </div>
  );
};

export default Home;