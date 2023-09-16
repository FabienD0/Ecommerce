import { Container } from "react-bootstrap"
import { styled } from "styled-components"
import {useState,useEffect } from "react"
import { Item } from "../components/utils/types"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks"
import { getItems } from "../redux/features/itemsSlice"
import BigItemCard from "../components/BigItemCard"

const AllProducts = () => {

    
const dispatch = useAppDispatch();
const { items } = useAppSelector((store) => store.items )

const [allItems,setAllItems] = useState<Item[]>([]);

/* Get Items from Category */
useEffect(() => {
dispatch(getItems())
},[])

/* Put it In State */
useEffect(() => {
setAllItems(items)
},[items])

/* Loading */
if (allItems?.length === 0) {
    return (  
        <Container>
            <SectionTitle className="mb-5">All Products</SectionTitle>
            <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status"></div>
            </div>
        </Container> )
}

return (
    <Container className="pb-5">
    <SectionTitle>All Products</SectionTitle>
    <Container className="d-flex flex-wrap justify-content-center">
        {allItems.map((product) => {
            return (
            <ContainerCard key={product.id} className="d-flex w-25 my-2">
            <BigItemCard key={product.id} product={product} />
            </ContainerCard>
            )
        })}
    </Container>
    </Container>
)
}

export default AllProducts

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
`;
const ContainerCard = styled.div`

@media (max-width: 767px) {
    width: 40% !important;
}

@media (max-width: 475px) {
    width: 100% !important;
}
`

