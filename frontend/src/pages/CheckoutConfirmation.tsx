import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { URL } from "../App";
import styled from "styled-components";

interface orderInfo {
    itemId: string;
    customerId: string;
    quantity: number;
    price: number;
    orderId: string;
}

const CheckoutConfirmation = () => {

const [orderInfo, setOrderInfo] = useState<orderInfo[]>([]);

const {orderId} = useParams();

console.log(orderInfo);

/* Call API for Order items by ID */
useEffect(() => {
    fetch(`${URL}/getOrderById/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderInfo(data.rows);
      })
      .catch((err) => console.log(err));
  }, [orderId]);


/* Loading State */
if(orderInfo.length === 0) {
    return (
        <div>
        <SectionTitle className="mb-3">Latest Products</SectionTitle>
        <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
        </div>
    </div>
    )
}
return (
    <Container>
      <SectionTitle>Confirmation </SectionTitle>
      <p>
        Thank you for your purchase{" "}
        <span style={{ fontStyle: "italic" }}>{orderInfo[0].itemId}</span>
      </p>
      <p>
        We will ship the order to:{" "}
        <span style={{ fontStyle: "italic" }}>{orderInfo[0].customerId}</span>
      </p>
      <p>
        Order ID:
        <span style={{ fontStyle: "italic" }}>{orderInfo[0].quantity}</span>
      </p>
    </Container>
)
}

export default CheckoutConfirmation

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  height: 25rem;
  font-size: 1.3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
`;