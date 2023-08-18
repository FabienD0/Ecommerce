import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { getItems } from "../../redux/features/itemsSlice"
import { Item } from "../utils/types"
import BigItemCard from "../BigItemCard"

const SectionTwoHomePage = () => {

    const dispatch = useAppDispatch();
    const { items } = useAppSelector((store) => store.items)
    
    const [filteredProducts,setFilteredProducts] = useState<Item[]>([]);

    //Get All Items, then filter
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


if (filteredProducts.length === 0) {
    return <p>Loading..</p>
}

    
    return (
        <>
        <h1>Latest Products</h1>
        <div className="d-flex flex-row gap-3 card-goup">
            <BigItemCard product={filteredProducts[0]} />
            <BigItemCard product={filteredProducts[0]} />
            <BigItemCard product={filteredProducts[0]} />
            <BigItemCard product={filteredProducts[0]} />
        </div>
        </>
    )

}

export default SectionTwoHomePage