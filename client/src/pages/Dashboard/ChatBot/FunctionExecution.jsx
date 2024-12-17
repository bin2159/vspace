import AceEditor from "react-ace";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AppSidebar from "./AppSidebar";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useRef, useState } from "react";

function Editor() {
  const [backendResponse, setBackendResponse] = useState("");
  const aceEditorRef = useRef(null); // Ref for the AceEditor

  // This function will be called to run the code
  const onRunCode = async () => {
    try {
      const aceValue = aceEditorRef.current?.editor.getValue(); // Get the value directly from the editor
      const response = await fetch("http://localhost:4000/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ai: "gemini",
          prompt: `Just return the output of the following code and nothing else, but if there are syntax errors, please point them out ${aceValue}`,
        }),
      });
      const data = await response.json();
      setBackendResponse(data.response);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  return (
    <aside className="relative w-full">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {/* Flex container with a defined height */}
          <div className="container flex">
            {/* AceEditor Container */}
            <div className="flex-1 flex flex-col">
              <AceEditor
                ref={aceEditorRef} // Attach the ref to AceEditor
                className="aceeditor flex-1 w-full h-full border rounded-md box-border"
                placeholder="Write your JavaScript code here"
                mode="javascript"
                theme="monokai"
                name="code-editor"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  enableMobileMenu: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  autoScrollEditorIntoView: true,
                }}
              />
            </div>
            {/* Textarea Container */}
            <div className="flex-1 flex flex-col">
              <Textarea
                className="flex-1 w-full h-full resize-none border rounded-md bg-black text-white"
                value={backendResponse}
                disabled
              />
            </div>
          </div>
          {/* Button Container */}
          <div className="mt-4 flex justify-center">
            <Button onClick={onRunCode}>Run Code</Button>
          </div>
        </main>
      </SidebarProvider>
      <style>{`
        .container {
          height : 80%;
        }
           .aceeditor{
          width:100% !important;
          }
      `}</style>
    </aside>
  );
}

export default Editor;
