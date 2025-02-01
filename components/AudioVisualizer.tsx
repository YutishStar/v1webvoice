"use client";
import "./vis.css";
import { useEffect, useState } from "react";
import { Mic, MoreHorizontal, X } from "lucide-react";
import { cn } from "@/utils";
import { useVoice } from "@humeai/voice-react";
import CustomCursor from "@/app/CustomCursor";

export default function AudioVisualizer({
  audioData,
}: {
  audioData: number[];
}) {
  const [mode, setMode] = useState<"circles" | "pills">("circles");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { disconnect, isMuted, unmute, mute, micFft, isPlaying } = useVoice();
  const [scale, setScale] = useState(1);
  const { status, connect } = useVoice();

  useEffect(() => {
    if (isPlaying) {
      setMode("pills");
      setTimeout(() => setIsSpeaking(true), 500);
    } else setMode("circles");
  }, [isPlaying]);

  const toggleMode = (mode: string) => {
    setIsListening(!isListening);
    if (!isListening) {
      setMode("pills");
      // Start speaking animation after transition to pills
      setTimeout(() => setIsSpeaking(true), 500);
    } else {
      setIsSpeaking(false);
      setMode("circles");
    }
  };

  useEffect(() => {
    if (isPlaying) {
      setMode("pills");
      console.log("isPlaying", mode);
    } else {
      setMode("circles");
    }
    // toggleMode("pills");
  }, [isPlaying]);

  function getClass(i: number, connected: string) {
    if (i === 2) {
      if (connected === "disconnected") return `middle`;
      return `${!isPlaying ? "animate-radiate" : ""} h-16 w-16`;
    }

    if (i === 1) {
      if (connected === "disconnected") return `inner-1`;
      // return `-translate-x-[20px]`;
    }
    if (i === 3) {
      if (connected === "disconnected") return `inner-2`;
      // return `translate-x-[20px]`;
    }
    if (i == 0) {
      if (connected === "disconnected") return `outer-1`;
      // return `-translate-x-[40px]`;
    }
    if (i == 4) {
      if (connected === "disconnected") return `outer-2`;
      // return `translate-x-[40px]`;
    }
  }

  function playingClass(i: number) {
    // if (i === 2) {
    //   return `animate-radiate h-16 w-16`;
    // }

    if (i === 1) {
      return `-translate-x-[20px]`;
    }
    if (i === 3) {
      return `translate-x-[20px]`;
    }
    if (i == 0) {
      return `-translate-x-[40px]`;
    }
    if (i == 4) {
      return `translate-x-[40px]`;
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="relative  h-full w-full">
        <div
          className={`${"flex justify-center items-center group hover:cursor-none w-1/2 m-auto h-[40vh]"} 
          ${status.value !== "disconnected" ? "gap-[20px]" : ""} 
           ${status.value === "disconnected" && "outer "}`}
          onClick={() => {
            if (status.value === "disconnected") {
              connect();
            } else {
              disconnect();
            }
          }}
        >
          {/* <div className="relative "> */}
          {audioData.map((_, index) => {
            const isEdge = index === 0 || index === 4;
            const isMiddle = index === 1 || index === 3;
            const isCenter = index === 2;

            return (
              <div
                key={index}
                className={cn(
                  `${getClass(index, status.value)} ${
                    mode === "pills" ? "animate-wobble" : ""
                  }   transition-all duration-500 ease-in-out`,
                  isListening
                    ? "h-16 w-16 rounded-full"
                    : "h-32 w-16 rounded-full",
                  isListening
                    ? isEdge
                      ? "bg-neutral-500"
                      : isMiddle
                      ? "bg-neutral-500"
                      : "bg-gray-800"
                    : "bg-neutral-900"
                )}
                style={
                  status.value === "disconnected"
                    ? {}
                    : {
                        animationDelay: `${index * 0.1}s`,

                        // transform: `translateX(${playingClass(index)})`,
                        // scale: `${isPlaying ? scale : 1}`,
                        height: `${
                          isPlaying ? Math.max(audioData[index] * 2.2, 64) : 64
                        }px`,
                      }
                }
              />
            );
          })}
          <CustomCursor />
          <Mic className={`cur hidden group-hover:block   `} />
          {/* <img src="/mic.svg" className="cur hidden group-hover:block h-10 w-10"/> */}
        </div>
        {/* </div> */}
      </div>

      

      {/* <Audio/> */}
    </div>
  );
}

// "use client";
// import "./vis.css";
// import { useEffect, useRef, useState } from "react";
// import { Mic, MoreHorizontal, X } from "lucide-react";
// import { cn } from "@/utils";
// import { useVoice, AudioOutputMessage } from "@humeai/voice-react";
// import Audio from "./Audio";

// export default function AudioVisualizer({
//   audioData,
// }: {
//   audioData: number[];
// }) {
//   const [mode, setMode] = useState<"circles" | "pills">("circles");
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   // const [audioData, setAudioData] = useState<number[]>([]);
//   const { disconnect, isMuted, unmute, mute, micFft, isPlaying } = useVoice();

//   const { status, connect } = useVoice();
//   const [heights, setHeights] = useState<number[]>([]);
//   const animationRef = useRef<number | null>(null);

//   // useEffect(() => {
//   //   const minHeight = 10; // Minimum height for divs
//   //   const maxHeight = 300; // Maximum height for divs
//   //   const numDivs = audioData.length; // Match the number of divs to audioData length

//   //   // Function to update div heights
//   //   const updateVisualizer = () => {
//   //     // Normalize audio data
//   //     const maxDataValue = Math.max(...audioData);
//   //     const minDataValue = Math.min(...audioData);

//   //     const normalizedHeights = audioData.map((value) =>
//   //       Math.max(
//   //         minHeight,
//   //         ((value - minDataValue) / (maxDataValue - minDataValue)) *
//   //           (maxHeight - minHeight)
//   //       )
//   //     );

//   //     setHeights(normalizedHeights);

//   //     // Schedule the next update
//   //     animationRef.current = requestAnimationFrame(updateVisualizer);
//   //   };

//   //   // Start the animation loop
//   //   animationRef.current = requestAnimationFrame(updateVisualizer);

//   //   return () => {
//   //     // Cleanup the animation loop
//   //     if (animationRef.current !== null) {
//   //       cancelAnimationFrame(animationRef.current);
//   //     }
//   //   };
//   // }, [audioData]);

//   useEffect(() => {
//     if (isPlaying) {
//       setMode("pills");
//       setTimeout(() => setIsSpeaking(true), 500);
//     } else setMode("circles");
//   }, [isPlaying]);

//   // const handleAudioReceived = (message: AudioOutputMessage) => {
//   //   const decodedData = atob(message.data); // Decode Base64
//   //   const audioArray = new Uint8Array(decodedData.length);
//   //   for (let i = 0; i < decodedData.length; i++) {
//   //     audioArray[i] = decodedData.charCodeAt(i);
//   //   }
//   //   // Process audioArray to extract meaningful information
//   //   const processedData = processAudioData(audioArray);
//   //   setAudioData(processedData);
//   // };

//   // const processAudioData = (audioArray: Uint8Array) => {
//   //   // Example processing: calculate average amplitude for simplicity
//   //   const chunkSize = Math.floor(audioArray.length / 5);
//   //   const amplitudes = [];
//   //   for (let i = 0; i < 5; i++) {
//   //     const chunk = audioArray.slice(i * chunkSize, (i + 1) * chunkSize);
//   //     const avgAmplitude = chunk.reduce((sum, value) => sum + value, 0) / chunk.length;
//   //     amplitudes.push(avgAmplitude);
//   //     console.log("Amplitude", amplitudes);
//   //   }
//   //   return amplitudes;
//   // };

//   const toggleMode = (mode: string) => {
//     setIsListening(!isListening);
//     if (!isListening) {
//       setMode("pills");
//       // Start speaking animation after transition to pills
//       setTimeout(() => setIsSpeaking(true), 500);
//     } else {
//       setIsSpeaking(false);
//       setMode("circles");
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-black">
//       <div className="relative flex items-center justify-center">
//         <div className="flex gap-4">
//           {audioData.map((value, index) => (
//             // console.log("value", value),
//             <div
//               key={index}
//               className={`w-12 bg-white transition-all duration-100 ${
//                 mode === "circles"
//                   ? "h-12 rounded-full"
//                   : "h-32 rounded-full animate-wobble"
//               }`}
//               style={{
//                 height: `${value}px`, // Bar height as a percentage of the container height
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="mt-8 flex gap-2">
//         <button className="rounded-md bg-gray-800 p-2 text-white hover:bg-gray-700">
//           <MoreHorizontal className="h-5 w-5" />
//         </button>
//         <button className="rounded-md bg-red-900/50 p-2 text-red-500 hover:bg-red-900/70">
//           <X className="h-5 w-5" />
//         </button>
//         <button
//           className="bg-white "
//           onClick={async () => {
//             if (status.value === "disconnected") {
//               await connect();
//             } else if (status.value == "connected") disconnect();
//           }}
//         >
//           {status.value}
//         </button>
//       </div>

//       {/* <Audio/> */}
//       <style jsx>{`
//         @keyframes wobble {
//           0% {
//             transform: scaleY(1);
//           }

//           50% {
//             transform: scaleY(0.7);
//           }

//           100% {
//             transform: scaleY(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
