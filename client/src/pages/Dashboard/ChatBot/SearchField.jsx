import { useContext, useState } from "react";
import { ChatContext } from "@/context/ChatContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SearchField() {
  const { chatText, setChatText, loading, setLoading } =
    useContext(ChatContext);
  const [promptText, setPromptText] = useState("");
  const [ai, setAi] = useState("gemini");

  const getChatResponse = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/ai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ai: ai, prompt: promptText }),
      });
      const data = await response.json();

      if (response.ok) {
        const parsedResponse = data.response.replace(/\\n/g, "\n");
        setChatText((prev) => [...prev, parsedResponse]); // Assuming the API response contains `response` field
      } else {
        console.error(
          "Error in API response:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default behavior
    setChatText([...chatText, event.target.elements.promtInput.value]);
    setPromptText("");
    getChatResponse();
  };

  const handleChange = (event) => {
    setPromptText(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      if (promptText.trim()) {
        setChatText([...chatText, e.target.value]);
        setPromptText(""); // Clear the input
        getChatResponse();
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col rounded-xl bg-gray-200 shadow-sm px-4 py-2 mt-16">
          <label htmlFor="promtInput" className="sr-only">
            Prompt Input
          </label>
          <Textarea
            id="promtInput"
            name="promtInput"
            rows={2}
            placeholder="Write your prompt..."
            className={`w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            value={promptText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <div className="flex justify-between w-full">
            <div className="flex justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-500 text-white inline-flex items-center px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50">
                  {ai}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[200px] bg-white border border-gray-300 rounded-xl mt-1 shadow-lg">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onSelect={()=>setAi("gemini")}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      Gemini
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={()=>setAi("openai")}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      OpenAI
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={()=>setAi("claude")}
                      className="px-4 py-2 hover:bg-gray-200"
                    >
                      Claude
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm outline-none font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div
                      className="loader border-t-2 border-white border-opacity-80 border-white rounded-full w-4 h-4 animate-spin"
                      aria-label="Loading"
                    ></div>
                    <div>Please wait</div>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        .loader {
          border: 2px solid dashed;
        }
      `}</style>
    </>
  );
}
