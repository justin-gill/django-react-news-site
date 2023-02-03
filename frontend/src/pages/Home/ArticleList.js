import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Grid,
  GridItem,
  Container,
} from '@chakra-ui/react';

export const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};


const ArticleList = () => {
  const [articles, setArticles] = useState([])


  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/news/all`,
        )
      ).json()
      setArticles(data)
    };
    dataFetch()
  }, [])

  const getArticles = () => {
    let list = []
    let result = []

    articles.map(articlePost => {
      return list.push(
        <GridItem w={"100%"}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Link textDecoration="none" to={`/article/${articlePost.slug}`} _hover={{ textDecoration: 'none' }}>
                <Image
                  w={'full'}
                  h={'30vh'}
                  backgroundSize={'cover'}
                  transform="scale(1.0)"
                  src={articlePost.thumbnail}
                  alt="some text"
                  objectFit="cover"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Link>
            </Box>
            <Heading fontSize="xl" marginTop="2">
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                {articlePost.title}
              </Link>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              {articlePost.excerpt}
            </Text>
            <BlogAuthor
              name={articlePost.name}
              date={new Date('2021-04-06T19:01:27Z')}
            />
          </Box>
        </GridItem>
      );
    })

    for (let i = 0; i < list.length; i += 1) {
      result.push(
        <div key={i}>
          {list[i]}
        </div>
      )
    }

    return list
  }
  return (
    <Container maxW={'7xl'} p="4">
      <Divider marginTop="5" />
      <Grid templateColumns='repeat(3, 1fr)' gap={6} mt="4vh">
        {getArticles()}
      </Grid>
    </Container>
  );
};

export default ArticleList;