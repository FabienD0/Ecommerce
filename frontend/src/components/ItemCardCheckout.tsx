import { styled } from "styled-components";
import { colors } from "../assets/colors";
import { Item } from "./utils/types"

interface outOfStockProps {
  outofstock: number;
}

const ItemCardCheckout = ({product}: {product: Item}) => {

return (
    <Container className="card product-card px-3 mr-5" style={{width: "95%"}}>
      <div style={{all:"unset"}}>
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
    </div>
    </Container>
)
}

export default ItemCardCheckout

const Container = styled.div`
position: relative; 
justify-content: flex-end;
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
