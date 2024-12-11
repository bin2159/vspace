import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import ChatWindow from "./ChatWindow";
import { ChatContext } from "@/context/ChatContext";
import { useState } from "react";
export default function ChatBot() {
  const [chatText,setChatText] = useState([]);
  const [chatResponse,setChatResponse] = useState();
  return (
    <>
      <aside className="relative w-full ">
        {/* Secondary column (hidden on smaller screens) */}
        <ChatContext.Provider value={{chatText,setChatText,chatResponse,setChatResponse}}>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full p-3">
              <SidebarTrigger />
              <ChatWindow />
            </main>
          </SidebarProvider>
        </ChatContext.Provider>
      </aside>
    </>
  );
}
