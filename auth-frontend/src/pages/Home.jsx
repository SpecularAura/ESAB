import React, { useContext } from "react";
import { authContext } from "../context/authProvider";
import { Text, VStack } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  const { user } = useContext(authContext);

  return (
    <VStack>
      <Text>Hello {user.username}!</Text>
      <Link as={RouterLink} to="/logout">
        Logout
      </Link>
    </VStack>
  );
}
