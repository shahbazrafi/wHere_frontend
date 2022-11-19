import { useEffect, useState } from "react"
import { addImage } from "../api"
import { Link } from 'react-router-dom';

const ElementUpload = ({currentContainer}) => {

    const [imageFile, setImageFile] = useState("")
    const [titleInput, setTitle] = useState("")
    const [descInput, setDesc] = useState("")
    const [typeInput, setType] = useState("Container")

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

    const handleChange2 = (e)=>{
        setType(e.target.value)
    }
    
    const handleChange3 = (e)=>{
        setDesc(e.target.value)
    }

    return <>
    <Link to="/" ><p>Back</p></Link>
    <h1>Add {typeInput}</h1>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" required onChange={handleChange2}>
            <option value="Container">Container</option>
            <option value="Item">Item</option>
        </select>
    </div>
    <div>
        <label htmlFor="name">{typeInput} title</label>
        <input type="text" id="name" placeholder="Name" value={titleInput} name="name" required onChange={handleChange}/>
    </div>
    <div>
        <label htmlFor="desc">{typeInput} description</label>
        <input type="text" id="desc" placeholder="Description" value={descInput} name="desc" required onChange={handleChange3}/>
    </div>
    <div>
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" useref={imageFile} onChange={handlePhoto}/>
    </div>
    <div>
        <input type="submit"/>
    </div>
    </form>
<p><strong>{typeInput} Preview:</strong></p>
<p>Parent ID Name: {currentContainer.name}</p>
<p>Name: {titleInput}</p>
<p>Description: {descInput}</p>
<p>Image:</p>
<img id="preview-image"></img>
</>
}

export default ElementUpload