import AudioVisualizer from "@/components/AudioVisualizer";
import { getHumeAccessToken } from "@/utils/getHumeAccessToken";
import dynamic from "next/dynamic";
import CustomCursor from "./CustomCursor";
import { Mic } from "lucide-react";

const Chat = dynamic(() => import("@/components/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  return (
    <div className={"grow flex flex-col"}>
      <Chat accessToken={accessToken} />
      
      {/* <AudioVisualizer accessToken={accessToken}/> */}
    </div>
  );
}
