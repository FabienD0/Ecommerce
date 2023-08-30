import { styled } from "styled-components";
import { PropsSearchResult } from "../utils/types"
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { Item } from "../utils/types"
import { getItemsByName } from "../../redux/features/itemsSlice";
import { Link } from "react-router-dom";

const SearchResult: React.FC<PropsSearchResult>  = ({
    searchInput,
    setSearchInput,
    isSearchResultActive,
    setIsSearchResultActive,
}) => {

const [resultItems, setResultItems] = useState<Item[]>([]);
// const [resultItems, setResultItems] = useState<any>();
const [errorMessage, setErrorMessage] = useState<string>();
  
const dispatch = useAppDispatch();
const { itemsByName,searchStatus } = useAppSelector((store) => store.items)

/* Get Items From Search Input */
useEffect(() => {
    dispatch(getItemsByName(searchInput))
    },[]);

 /* Put it in state */
  useEffect(() => {
    if (searchStatus === 404) {
      setResultItems([]);
      setErrorMessage("Product Not Found")
    } else {
      setErrorMessage("");
      setResultItems(itemsByName)
    }
  },[itemsByName])


/* Handle Click Item */
const handleClick = () => {
    setIsSearchResultActive(false);
    setResultItems([]);
    setSearchInput("");
}

  /*Return No item found if the server didn't receive anything */
  if (resultItems?.length === 0 && !errorMessage) {
    return (
      <Container>
        <DivLoading>
          <h4>Loading...</h4>
        </DivLoading>
      </Container>
    );
  }

   /* Return message if there's not product found */
   if (errorMessage && resultItems?.length === 0) {
    return (
      <Container>
        <DivLoading>
          <h4>{errorMessage}</h4>
        </DivLoading>
      </Container>
    );
  }

/* Loading State */
// if(!resultItems) {
//     return (
//     <Container>
//         <DivLoading>
//         <p>Loading...</p>
//         </DivLoading>
//     </Container>)
// }

return (
<Container>
  {resultItems.map((item) => {
    return (
      <ContainerItemSearched
        key={item.id}
        to={`/product/${item.id}`}
        onClick={handleClick}
      >
        <ItemImage src={item.imageSrc} />
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price}</ItemPrice>
      </ContainerItemSearched>
    );
  })}
</Container>
)
}

export default SearchResult

const Container = styled.div`
  position: absolute;
  width: 70%;
  min-height: 5rem;
  max-height: 25rem;
  background-color: white;
  border: 1px solid #9d9d9d;
  border-radius: 10px;
  overflow: auto;
  top: 40px;

  @media (max-width: 800px) {
    width: calc(100% + 3rem);
  }
`;

const DivLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;

const ContainerItemSearched = styled(Link)`
  all: unset;
  padding: 1rem 1rem;
  max-height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.7;
  border-bottom: 1px solid #9d9d9d;

  @media (max-width: 800px) {
    flex-direction: column;
    max-height: 20rem;
    font-size: 14px;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const ItemName = styled.p`
  width: 60%;

  @media (max-width: 800px) {
    width: 100%;
    margin: 1rem 0;
  }
`;

const ItemImage = styled.img`
  width: 5rem;
`;

const ItemPrice = styled.p`
  font-weight: 900;
`;