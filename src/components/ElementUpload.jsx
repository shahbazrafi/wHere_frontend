import { useState } from "react"
import { addImage } from "../api"
// const {readFileSync} = require("fs")
const ElementUpload = ({currentLevel}) => {

    const [imageFile, setImageFile] = useState("")
    const [titleInput, setTitle] = useState("")
    const handlePhoto = (e)=>{
        e.preventDefault()
        setImageFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    const handleSubmit = (e)=>{
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
                <input type="text" id="name" placeholder="Name" 
                       value={titleInput} name="name" required onChange={handleChange}/>
            </div>
    <div>
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" 
               name="image" useref={imageFile} onChange={handlePhoto}/>
    </div>
    <div>
        <input type="submit"/>
    </div>
</form>
<p>Preview:</p>
<p>Parent ID: {currentLevel.name}</p>
<p>Name: {titleInput}</p>
{imageFile ? <img src={`http://localhost:5000/uploads/${imageFile}`}></img> : null}
</>
}

export default ElementUpload