import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./sign-up/pages/sign-up";
import SignIn from "./front-end/pages/sign-in";
import NotFound from "./not-found/pages/not-found";
import { userIsAuthenticated } from "./back-end/services/user-is-authenticated";

export default function Root(props) {
  return (
    <BrowserRouter basename="/auth">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
