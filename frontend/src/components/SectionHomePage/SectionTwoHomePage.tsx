import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { getItems } from "../../redux/features/itemsSlice"
import { Item } from "../utils/types"
import BigItemCard from "../BigItemCard"
import { Carousel } from "react-bootstrap"

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
        <div>
        <h1 className="mb-3">Latest Products</h1>
        <div className="tns-carousel tns-controls-static tns-controls-outside tns-nav-enabled pt-2">
        <div className="d-flex flex-row gap-3 card-goup tns-outer">
            <BigItemCard product={filteredProducts[0]} />
            <BigItemCard product={filteredProducts[1]} />
            <BigItemCard product={filteredProducts[2]} />
            <BigItemCard product={filteredProducts[3]} />
        </div>
        </div>
        <Carousel>
      <Carousel.Item>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"  />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
    )

}

export default SectionTwoHomePage