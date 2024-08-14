import React,{ReactNode} from "react"
import { Provider } from "react-redux"
import {store} from "../redux/store"

interface ProviderProps {
    children: ReactNode;
}

