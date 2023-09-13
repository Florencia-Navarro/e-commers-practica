import { Box, Button} from "@mui/material"
import { useState } from "react"
import CardProduct from "./CardProduct"

// importar db
import { db } from "../firebaseConfig"

// importar los hooks de firebase
import { getDocs, collection } from "firebase/firestore"

function ContainCard() {

    const [allCandles, setAllCandles] = useState([])

    function getProducts(){
        /* accedo a la coleccion que quiero con el hook collection */
        const vela = collection(db, "Vela")

        /* accedo a los documentos de la collection buscada */
        getDocs(vela)
            .then((res) => {
                const candles = res.docs.map((candle) => {
                    return {
                        ...candle.data(), 
                        id: candle.id,
                    }
                } )
                setAllCandles(candles)
            })
            .catch(error => console.log(error))

    }

    return (
        <div>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}} >
                <Box sx={{display: "flex", justifyContent: "center", flexWrap: "wrap", padding: "20px"}}>
                    {
                        allCandles.map(({ collection, img, nombre, precio,descripcion, id }) => <CardProduct key={id} collection={collection} img={img} nombre={nombre} precio={precio} descripcion={descripcion}/>)
                    }
                    
                </Box>
                <Button onClick={getProducts}>Obtener producto</Button>
            </Box>
        </div>
    )
}

export default ContainCard