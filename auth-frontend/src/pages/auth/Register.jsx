import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "../../components/auth/OAuthButtonGroup";
import { Link as ReactRouterLink } from "react-router-dom";
import { useValidation } from "../../components/auth/validationHelper";

const Register = () => {
  const {
    handleSubmit,
    setValue,
    errors,
    registerName,
    registerUsername,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
  } = useValidation();
  const toast = useToast();
  const onSubmit = async (values) => {
    console.log(values);
    const { username: user, password: pwd, name, email } = values;
    try {
      const response = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({
          user,
          pwd,
          name,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast({
          title: "Successfully Created User",
          description: "User already exists",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        if (response.status === 409) {
          toast({
            title: "There was an error",
            description: "User already exists",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    } catch (error) {}
    const data = await response.json();
  };

  useEffect(() => {
    console.log(errors);
  });
  return (
    <Container
      maxW="lg"
      pt={{
        base: "4",
        md: "8",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="2">
        <Stack spacing="6">
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: "xs",
                md: "sm",
              }}
            >
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Already Signed Up?{" "}
              <ChakraLink as={ReactRouterLink} to="/login">
                Login
              </ChakraLink>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "bg.surface",
          }}
          boxShadow={{
            base: "none",
            sm: "md",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...registerName}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input id="username" type="text" {...registerUsername} />
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...registerEmail}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...registerPassword}
                    onChange={(e) => setValue("password", e.target.value)}
                  />
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword}>
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FormLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...registerConfirmPassword}
                  />
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack spacing="6">
                <Button type="submit">Register</Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
