import { useState, useContext } from "react"
import { UserContext } from "../contexts";
import * as api from "../api"
import { Link, useNavigate } from 'react-router-dom';

const ElementUpload = ({currentContainer, addEvent}) => {
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState("")
    const [titleInput, setTitle] = useState("")
    const [descInput, setDesc] = useState("")
    const [typeInput, setType] = useState("Container")
    const {user} = useContext(UserContext)

    const handlePhoto = (e) => {
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
        formData.append('description', descInput)
        if (typeInput==="Container") {
            api.addContainer(formData, currentContainer._id).then(() => {
                addEvent(user.name, new Date(), currentContainer.name, 'added an container', titleInput)
                console.log("Successful")
                navigate(`/`)
            }).catch((err)=>{
                console.log("Something went wrong", err)
            })
        } else if (typeInput==="Item") {
            api.addItem(formData, currentContainer._id).then(() => {
                addEvent(user.name, new Date(), currentContainer.name, 'added an container', titleInput)
                console.log("Successful")
                navigate(`/`)
            }).catch((err)=>{
                console.log("Something went wrong", err)
            })
        }
    }

    return <>
    <Link className="back-link" to="/" ><p className="history-item">Back</p></Link>
    <h1>Add {typeInput}</h1>
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
    <div>
        <label htmlFor="type">Type</label>
        <select id="type" name="type" required onChange={(e) => {setType(e.target.value)}}>
            <option value="Container">Container</option>
            <option value="Item">Item</option>
        </select>
    </div>
    <div>
        <label htmlFor="name">{typeInput} title</label>
        <input type="text" id="name" placeholder="Name" value={titleInput} name="name" required onChange={(e) => {setTitle(e.target.value)}}/>
    </div>
    <div>
        <label htmlFor="desc">{typeInput} description</label>
        <input type="text" id="desc" placeholder="Description" value={descInput} name="desc" required onChange={(e) => {setDesc(e.target.value)}}/>
    </div>
    <div>
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" useref={imageFile} onChange={handlePhoto}/>
    </div>
    <div>
        <input type="submit" id="submit"/>
    </div>
    </form>
<p><strong>{typeInput} Preview:</strong></p>
<p>Parent Name: {currentContainer.name}</p>
<p>Name: {titleInput}</p>
<p>Description: {descInput}</p>
<img className="preview-image" id="preview-image" alt={`${titleInput}`}></img>
</>
}

export default ElementUpload