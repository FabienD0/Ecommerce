import styled from "styled-components";
import { PropsOverlay } from "./types";



const Overlay: React.FC<PropsOverlay> = ({ setIsCart }) => {

  return <Container onClick={() => setIsCart(false)}></Container>;
};

export default Overlay;

const Container = styled.button`
  all: unset;
  cursor: default !important;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: black;
  opacity: 0.4;
  z-index: 1995;
`;