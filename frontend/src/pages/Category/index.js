import { Container } from '@chakra-ui/react';
import CategoryHeader from './CategoryHeader';
import CategoryArticleGrid from './CategoryArticleGrid';

const Home = () => {
  return (
    <Container maxW={['100%', '100%', '70%', '70%']}>
      <CategoryHeader />
      <CategoryArticleGrid />
    </Container>
  );
};

export default Home;