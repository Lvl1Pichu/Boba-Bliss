import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SystemStyleObject,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { AdminForm } from "./AdminForm";
import EditProductForm from "./EditProductForm";

export function AdminCard() {
  const location = useLocation();

  const editPage = location.pathname.includes("/product");
  const addPage = location.pathname.includes("/new");

  return (
    <Card sx={cartStyle}>
      <Flex sx={flexStyle}>
        <CardHeader p="5px">
          {editPage && !addPage && <Heading size="md">Edit Product</Heading>}
          {addPage && <Heading size="md">Add Product</Heading>}
        </CardHeader>
        <CardBody width="100%" p="0">
          {!addPage && !editPage && (
            <Link to="/admin/product/new">
              <Button data-cy="admin-add-product">Add product!</Button>
            </Link>
          )}
          <CardBody width="100%" p="0">
            {editPage && !addPage && <EditProductForm />}
            {addPage && <AdminForm />}
          </CardBody>
        </CardBody>
        <CardFooter sx={cardFooterStyle}></CardFooter>
      </Flex>
    </Card>
  );
}

const cartStyle: SystemStyleObject = {
  marginTop: "var(--chakra-space-1)",
  bg: "#FFF9F4",
  border: "1px solid rgb(0,0,0, 0.2)",
  borderRadius: "0.625rem",
  padding: "1rem",
  position: "relative",
};

const flexStyle: SystemStyleObject = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "1.25rem",
  textAlign: "center",
};

const cartItemStyle: SystemStyleObject = {
  alignItems: "center",
  my: "0.625rem",
};

const incrementButtonStyle: SystemStyleObject = {
  bg: "pinkCardButton",
  marginStart: "0!important",
  marginEnd: "0!important",
};

const quantityStyle: SystemStyleObject = {
  m: "0",
  w: "1.375rem",
  textAlign: "center",
  marginStart: "0!important",
};

const orderButtonStyle: SystemStyleObject = {
  width: "100%",
  bg: "lightGreenButton",
  color: "black",
};

const cardFooterStyle: SystemStyleObject = {
  width: "100%",
  display: "block",
  p: "0",
};
