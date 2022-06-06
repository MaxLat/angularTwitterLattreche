import { User } from "./user.interface"

export  interface Post {
    id : number,
    content : string,
    isEditable? : boolean
    imageUrl? : string
    user? : User
}