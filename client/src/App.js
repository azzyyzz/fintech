import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar";
import Trade from "./pages/Trade/Trade";
import Deposit from "./pages/Deposit/Deposit";

const router = createBrowserRouter([
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "trade",
    element: <Trade />,
  },
  {
    path: "deposit",
    element: <Deposit />,
  },
  {
    path: "/",
    element: <Trade />,
  },
]);

function App() {
  return (
    <UserProvider>
      {/* <Navbar/> */}
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App;
