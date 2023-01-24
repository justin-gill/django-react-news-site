import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Wrap,
  WrapItem,
  Container,
} from '@chakra-ui/react';

export const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
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
        <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Link textDecoration="none" to={`/article/${articlePost.slug}`} _hover={{ textDecoration: 'none' }}>
                <Image
                  transform="scale(1.0)"
                  src={articlePost.thumbnail}
                  alt="some text"
                  objectFit="contain"
                  width="100%"
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
              name="John Doe"
              date={new Date('2021-04-06T19:01:27Z')}
            />
          </Box>
        </WrapItem>
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
    <Container maxW={'7xl'} p="12">
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {getArticles()}
      </Wrap>
    </Container>
  );
};

export default ArticleList;