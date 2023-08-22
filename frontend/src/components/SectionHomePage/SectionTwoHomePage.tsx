import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { getLatestItems } from "../../redux/features/itemsSlice"
import { Item } from "../utils/types"
import BigItemCard from "../BigItemCard"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { styled } from "styled-components"

const SectionTwoHomePage = () => {

    const dispatch = useAppDispatch();
    const { latestItems } = useAppSelector((store) => store.items)
    
    const [filteredProducts,setFilteredProducts] = useState<Item[]>([]);

    //Get All Items
    useEffect(() => {
    dispatch(getLatestItems());
    },[]);

    //Filter Items on state
    useEffect(() => {
      setFilteredProducts(latestItems);
},[latestItems])

//Setting for the Carousel
const settingsCarousel = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  arrows: false,
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
        <SectionTitle className="mb-3">Latest Products</SectionTitle>
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
      <Slider {...settingsCarousel} adaptiveHeight={true} className="">
        {filteredProducts.map((product) => {
            return <BigItemCard key={product.id} product={product} />

        })}
    </Slider>
    </div>
        </div>
    )

}

export default SectionTwoHomePage

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e3659;
  letter-spacing: 0.05em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;