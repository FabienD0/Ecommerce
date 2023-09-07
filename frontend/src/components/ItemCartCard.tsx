import { ItemCard } from "./utils/types"
import { styled } from "styled-components"
import { MdDelete} from "react-icons/md"
import { useAppDispatch } from "../redux/app/hooks"
import { removeItem, deleteItem } from "../redux/features/cartSlice"

interface itemProps {
item: ItemCard
}



const ItemCartCard: React.FC<itemProps> = ({item}) => {

const dispatch = useAppDispatch();

 return (
    <StyledContainer className="container d-flex">
    <div className="m-0 p-0 position-relative">
        <img src={item.imageSrc} alt="Item Image" style={{height:"2.5rem"}}/>
        <ContainerQuantity>
            <p>x{item.quantity}</p>
        </ContainerQuantity>
    </div>
    <div>
        <p>{item.name}</p>
    </div>
    <div>
        <p className="fw-bold p-1">{parseFloat(item.totalPrice.toFixed(2))}<span style={{fontSize:12}}>$</span></p>
    </div>
    <DeleteIcon onClick={() => dispatch(deleteItem(item.id))} />
    </StyledContainer>
 )
}

export default ItemCartCard

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background-color: white;
  height: 8rem;
  width: 90%;
  padding: 2rem 1rem;
  text-decoration: none;
  color: black;

  text-align: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`

const ContainerQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -30px;
  font-weight: 900;
  border-radius: 50%;
  font-size: 12px;
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.7;
`;

const DeleteIcon = styled(MdDelete)`
  position: absolute;
  font-size: 1.3rem;
  bottom: 5px;
  right: 10px;
  opacity: 0.6;

  &:hover {
    cursor: pointer;
    opacity: 1;
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s;
  }
`