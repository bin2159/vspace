import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Chat from './pages/Dashboard/Chat/Chat'
import ChatBot from './pages/Dashboard/ChatBot/ChatBot'
// import { useAuth } from './context/AuthContext'
import Login from './pages/Login/Login'
// import Register from './components/Register';
// import Profile from './components/Profile';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
// import Test from './components/Test';
// import ChatLayout from './components/Chat/ChatLayout';

// Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return user ? children : <Navigate to='/login' replace />
// }

function App () {
  return (
    <Router>
      <Routes>
        {/* <Route path="/test" element={<Test/>} /> */}
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='chat' element={<Chat />} />
          <Route path='chatbot' element={<ChatBot />} />
        </Route>
        {/* <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/ForgotPassword" element={<ProtectedRoute><ForgotPassword/></ProtectedRoute>} />
          <Route path="/ResetPassword" element={<ProtectedRoute><ResetPassword/></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatLayout/></ProtectedRoute>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          /> */}
        {/* Default redirect */}
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </Router>
  )
}

export default App
