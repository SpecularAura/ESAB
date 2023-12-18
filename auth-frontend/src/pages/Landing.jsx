import { Button, Container, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "../context/authProvider";

const Landing = () => {
  const { user, setUser } = useContext(authContext);
  return (
    <Container centerContent>
      <VStack>
        <Text>{user.testing}</Text>
        <HStack>
          <NavLink to="/register">
            <Button>Register</Button>
          </NavLink>
          <NavLink to="/login">
            <Button>Login</Button>
          </NavLink>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Landing;
