import React from "react";
import { Box, Flex, Stack, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from "../assets/images/logo.svg";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <ChakraLink as={Link} to="/" pr='20px'>
        <Logo />
      </ChakraLink>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

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

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "center", "flex-end", "flex-end"]}
        direction={["column", "column", "row", "row"]}
        pt={[4, 4, 0, 0]}
        textDecoration="none"

      >
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/world">World</ChakraLink>
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/technology">Technology</ChakraLink>
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/business">Business</ChakraLink>
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/politics">Politics</ChakraLink>
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/opinion">Opinion</ChakraLink>
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/science">Science</ChakraLink>
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/health">Health</ChakraLink>
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/style">Style</ChakraLink>
        <ChakraLink as={Link} _hover={{ textDecoration: "none" }} to="/category/travel">Travel</ChakraLink>
      </Stack>
    </Box>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

export default NavBar;