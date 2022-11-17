import { useEffect, useState } from "react"
import { addImage } from "../api"
const ElementUpload = ({currentContainer}) => {

    const [imageFile, setImageFile] = useState("")
    const [titleInput, setTitle] = useState("")
    
    const handlePhoto = (e)=>{
        e.preventDefault()
        setImageFile(e.target.files[0])
        let src = URL.createObjectURL(e.target.files[0]);
        let preview = document.getElementById("preview-image")
        preview.src = src
    }
    useEffect(() => {} , [imageFile])

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

    const handleChange = (e)=>{
        setTitle(e.target.value)
    }
    

    return <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div>
        <label htmlFor="name">Image Title</label>
        <input type="text" id="name" placeholder="Name" value={titleInput} name="name" required onChange={handleChange}/>
    </div>
    <div>
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" useref={imageFile} onChange={handlePhoto}/>
    </div>
    <div>
        <input type="submit"/>
    </div>
    </form>
<p>Parent ID Name: {currentContainer.name}</p>
<p>Preview Name: {titleInput}</p>
<p>Preview Image:</p>
<img id="preview-image"></img>
</>
}

export default ElementUpload