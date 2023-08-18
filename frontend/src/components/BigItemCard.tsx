import { colors } from "../assets/colors";
import { Item } from "./utils/types"


const BigItemCard = ({product}:any) => {

    // console.log(product)

    //Shorter product name
    const shortProductName = (name: string):string => {
        let displayName = "";
        name.length > 25 ? displayName = name.slice(0,25) + "..." : displayName = name;
        return displayName;
    }

    // style={{width: "65%",height: "auto"}}

return (
    <div className="card product-card px-3 mr-5" style={{width: "95%"}}>
      <img className="img-fluid mb-3 mx-auto p-4" 
        src={product.imageSrc}
        alt={product.name}
        // outOfStock={product.numInStock}
      />
    <p className="card-subtitle mb-2 text-body-secondary">{product.category}</p>
    <p className="fw-bold mb-3">{shortProductName(product.name)}</p>
    <p className="" style={{color: colors.purple}}>{product.price}</p>
    </div>
)
}

export default BigItemCard