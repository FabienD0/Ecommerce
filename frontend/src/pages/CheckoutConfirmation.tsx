import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { URL } from "../App";
import styled from "styled-components";
import { Item } from "../components/utils/types";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { getItems } from "../redux/features/itemsSlice";
import ItemCardCheckout from "../components/ItemCardCheckout";

interface orderInfo {
    itemId: string;
    customerId: string;
    quantity: number;
    price: number;
    orderId: string;
}

const CheckoutConfirmation = () => {

const [orderInfo, setOrderInfo] = useState<orderInfo[]>([]);
const [orderItems,setOrderItems] = useState<Item[]>([]);

const { items } = useAppSelector((store) => store.items)
const dispatch = useAppDispatch();

const {orderId} = useParams();

/* Call API for Order items by ID */
useEffect(() => {
    fetch(`${URL}/getOrderById/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderInfo(data.rows);
        dispatch(getItems())
      })
      .catch((err) => console.log(err));
  }, [orderId]);
    
/* Filter items based on orderInfo */
    useEffect(() => {
    if (orderInfo.length === 0 && items.length === 0) {
      return;
    }
    const filteredItems: Item[] = [];

    for (let i=0;i<orderInfo.length;i++) {
      const filter = items.find(
        (item: Item) => item && item.id === parseInt(orderInfo[i].itemId)
      );
  
      if (filter) {
        filteredItems.push(filter);
      }
    }    
    setOrderItems(filteredItems);

  }, [items, orderInfo]);


/* Calculate total price */
const totalPrice = () => {
  let total = 0;
  orderInfo.forEach((order) => total += order.quantity * order.price)
  return (total + (total * 0.15)).toFixed(2);
}

/* Loading State */
if(orderInfo.length === 0 || orderInfo.length !== orderItems.length) {
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
    <Container className="container w-100">
      <SectionTitle>Confirmation </SectionTitle>
      <p className="fw-bold fs-2">
        Thank you for your purchase 🎉
      </p>
      <p className="fw-bold">
        Order ID:
        <span style={{ fontStyle: "italic" }}> {orderInfo[0].orderId}</span>
      </p>
      <div className="container d-flex gap-4">
        {orderItems.map((product) => {
          return <ItemCardCheckout key={product.id} product={product}/>
        })}
      </div>
      <p className="fw-bold mt-2 fs-3">Price Paid: {totalPrice()}$</p>
      <p className="fst-italic mt-2">Thank you !</p>

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
  height: 35rem;
  font-size: 1.3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
`;