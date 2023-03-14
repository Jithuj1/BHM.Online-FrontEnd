import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

function Video() {
  const { roomId } = useParams();

  const Meeting = async (element) => {
    const appID = 1178087537;
    const serverSecret = "166b7d84d5cced2b1d0dccc408f60b4f";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Enter your name"
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };
  return (
    <div style={{display:"flex"}}>
      <div ref={Meeting} style={{width:"100vw", height:"80vh"}}/>
    </div>
  );
}

export default Video;
