'use client'
import React, { FC, useState } from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header";
import { Hero } from "./components/Route/Hero";
import { useSelector } from "react-redux";
interface Props { }

const Page: FC<Props> = (Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login")
  const {user} = useSelector((state:any)=> state.auth)
  console.log(user?.name)
  return (
    <div className="h-screen">
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute ={setRoute}
        route = {route}
      />
      <Hero />
    </div>
  )
}

export default Page;