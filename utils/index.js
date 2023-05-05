import axios from "axios";
import jwt_decode from 'jwt-decode'

export const createOrGetUser = async (response, addUser) => {
    const decoded = jwt_decode(response.credential)
    
    const { name, picture, sub } = decoded

    const user = {
        _id: sub,
        _type: 'user',
        username: name,
        image: picture
    }

    addUser(user)

    await axios.post(`http://localhost:3000/api/auth`, user)
}