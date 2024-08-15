import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import {AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
type Props = {
    setRoute: (route : string) =>void;
}

const Login = (props: Props) => {
  return (
    <div>Login</div>
  )
}

export default Login