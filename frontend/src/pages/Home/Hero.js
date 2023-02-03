import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
  Flex,
  VStack,
  Stack,
  Button,
  Text,
  useBreakpointValue
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
    <Flex
      boxShadow='dark-lg'
      w={'full'}
      h={'35vh'}
      backgroundImage={featuredArticleObject['thumbnail']}
      bgImage={"linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)) , url('" + featuredArticleObject['thumbnail'] + "')"}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6} overflow={"hidden"}>
          <Link to={`/article/${featuredArticleObject.slug}`}>
            <Text
              textOverflow={"ellipsis"}
              color={'white'}
              lineHeight={1.4}
              fontSize={['sm', 'xl', '2xl', '3xl']}>
              {featuredArticleObject.title}
            </Text>
          </Link>
          <Stack direction={'row'}>
            <Link to={`/article/${featuredArticleObject.slug}`}>
              <Button
                bg={'primary.500'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'black' }}>
                Go to Article
              </Button>
            </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}