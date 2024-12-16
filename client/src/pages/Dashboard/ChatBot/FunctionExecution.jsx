import AceEditor from "react-ace";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function Editor() {
  // This function will be called to run the code
  function onRunCode(newValue) {
    try {
      // Use eval to execute the code in the context of the browser
      // Be careful with eval, as it can introduce security risks if user input is not sanitized
      eval(newValue);
     const output = JSON.parse(newValue);
     output();
    } catch (error) {
      console.error("Error executing code:", error);
    }
  }

  function onChange(newValue) {
    // console.log("Code changed:", newValue);
    const output = JSON.parse(JSON.stringify(newValue));
    const dynamicFunction =  new Function(output);
    dynamicFunction();
    // output();
  }

  return (
    <aside className="relative w-full">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-3">
          <SidebarTrigger />
          <AceEditor
            placeholder="Write your JavaScript code here"
            mode="javascript"
            theme="monokai"
            name="code-editor"
            onChange={onChange}
            fontSize={14}
            lineHeight={19}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={`function onLoad() {
              console.log("i loaded");
            }`}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              enableMobileMenu: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          <div className="mt-4">
            <button
              onClick={() => onRunCode(document.querySelector("textarea").value)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Run Code
            </button>
          </div>
        </main>
      </SidebarProvider>
    </aside>
  );
}

export default Editor;
