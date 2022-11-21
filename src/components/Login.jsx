import { useEffect, useState } from "react"
import * as api from "../api"

const Login = ({setUser, usersArray, setUsersArray}) => {
    
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        api.fetchUsers().then((data) => {
            setLoading(true)
            setUsersArray(data)
            setLoading(false)
        })

    }, [])

    if (loading) return <><p>Please login to a user:</p><p>Loading...</p></>
    
    return <><p>Please login to a user:</p>
    {usersArray.map(user => <p><a href="" onClick={(e) => {
        e.preventDefault()
        setUser(user)
        }}>{user.name}</a></p>)}
    </>
}

export default Login