import { Card,Button,Container } from "react-bootstrap"
import { styled } from "styled-components"
import { colors } from "../assets/colors";

const ProductDetails = () => {
return (
    <StyledContainer className="d-flex flex-row p-0 m-0">
        <Card className="container">
            <Card.Body className="d-flex align-items-center justify-content-center">
            <img src="../public/images/belkin.png" alt="item" />
            </Card.Body>
        </Card>
        <Card className="container" style={{backgroundColor: colors.blue}}>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
            <footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </footer>
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