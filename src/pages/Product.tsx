import { Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { products } from "../../data";
import { useCart } from "../CartContext";
import { BigProductCard } from "../components/BigProductCard";

export function ProductPage() {
  const { addToCart } = useCart();
  const params = useParams();
  console.log(params.id);

const product = products.find((p) => p.id === params.id);


  if (!product) {
    return <p>Produkten hittades inte...</p>;
  }

  return (
    <Container maxWidth="container.xl" my=".3rem">
      <BigProductCard
        product={product}
        backgroundAlt="boba"
        backgroundUrl="/images/fancyBackground.png"
      />
    </Container>
  );
}
