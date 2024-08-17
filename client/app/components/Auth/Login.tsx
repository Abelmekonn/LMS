"use client"
import React, { FC, useEffect, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { styles } from '../../styles/style'
import { useLoginMutation } from '../../../redux/features/auth/authApi'
import toast from 'react-hot-toast'
import {signIn} from "next-auth/react"

type Props = {
    setOpen:(open:boolean)=>void;
    setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email Required"),
    password: Yup.string()
        .min(8, "Password is too short - should be 8 chars minimum.")
        .required("Password Required"),
})

const Login: FC<Props> = ({setRoute,setOpen}) => {
    const [login, { isSuccess, error }] = useLoginMutation()
    const [show, setShow] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            try {
                await login({ email, password });
            } catch (error) {
                console.error("Login error:", error);
            }
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Login successfully!");
            setOpen(false);
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
                console.error("Error Details:", errorData.data);
            }
        }
    }, [isSuccess, error, setOpen]);

    const { errors, touched, values, handleChange, handleSubmit } = formik

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Login with ELearning
            </h1>
            <form onSubmit={handleSubmit}>
                <label className={`${styles.label}`} htmlFor='email'>
                    Enter your Email
                </label>
                <input type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={`${errors.email && touched.email ? "border-red-500" : ""} ${styles.input}`}
                    placeholder='loginmail@gmail.com'
                />
                {errors.email && touched.email && (
                    <span className='text-red-500 pt-2 block'>{errors.email}</span>
                )}
                <div className="w-full relative mb-1 mt-3">
                    <label htmlFor="password" className={`${styles.label}`}>
                        Enter your Password
                    </label>
                    <input type={!show ? 'password' : "text"}
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        className={`${errors.password && touched.password ? "border-red-500" : ""} ${styles.input}`}
                        placeholder='password!@%'
                    />
                    {!show ? (
                        <AiOutlineEyeInvisible
                            className={`${styles.Eye}`}
                            size={20}
                            onClick={() => setShow(true)}
                        />
                    ) : (
                        <AiOutlineEye
                            className={`${styles.Eye}`}
                            size={20}
                            onClick={() => setShow(false)}
                        />
                    )}
                    {errors.password && touched.password && (
                        <span className='text-red-500 pt-2 block'>{errors.password}</span>
                    )}
                </div>

                <div className="flex items-center justify-between mb-4 mt-2">
                    <label className="text-sm text-gray-500 dark:text-gray-200 cursor-pointer" htmlFor="remember-me">
                        <input className="mr-2" id="remember-me" type="checkbox" />
                        Remember me
                    </label>
                    <a className="text-sm text-blue-500 hover:underline" href="#">Forgot password?</a>
                </div>
                
                <button
                    value="login"
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 w-full"
                >
                    Login
                </button>
                <br />
                <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
                    Or join with
                </h5>
                <div className="flex items-center justify-center my-3">
                    <FcGoogle 
                    size={30} 
                    className='cursor-pointer mr-2'
                    onClick={()=>signIn("google")}
                    />
                    <AiFillGithub 
                    size={30} 
                    className='cursor-pointer ml-2'
                    onClick={()=>signIn("github")}
                    />
                </div>
                <p className="text-white mt-4 w-full text-center">
                    Don't have an account? <span className="text-sm text-blue-500 hover:underline cursor-pointer" onClick={() => setRoute("sign-up")}>Signup</span>
                </p>
            </form>
            <br />
        </div>
    )
}

export default Login
