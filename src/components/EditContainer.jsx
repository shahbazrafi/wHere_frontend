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
    const [directory, setDirectory] = useState([])
    const [descInput, setDesc] = useState(""),
        {user} = useContext(UserContext)

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

    useEffect(() => {
        api.getDirectory().then(({data}) => {
            for (let i = data.length-1; i >= 0; i--){
                if (data[i].parent_id!=="") {
                    for (let j = 0; j < data[i].parents_array.length; j++){
                        if (data[i].parents_array[j]===id){
                            console.log("spliced", data[i].name)
                            data.splice(i,1)
                            break;
                        }
                    }
                }
            }
            setDirectory(data)
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
    <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="formcontainer">
            <label htmlFor="name">Edit name:</label>
            <input className="input" type="text" id="name" placeholder="Name" value={titleInput} name="name" required onChange={(e) => {setTitle(e.target.value)}}/>
            <label htmlFor="desc">Edit description:</label>
            <input className="input" type="text" id="desc" placeholder="Description" value={descInput} name="desc" onChange={(e) => {setDesc(e.target.value)}}/>
            <label htmlFor="parent_id">Edit Parent ID:</label>
            <select name="parent_id" id="parent_id" onChange={(e) => {setParentId(e.target.value); console.log(e.target.value)}}>
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

export default EditContainer