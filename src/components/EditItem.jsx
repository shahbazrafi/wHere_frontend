import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as api from "../api"
import { UserContext } from "../contexts"

const EditItem = ({ addEvent, currentContainer}) => {
    const navigate = useNavigate()

    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [getImageFile, setGetImageFile] = useState("")
    const [titleInput, setTitle] = useState("")
    const [parentId, setParentId] = useState("")
    const [descInput, setDesc] = useState(""),
        {user, setUser} = useContext(UserContext)
    
    useEffect(() => {
        setIsLoading(true)
        setTitle(currentContainer.contains[id].name)
        setDesc(currentContainer.contains[id].description)
        setGetImageFile(currentContainer.contains[id].image)
        setParentId(currentContainer._id)
        setIsLoading(false)
    }, [id])

    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', titleInput)
        formData.append('description', descInput)
        formData.append('parent_id', parentId)
        formData.append('item_id', currentContainer.contains[id]._id)
        api.patchItem(formData, currentContainer._id).then(data => {
            navigate(-1)
            addEvent(user.name, new Date(), currentContainer.name, 'edited', titleInput)
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
        <input type="text" id="desc" placeholder="Description" value={descInput} name="desc" onChange={(e) => {setDesc(e.target.value)}}/>
    </div>
    <div>
        <label htmlFor="parent_id">Edit Parent ID</label>
        <input type="text" id="parent_id" placeholder="New Parent ID" value={parentId} name="parent_id" onChange={(e) => {setParentId(e.target.value)}}/>
    </div>
    <div>
        <input type="submit"/>
    </div>
    </form>
    <br></br>
    <p><strong>Preview:</strong></p>
    <p>Parent ID: {currentContainer._id}</p>
    <p>Item ID: {currentContainer.contains[id]._id}</p>
    <p>Name: {titleInput}</p>
    <p>Description: {descInput}</p>
    <p>Image:</p>
    <img alt="" className="preview-image" src={`data:image/png;base64,${getImageFile}`}></img>
   
    
    </>
}

export default EditItem