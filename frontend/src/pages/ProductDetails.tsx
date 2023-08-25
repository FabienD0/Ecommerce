import { Card,Button,Container } from "react-bootstrap"
import { styled } from "styled-components"
import { colors } from "../assets/colors";
import { useAppDispatch,useAppSelector } from "../redux/app/hooks";
import { useEffect, useState } from "react"
import { Item } from "../components/utils/types"
import { getOneItem } from "../redux/features/itemsSlice";


const ProductDetails = () => {

const dispatch = useAppDispatch();
const { oneItem } = useAppSelector((store) => store.items)

const [item,setItem] = useState<Item>();

    /* Get Latest Items */
    useEffect(() => {
      dispatch(getOneItem());
      },[]);
  
      /* Put it in state */
      useEffect(() => {
        const [itemReturn] = oneItem
        setItem(itemReturn);
  },[oneItem])



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
            <img src="../public/images/belkin.png" alt="item" />
            </Card.Body>
        </Card>
        <Card className="container" style={{backgroundColor: colors.blue}}>
          <Card.Body>
            <Card.Title className="fw-bold">{item.name}</Card.Title>
              <small className="text-muted">{item.category}</small>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
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