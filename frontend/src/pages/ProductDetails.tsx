import { Card,Container, Form } from "react-bootstrap"
import { styled } from "styled-components"
import { colors } from "../assets/colors";
import { useAppDispatch,useAppSelector } from "../redux/app/hooks";
import { useEffect, useState } from "react"
import { Item } from "../components/utils/types"
import { getOneItem } from "../redux/features/itemsSlice";
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineCheckCircle } from "react-icons/ai"
import { addItem } from "../redux/features/cartSlice";

const ProductDetails = () => {

const dispatch = useAppDispatch();
const { oneItem } = useAppSelector((store) => store.items)
const { cartItems } = useAppSelector((store) => store.cart)


const [item,setItem] = useState<Item>();
const [quantitySelected,setQuantitySelected] = useState<number>(1);

const params: string | undefined = useParams().productId;

/* Fill an array for the quantity option */
const numInStock = item?.numInStock || 0;
const inStock: number[] = Array.from({ length: numInStock }, (_,index) => index);

const [existingItem] = cartItems.filter((itemCart) => itemCart.id === item?.id)

/* Get One Items */
useEffect(() => {
  dispatch(getOneItem(params));
  },[params]);
  
/* Put it in state */
  useEffect(() => {
    const [itemReturn] = oneItem
    setItem(itemReturn);
  },[oneItem])


/* Update Price */
const totalPrice = (quantity:number):number | undefined => {
if (item){
  const price: number = parseFloat(item.price.slice(1))
  return parseFloat((quantity * price).toFixed(2))
}
}

/* Add To Cart Function */
const addToCart = () => {
for(let i=0;i<quantitySelected;i++) {
  dispatch(addItem(item))
}
}

/* Loading State */
if (!item) {
  return (  
<div>
    <div className="d-flex justify-content-center align-items-center">
    <div className="spinner-border" role="status"></div>
    </div>
</div> )
}

return (
    <StyledContainer className="d-flex flex-row p-0 m-0">
        <Card className="container">
            <Card.Body className="d-flex align-items-center justify-content-center">
            <StyledImage src={item.imageSrc} alt="item" />
            </Card.Body>
        </Card>
        <Card className="container" style={{backgroundColor: colors.blue}}>
          <Card.Body>
              <Card.Title className="text-muted fs-6">{item.category}, {item.body_location}</Card.Title>
            <Card.Title className="fw-bold fs-4">{item.name}</Card.Title>
            <Card.Title className="fw-bold fs-4" style={{color: colors.purple}}>${totalPrice(quantitySelected)}</Card.Title>
            <div className="d-flex gap-3">
      <Form.Select aria-label="select quantity" disabled={item.numInStock === 0 || existingItem?.quantity === item.numInStock} style={{width:"5rem"}} onChange={(e) => setQuantitySelected(parseInt(e.target.value)+1)}>
        {item.numInStock === 0 && <option>-</option>}
        {inStock.map((number,index) => {
          return <option key={index} value={index}>{index + 1}</option>
        })}
     </Form.Select>
     <AddToCartButton className="w-auto" disabled={item.numInStock === 0 || existingItem?.quantity === item.numInStock} onClick={() => addToCart()}>
      <div className="d-flex p-2 justify-content-center gap-2 fw-bold">
      <AiOutlineShoppingCart />
      <p className="p-0 m-0">Add to Cart</p>
      </div>

      </AddToCartButton>
      </div>
      <div className="d-flex flex-column gap-2 fs-6 mt-4" style={{color:colors.purple}}>
        {item.numInStock === 0 && <p className="text-danger fw-bold" style={{color:"black"}}>Out of Stock</p>}
        <div className="d-flex gap-2">
        <AiOutlineCheckCircle />
        <p className="p-0 m-0 text-muted" style={{color:"black"}}>Unique Quality</p>
        </div>
        <div className="d-flex gap-2">
        <AiOutlineCheckCircle />
        <p className="p-0 m-0 text-muted">One Year Warranty</p>
        </div>
        <div className="d-flex gap-2">
        <AiOutlineCheckCircle />
        <p className="p-0 m-0 text-muted">Fast Shipping</p>
        </div>
        <div className="d-flex gap-2">
        <AiOutlineCheckCircle />
        <p className="p-0 m-0 text-muted">Brand New</p>
        </div>
      </div>
          </Card.Body>
        </Card>
    </StyledContainer>
  );
}

export default ProductDetails

const StyledContainer = styled(Container)`
  height: 22rem;
  width: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  @media (max-width: 864px) {
    flex-direction: column !important;

  }
`
const AddToCartButton = styled.button`
border: none;
color: ${colors.white};
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;
font-size: 1rem;
background-color: ${colors.purple};
transition: opacity .2s ease-in-out;
opacity: 0.7;
z-index: 10;

&:hover {
  box-shadow: none;
  opacity: 1 !important;
}

&:disabled {
  opacity: 0.3;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;  
    opacity: 0.3 !important;
  }
}
`

const StyledImage = styled.img`
  transition: all 0.3s;
  &:hover {
    transition: all 0.3s;
    transform: scale(1.1) rotate(5deg);
  }
`