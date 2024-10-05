import { styles } from '../../../../app/styles/style';
import React, { FC, useState, useRef } from 'react';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsLink45Deg } from "react-icons/bs";
import toast from 'react-hot-toast';

type Link = {
    title: string;
    url: string;
};

type CourseContentItem = {
    videoSection: string;
    title: string;
    description: string;
    videoUrl: string;
    links: Link[];
};

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: CourseContentItem[];
    setCourseContentData: (courseContentData: CourseContentItem[]) => void;
    handelSubmit: any; // Correct function type
};

const CourseContent: FC<Props> = ({
    active,
    setActive,
    courseContentData,
    setCourseContentData,
    handelSubmit: handelCourseSubmit// Renamed prop handler
}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean[]>(Array(courseContentData.length).fill(false));
    const [activeSection, setActiveSection] = useState(1)

    const handelSubmit = (e: any) => {
        e.preventDefault();
    }
    // Toggle collapse state for a specific index
    const handelCollapseToggle = (index: number) => {
        const updatedCollapse = [...isCollapsed];
        updatedCollapse[index] = !updatedCollapse[index];
        setIsCollapsed(updatedCollapse);
    };

    // Remove a specific link from course content
    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedCourseContentData = [...courseContentData];
        updatedCourseContentData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedCourseContentData);
    };

    // Add a new link to the specific course content
    const handelAddLink = (index: number) => {
        const updatedCourseContentData = [...courseContentData];
        updatedCourseContentData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedCourseContentData);
    };

    // Validate and add a new content section
    const newContentHandler = (item: CourseContentItem) => {
        if (
            item.title === "" ||
            item.description === "" ||
            item.videoUrl === "" ||
            item.links[0].title === "" ||
            item.links[0].url === ""
        ) {
            toast.error("Fill all the fields");
            return; // Early return on validation failure
        }

        // Define new content structure
        const newContent: CourseContentItem = {
            videoSection: `Untitled Section  ${activeSection}`,
            title: "",
            description: "",
            videoUrl: "",
            links: [{ title: "", url: "" }],
        };

        // Add the new content to courseContentData
        setCourseContentData([...courseContentData, newContent]);
    };


    const addNewSection = () => {
        const lastIndex = courseContentData.length - 1;
        const lastItem = courseContentData[lastIndex];

        // Validate the last item before adding a new section
        if (
            lastItem.title === "" ||
            lastItem.description === "" ||
            lastItem.videoUrl === "" ||
            lastItem.links[0].title === "" ||
            lastItem.links[0].url === ""
        ) {
            toast.error("Fill all the fields of the last section before adding a new one");
            return; // Early return if validation fails
        }

        setActiveSection(activeSection + 1)
        // Define a new section structure
        const newSection: CourseContentItem = {
            videoSection: `Untitled Section ${activeSection}`, // Default name for new section
            title: "",
            description: "",
            videoUrl: "",
            links: [{ title: "", url: "" }], // Start with one empty link
        };

        // Add the new section to courseContentData
        setCourseContentData([...courseContentData, newSection]);
    };

    const prevButton = () => {
        setActive(active - 1);
    }

    const handelOptions = () => {
        const lastIndex = courseContentData.length - 1;
        const lastItem = courseContentData[lastIndex];

        // Validate the last item before adding a new section
        if (
            lastItem.title === "" ||
            lastItem.description === "" ||
            lastItem.videoUrl === "" ||
            lastItem.links[0].title === "" ||
            lastItem.links[0].url === ""
        ) {
            toast.error("section can't be empty");
            return; // Early return if validation fails
        }
        else {
            setActive(active + 1);
            handelCourseSubmit()
        }
    }

    console.log(courseContentData)

    return (
        <div className='w-[80%] m-auto p-3'>
            <form onSubmit={handelSubmit}>
                {courseContentData.map((item, index) => {
                    const showSectionInput =
                        index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
                    const inputRef = useRef<HTMLInputElement>(null);
                    return (
                        <div
                            key={index} // Key added for React to uniquely identify the elements
                            className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}
                        >
                            {showSectionInput && (
                                <div className='flex w-full items-center'>
                                    <input
                                        type="text"
                                        className={`text-[20px] mb-3 ${item.videoSection === "Untitled Section " ? "w-[170px]" : "w-max"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                        value={item.videoSection}
                                        onChange={(e) => {
                                            const updatedData = [...courseContentData];
                                            updatedData[index].videoSection = e.target.value;
                                            setCourseContentData(updatedData);
                                        }}
                                        ref={inputRef} // Attach the ref to the input element
                                    />
                                    <BiSolidPencil
                                        className='cursor-pointer dark:text-white text-black'
                                        onClick={() => {
                                            // Focus and select the input when the icon is clicked
                                            inputRef.current?.focus();
                                            inputRef.current?.select();
                                        }}
                                    />
                                </div>
                            )}
                            <div className={`flex w-full items-center ${isCollapsed[index] ? "justify-between" : "justify-end"} my-0`}>
                                {isCollapsed[index] && item.title && (
                                    <p className='font-Poppins dark:text-white text-black'>
                                        {index + 1}. {item.title}
                                    </p>
                                )}
                                <div className="flex items-center">
                                    <AiOutlineDelete
                                        className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                        onClick={() => {
                                            if (index > 0) {
                                                const updatedData = [...courseContentData];
                                                updatedData.splice(index, 1);
                                                setCourseContentData(updatedData);
                                            }
                                        }}
                                    />
                                    <MdOutlineKeyboardArrowDown
                                        fontSize="large"
                                        className={`dark:text-white text-black cursor-pointer`}
                                        style={{
                                            transform: isCollapsed[index] ? "rotate(0deg)" : "rotate(180deg)"
                                        }}
                                        onClick={() => handelCollapseToggle(index)}
                                    />
                                </div>
                            </div>

                            {!isCollapsed[index] && (
                                <>
                                    <div className='my-3'>
                                        <label className={styles.label}>Video Title</label>
                                        <input
                                            type="text"
                                            placeholder='Project plan ..'
                                            className={`${styles.input}`}
                                            value={item.title || ""}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].title = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className={styles.label}>Video Url</label>
                                        <input
                                            type="text"
                                            placeholder='Url ...'
                                            className={`${styles.input}`}
                                            value={item.videoUrl || ""}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].videoUrl = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className={styles.label}>Video Description</label>
                                        <textarea
                                            rows={8}
                                            cols={50}
                                            placeholder='Description ...'
                                            className={`${styles.input} !h-min py-2`}
                                            value={item.description || ""}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].description = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                    </div>
                                    {item.links.map((link, linkIndex) => (
                                        <div className="mb-3 block" key={linkIndex}>
                                            <div className="w-full flex items-center justify-between">
                                                <label className={styles.label}>Link {linkIndex + 1}</label>
                                                <AiOutlineDelete
                                                    className={`dark:text-white text-[20px] mr-2 text-black cursor-pointer`}
                                                    onClick={() =>
                                                        linkIndex === 0
                                                            ? null
                                                            : handleRemoveLink(index, linkIndex)}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                className={`${styles.input}`}
                                                value={link.title}
                                                placeholder='Source code... (link title)'
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].links[linkIndex].title = e.target.value;
                                                    setCourseContentData(updatedData);
                                                }}
                                            />

                                            <input
                                                type="text"
                                                className={`${styles.input} mt-6`}
                                                value={link.url}
                                                placeholder='Source code... (link url)'
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].links[linkIndex].url = e.target.value; // Update link url
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div className="inline-block mb-4">
                                        <p className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                            onClick={() => handelAddLink(index)}
                                        >
                                            <BsLink45Deg className='mr-2' /> Add Link
                                        </p>
                                    </div>
                                </>
                            )}
                            {index === courseContentData.length - 1 && (
                                <div>
                                    <p
                                        className="flex mt-3 items-center text-[18px] dark:text-white text-black cursor-pointer"
                                        onClick={(e: any) => newContentHandler(item)}
                                    >
                                        <AiOutlinePlusCircle className='mr-2' /> Add New Content
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
                <br />
                <div className="flex  items-center text-[20px] dark:text-white text-black cursor-pointer"
                    onClick={() => addNewSection()}
                >
                    <AiOutlinePlusCircle className='mr-2' /> Add New Section

                </div>
            </form>
            <div className="w-full flex justify-between items-center">
                <div className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] rounded text-center text-[#fff] mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] rounded text-center text-[#fff] mt-8 cursor-pointer"
                    onClick={() => handelOptions()}
                >
                    Next
                </div>
            </div>
            <br /><br /><br />
        </div>
    );
};

export default CourseContent;
