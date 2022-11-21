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

    if (loading) return <><p>Please login to a user:</p><p>Loading...</p></>
    
    return <><p>Please login to a user:</p>
    {usersArray.map(user => <p key={user.name}><a href="" onClick={(e) => {
        e.preventDefault()
        setUser(user)
        addEvent(user.name, new Date(), 'the app', 'logged', ' in')
        }}>{user.name}</a></p>)}
    </>
}

export default Login