import React, { useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Logo } from "../../components/Logo";
import { PasswordField } from "../../components/auth/PasswordField";
import { OAuthButtonGroup } from "../../components/auth/OAuthButtonGroup";
import { useForm } from "react-hook-form";
import { authContext } from "../../context/authProvider";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { setUser } = useContext(authContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    const { username, password } = data;
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        user: username,
        pwd: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data);
      navigate(location.state || "/home");
    } else if (response.status === 401) {
      toast({
        title: "Invalid Credentials",
        description: "Username or Password is incorrect",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      toast({
        title: "Error",
        description: "An Unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
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
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
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
              Don't have an account?{" "}
              <ChakraLink as={ReactRouterLink} to="/register">
                Sign up
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
          <Stack spacing="6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    type="username"
                    autoComplete="username"
                    {...register("username")}
                  />
                </FormControl>
                <PasswordField {...register("password")} />
              </Stack>
              <HStack justify="space-between">
                <Checkbox
                  {...register("checkbox")}
                  value="rememberMe"
                  defaultChecked
                >
                  Remember me
                </Checkbox>
                <Button variant="text" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button type="submit">Sign in</Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
