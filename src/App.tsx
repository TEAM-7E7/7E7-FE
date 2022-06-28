import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
