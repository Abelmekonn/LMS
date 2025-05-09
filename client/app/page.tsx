'use client'
import React, { FC, useState } from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header";
import { Hero } from "./components/Route/Hero";
import Courses from "./components/Routes/Courses"
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/Route/FAQ"
import Footer from "./components/Footer"
import LiveClassCard from "./components/Route/LiveClassCard";

interface Props { }

const Page: FC<Props> = (Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login")
  
  return (
    <div className="">
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
      <Courses />
      <LiveClassCard />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Page;