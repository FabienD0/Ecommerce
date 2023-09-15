import styled from "styled-components";
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/features/cartSlice";
import { URL } from "../App"

const FormData = () => {

    const {cartItems, totalAmount} = useAppSelector((store) => store.cart)
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        address: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cart: cartItems,
      });
      const [errorMessage, setErrorMessage] = useState<string>("");

      /* Handle When write on the Form */
      const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      /* Update formData of cart when cartItems change */
      useEffect(() => {
        setFormData({...formData, cart: cartItems});
      },[cartItems])

      /* Handle Place Order */
      const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formData.expiry.length > 4) {
          setErrorMessage("Expiry date is 4 Numbers (0825)")
        } else {
          if(cartItems.length !== 0) {
            fetch(`${URL}/checkout`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === 200) {
                  navigate(`/order/${data.orderId}`);
                  dispatch(clearCart());
                  setErrorMessage("");
                } else {
                  setErrorMessage(data.message);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setErrorMessage("Your Cart is Empty")
          }
        }
      }
      
    return (
        <StyledForm className="d-flex flex-column gap-3 rounded p-3 w-50" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <label htmlFor={"fname"}>First Name:</label>
            <StyledInput
              type={"text"}
              name={"fname"}
              id={"fname"}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor={"lname"}>Last Name:</label>
            <StyledInput
              type={"text"}
              name={"lname"}
              id={"lname"}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor={"address"}>Address:</label>
            <StyledInput
              type={"address"}
              name={"address"}
              id={"address"}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            
            <label htmlFor={"email"}>E-mail:</label>
            <StyledInput
              type={"email"}
              name={"email"}
              id={"email"}
              onChange={handleChange}
              required
            />

          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor={"cardNumber"}>Card Number:</label>
            <StyledInput
              type={"number"}
              placeholder={"0000000000000000"}
              name={"cardNumber"}
              id={"cardNumber"}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor={"expiry"}>Expiry:</label>
            <StyledInput
              type={"number"}
              placeholder={"MMYY"}
              name={"expiry"}
              id={"expiry"}
              onChange={handleChange}
              required
            />
          </div>
          <ContainerError>{<p>{errorMessage}</p>}</ContainerError>
          <ContainerPrice className="d-flex justify-content-end flex-column h-100">
            <div className="d-flex justify-content-between fs-5">
              <p className="opacity-50">Subtotal:</p>
              <p className="fw-bold">${totalAmount.toFixed(2)}</p>
            </div>
            <div className="d-flex justify-content-between fs-5" style={{all:"unset"}}>
              <p className="opacity-50">Taxes:</p>
              <p className="fw-bold">
                ${(totalAmount * 0.05 + totalAmount * 0.09975).toFixed(2)}
              </p>
            </div>
            <div className="d-flex justify-content-between fs-5 pt-3">
              <p className="opacity-50">Total Amount:</p>
              <p className="fw-bold">
                $
                {(totalAmount + (totalAmount * 0.05 + totalAmount * 0.09975)).toFixed(
                  2
                )}
              </p>
            </div>
          </ContainerPrice>
          <StyledSubmit disabled={cartItems.length === 0} type="submit">Place Order</StyledSubmit>
        </StyledForm>
      );

}

export default FormData

const StyledForm = styled.form`
  @media (max-width: 766px) {
    width: 100% !important;
  }
`

const StyledInput = styled.input`
  width: 70%;
  border-radius: 3px;
  border: none;
  box-shadow: 0.5px 0.5px 6px lightgray;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 5px;
  font-size: 16px;
`;

const ContainerError = styled.div`
  text-align: center;
  color: #ff7070;
`;

const ContainerPrice = styled.div`
  & div:nth-child(2) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.6) !important;
  }
`;

const StyledSubmit = styled.button`
  border: 2px solid transparent;
  background: #a1b1f7;
  color: black;
  font-size: 18px;
  border-radius: 3px;
  padding: 12px 7px;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 2px solid #a1b1f7;
    background-color: white;
    cursor: pointer;
    letter-spacing: 0.2rem;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;