import { useState, useEffect } from "react";

import beepFile from "../sound/beep-29.mp3";
import clearFile from "../sound/clear-21.mp3";

interface DataContextProps {
  playBeep: () => void;
  playClear: () => void;
}

const useSound = (): DataContextProps => {
  const [beepAudio, setBeepAudio] = useState<HTMLAudioElement | null>(null);
  const [beepClear, setClearAudio] = useState<HTMLAudioElement | null>(null);
  const [isBeepAudioLoaded, setBeepAudioLoaded] = useState(false);
  const [isClearAudioLoaded, setClearAudioLoaded] = useState(false);

  useEffect(() => {
    const audioBeepElement = new Audio(beepFile);
    const audioClearElement = new Audio(clearFile);

    audioBeepElement.addEventListener("canplaythrough", () => {
      setBeepAudio(audioBeepElement);
      setBeepAudioLoaded(true);
    });

    audioClearElement.addEventListener("canplaythrough", () => {
      setClearAudio(audioClearElement);
      setClearAudioLoaded(true);
    });

    return () => {
      audioBeepElement.removeEventListener("canplaythrough", () => {
        setBeepAudioLoaded(true);
      });

      audioClearElement.removeEventListener("canplaythrough", () => {
        setClearAudioLoaded(true);
      });
    };
  }, []);

  const playBeep = () => {
    if (isBeepAudioLoaded && beepAudio) {
      beepAudio.play();
    }
  };

  const playClear = () => {
    if (isClearAudioLoaded && beepClear) {
      beepClear.play();
    }
  };

  return { playBeep, playClear };
};

export default useSound;
