import { MdDeleteForever } from 'react-icons/md'


const Card = ({name, image, description, _id, setHistory, setId, setCurrentContainer, contains, currentContainer, index}) => {

    return <div className="card-cont">
    <div className="card" key={name} onClick={(e) => {
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
        <div className='deleteButton'><MdDeleteForever className="deleteIcon" onClick={()=> {
            if(window.confirm(`Are you sure you want to delete ${name}?`)) {
                let newCurrentContainer = {...currentContainer};
                newCurrentContainer.contains.splice(index,1);
                setCurrentContainer(newCurrentContainer);
                alert(`${name} has been deleted.`)}
            }}/></div>
    </div>
        
}


export default Card