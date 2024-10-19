import React, { useState, useEffect, useRef } from "react";
import './App.css';

const videos = [
  "/videos/car.mp4",   // Ensure these paths match the public folder structure
  "/videos/plane.mp4",
  "/videos/phone.mp4"
];

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    // Start fading out
    setFade(true);

    setTimeout(() => {
      // Move to the next video after fading out
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      setFade(false); // Fade in the new video
    }, 1); // Duration of fade-out (matches CSS transition duration)
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentVideoIndex];
      videoRef.current.play();
    }
  }, [currentVideoIndex]);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className={fade ? "fade-out" : "fade-in"}
        width="100%"
        height="auto"
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default App;
