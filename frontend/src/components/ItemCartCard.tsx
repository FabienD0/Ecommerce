import { Item } from "./utils/types"

interface itemProps {
item: Item
}

const ItemCartCard: React.FC<itemProps> = ({item}) => {
 return (
    <>
    <h1>{item.name}</h1>
    </>
 )
}

export default ItemCartCard