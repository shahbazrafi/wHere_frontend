import { useEffect, useState } from "react"
import { fetchImages } from "../api"
import Image from "./Image"

const ImageGallery = () => {

    const [images, setImages] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{

        setLoading(true)
        fetchImages().then((imageData)=>{
            setImages(imageData)
            setLoading(false)
            console.log(imageData)
        })
    }, [])

    if (isLoading) return <p>Loading.....</p>
    return <>{images.map((image, key)=>{
        return <Image key={key} image={image}/>
    })}</>

}

export default ImageGallery