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
  Button,
  ScaleFade
} from '@chakra-ui/react';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

const ArticleGrid = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([])
  const [nextPage, setNextPage] = useState(false);
  const [previousPage, setPreviousPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const BlogAuthor = (props) => {
    return (
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Text>{props.date.toLocaleDateString()}</Text>
      </HStack>
    );
  };

  useEffect(() => {
    setIsLoading(true)
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${props.apiUrl}?page=${pageNumber}`,
        )
      ).json()
      setArticles(data.results)
      setNextPage(Boolean(data.next))
      setPreviousPage(Boolean(data.previous))
      setIsLoading(false);
    };
    dataFetch()
    window.scrollTo(0, 0)
  }, [pageNumber, props.apiUrl])

  useEffect(() => {
    setPageNumber(1)
  }, [props.category])

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
                  alt={articlePost.slug}
                  objectFit="cover"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Link>
            </Box>
            <Heading fontSize="xl" marginTop="2">
              <Link textDecoration="none" to={`/article/${articlePost.slug}`} _hover={{ textDecoration: 'none' }}>
                {articlePost.title}
              </Link>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              {articlePost.excerpt}
            </Text>
            <BlogAuthor
              name={articlePost.name}
              date={new Date(articlePost.date_created)}
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

  const PageButtons = () => {
    return (
      <Container mt={"4vh"} display="flex" justifyContent="center">
        <Button
          mr={"4"}
          onClick={() => setPageNumber(pageNumber => pageNumber - 1)} bg={'primary.500'}
          rounded={'full'}
          color={'white'}
          isDisabled={!previousPage}
          _hover={{ bg: 'black' }}> <FaArrowLeft />
        </Button>
        <Button
          isDisabled={!nextPage}
          ml={"4"}
          onClick={() => setPageNumber(pageNumber => pageNumber + 1)} bg={'primary.500'}
          rounded={'full'}
          color={'white'}
          _hover={{ bg: 'black' }}> <FaArrowRight /> </Button>
      </Container>
    )
  }

  return (
    <ScaleFade in={!isLoading} transition={{ enter: { duration: .5 } }}>
      <Container maxW={'7xl'} p="4">
        <Divider marginTop="5" />
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={6} mt="4vh">
          {getArticles()}
        </Grid>
        {PageButtons()}
      </Container>
    </ScaleFade>
  );
};

export default ArticleGrid;