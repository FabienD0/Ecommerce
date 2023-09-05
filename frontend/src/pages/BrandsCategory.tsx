import { useParams } from "react-router-dom"

const BrandsCategory = () => {

    const { brandsName } = useParams();
    
return (
    <>
    <h1>{brandsName}</h1>
    </>
)
}

export default BrandsCategory