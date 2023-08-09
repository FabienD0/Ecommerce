import { styled } from "styled-components"
import SectionOneHomePage from "../components/SectionHomePage/SectionOneHomePage"

const Homepage = () => {
 return (
    <ContainerAll>
    <SectionOneHomePage />
    </ContainerAll>
 )
}

export default Homepage

const ContainerAll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10rem;
  width: 80rem;
`;