const Image = ({image})=>{



    return <><img className="image" src={`data:image/png;base64,${image.img}`}/><h3>{image.name}</h3></>
}

export default Image