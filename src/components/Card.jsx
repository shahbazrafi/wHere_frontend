const Card = ({name, image, description, _id, setHistory, setId, setCurrentContainer, contains, currentContainer, index}) => {

    return <div className="card" key={name} onClick={(e) => {
        if (contains) {
            e.preventDefault();
            setHistory((previousHistory) => [...previousHistory, currentContainer])
            setId(_id)
        }
    }}>
                
        <p className="card-name">{name}</p>
        <img className="card-image" alt="temp" src={`data:image/png;base64,${image}`}></img>
        <p className="card-desc">{description}</p>
        <br></br><button onClick={()=> {
            if(window.confirm(`Are you sure you want to delete ${name}?`)) {
                let newCurrentContainer = {...currentContainer};
                newCurrentContainer.contains.splice(index,1);
                setCurrentContainer(newCurrentContainer);
                alert(`${name} has been deleted.`)}
            }}>Delete {name}</button>
        </div>
}


export default Card