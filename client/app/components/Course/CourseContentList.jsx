import React, { FC } from "react";

type Props = {
    data: any; // Expected to be an array or object containing the course content
    activeVideo?: number; // ID or index of the currently active video
    setActiveVideo?: (id: number) => void; // Function to set the active video
};

const CourseContentList: FC = (props: Props) => {
  return (
    <div>CourseContentList</div>
  )
}

export default CourseContentList