import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./not-found/pages/not-found";
import Home from "./home/pages";

export default function Root(props) {
  return (
    <BrowserRouter basename="/auth">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
