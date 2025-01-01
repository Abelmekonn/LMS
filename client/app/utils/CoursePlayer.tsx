import React, { FC } from "react";

type Props = {
  videoUrl: string; // The full YouTube video URL
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  console.log(videoUrl)
  // Extract the YouTube video ID from the URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  if (!videoId) {
    return <p className="text-red-500">Invalid YouTube video URL</p>;
  }

  return (
    <div
      className="dark:text-white text-black"
      style={{ position: "relative", paddingTop: "56.25%" }} // 16:9 Aspect Ratio
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          border: "none",
        }}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CoursePlayer;
