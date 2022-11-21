import { useEffect, useState } from "react"
import * as api from "../api"

const Login = ({setUser}) => {
    const [usersArray, setUsersArray] = useState([
        {
            "_id": "63735476c45a0c96d278035e",
            "name": "Shabaz",
            "email": "Shabaz@yahoo.co.uk",
            "__v": 0,
            "contains": "6374f23e0318fa7c71b095ed"
        },
        {
            "_id": "637b54825aed4e4ce4ec60f8",
            "name": "cam",
            "email": "cam_va@yahoo.co.uk",
            "__v": 0,
            "contains": "6374f23e0318fa7c71b095ed"
        },
        {
            "_id": "637b54b25aed4e4ce4ec60f9",
            "name": "Nathan",
            "email": "Nathan@yahoo.co.uk",
            "__v": 0,
            "contains": "6374f23e0318fa7c71b095ed"
        },
        {
            "_id": "637b54b65aed4e4ce4ec60fa",
            "name": "sasja\n",
            "email": "sasja\n@yahoo.co.uk",
            "__v": 0,
            "contains": "6374f23e0318fa7c71b095ed"
        },
        {
            "_id": "637b55275aed4e4ce4ec60fb",
            "name": "michael",
            "email": "michael@yahoo.co.uk",
            "__v": 0,
            "contains": "6374f23e0318fa7c71b095ed"
        }
    ])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        api.fetchUsers().then((data) => {
            setLoading(true)
            console.log(data)
            // setUsersArray(data)
            setLoading(false)
        })

    }, [])

    if (loading) return <><p>Please login to a user:</p><p>Loading...</p></>
    
    return <><p>Please login to a user:</p>
    {usersArray.map(user => <p><a href="" onClick={(e) => {
        e.preventDefault()
        setUser(user)
        }}>{user.name}</a></p>)}
    <p>{usersArray[0].name}</p>
    </>
}

export default Login