import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./AppSidebar";
import ChatWindow from './ChatWindow'
export default function ChatBot(){
  return (
    <>
  <aside className='relative w-full '>
    {/* Secondary column (hidden on smaller screens) */}
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-3">
        <SidebarTrigger />
        <ChatWindow />
      </main>
    </SidebarProvider>
  </aside></>
  )
}