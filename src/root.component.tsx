import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./sign-up/pages/sign-up";
import SignIn from "./sign-in/pages/sign-in";
import NotFound from "./not-found/pages/not-found";

export default function Root(props) {
  return (
    <BrowserRouter basename="/auth">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
