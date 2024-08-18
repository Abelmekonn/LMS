import { useSelector } from "react-redux";

export default function useAuth() {
    const user = useSelector((state: any) => state.auth);
    console.log(user)
    if(user){
        return true;
    }
    else {
        return false;
    }
}
