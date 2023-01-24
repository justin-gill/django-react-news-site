import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Container
} from '@chakra-ui/react';


export default function Hero() {
  const [featuredArticleObject, setFeaturedArticle] = useState([])

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/news/featured`,
        )
      ).json()
      setFeaturedArticle(data[0])
    };
    dataFetch()
  }, [])


  return (
    <Container maxW={['100%', '100%', '70%', '70%']}>
      <Link to={`/article/${featuredArticleObject.slug}`}>
        <Stack minH={'20vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex flex={1}>
            <Image
              objectFit={'contain'}
              src={featuredArticleObject.thumbnail}
            />
          </Flex>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}>
                  {featuredArticleObject.title}
                </Text>
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                {featuredArticleObject.excerpt}
              </Text>
            </Stack>
          </Flex>
        </Stack>
      </Link>
    </Container>
  );
}