import { styled } from "styled-components"
import Header from "./components/Header"
import { colors } from "./assets/colors"


function App() {

  return (
    <Container className="container-fluid p-0">
      <Header />
    </Container>
  )
}

export default App

const Container = styled.div`
min-height: 100vh;
background-color: ${colors.white};
`
