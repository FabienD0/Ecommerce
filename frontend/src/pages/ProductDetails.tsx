import { Card,Container, Form } from "react-bootstrap"
import { styled } from "styled-components"
import { colors } from "../assets/colors";
import { useAppDispatch,useAppSelector } from "../redux/app/hooks";
import { useEffect, useState } from "react"
import { Item } from "../components/utils/types"
import { getOneItem } from "../redux/features/itemsSlice";
import { useParams } from "react-router-dom";

const ProductDetails = () => {

const dispatch = useAppDispatch();
const { oneItem } = useAppSelector((store) => store.items)

const [item,setItem] = useState<Item>();
const params: string | undefined = useParams().productId;

/* Fill an array for the quantity option */
const numInStock = item?.numInStock || 0;
const inStock: number[] = Array.from({ length: numInStock }, (_,index) => index);

/* Get Latest Items */
useEffect(() => {
  dispatch(getOneItem(params));
  },[]);
  
/* Put it in state */
  useEffect(() => {
    const [itemReturn] = oneItem
    setItem(itemReturn);
  },[oneItem])

console.log(item)


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
            {/* <img src="../public/images/belkin.png" alt="item" /> */}
            <img src={item.imageSrc} alt="item" />
            </Card.Body>
        </Card>
        <Card className="container" style={{backgroundColor: colors.blue}}>
          <Card.Body>
              <Card.Title className="text-muted fs-6">{item.category}, {item.body_location}</Card.Title>
            <Card.Title className="fw-bold fs-4">{item.name}</Card.Title>
            <Card.Title className="fw-bold fs-4" style={{color: colors.purple}}>{item.price}</Card.Title>
      <Form.Select aria-label="select quantity" style={{width:"5rem"}}>
        {inStock.map((number,index) => {
          return <option key={index} value={index}>{index + 1}</option>
        })}
     </Form.Select>
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