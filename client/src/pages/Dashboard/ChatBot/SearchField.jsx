import { useContext, useState } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function SearchField() {
  const { chatText, setChatText } = useContext(ChatContext);
  const [promptText, setPromptText] = useState("");
  const [loading, setLoading] = useState(false);

  const getChatResponse = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/ask/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptText }),
      });
      const data = await response.json();

      if (response.ok) {
        setChatText((prev) => [...prev, data.response]); // Assuming the API response contains `response` field
      } else {
        console.error("Error in API response:", data.message || "Unknown error");
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
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm p-6">
          <label htmlFor="promtInput" className="sr-only">
            Prompt Input
          </label>
          <textarea
            id="promtInput"
            name="promtInput"
            rows={1}
            placeholder="Write your prompt..."
            className={`block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            value={promptText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            {loading && (
              <div className="loader border-t-2 border-indigo-600 rounded-full w-5 h-5 animate-spin"></div>
            )}
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
      <style>{`
        .loader {
          border: 2px solid transparent;
        }
      `}</style>
    </>
  );
}
