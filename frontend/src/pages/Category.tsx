import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { styled } from "styled-components"
import {useState,useEffect } from "react"
import { Item } from "../components/utils/types"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks"
import { getItemsByCategory } from "../redux/features/itemsSlice"
import BigItemCard from "../components/BigItemCard"

const Category = () => {

    
const dispatch = useAppDispatch();
const { itemsByCategory } = useAppSelector((store) => store.items )
const { category } = useParams();

const [itemsInCategory,setItemsInCategory] = useState<Item[]>([]);


/* Get Items from Category */
useEffect(() => {
dispatch(getItemsByCategory(category))
},[category])

/* Put it In State */
useEffect(() => {
setItemsInCategory(itemsByCategory)
},[itemsByCategory])

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
    <Container className="pb-5">
    <SectionTitle>{category}</SectionTitle>
    <Container className="d-flex flex-wrap justify-content-center gap-3">
        {itemsInCategory.map((product) => {
            return (
            <div className="d-flex w-25">
            <BigItemCard key={product.id} product={product} />
            </div>
            )
        })}
    </Container>
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


