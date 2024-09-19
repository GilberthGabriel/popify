import React, { useEffect, useRef } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { Track } from "@/types/dto";
import { Modal } from "react-native";
import Player from "@/components/player";
import { Audio } from "expo-av";

const PlayerContext = React.createContext<{
  playTrack: (track: Track) => void;
  clearTrack: () => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  setProgress: (progress: number) => void;
  hidePlayer: () => void;
  showPlayer: () => void;
  resetPlayer: () => void;
  progressPercentage: number;
  playerMinimized: boolean;
  paused: boolean;
  playing: boolean;
  currentTrack: Track | null;
}>({} as any);

export function usePlayer() {
  const value = React.useContext(PlayerContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function PlayerProvider(props: React.PropsWithChildren) {
  const [currentTrack, setCurrentTrack] = React.useState<Track | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [playerMinimized, setPlayerMinimized] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const playbackControl = React.useRef<Audio.Sound | null>(null);

  const progressPercentage = (progress / (duration || 0)) * 100;

  const resetPlayer = () => {
    setCurrentTrack(null);
    setPlaying(false);
    setPaused(false);
    setPlayerMinimized(true);
    setProgress(0);
    setDuration(0);

    if (playbackControl?.current) {
      playbackControl.current.unloadAsync();
      playbackControl.current = null;
    }
  };

  const playTrack = async (track: Track) => {
    if (playbackControl?.current) {
      playbackControl?.current.unloadAsync();
    }

    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: track.preview },
      { shouldPlay: true },
      (status) => {
        if (status.isLoaded) {
          setProgress(status.positionMillis || 0);
          setDuration(status.durationMillis || 0);

          if (status.didJustFinish) {
            resetPlayer();
          }
        }
      }
    );

    playbackControl.current = playbackObject;

    setCurrentTrack(track);
    setPlaying(true);
    setPlayerMinimized(false);
  };

  const clearTrack = async () => {
    await playbackControl?.current?.unloadAsync();
    setCurrentTrack(null);
    setPlaying(false);
  };

  const pauseTrack = async () => {
    await playbackControl?.current?.pauseAsync();

    setPaused(true);
  };

  const resumeTrack = async () => {
    await playbackControl?.current?.playFromPositionAsync(progress);

    setPaused(false);
  };

  const showPlayer = () => {
    setPlayerMinimized(false);
  };

  const hidePlayer = () => {
    setPlayerMinimized(true);
  };

  useEffect(() => {
    return resetPlayer;
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        playTrack,
        clearTrack,
        pauseTrack,
        resumeTrack,
        setProgress,
        hidePlayer,
        showPlayer,
        resetPlayer,
        progressPercentage,
        paused,
        currentTrack,
        playerMinimized,
        playing,
      }}
    >
      <Modal
        visible={currentTrack !== null && !playerMinimized}
        animationType="slide"
      >
        <Player />
      </Modal>

      {props.children}
    </PlayerContext.Provider>
  );
}
