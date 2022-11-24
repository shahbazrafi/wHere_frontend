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
    const [directory, setDirectory] = useState([])
    const [descInput, setDesc] = useState(""),
        {user, setUser} = useContext(UserContext)
    
    useEffect(() => {
        setIsLoading(true)
        if (currentContainer.contains.length!==0) {
            setTitle(currentContainer.contains[id].name)
            setDesc(currentContainer.contains[id].description)
            setGetImageFile(currentContainer.contains[id].image)
            setParentId(currentContainer._id)
        }
        setIsLoading(false)
    }, [id])

    useEffect(() => {
        api.getDirectory().then(({data}) => {
            setDirectory(data)
        })
    }, [])

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
    if (currentContainer.contains.length===0) return <p>Please go back to home as you have not selected a container to edit items.</p>
    if (isLoading) return <p>Loading</p>
    return <>
    <Link className="back-link" to="/" ><p className="history-item">Back</p></Link>
    
    <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="formcontainer">
            <label htmlFor="name">Edit name:</label>
            <input className="input" type="text" id="name" placeholder="Name" value={titleInput} name="name" required onChange={(e) => {setTitle(e.target.value)}}/>
            <label htmlFor="desc">Edit description:</label>
            <input className="input" type="text" id="desc" placeholder="Description" value={descInput} name="desc" onChange={(e) => {setDesc(e.target.value)}}/>
            <label htmlFor="parent_id">Edit Parent ID:</label>
            <select name="parent_id" id="parent_id" onChange={(e) => {setParentId(e.target.value); console.log(e.target.value)}}>
                <option value={currentContainer.name}>No Change</option>
                {directory.map(list => <option value={list._id}>{list.parent_name} / {list.name}</option>)}
            </select>
        </div>
        <input className="submitbutton" type="submit"/>
    </form>
    <br></br>
    <p><strong>Preview:</strong></p>
    <div className="card-field">
    <div className="card-cont">
    <div className="card">
    <p className="card-name">{titleInput}</p>
    <p className="card-desc">{descInput}</p>
    <img alt="" className="card-image" src={`data:image/png;base64,${getImageFile}`}></img>
    </div>
    </div>
    </div>
    
    </>
}

export default EditItem