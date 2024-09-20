'use client'
import { TagSharp } from '@mui/icons-material';
import React, { useState } from 'react'

const CreateCourses = () => {
    const [active , setActive] = useState(0);
    const [course , setCourse] = useState({
        name:"",
        description:"",
        price:"",
        category: "",
        tags:"",
        level:"",
        demoUrl:"",
        thumbnail:""
    })
    const [benefits,setBenefits]=useState([{title:""}]);
    const [prerequisites,setPrerequisite] = useState([{title:""}]);
    const [courseContentData,setCourseContentData] = useState([{
        title:"",
        videoUrl:"",
        description:"",
        videoDescription : "",
        links:[
            {
                title:"",
                url:""
            }
        ],
        suggestion:""
    }]);

    const [courseData,setCourseData]=useState({})

    return (
        <div>
            
        </div>
    )
}

export default CreateCourses
