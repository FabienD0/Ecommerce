import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { styled } from "styled-components"
import {useState,useEffect } from "react"
import { Item } from "../components/utils/types"

const Category = () => {

const [itemsInCategory,setItemsInCategory] = useState<Item[]>([]);
const { category } = useParams();



/* Loading */
if (itemsInCategory?.length === 1) {
    return (  
        <Container>
            <SectionTitle className="mb-5">{category}</SectionTitle>
            <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status"></div>
            </div>
        </Container> )
}

return (
    <Container>
    <SectionTitle>{category}</SectionTitle>
    </Container>
)
}

export default Category

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
`;


