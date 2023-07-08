import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

export default function App() {

  let loggedIn = true;

  return (
   <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path = "/room" element = {<Room loggedIn = {loggedIn} />}/>
      </Routes>
   </BrowserRouter>
  )
}