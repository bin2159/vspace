import ChatWindow from "./ChatWindow";
import { ChatContext } from "@/context/ChatContext";
import { useState } from "react";
import SideBarWrapper from "@/components/resusable/SideBarWrapper/SideBarWrapper";
export default function ChatBot() {
  const [chatText, setChatText] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <SideBarWrapper>
        <ChatContext.Provider
          value={{ chatText, setChatText, loading, setLoading }}
        >
          <ChatWindow />
        </ChatContext.Provider>
      </SideBarWrapper>
    </>
  );
}
