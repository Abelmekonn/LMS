import React, { FC, useRef, useState } from 'react'
import {toast} from "react-hot-toast"
import {VscWorkspaceTrusted} from "react-icons/vsc"
type Props = {
    setRoute: (route:string) => void;
}

type Verification ={
    "0":string;
    "1":string;
    "2":string;
    "3":string;
}

const Verification: FC<Props> = ({setRoute}) => {
    const [inValidError,setInvalidError] = useState<boolean>(false);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const verificationHandler = async ()=>{
        console.log("test")
    }
    const handelChange = 
    return (
        <div>Verification</div>
    )
}

export default Verification