import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr"
import { useNavigate } from "react-router-dom";
import { PropsCart } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { Item } from "../utils/types"
import { getOneItem } from "../../redux/features/itemsSlice";
import ItemCartCard from "../ItemCartCard";
import { colors } from "../../assets/colors";

interface cartProps {
    $cart: boolean;
}

const Cart: React.FC<PropsCart> = ({ isCart, setIsCart }) => {

  const [isItemRemoved, setIsItemRemoved] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [item,setItem] = useState<Item>();

  const dispatch = useAppDispatch();
const { oneItem } = useAppSelector((store) => store.items)


/* Get One Items */
useEffect(() => {
  dispatch(getOneItem("6554"));
  },[]);
  
/* Put it in state */
  useEffect(() => {
    const [itemReturn] = oneItem
    setItem(itemReturn);
  },[oneItem])


  /* Close Cart */ 
  const handleClose = () => {
    setIsCart(false);
  };

  const navigate = useNavigate();


  return (
    <Container $cart={isCart}>
      <ContainerTop>
        <H2 className="fw-bold">Shopping Cart(2)</H2>
        <button style={{ all: "unset",cursor:"pointer" }} onClick={handleClose}>
          <GrClose />
        </button>
      </ContainerTop>
      {!item &&<ContainerMid>
          <Image src="/images/cartEmpty.png" />
          <H2>You cart is empty</H2>
        </ContainerMid>}
        <ContainerItemCart>
        {item && <>
          <ItemCartCard item={item} />
          <ItemCartCard item={item} />
          <ItemCartCard item={item} />
        </>
        }
        <ClearButton>Clear</ClearButton>
        </ContainerItemCart>
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