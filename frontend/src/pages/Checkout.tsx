import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import FormData from "../components/FormData";
import { useState } from "react"
import { Form } from "react-bootstrap";
import { modifyQuantity, deleteItem } from "../redux/features/cartSlice"
import { MdDelete} from "react-icons/md"
import { ItemCard } from "../components/utils/types"

const Checkout = () => {

const { cartItems } = useAppSelector((store) => store.cart)


const dispatch = useAppDispatch();

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
// const totalPriceItem = (quantity:number):number | undefined => {
//     if (item){
//       const price: number = parseFloat(item.price.slice(1))
//       return parseFloat((quantity * price).toFixed(2))
//     }
//     }

//     /* Add To Cart Function */
// const addToCart = () => {
//     for(let i=0;i<quantitySelected;i++) {
//       dispatch(addItem(item))
//     }
//     }


    return (
        <Container className="d-flex" >
        <div className="overflow-auto p-3 m-0" style={{borderRight: "1px solid lightgray"}}>
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
     <p className="fw-bold" style={{all:"unset"}}>${product.price}</p>
     <DeleteIcon onClick={() => dispatch(deleteItem(product.id))} />
     </div>
     </div>
              </div>
            );
          })}
        </div>
        <FormData />
      </Container>
    )
}

export default Checkout

const Container = styled.div`
  box-shadow: 2px 2px 15px lightgray;
  background-color: white;
  margin-bottom: 4rem;
  max-height: 65vh;
`;

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