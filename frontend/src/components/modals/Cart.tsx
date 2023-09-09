import styled from "styled-components";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr"
import { PropsCart } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { ItemCard } from "../utils/types"
import ItemCartCard from "../ItemCartCard";
import { colors } from "../../assets/colors";
import { clearCart } from "../../redux/features/cartSlice";

interface cartProps {
    $cart: boolean;
}

const Cart: React.FC<PropsCart> = ({ isCart, setIsCart }) => {

  const [items,setItems] = useState<ItemCard[]>([]);

  const { cartItems,totalAmount, totalQuantity } = useAppSelector((store) => store.cart)
  const dispatch = useAppDispatch();

 /* Put it in state */
  useEffect(() => {
    setItems(cartItems)
  },[cartItems])

  /* Close Cart */ 
  const handleClose = () => {
    setIsCart(false);
  };


  return (
    <Container $cart={isCart}>
      <ContainerTop>
        <H2 className="fw-bold">{`Shopping Cart (${totalQuantity})`}</H2>
        <button style={{ all: "unset",cursor:"pointer" }} onClick={handleClose}>
          <GrClose />
        </button>
      </ContainerTop>
      {items.length === 0 && <ContainerMid>
          <Image src="/images/cartEmpty.png" />
          <H2>You cart is empty</H2>
        </ContainerMid>}
        {items.length > 0 && 
        <>
        <ContainerItemCart>
          {items.map((item) => {
            return <ItemCartCard key={item.id} item={item} />
          })}
        <ClearButton onClick={() => dispatch(clearCart())}>Clear</ClearButton>
        </ContainerItemCart> 
        <div className="d-flex flex-column py-2" style={{borderTop: "3px dashed black"}}>
        <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">Subtotal:</h4>
          <h4 className="fw-bold" style={{color: colors.purple,textShadow: "2px 4px 3px rgba(0, 0, 0, 0.2)"}}>{totalAmount.toFixed(2)}<span style={{fontSize:12}}>$</span></h4>
        </div>
          <CheckoutButton href="/checkout">Go to Checkout</CheckoutButton>
        </div>
        </>}
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
  padding: 2.5rem;
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

const Image = styled.img`
  width: 20rem;
  margin-bottom: 5rem;
`;

const ClearButton = styled.button`
border: none;
color: white;
font-weight: bold;
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;
background-color: #fc4646;
width: 7rem;
padding: 0.3rem;
opacity: 0.8;
transition: opacity .2s ease-in-out;

&:hover {
  box-shadow: none;
  opacity: 1 !important;
}
`

const CheckoutButton = styled.a`
  all: unset;
  width: 12rem;
  text-align: center;
  font-weight: 700;
  border: 2px solid black;
  letter-spacing: 0.05em;
  color: black;
  padding: 0.8rem 0;
  background-color: transparent;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }
`;