import React from "react"
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Home/Home";
import { ReactQueryDevtools } from 'react-query/devtools'
import Post from "./Post/Post";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/post/:id" element={<Post />} />
          </Routes>
          <Routes>
            <Route path="/:id" element={<Home />} />
          </Routes>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
export default App;