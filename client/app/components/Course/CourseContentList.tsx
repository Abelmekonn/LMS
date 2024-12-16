"use client";
import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type VideoData = {
    _id: string;
    videoSection: string;
    title: string;
    videoLength: number;
};

type Props = {
    data: VideoData[];
    activeVideo?: number;
    setActiveVideo?: (videoIndex: number) => void;
    isDemo: boolean;
};

const CourseContentList: FC<Props> = ({ data, activeVideo, setActiveVideo, isDemo }) => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());
    
    // Extract unique video sections
    const videoSections: string[] = Array.from(new Set(data.map((item) => item.videoSection)));

    let totalCount: number = 0;

    const toggleSection = (section: string) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section);
        } else {
            newVisibleSections.add(section);
        }
        setVisibleSections(newVisibleSections);
    };

    return (
        <div className={`mt-[15px] w-full ${!isDemo && 'ml-[-30px]  sticky top-24 left-0 z-30'}`}>
            {videoSections.map((section, sectionIndex) => {
                const isSectionVisible = visibleSections.has(section);

                // Filter videos for the current section
                const sectionVideo = data.filter((item) => item.videoSection === section);
                const sectionVideoCount: number = sectionVideo.length;

                const sectionVideoLength: number = sectionVideo.reduce(
                    (totalLength, item) => totalLength + item.videoLength,
                    0
                );

                const sectionStartIndex: number = totalCount;
                totalCount += sectionVideoCount;

                const sectionContentHours: number = sectionVideoLength / 60;

                return (
                    <div className={`${!isDemo && 'border-b border-[#ffffff8e] pb-2'}`} key={section}>
                        <div className="w-full flex">
                            <div className="w-full flex justify-between items-center">
                                <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
                                <button
                                    className="mr-4 cursor-pointer text-black dark:text-white"
                                    onClick={() => toggleSection(section)}
                                >
                                    {isSectionVisible ? (
                                        <BsChevronUp size={20} />
                                    ) : (
                                        <BsChevronDown size={20} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <h5 className="text-black dark:text-white">
                            {sectionVideoCount} Lesson{sectionVideoCount > 1 ? "s" : ""} - {""}
                            {sectionVideoLength < 60
                                ? `${sectionVideoLength} minutes`
                                : `${sectionContentHours.toFixed(2)} hours`}
                        </h5>
                        <br />
                        {isSectionVisible &&
                            sectionVideo.map((item, index) => {
                                const videoIndex: number = sectionStartIndex + index;
                                const contentLength: number = item.videoLength / 60;
                                return (
                                    <div
                                        className={`w-full ${videoIndex === activeVideo ? "bg-slate-800" : ""
                                            } cursor-pointer transition-all p-2`}
                                        key={item._id}
                                        onClick={() => !isDemo && setActiveVideo && setActiveVideo(videoIndex)}
                                    >
                                        <div className="flex items-center">
                                            <div>
                                                <MdOutlineOndemandVideo
                                                    size={25}
                                                    className="mr-2"
                                                    color="#1cdada"
                                                />
                                            </div>
                                            <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                                                {item.title}
                                            </h1>
                                        </div>
                                        <h5 className="pl-5 text-black dark:text-white">
                                            {item.videoLength > 60
                                                ? `${contentLength.toFixed(2)} hours`
                                                : `${item.videoLength} minutes`}
                                        </h5>
                                    </div>
                                );
                            })}
                    </div>
                );
            })}
        </div>
    );
};

export default CourseContentList;
