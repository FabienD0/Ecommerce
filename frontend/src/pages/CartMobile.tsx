import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { Form } from "react-bootstrap";
import { modifyQuantity, deleteItem } from "../redux/features/cartSlice"
import { MdDelete} from "react-icons/md"
import { ItemCard } from "../components/utils/types"
import { colors } from "../assets/colors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CartMobile = () => {

const { cartItems,totalAmount } = useAppSelector((store) => store.cart)


const dispatch = useAppDispatch();

const navigate = useNavigate();

/* Update Product Item Quantity */
const updateItemQuantity = (product: ItemCard, quantity:number) => {
     const payload = {
        product: product,
        quantity: quantity
     }
     for(let i=0;i<quantity;i++) {
      dispatch(modifyQuantity(payload))
    }
}

/* If cart NULL return homepage */
useEffect(() => {
  if(cartItems.length === 0){
    navigate("/")
  }
  },[cartItems])


    return (
        <div className="container">
        <SectionTitle className="text-center p-0 m-0 mb-2">Cart</SectionTitle>
        <Container className="d-flex container" >
        <ContainerItem className="overflow-auto p-3 m-0 w-100">
          {cartItems.map((product) => {
    const inStock: number[] = Array.from({ length: product.numInStock }, (_,index) => index);
            return (
              <div key={product.id} className="d-flex flex-column align-items-center gap-3 pb-3" style={{borderBottom: "1px solid lightgray"}} >
                <p className="m-0 p-0 pt-3">{product.name}</p>
                <img src={product.imageSrc} className="m-0 p-0 w-25"/>
                <div className="d-flex justify-content-around w-100 align-items-center">
                <p className="opacity-50" style={{all:"unset"}}>Quantity</p>
                <Form.Select aria-label="select quantity" value={product.quantity - 1} style={{width:"5rem"}} onChange={(e) => updateItemQuantity(product,(parseInt(e.target.value) + 1))}>
        {inStock.map((_,index) => {
          return <option key={index} value={index}>{index + 1}</option>
        })}
     </Form.Select>
     <div className="d-flex jusity-content-center align-items-center gap-1">
     <p className="fw-bold" style={{all:"unset"}}>${(product.price * product.quantity).toFixed(2)}</p>
     <DeleteIcon onClick={() => dispatch(deleteItem(product.id))} />
     </div>
     </div>
              </div>
            );
          })}
        </ContainerItem>
      </Container>
      <div className="d-flex align-items-center justify-content-center mt-4 flex-column">
      <div className="d-flex justify-content-between align-items-center gap-2">
        <h4 className="fw-bold">Subtotal:</h4>
          <h4 className="fw-bold" style={{color: colors.purple,textShadow: "2px 4px 3px rgba(0, 0, 0, 0.2)"}}>{totalAmount.toFixed(2)}<span style={{fontSize:12}}>$</span></h4>
        </div>
      <CheckoutButton href="/checkout">Go to Checkout</CheckoutButton>
      </div>
      </div>
    )
}

export default CartMobile

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;


const Container = styled.div`
  box-shadow: 2px 2px 15px lightgray;
  background-color: white;
  max-height: 55vh;
`;

const ContainerItem = styled.div`
border-right: "1px solid lightgray";
`


const DeleteIcon = styled(MdDelete)`
  font-size: 1.3rem;
  opacity: 0.6;

  &:hover {
    cursor: pointer;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s;
  }
`

const CheckoutButton = styled.a`
  all: unset;
  text-align: center;
  font-weight: 700;
  border: 2px solid black;
  letter-spacing: 0.05em;
  color: white;
  background-color: black;
  padding: 0.8rem 0;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
    background-color: transparent;
    color: black;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
  }
`