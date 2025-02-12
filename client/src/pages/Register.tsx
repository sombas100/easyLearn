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
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/auth";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
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
        <VStack as="form" gap={4} onSubmit={handleRegister}>
          <Heading size="lg">Register</Heading>
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Register
          </Button>
          <Text>
            Already have an account?{" "}
            <Link color="blue.500" href="/login">
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Register;
