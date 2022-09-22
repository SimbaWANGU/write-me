import LoginRegister from "./pages/loginRegister";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import PublicPosts from "./pages/public";
import Profile from "./pages/profile";

function Authorized() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicPosts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/login' element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  const user = 1
  return (
    <>
      {user === 1 ? <LoginRegister /> : <Authorized />}
    </>
  );
}

export default App;
