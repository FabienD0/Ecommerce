import { styled } from "styled-components"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import GlobalStyles from "./GlobalStyles"
import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import Footer from "./components/Footer"
import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { addItem, getItems } from "./redux/features/itemsSlice"


function App() {

  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(addItem());
  // },[])

  useEffect(() => {
    dispatch(getItems());
}, []);


  return (
    <BrowserRouter>
    <GlobalStyles />
    <Container className="container-fluid p-0">
      <Header />
      <Main>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
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
