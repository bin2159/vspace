import { useContext, useState } from "react";
import { ChatContext } from "@/context/ChatContext";
export default function SearchField() {
  const { chatText, setChatText } = useContext(ChatContext);
  const [promptText, setPromptText] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default behavior
    console.log(event);
    setChatText([...chatText, event.target.elements.promtInput.value]);
    setPromptText("");
  };
  const handleChange = (event) => {
    setPromptText(event.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="relative">
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm p-6">
          <label htmlFor="promtInput" className="sr-only">
            Promt Input
          </label>
          <textarea
            id="promtInput"
            name="promtInput"
            rows={1}
            placeholder="Write your prompt..."
            className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            value={promptText}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            <></>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
