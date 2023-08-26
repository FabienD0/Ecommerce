import { PropsSearchResult } from "../utils/types"
import { useEffect, useState } from 'react';

const SearchResult: React.FC<PropsSearchResult>  = ({
    searchInput,
    setSearchInput,
    isSearchResultActive,
    setIsSearchResultActive,
}) => {

const [resultItems, setResultItems] = useState([]);
const [errorMessage, setErrorMessage] = useState();
  
console.log(searchInput)

return (
    <>
     <h1>
        <p>Hello</p>
     </h1>
    </>
)
}

export default SearchResult