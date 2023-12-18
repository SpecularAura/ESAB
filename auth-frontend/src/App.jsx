import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthProvider from "./context/authProvider";
import Authenticated from "./components/auth/Authenticated";
import Home from "./pages/Home";
import Logout from "./pages/auth/Logout";

const App = () => (
  <ChakraProvider>
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/home" element={<Authenticated />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </ChakraProvider>
);

export default App;
