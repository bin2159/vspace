import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Chat from "./pages/Dashboard/Chat/Chat";
import ChatBot from "./pages/Dashboard/AppFunctions/ChatBot/ChatBot";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Editor from "./pages/Dashboard/AppFunctions/FunctionExecution/FunctionExecution";
import Ticket from "./pages/Dashboard/AppFunctions/Ticket/Ticket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="chat" element={<Chat />} />
          <Route path="editor" element={<Editor />} />
          <Route path="chatbot" element={<ChatBot />} />
          <Route path="ticketBoard" element={<Ticket/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
