import { useSelector } from "react-redux";

export default function useAuth() {
    const user = useSelector((state: any) => state.auth);
    if(user.user){
        return true;
    }
    else {
        return false;
    }
}
