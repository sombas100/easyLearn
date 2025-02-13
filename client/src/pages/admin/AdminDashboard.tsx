import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import AdminSidebar from "@/components/AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Box display="flex" minH="100vh">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Dashboard Content */}
      <Box flex="1" p={6} bg="gray.100">
        <Heading size="lg" mb={4}>
          Admin Dashboard
        </Heading>
        <Text fontSize="xl" mb={4}>
          Welcome, {user?.name}!
        </Text>

        {/* Responsive Dashboard Stats */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} gap={6} mt={6}>
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            shadow="md"
            textAlign="center"
          >
            <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
              100
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Registered Users</Text>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="md"
            shadow="md"
            textAlign="center"
          >
            <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
              25
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Courses Available</Text>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="md"
            shadow="md"
            textAlign="center"
          >
            <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold">
              500
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Enrollments</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
