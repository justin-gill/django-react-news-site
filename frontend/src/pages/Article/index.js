import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { Text, VStack, Button, Container, Image, Box, Link as ChakraLink} from "@chakra-ui/react";

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
    console.log(article.thumbnail)
    return { __html: article.content }
  }

  const capitalizeFirstLetter = (word) => {
    if (word)
      return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
  }

  return (
    <Container maxW={'7xl'} p="1em 1em 5em 1em">
      <VStack>
        <ChakraLink href={article.thumbnail} w={["100%", "100%", "70%", "70%"]}>
        
        <Image
          w={'full'}
          h={'70vh'}
          objectFit={"cover"}
          objectPosition={"top"}
          href={article.thumbnail}
          src={article.thumbnail}
        />
        </ChakraLink>
        <Box w={['100%', '100%', '70%', '70%']}>
          <Text fontSize='1xl'>
            Category: {capitalizeFirstLetter(article.category)} {article.month} {article.day}
          </Text>
          <Text fontSize={['xl', 'xl', '2xl', '3xl']}>
            {article.title}
          </Text>
        </Box>
        <Box w={['100%', '100%', '60%', '60%']} pb={"2em"}>
          <div dangerouslySetInnerHTML={createArticle()} />
        </Box >

        <Link to="/">
          <Button
            bg={'primary.500'}
            rounded={'full'}
            color={'white'}
            _hover={{ bg: 'black' }}>
            Back to Articles
          </Button>
        </Link>
      </VStack>
    </Container>

  )
};

export default ArticleDetail
