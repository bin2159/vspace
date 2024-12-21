import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/pages/Dashboard/AppFunctions/AppSidebar";

export default function SideBarWrapper({ children }) {
  return (
    <aside className="relative w-full">
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full p-3">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </aside>
  );
}