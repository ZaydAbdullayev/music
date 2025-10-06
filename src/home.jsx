import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaRedoAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./home.scss";
import { moods } from "./context/data";
import { RiTwitterXFill } from "react-icons/ri";

const env = window.ENV || {
  TITLE: "Mood Broadcast",
  X_LINK: "https://twitter.com/moodbroadcast",
};

export function App() {
  const [moodKey, setMoodKey] = useState("calm");
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [repeat, setRepeat] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const mood = moods[moodKey];
  const currentTrack = mood?.tracks[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      isPlaying ? audio.play() : audio.pause();
    }
  }, [isPlaying, trackIndex, moodKey]);

  const formatTime = (time) =>
    time ? new Date(time * 1000).toISOString().substr(14, 5) : "00:00";

  const updateTime = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  };

  return (
    <div className="app" style={{ background: mood?.gradient || "#1a202c" }}>
      <h1 className="title">{env.TITLE}</h1>
      <p className="subtitle">Choose your vibe, and let it play.</p>
      <div className="df aic jcc">
        <button
          className="button"
          onClick={() => window.open(env.X_LINK, "_blank")}
        >
          <RiTwitterXFill className="fs-18" />
          Follow Us
        </button>
      </div>
      <AnimatePresence>
        <motion.div className="mood-buttons">
          {Object.entries(moods).map(([key, value]) => (
            <button
              key={key}
              className={`mood-btn ${moodKey === key ? "active" : ""}`}
              style={{
                backgroundColor:
                  moodKey === key ? value.color : `${value.color}90`,
                borderColor: value.color,
              }}
              onClick={() => {
                setMoodKey(key);
                setTrackIndex(0);
                setIsPlaying(true);
                setCurrentTime(0);
              }}
            >
              {value.name}
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {mood && (
          <motion.div
            className="radio-card"
            style={{
              borderColor: mood.color,
              boxShadow: `0 0 25px ${mood.color}88`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h2>{mood.name}</h2>
            <p className="quote">“{mood.quote}”</p>
            <audio
              ref={audioRef}
              src={currentTrack}
              loop={repeat}
              onTimeUpdate={updateTime}
              onLoadedMetadata={updateTime}
            />
            <div className="controls">
              <button
                onClick={() =>
                  setTrackIndex(
                    (i) => (i - 1 + mood.tracks.length) % mood.tracks.length
                  )
                }
              >
                <FaBackward />
              </button>
              <button onClick={() => setIsPlaying((p) => !p)}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={() =>
                  setTrackIndex((i) => (i + 1) % mood.tracks.length)
                }
              >
                <FaForward />
              </button>
              <button onClick={() => setRepeat((r) => !r)} title="Repeat">
                <FaRedoAlt color={repeat ? mood.color : "#aaa"} />
              </button>
            </div>

            <div
              className="time-slider"
              style={{
                borderColor: mood.color,
                boxShadow: `0 0 25px ${mood.color}88`,
              }}
            >
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                value={currentTime}
                max={duration}
                onChange={(e) =>
                  (audioRef.current.currentTime = e.target.value)
                }
                style={{ color: mood.color }}
              />

              <span>{formatTime(duration)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <i className="bg"></i>
    </div>
  );
}
