import React, { useEffect, useState } from "react";
import { Box, Flex, Stack, Link as ChakraLink, ScaleFade } from "@chakra-ui/react";
import { Link } from 'react-router-dom'

import { FaWindowClose } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { ReactComponent as Logo } from "../assets/images/logo.svg";

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify={["space-between", "space-between", "center", "center"]}
      wrap="wrap"
      w="100%"
      mb={2}
      p={4}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.500", "primary.500"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <FaWindowClose /> : <GiHamburgerMenu />}
    </Box>
  );
};

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    setLoading(true)
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${process.env.REACT_APP_API_URL}/api/news/categories`,
        )
      ).json()
      setCategoryList(data)
      setLoading(false)
    };
    dataFetch()
  }, [])

  const getCategories = () => {
    let list = []
    let result = []

    categoryList.map(category => {
      return list.push(
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to={`/category/${category.key}`}>{category.value}</ChakraLink>
      )
    })

    for (let i = 0; i < list.length; i += 1) {
      result.push(
        <div key={i}>
          {list[i]}
        </div>
      )
    }
    return result
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <ScaleFade in={!isLoading} transition={{ enter: { duration: .5 } }}>
      <NavBarContainer {...props}>
        <ChakraLink as={Link} to="/" pr='20px'>
          <Logo />
        </ChakraLink>
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <Box
          display={{ base: isOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}>
          <Stack
            spacing={8}
            align="center"
            justify={["center", "center", "flex-end", "flex-end"]}
            direction={["column", "column", "row", "row"]}
            pt={[4, 4, 0, 0]}
            textDecoration="none">
            {getCategories()}
          </Stack>
        </Box>
      </NavBarContainer>
    </ScaleFade>
  );
};

export default NavBar;
