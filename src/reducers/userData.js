import { GET_DATA } from "../types/userData";

const defaultState = {
    name: "user",
    picture: "user avatar",
    email:"user@email"
}

export default function userData(state=defaultState,action){
    switch (action.type){
        case GET_DATA:{
            return {
                name: action.name,
                picture:action.picture,
                email:action.email
            }
        }
        default:
            return state;
    }
}