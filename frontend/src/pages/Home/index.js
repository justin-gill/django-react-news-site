import { Container } from '@chakra-ui/react';
import Hero from "./Hero";
import ArticleList from "./ArticleList";

const Home = () => {
  return (
    <Container maxW={['100%', '100%', '70%', '70%']}>
      <Hero />
      <ArticleList />
    </Container>
  );
};

export default Home;