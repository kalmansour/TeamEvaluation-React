// Libraries
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react";

// Screens
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import AdminHome from "../screens/AdminHome";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/" element={<AdminHome />} />
        <Route path="/register/" element={<Signup />} />
        <Route path="/" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default observer(MyRoutes);
