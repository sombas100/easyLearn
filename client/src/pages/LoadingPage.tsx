import { Spinner } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <div>
      <strong>Loading... Please wait</strong>
      <Spinner size="xl" />
    </div>
  );
};

export default LoadingPage;
