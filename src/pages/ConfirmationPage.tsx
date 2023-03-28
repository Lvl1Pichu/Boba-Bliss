import {
  Button,
  Container,
  Flex,
  Link as ChakraLink,
  SystemStyleObject
} from "@chakra-ui/react";
import { OrderConfirmationCard } from "../components/OrderConfirmationCard";

export function ConfirmationPage() {
  const getContactDetails = localStorage.getItem("contactDetails");
  const contactDetails = getContactDetails
    ? JSON.parse(getContactDetails)
    : null;
  return (
    <Container sx={checkoutContainer} maxW="container.md">
      <OrderConfirmationCard />
      <Flex sx={informationContainer}>
        <div>
          {contactDetails ? (
            <div>
              <p>
                Name: {contactDetails.name}
              </p>
              <p>Email: {contactDetails.email}</p>
              <p>Phone: {contactDetails.phone}</p>
              <p>
                Address: {contactDetails.street}, {contactDetails.zipCode},{" "}
                {contactDetails.city}
              </p>
            </div>
          ) : (
            <p>No stored values found.</p>
          )}
        </div>
      </Flex>
      <Flex>
        <ChakraLink
          sx={buttonWrapper}
          href="/"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            loadingText="Submitting"
            sx={submitButtonStyle}
            type="submit"
            variant="outline"
            colorScheme="teal"
          >
            Place another order
          </Button>
        </ChakraLink>
      </Flex>
    </Container>
  );
}

const checkoutContainer: SystemStyleObject = {
  my: "2rem",
  borderRadius: "0.625rem",
  py: "1rem",
  bg: "lightYellow",
};

const submitButtonStyle: SystemStyleObject = {
  marginTop: "2rem",
  marginBottom: "1rem",
  width: "14rem",
  height: "4rem",
  mx: "auto",
  bg: "lightGreenButton",
  color: "black",
  border: "none",
};

const informationContainer: SystemStyleObject = {
  marginTop: "2rem",
  padding: "2rem",
  borderRadius: "5px",
  background: "#fee5bd",
  color: "lightBrownText",
};

const buttonWrapper: SystemStyleObject = {
  mx: "auto",
};
