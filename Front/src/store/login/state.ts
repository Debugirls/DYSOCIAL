import { User } from "@/models/user";
import { Token } from "@/models/token"

export interface ILoginState {
  token: Token | null;
  userLogin: User | null;
  userLoading: boolean
  userRegister: User | null
}

function state(): ILoginState {
    return {
        token: null,
        userLogin: null,
        userLoading: false,
        userRegister: null,
    }
}

export default state;