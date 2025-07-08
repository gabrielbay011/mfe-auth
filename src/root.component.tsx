import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./not-found/pages/not-found";
import Home from "./home/pages";
import { ApolloProvider } from "@apollo/client";
import { apolloPublicClient } from "./lib/apollo-client";

export default function Root(props) {
  return (
    <ApolloProvider client={apolloPublicClient}>
      <BrowserRouter basename="/auth">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
