'use client'
import React, { FC, useState } from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header";
import { Hero } from "./components/Route/Hero";
interface Props { }

const Page: FC<Props> = (Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login")
  return (
    <div className="">
      <Heading
        title="ELearning"
        description="vghfhtdd"
        keywords="vgvhvvjh"
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