import { MdDeleteForever } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import * as api from "../api"
import { type } from '@testing-library/user-event/dist/type';
import { UserContext } from '../contexts';
import { useContext } from 'react';

const Card = ({element, addEvent, setHistory, setId, setCurrentContainer, currentContainer, index}) => {
    const navigate = useNavigate(),
        { contains, name, parent_id, _id, image, description } = element,
        {user, setUser} = useContext(UserContext)

    return <div className="card-cont" key={_id}>
    <div className="card"  onClick={(e) => {
        if (contains) {
            e.preventDefault();
            setHistory((previousHistory) => [...previousHistory, currentContainer])
            setId(_id)
        }
    }}>
                
        <p className="card-name">{name}</p>
        <p className="card-desc">{description}</p>
        <img className="card-image" alt="temp" src={`data:image/png;base64,${image}`}></img>
    </div>
        <br></br>
        {!contains ? 
        <div className='deleteButton'><MdDeleteForever className="deleteIcon" onClick={()=> {
            if(window.confirm(`Are you sure you want to delete ${name}?`)) {
                api.deleteItem(parent_id, _id).then(() => {
                    let newCurrentContainer = {...currentContainer};
                    newCurrentContainer.contains.splice(index,1);
                    setCurrentContainer(newCurrentContainer);
                    addEvent(user.name, new Date(), currentContainer.name, 'deleted', name )
                    alert(`${name} has been deleted.`)
                })
                
            }
            }}/></div>
        : <div className='deleteButton'><MdDeleteForever className="deleteIcon" onClick={()=> {
            if(window.confirm(`Are you sure you want to delete ${name} container?`)) {
                api.deleteContainer(_id).then(() => {
                    api.fetchContainer(parent_id).then((data) => {
                        setCurrentContainer(data)
                        alert(`${name} has been deleted.`);
                        
                    })
                })
            }
            }}/></div> }
        {contains ? <span className='containslength'>{contains.length}</span>: null}
        <div className='editButton'><AiFillEdit className="editIcon" onClick={()=> {
            navigate(`/edit/${_id}`)
            }}/></div>
    </div>
        
}


export default Card