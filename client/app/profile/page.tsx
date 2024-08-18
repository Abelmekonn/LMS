"use client"
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Profile from "../components/profiles/Profile"
import { useSelector } from 'react-redux'

type Props = {}

const Page: FC<Props> = (Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login")
    const {user} = useSelector((state : any)=>state.auth)
    console.log("user",user)
    return (
        <div>
            <Protected>
                <Heading
                    title="ELearning"
                    description="vghfhtdd"
                    keywords="vgvhvvjh"
                />
                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />
                <Profile />
            </Protected>
        </div>
    )
}

export default Page