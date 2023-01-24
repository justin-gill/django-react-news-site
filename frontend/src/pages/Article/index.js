import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { Text, VStack, Container, Image } from "@chakra-ui/react";

const ArticleDetail = () => {

  const [article, setArticle] = useState([])

  let { id } = useParams();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/news/article/${id}`,
        )
      ).json()
      setArticle(data[0])
    };
    dataFetch()
  }, [id])

  const createArticle = () => {
    return { __html: article.content }
  }

  const capitalizeFirstLetter = (word) => {
    if (word)
      return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  }

  return (
    <Container maxW={'7xl'} p="12">
      <VStack>
        <Text fontSize='6xl'>
          {article.title}
        </Text>
        <Image
          objectFit={'contain'}
          src={article.thumbnail}
        />
        <Text fontSize='1xl'>
          Category: {capitalizeFirstLetter(article.category)} {article.month} {article.day}
        </Text>
        <div dangerouslySetInnerHTML={createArticle()} />;
        <Link to="/">
          Back to Articles
        </Link>
      </VStack>
    </Container>

  )
};

export default ArticleDetail
