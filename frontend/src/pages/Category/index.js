import { Container } from '@chakra-ui/react';
import CategoryHeader from './CategoryHeader';
import ArticleGrid from '../../components/ArticleGrid';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

const Home = () => {
  let { id } = useParams()
  const [apiUrl, setApiUrl] = useState(`${process.env.REACT_APP_API_URL}/api/news/category/${id}/`);

  useEffect(() => {
    setApiUrl(`${process.env.REACT_APP_API_URL}/api/news/category/${id}`)
  }, [id])

  return (
    <Container maxW={['100%', '100%', '70%', '70%']}>
      <CategoryHeader />
      <ArticleGrid apiUrl={apiUrl} category={id} />
    </Container>
  );
};

export default Home;
