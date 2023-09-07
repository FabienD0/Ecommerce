import { Button, Col, Row, Toast } from "react-bootstrap"
import { styled } from "styled-components"
import { useState } from "react"

const ToastAlert = () => {

    const [show, setShow] = useState(false);

    return (
        <RowStyled className="d-flex justify-content-center p-0 m-0">
          <Toast onClose={() => setShow(false)} show={true} delay={3000} autohide className="border border-5">
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
      </RowStyled>
      );
}

export default ToastAlert

const RowStyled = styled(Row)`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`