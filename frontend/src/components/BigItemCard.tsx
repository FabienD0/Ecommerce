import { styled } from "styled-components";
import { colors } from "../assets/colors";
import { Item } from "./utils/types"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/app/hooks";
import { addItem } from "../redux/features/cartSlice"

interface outOfStockProps {
  outofstock: number;
}

const BigItemCard = ({product}: {product: Item}) => {

const dispatch = useAppDispatch();

return (
    <Container className="card product-card px-3 mr-5" style={{width: "95%"}}>
      <Link to={`/product/${product.id}`} style={{all:"unset"}}>
        <div className="d-flex">
      <Image className="img-fluid mb-3 mx-auto p-4" 
        src={product.imageSrc}
        alt={product.name}
        outofstock={product.numInStock}
      />
        </div>
      {product.numInStock === 0 && <h4 className="text-center text-danger fw-bold position-absolute top-50 start-50 translate-middle w-100">Out Of Stock</h4>}
    <p className="card-subtitle mb-2 text-body-secondary">{product.category}</p>
    <ItemName className="fw-bold mb-3">{product.name}</ItemName>
    <p className="" style={{color: colors.purple}}>{product.price}</p>
    </Link>
    {product.numInStock !== 0 && <AddToCartButton onClick={() => dispatch(addItem(product))}>
      <div className="d-flex p-2">
      <p className="p-0 m-0">+</p>
      <AiOutlineShoppingCart />
      </div>

      </AddToCartButton>}
    </Container>
)
}

export default BigItemCard

const Container = styled.div`
position: relative; 
justify-content: flex-end;
&:hover {
  cursor: pointer;
  border: 1px solid ${colors.purple};
}

&:hover > button {
  opacity: 0.7;
}
`

const Image = styled.img<outOfStockProps>`
opacity: ${(props) => (props.outofstock === 0 ? "0.5" : "1")};
`

const ItemName = styled.p`
  max-width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
transition: all 300ms;
&:hover {
  color: ${colors.purple}
}
`
const AddToCartButton = styled.button`
position: absolute;
border: none;
color: ${colors.white};
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;
font-size: 1rem;
background-color: ${colors.purple};
right: 0.75rem;
bottom: 0.75rem;
transition: opacity .2s ease-in-out;
opacity: 0;
z-index: 10;

&:hover {
  box-shadow: none;
  opacity: 1 !important;
}
`
