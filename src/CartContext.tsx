import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "../data";

type CartContextType = {
  cartList: CartItem[];
  addToCart: (item: Product, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType>({
  cartList: [],
  addToCart: () => {},
  removeFromCart: () => {},
  totalItems: 0,
});

export function useCart() {
  return useContext(CartContext);
}

type Props = {
  children: React.ReactNode;
};

function calculateTotalItems(cartList: CartItem[]) {
  return cartList.reduce((total, item) => total + item.quantity, 0);
}

export function CartProvider({ children }: Props) {
  const [cartList, setCartList] = useState<CartItem[]>(() => {
    const storedCartList = localStorage.getItem("cart");
    return storedCartList ? JSON.parse(storedCartList) : [];
  });

  const [totalItems, setTotalItems] = useState(() => calculateTotalItems(cartList));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
    setTotalItems(calculateTotalItems(cartList));
  }, [cartList]);

  const toast = useToast();

  // // cypress-workaround
  const toastElement = document.getElementById("chakra-toast-manager-bottom");
  toastElement?.setAttribute("data-cy", "added-to-cart-toast");

  const addToCart = (item: Product, quantity: number) => {
    const existingCartItem = cartList.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingCartItem) {
      setCartList((prevCartList) =>
        prevCartList.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
      toast({
        title: "Another one has been added!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      setCartList([...cartList, { ...item, quantity: quantity }]);
      toast({
        // title: "Added to cart!",
        // cypress-testet letar efter "has been added"
        title: " *item* has been added to cart",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartList((prevCartList) => {
      const itemIndex = prevCartList.findIndex(
        (cartItem) => cartItem.id === itemId
      );
      if (itemIndex >= 0) {
        if (prevCartList[itemIndex].quantity > 1) {
          const updatedCartList = [...prevCartList];
          updatedCartList[itemIndex] = {
            ...updatedCartList[itemIndex],
            quantity: updatedCartList[itemIndex].quantity - 1,
          };
          return updatedCartList;
        } else {
          return prevCartList.filter((cartItem) => cartItem.id !== itemId);
        }
      } else {
        return prevCartList;
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartList, addToCart, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}
