import { Box, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import AdminSidebar from "@/components/AdminSidebar";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStats } from "@/redux/slices/statsSlice";

const AdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.stats
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error)
    return <Text color="red.500">Failed to retrieve stats: {error}</Text>;

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
              {stats?.users || "0"}
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
              {stats?.courses || "0"}
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
              {stats?.enrollments || "0"}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Enrollments</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
