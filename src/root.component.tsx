import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./front-end/pages/sign-up";
import SignIn from "./front-end/pages/sign-in";
import { isAuthenticated } from "./back-end/services/is-authenticated";
import Home from "./front-end/pages/home";
import NotFound from "./front-end/pages/not-found";

export default function Root(props) {
  return (
    <BrowserRouter basename="/auth">
      <Routes>
        <Route
          path="/signin"
          element={isAuthenticated("1") ? <Home /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isAuthenticated("1") ? <Home /> : <SignUp />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
