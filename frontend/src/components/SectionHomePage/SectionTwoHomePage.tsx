import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { getItems } from "../../redux/features/itemsSlice"
import { Item } from "../utils/types"
import BigItemCard from "../BigItemCard"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { styled } from "styled-components"

const SectionTwoHomePage = () => {

    const dispatch = useAppDispatch();
    const { items } = useAppSelector((store) => store.items)
    
    const [filteredProducts,setFilteredProducts] = useState<Item[]>([]);

    //Get All Items
    useEffect(() => {
    dispatch(getItems());
    },[]);

    //Filter Items for Latest
    useEffect(() => {
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
},[items])

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />

  responsive: [{
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1
    }
  },
]
};


//Loading State
if (filteredProducts.length === 0) {
    return <p>Loading..</p>
}
    
    return (
        <div>
        <h1 className="mb-3">Latest Products</h1>
        <div className="container p-0">
        {/* <Carousel variant="dark" interval={null}>
      <Carousel.Item>
      <div className="d-flex flex-row gap-3 card-goup">
      <BigItemCard product={filteredProducts[0]} />
            <BigItemCard product={filteredProducts[1]} />
            <BigItemCard product={filteredProducts[2]} />
            <BigItemCard product={filteredProducts[3]} />
            <BigItemCard product={filteredProducts[4]} />
            </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex flex-row gap-3 card-goup">
      <BigItemCard product={filteredProducts[5]} />
            <BigItemCard product={filteredProducts[6]} />
            <BigItemCard product={filteredProducts[7]} />
            <BigItemCard product={filteredProducts[7]} />
            <BigItemCard product={filteredProducts[7]} />
            </div>
      </Carousel.Item>
    </Carousel> */}
      <Slider {...settings} adaptiveHeight={true} className="">
        {filteredProducts.map((product) => {
            return <BigItemCard key={product.id} product={product} />

        })}
    </Slider>
    </div>
        </div>
    )

}

export default SectionTwoHomePage