import { useContext, useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as api from "../api"
import { UserContext } from "../contexts"

const EditContainer = ({addEvent, currentContainer}) => {
    const navigate = useNavigate()

    const {id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [titleInput, setTitle] = useState("")
    const [parentId, setParentId] = useState("")
    const [getImageFile, setGetImageFile] = useState("")
    const [descInput, setDesc] = useState(""),
        {user, setUser} = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true)
        api.fetchContainerById(id).then(data => {
            setTitle(data.name)
            setDesc(data.description)
            setGetImageFile(data.image)
            setParentId(data.parent_id)
            setIsLoading(false)
        })
    }, [id])

    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', titleInput)
        formData.append('description', descInput)
        formData.append('parent_id', parentId)
        api.patchContainer(formData, id).then(data => {
            addEvent(user.name, new Date(), currentContainer.name, 'edited', titleInput)
            navigate(-1)
        })
        
    }

    if (isLoading) return <p>Loading</p>

    return <>
    <Link className="back-link" to="/" ><p className="history-item">Back</p></Link>
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="upload-form">
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
        <input type="submit" id="submit"/>
    </div>
    </form>
    <br></br>
    <p><strong>Preview:</strong></p>
    <p>Parent ID: {parentId}</p>
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

export default EditContainer