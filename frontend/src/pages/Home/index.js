import { Container } from '@chakra-ui/react';
import Hero from "./Hero";
import ArticleGrid from '../../components/ArticleGrid';

const Home = () => {
  let apiUrl = `${process.env.REACT_APP_API_URL}/api/news/all`
  return (
    <Container maxW={['100%', '100%', '70%', '70%']}>
      <Hero />
      <ArticleGrid apiUrl={apiUrl}/>
    </Container>
  );
};

export default Home;