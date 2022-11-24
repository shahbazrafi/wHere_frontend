import { useEffect, useState, useContext } from "react"
import { UserContext } from "../contexts"
import * as api from "../api"

const Login = ({ usersArray, setUsersArray, addEvent }) => {
    
    const { setUser } = useContext(UserContext),
        [loading, setLoading] = useState(true)
    
    useEffect(() => {
        api.fetchUsers().then((data) => {
            setLoading(true)
            setUsersArray(data)
            setLoading(false)
        })

    }, [])

    if (loading) return <><h2>Please login to a user:</h2><p>Loading...</p></>
    
    return <div className="profiles-cont">
    {usersArray.map(user => <button className="profile-btn" key={user.name} onClick={(e) => {
        e.preventDefault()
        setUser(user)
        addEvent(user.name, new Date(), 'the app', 'logged', ' in')
        }}>{user.name}</button>)}
    </div>
}

export default Login