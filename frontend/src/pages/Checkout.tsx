import styled from "styled-components"
import { useAppSelector } from "../redux/app/hooks";
import FormData from "../components/FormData";


const Checkout = () => {

const { cartItems } = useAppSelector((store) => store.cart)

    return (
        <Container>
        <ProductContainer>
          {cartItems.map((product) => {
            // const itemPrice = product.price.replace("$", "");
            return (
              <ItemDiv key={product.id}>
                <p>{product.name} </p>
                <img src={product.imageSrc} />
                {/* <QuantityComponent
                  itemPrice={parseInt(itemPrice)}
                  quantity={quantity[i]}
                  setQuantity={(callback) => {
                    const updatedQtys = quantity.map((qty, index) =>
                      index === i ? callback(qty) : qty
                    );
                    updateCartAndFetch(updatedQtys, product, i);
                    setQuantity(updatedQtys);
                  }}
                  numInStock={product.numInStock}
                /> */}
              </ItemDiv>
            );
          })}
        </ProductContainer>
        <FormData />
      </Container>
    )
}

export default Checkout

const Container = styled.div`
  display: flex;
  box-shadow: 2px 2px 15px lightgray;
  background-color: white;
  margin-bottom: 4rem;
  padding: 2rem;
`;

const ProductContainer = styled.div`
  width: 20rem;
  border-right: 1px solid lightgray;
  margin-left: 1rem;
  padding-right: 2rem;
  img {
    height: 5rem;
  }
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid lightgray;
`;