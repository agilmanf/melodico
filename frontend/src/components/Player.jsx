import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Loading from "../asset/rippleLoading.svg";
import "./player.css";

export default function Player() {
  const playback = useSelector((state) => state.playbackReducer);
  const [progressBar, setprogressBar] = useState(0);
  const [volume, setVolume] = useState(60);
  const [pause, setPause] = useState(false);
  const [mute, setMute] = useState(false);
  const [loading, setLoading] = useState(true);

  const [songDuration, setSongDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  const audio = useRef();
  const seekSlider = useRef();
  const currentTimeElement = useRef();
  const animationRef = useRef();

  const playingSong = useSelector((state) => state.playbackReducer);

  const sample =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (!loading) {
      updateProgressSlider(seekSlider.current);
      handleVolume(volume);
      seekSlider.current.max = Math.floor(songDuration);
    }
  }, [loading]);

  useEffect(() => {
    setLoading(true);
    audio.current.pause();
    if (playingSong.currentSong.url) {
      audio.current.src = playingSong.currentSong.url;
      audio.current.load();
      setPause(false);
    }
  }, [playingSong]);

  // Toggle Mute Button
  useEffect(() => {
    audio.current.muted = mute ? true : false;
  }, [mute]);

  useEffect(() => {
    if (seekSlider.current) updateProgressSlider(seekSlider.current);
  }, [progressBar]);

  useEffect(() => {
    if (pause) {
      audio.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audio.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [pause]);

  function handleAudioBar(e) {
    audio.current.currentTime = e;
    setprogressBar(e);
  }

  function handleVolume(e) {
    audio.current.volume = e / 100;
    const volumeSlider = document.querySelector(".volume");
    updateProgressSlider(volumeSlider);
    setVolume(e);
  }

  function updateProgressSlider(element) {
    element.style.setProperty(
      "--value",
      element.id === "seek-slider" ? progressBar : element.value
    );
    element.style.setProperty("--min", element.min === "" ? "0" : element.min);
    element.style.setProperty(
      "--max",
      element.id === "seek-slider" ? songDuration : "100"
    );
  }

  function onReady(audio) {
    setLoading(false);
    if (playingSong.currentSong.url) {
      setPause(true);
      audio.current.play();
    }
    if (audio.duration) setSongDuration(audio.duration);
  }

  function whilePlaying() {
    if (songDuration - 2 <= audio.current.currentTime) {
      setPause(true);
      cancelAnimationFrame(animationRef);
    }

    setprogressBar(audio.current.currentTime);
    currentTimeElement.current.textContent = calculateTime(
      audio.current.currentTime
    );

    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  return (
    <>
      <div className="audio-player-container d-flex justify-content-around ">
        {loading ? (
          <div
            className="h-100 d-flex"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              backgroundColor: "#171920",
            }}
          >
            <img
              src={Loading}
              alt="loading"
              width={"50px"}
              className="m-auto"
            />
          </div>
        ) : (
          ""
        )}
        <audio
          ref={audio}
          src="https://melodico.herokuapp.com/music/1650354463161-TULUS - Hati-Hati di Jalan.mp3"
          preload="metadata"
          onLoadedMetadata={(e) => onReady(e.target)}
        ></audio>
        <div className="audio-button d-flex justify-content-center align-items-center px-3 pt-1">
          <ion-icon name="play-back-outline"></ion-icon>
          <div className="play-pause-button" onClick={() => setPause(!pause)}>
            {!pause ? (
              <ion-icon name="play-circle-outline"></ion-icon>
            ) : (
              <ion-icon name="pause-circle-outline"></ion-icon>
            )}
          </div>
          <ion-icon name="play-forward-outline"></ion-icon>
        </div>
        <div className="d-flex w-75 px-3 gap-2 justify-content-center align-items-center">
          <span ref={currentTimeElement} id="current-time">
            {calculateTime(audioCurrentTime)}
          </span>
          <input
            className="playback slider-progress"
            type="range"
            id="seek-slider"
            ref={seekSlider}
            onChange={(e) => handleAudioBar(e.target.value)}
            value={progressBar}
          ></input>
          <span id="duration" className="time">
            {calculateTime(songDuration)}
          </span>
        </div>
        <div className="d-flex px-3 gap-2 justify-content-center align-items-center">
          <div
            className="audio-button mute-button pt-1"
            onClick={() => setMute(!mute)}
          >
            {!mute ? (
              <ion-icon name="volume-high"></ion-icon>
            ) : (
              <ion-icon name="volume-mute"></ion-icon>
            )}
          </div>
          <input
            className="volume slider-progress"
            type="range"
            id="volume"
            max="100"
            value={volume}
            onChange={(e) => handleVolume(e.target.value)}
          ></input>
        </div>
      </div>
    </>
  );
}
