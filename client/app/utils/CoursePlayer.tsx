import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'

type Props = {
  videoUrl: string;
  title: string;
}

// Define the expected shape of the video data response
interface VideoData {
  otp: string;
  playbackInfo: string;
}

const CoursePlayer: FC<Props> = ({ videoUrl}) => {
  console.log(videoUrl)
  const [videoData, setVideoData] = useState<VideoData>({
    otp: "",
    playbackInfo: ""
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        // Tell Axios the expected response type using <VideoData>
        const response = await axios.post<VideoData>(`http://localhost:8000/api/v1/getVdoCipherOtp`, {
          videoId: videoUrl
        });
        setVideoData(response.data);  // Now TypeScript knows the type of response.data
      } catch (err) {
        setError("Failed to fetch video data.");
        console.error(err);
      }
    };

    fetchVideoData();
  }, [videoUrl]);

  return (
    <div style={{ position: 'relative', paddingTop: '41%' /* 16:9 Aspect Ratio */ }}>
      {error && <p>{error}</p>}
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=BqwQldGGXZ0Ws7f2`}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            border: "none"
          }}
          allow="encrypted-media"
          allowFullScreen={true}
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
