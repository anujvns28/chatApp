import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerfyEmail from "./pages/VerfyEmail";
import Request from "./pages/Request";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";


function App() {
  return (
    <div className="h-[100vh] w-full">
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/verfyEmail" element={<VerfyEmail/>} />
      <Route path="/request/:token" element= {<Request/>} />
      <Route path="/update-password/:token" element = {<UpdatePassword/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
     </Routes>
    </div>
  );
}

export default App;
