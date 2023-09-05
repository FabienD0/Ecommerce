import { styled } from "styled-components"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import GlobalStyles from "./GlobalStyles"
import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import Footer from "./components/Footer"
import ProductDetails from "./pages/ProductDetails"
import { useState } from "react"
import Overlay from "./components/utils/Overlay"
import Cart from "./components/modals/Cart"
import Category from "./pages/Category"
import Brands from "./pages/Brands"
import BrandsCategory from "./pages/BrandsCategory"

export const URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const App = () => {

  const [isCart, setIsCart] = useState<boolean>(false);

  return (
    <BrowserRouter>
    <GlobalStyles />
    <Container className="container-fluid p-0">
    <Cart isCart={isCart} setIsCart={setIsCart} />
    {isCart && <Overlay setIsCart={setIsCart} />}
      <Header setIsCart={setIsCart} />
      <Main>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/categories/:category" element={<Category />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brand/:brandId" element={<BrandsCategory />} />
        </Routes>
      </Main>
      <Footer />
    </Container>
    </BrowserRouter>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 10rem;
`;
