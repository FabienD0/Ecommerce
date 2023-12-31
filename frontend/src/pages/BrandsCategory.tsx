import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useState,useEffect } from "react"
import { Item } from "../components/utils/types";
import { getItemsByBrands } from "../redux/features/itemsSlice";
import { Container } from "react-bootstrap";
import { styled } from "styled-components";
import Companies from "../components/utils/companies.json"
import BigItemCard from "../components/BigItemCard";

const BrandsCategory = () => {

const dispatch = useAppDispatch();
const { itemsByBrands } = useAppSelector((store) => store.items)
const { brandId } = useParams();

const [itemsInCategory,setItemsInCategory] = useState<Item[]>([]);
const [currentPage,setCurrentPage] = useState<number>(1);

const itemsPerPage = 9;

/* Get Items from Category */
useEffect(() => {
    dispatch(getItemsByBrands(brandId))
    },[brandId])
    
 /* Put it In State */
useEffect(() => {
setItemsInCategory(itemsByBrands)
},[itemsByBrands])

/* Get Name from ID */
const [companyTitle] = Companies.filter(company => company._id.toString() === brandId)

/* Calculate the number of page */
const totalPages = Math.ceil(itemsInCategory.length / itemsPerPage);

/* Function to slice items based on the current page */
  const getItemsForPage = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return itemsInCategory.slice(startIndex, endIndex);
  };

/* Handle page change */
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

    /* Scroll top When Change Page */ 
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [currentPage]);

/* Loading */
if (itemsInCategory?.length === 0) {
    return (  
        <Container>
            <SectionTitle className="mb-5">{companyTitle.name}</SectionTitle>
            <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status"></div>
            </div>
        </Container> )
}
    
return (
    <Container className="pb-5">
    <SectionTitle>{companyTitle.name}</SectionTitle>
    <Container className="d-flex flex-wrap justify-content-center gap-3">
        {getItemsForPage(currentPage).map((product) => {
            return (
            <ContainerCard key={product.id} className="d-flex w-25">
            <BigItemCard key={product.id} product={product} />
            </ContainerCard>
            )
        })}
    </Container>
    <Container className="w-100 d-flex align-items-center justify-content-center my-3 gap-3">
    <div className="d-flex flex-wrap justify-content-center gap-2">
    {Array.from({length: totalPages},(_,index) => (
           <button
           key={index}
           type="button"
           className={`btn ${
             currentPage === index + 1 ? "btn-info" : "btn-outline-info"
           } text-dark fw-bold`}
           onClick={() => handlePageChange(index + 1)}
         >
           {index + 1}
         </button>
    ))}
    </div>
    </Container>
    </Container>
)
        }

export default BrandsCategory

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
