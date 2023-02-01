import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import "react-bulma-components/dist/react-bulma-components.min.css";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='sign-in' element={<SignIn />} />
      <Route path='dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
