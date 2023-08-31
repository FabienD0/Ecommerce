import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr"
import { useNavigate } from "react-router-dom";
import { PropsCart } from "../utils/types";

interface cartProps {
    $cart: boolean;
}

const Cart: React.FC<PropsCart> = ({ isCart, setIsCart }) => {

  const [isItemRemoved, setIsItemRemoved] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  /* Close Cart */ 
  const handleClose = () => {
    setIsCart(false);
  };

  const navigate = useNavigate();


  return (
    <Container $cart={isCart}>
      <ContainerTop>
        <H2>Shopping Cart(2)</H2>
        <button style={{ all: "unset",cursor:"pointer" }} onClick={handleClose}>
          <GrClose />
        </button>
      </ContainerTop>
        <ContainerMid>
          <Image src="/images/cartEmpty.png" />
          <H2>You cart is empty</H2>
        </ContainerMid>
      {/* {selectedProducts.length !== 0 && (
        <ContainerItemCart>
          {selectedProducts.map((item) => {
            return (
              <ItemCardCart
                key={item._id}
                product={item}
                isItemRemoved={isItemRemoved}
                setIsItemRemoved={setIsItemRemoved}
              />
            );
          })}
          <ClearAllButton disabled={isDeleteLoading} onClick={handleClear}>
            Clear
          </ClearAllButton>
        </ContainerItemCart>
      )} */}
      {/* {selectedProducts.length !== 0 && (
        <ContainerCheckout>
          <H2>Subtotal</H2>
          <ContainerCheckoutButton>
            <H2
              style={{
                color: "#4243AE",
                textShadow: "2px 4px 3px rgba(0, 0, 0, 0.2)",
              }}
            >
              {totalPrice.toFixed(2)}$
            </H2>
            <Button
              onClick={() => {
                navigate("/checkout");
                setIsCart(false);
              }}
            >
              Go to Checkout
            </Button>
          </ContainerCheckoutButton>
        </ContainerCheckout>
      )} */}
    </Container>
  );
};

export default Cart;

const Container = styled.div<cartProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 30rem;
  background-color: #fff;
  height: 100vh;
  padding: 3rem 2.5rem 1.5rem;
  right: ${(props) => (props.$cart ? "0" : "-100%")};
  top: 0px;
  transition: all 0.3s ease-in-out;
  z-index: 3999;

  @media (max-width: 800px) {
    display: none;
  }
`;

const ContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const H2 = styled.h2`
  font-size: 1.5rem;
  font-size: 700;
`;

const ContainerMid = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const ContainerItemCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  margin-top: 1rem;
  overflow: auto;
  min-height: 85%;
  padding-bottom: 1rem;
`;

const ContainerCheckout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-top: 3px dashed black;
  padding: 1rem 0;
`;

const ContainerCheckoutButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  width: 20rem;
  margin-bottom: 5rem;
`;

const Button = styled.button`
  all: unset;
  width: 12rem;
  text-align: center;
  font-weight: 700;
  border: 2px solid black;
  letter-spacing: 0.05em;

  color: black;
  padding: 0.8rem 0;
  background-color: transparent;

  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }
  &:disabled {
    opacity: 0.2;
    cursor: default;

    :hover {
      background-color: transparent;
      color: black;
    }
  }
`;
const ClearAllButton = styled.button`
  color: white;
  background-color: red;
  font-weight: 900;
  width: 7rem;
  padding: 0.3rem;
  opacity: 0.7;
  border-radius: 10px;

  :hover {
    cursor: pointer;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s;
  }
`;