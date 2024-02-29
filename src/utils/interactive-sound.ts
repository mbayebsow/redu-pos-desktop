// import { useState, useEffect } from "react";

import beepFile from "../sound/beep-29.mp3";
import clearFile from "../sound/clear-21.mp3";
import buttonPress from "../sound/button-press.mp3";
import phoneKeypad from "../sound/phone-keypad.mp3";
import switchClicked from "../sound/switch-clicked.mp3";

export function playBeep() {
  const audio = new Audio(beepFile);
  audio.play();
}

export function playClear() {
  const audio = new Audio(clearFile);
  audio.play();
}

export function playButtonPress() {
  const audio = new Audio(buttonPress);
  audio.play();
}

export function playPhoneKeypad() {
  const audio = new Audio(phoneKeypad);
  audio.play();
}

export function playSwitchClicked() {
  const audio = new Audio(switchClicked);
  audio.play();
}

// interface DataContextProps {
//   playBeep: () => void;
//   playClear: () => void;
//   playButtonPress: () => void;
//   playPhoneKeypad: () => void;
//   playSwitchClicked: () => void;
// }

// const useSound = (): DataContextProps => {
//   const [beepAudio, setBeepAudio] = useState<HTMLAudioElement | null>(null);
//   const [beepClear, setClearAudio] = useState<HTMLAudioElement | null>(null);
//   const [beepButtonPress, setButtonPress] = useState<HTMLAudioElement | null>(null);
//   const [beepPhoneKeypad, setPhoneKeypad] = useState<HTMLAudioElement | null>(null);
//   const [beepSwitchClicked, setSwitchClicked] = useState<HTMLAudioElement | null>(null);

//   const [isBeepAudioLoaded, setBeepAudioLoaded] = useState(false);
//   const [isClearAudioLoaded, setClearAudioLoaded] = useState(false);
//   const [isButtonPressLoaded, setButtonPressLoaded] = useState(false);
//   const [isPhoneKeypadLoaded, setPhoneKeypadLoaded] = useState(false);
//   const [isSwitchClickedLoaded, setSwitchClickedLoaded] = useState(false);

//   useEffect(() => {
//     const audioBeepElement = new Audio(beepFile);
//     const audioClearElement = new Audio(clearFile);
//     const audioButtonPressElement = new Audio(buttonPress);
//     const audioPhoneKeypadElement = new Audio(phoneKeypad);
//     const audioswitchClickedElement = new Audio(switchClicked);

//     audioBeepElement.addEventListener("canplaythrough", () => {
//       setBeepAudio(audioBeepElement);
//       setBeepAudioLoaded(true);
//     });

//     audioClearElement.addEventListener("canplaythrough", () => {
//       setClearAudio(audioClearElement);
//       setClearAudioLoaded(true);
//     });

//     audioButtonPressElement.addEventListener("canplaythrough", () => {
//       setButtonPress(audioButtonPressElement);
//       setButtonPressLoaded(true);
//     });

//     audioPhoneKeypadElement.addEventListener("canplaythrough", () => {
//       setPhoneKeypad(audioPhoneKeypadElement);
//       setPhoneKeypadLoaded(true);
//     });

//     audioswitchClickedElement.addEventListener("canplaythrough", () => {
//       setSwitchClicked(audioswitchClickedElement);
//       setSwitchClickedLoaded(true);
//     });

//     return () => {
//       audioBeepElement.removeEventListener("canplaythrough", () => {
//         setBeepAudioLoaded(true);
//       });

//       audioClearElement.removeEventListener("canplaythrough", () => {
//         setClearAudioLoaded(true);
//       });
//     };
//   }, []);

//   const playBeep = () => {
//     if (isBeepAudioLoaded && beepAudio) {
//       beepAudio.play();
//     }
//   };

//   const playClear = () => {
//     if (isClearAudioLoaded && beepClear) {
//       beepClear.play();
//     }
//   };

//   const playButtonPress = () => {
//     if (isButtonPressLoaded && beepButtonPress) {
//       beepButtonPress.play();
//     }
//   };

//   const playPhoneKeypad = () => {
//     if (isPhoneKeypadLoaded && beepPhoneKeypad) {
//       beepPhoneKeypad.play();
//     }
//   };

//   const playSwitchClicked = () => {
//     if (isSwitchClickedLoaded && beepSwitchClicked) {
//       beepSwitchClicked.play();
//     }
//   };

//   return { playBeep, playClear, playButtonPress, playPhoneKeypad, playSwitchClicked };
// };

// export default useSound;
