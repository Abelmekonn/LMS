"use client"
import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type Props = {
    data: any;
    activeVideo?: number;
    setActiveVideo?: any;
    isDemo:any;
};

const CourseContentList: FC<Props> = (props) => {
    const [visibleSections , setVisibleSections] = useState<Set<String>>(
        new Set<string>()
    )
    const videoSections: string[] = [
        ...new Set<string>(props.data?.map((item: any) => item.videoSection))
    ]

    let totalCount:number = 0 

    const toggleSection = (section : string) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(section)){
            newVisibleSections.delete(section)
        } else {
            newVisibleSections.add(section)
        }
        setVisibleSections(newVisibleSections)
    }
    return (
        <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
            {videoSections.map((section: string , sectionIndex : number) => (
                const isSectionVisible =visibleSections.has(section);
                const sectionVideoCount: number = sectionVideo.length
                const sectionVideoLength : number = sectionVideo.reduce(
                    (totalLength: number , item:any) => totalLength + item.videoLength,
                    0
                );

                const sectionStartIndex: number = totalCount;
                totalCount += sectionVideoCount ; 

                const sectionContentHours: number = sectionVideoLength / 60 
                return(
                    <div className={`${!props.isDemo && 'border-b border-[#ffffff8e] pb-2'}`} key={section}>
                        <div className="w-full flex">
                            <div className="w-full flex justify-between items-center">
                                <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
                                <button
                                    className="mr-4 cursor-pointer text-black dark:text-white"
                                    onClick={() => toggleSection(section)}
                                >
                                    {isSectionVisible ? (
                                        <BsChevronUp size={20}/>
                                    ) : (
                                        <BsChevronDown size={20}/>
                                    )}
                                </button>
                            </div>
                        </div>
                        <h5 className="text-black dark:text-white">
                            {sectionVideoCount} Lesson .{""}
                            {sectionVideoLength < 60
                                ? sectionVideoLength
                                : sectionContentHour.toFixed(2)
                            }{""}
                            {sectionVideoLength> 60 ? "hours" : "minutes"}
                        </h5>
                        <br />
                        {}
                    </div>
                )
            ))}
        </div>
    )
}

export default CourseContentList