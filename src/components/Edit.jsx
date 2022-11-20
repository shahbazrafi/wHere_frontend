import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as api from "../api"
import { addImage } from "../api"

const Edit = () => {
    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [imageFile, setImageFile] = useState("")
    const [getImageFile, setGetImageFile] = useState("")
    const [titleInput, setTitle] = useState("")
    const [descInput, setDesc] = useState("")

    useEffect(() => {
        setIsLoading(true)
        api.fetchContainer(id).then(data => {
            setTitle(data.name)
            setDesc(data.description)
            setGetImageFile(data.image)
            setIsLoading(false)
        })
    }, [id])

    const handlePhoto = (e)=>{
        e.preventDefault()
        setImageFile(e.target.files[0])
        let src = URL.createObjectURL(e.target.files[0]);
        let preview = document.getElementById("preview-image")
        preview.src = src
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', imageFile)
        formData.append('name', titleInput)
        addImage(formData).then(()=>{
            console.log("Successful")
        }).catch((err)=>{
            console.log("Something went wrong", err)
        })
    }

    if (isLoading) return <p>Loading</p>

    return <>
    <Link to="/" ><p>Back</p></Link>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div>
        <label htmlFor="name">Edit title</label>
        <input type="text" id="name" placeholder="Name" value={titleInput} name="name" required onChange={(e) => {setTitle(e.target.value)}}/>
    </div>
    <div>
        <label htmlFor="desc">Edit description</label>
        <input type="text" id="desc" placeholder="Description" value={descInput} name="desc" required onChange={(e) => {setDesc(e.target.value)}}/>
    </div>
    <div>
        <label htmlFor="image">Change Image</label>
        <input type="file" id="image" name="image" useref={imageFile} onChange={handlePhoto}/>
    </div>
    <div>
        <input type="submit"/>
    </div>
    </form>

    <p><strong>Preview:</strong></p>
    <p>Parent ID: {id}</p>
    <p>Name: {titleInput}</p>
    <p>Description: {descInput}</p>
    <p>Image:</p>
    {imageFile ? null : <img src={`data:image/png;base64,${getImageFile}`}></img>}
    <img id="preview-image"></img>
    
    </>
}

export default Edit