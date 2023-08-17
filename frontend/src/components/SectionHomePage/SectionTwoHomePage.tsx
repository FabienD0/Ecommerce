import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { getItems } from "../../redux/features/itemsSlice"
import { Item } from "../utils/types"

const SectionTwoHomePage = () => {

    const dispatch = useAppDispatch();
    const { items } = useAppSelector((store) => store.items)
    
    const [filteredProducts,setFilteredProducts] = useState([]);

    //Get All Items
    useEffect(() => {
    dispatch(getItems());
    const filteredProduct = items.filter(
        (item: Item) =>
          item.id === 6544 ||
          item.id === 6552 ||
          item.id === 6582 ||
          item.id === 6627 ||
          item.id === 6551 ||
          item.id === 6727 ||
          item.id === 6841 ||
          item.id === 7000
      );
      setFilteredProducts(filteredProduct);
},[])

console.log(filteredProducts)

    
    return (
        <>
        <h1>Latest Products</h1>
        </>
    )

}

export default SectionTwoHomePage