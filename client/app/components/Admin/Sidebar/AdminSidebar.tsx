"use client"
import React from 'react'
import { FC,useEffect  } from 'react'
import {ProSidebar,Menu,MenuItem} from "react-pro-sidebar"
import { Box,IconButton,Typography } from '@mui/material'
import {
    HomeOutlinedIcon
} from "./Icon"
import avatarDefault from "../../../../public/assets/avatar.jpg"
import { useTheme } from 'next-themes'
import Link from 'next/link'

interface itemProps {
    title: string
    to:string
    icon:JSX.Element
    selected : string
    setSelected : any
}

const Item : FC<itemProps> = ({title,to,icon,selected,setSelected})=>{
    return (
        <MenuItem 
        active={selected == title}
        onClick={()=>setSelected(title)}
        icon={icon}
        >
            <Typography className='!text-[16px] !font-Poppins'>{title}</Typography>
            <Link 
            href={to}
            />
            
        </MenuItem>
    )
}

const AdminSidebar = (props: Props) => {
    return (
        <div>AdminSidebar</div>
    )
}

export default AdminSidebar