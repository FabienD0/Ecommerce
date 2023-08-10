import { styled } from "styled-components"
import SectionOneHomePage from "../components/SectionHomePage/SectionOneHomePage"
import SectionTwoHomePage from "../components/SectionHomePage/SectionTwoHomePage"
import SectionThreeHomePage from "../components/SectionHomePage/SectionThreeHomePage"
import SectionFourHomePage from "../components/SectionHomePage/SectionFourHomePage"
import SectionFiveHomePage from "../components/SectionHomePage/SectionFiveHomePage"

const Homepage = () => {
 return (
    <ContainerAll>
    <SectionOneHomePage />
    <SectionTwoHomePage />
    <SectionThreeHomePage />
    <SectionFourHomePage />
    <SectionFiveHomePage />
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