import { styled } from "styled-components";
import { colors } from "../assets/colors";
import { Item } from "./utils/types"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { Link } from "react-router-dom";


const BigItemCard = ({product}: {product: Item}) => {

return (
    <Container className="card product-card px-3 mr-5" style={{width: "95%"}}>
      <Link to={`product/${product.id}`} style={{all:"unset"}}>
      <img className="img-fluid mb-3 mx-auto p-4" 
        src={product.imageSrc}
        alt={product.name}
        // outOfStock={product.numInStock}
      />
    <p className="card-subtitle mb-2 text-body-secondary">{product.category}</p>
    <ItemName className="fw-bold mb-3">{product.name}</ItemName>
    <p className="" style={{color: colors.purple}}>{product.price}</p>
    </Link>
    <AddToCartButton>
      <div className="d-flex p-2">
      <p className="p-0 m-0">+</p>
      <AiOutlineShoppingCart />
      </div>

      </AddToCartButton>
    </Container>
)
}

export default BigItemCard

const Container = styled.div`
position: relative; 
&:hover {
  cursor: pointer;
  border: 1px solid ${colors.purple};
}

&:hover > button {
  opacity: 0.7;
}

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
