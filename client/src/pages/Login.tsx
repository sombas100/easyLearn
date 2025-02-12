import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Heading,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);

      dispatch(login({ user: data.user, token: data.token }));
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.100"
    >
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" w="400px">
        <VStack as="form" gap={4} onSubmit={handleLogin}>
          <Heading size="lg">Login</Heading>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit" colorScheme="blue" w="full">
            Login
          </Button>
          <Text>
            Don't have an account?{" "}
            <Link color="blue.500" href="/register">
              Register
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
