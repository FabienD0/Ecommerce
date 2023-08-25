import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { getLatestItems } from "../../redux/features/itemsSlice"
import { Item } from "../utils/types"
import BigItemCard from "../BigItemCard"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { styled } from "styled-components";



const SectionTwoHomePage = () => {

    const dispatch = useAppDispatch();
    const { latestItems } = useAppSelector((store) => store.items)
  
    const [filteredProducts,setFilteredProducts] = useState<Item[]>([]);


    /* Get Latest Items */
    useEffect(() => {
    dispatch(getLatestItems());
    },[]);

    /* Put it in state */
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
  arrows: true,

  responsive: [{
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1
    }
  }
]
};

/* Loading State */
if (filteredProducts.length === 0) {
    return (  
  <div>
      <SectionTitle className="mb-3">Latest Products</SectionTitle>
      <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status"></div>
      </div>
  </div> )
}
    
    return (
        <div>
        <SectionTitle className="mb-3">Latest Products</SectionTitle>
        <ContainerItemCard className="container p-0">
      <StyledSlider {...settingsCarousel} adaptiveHeight={true}>
        {filteredProducts.map((product) => {
            return <BigItemCard key={product.id} product={product} />

        })}
    </StyledSlider>
    </ContainerItemCard>
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

const ContainerItemCard = styled.div`
@media (max-width: 600px) {
    width: 80vw !important;
    /* width: 20rem !important; */
  }
`

const StyledSlider = styled(Slider)`
.slick-prev:before{
  color: black;
}
.slick-next:before {
  color: black;
}
.slick-track {
  padding-left: 0.5rem;
  @media (max-width: 600px) {
    padding-left: 0.7rem;
  }
}
`