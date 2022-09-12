import React from "react"
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
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
            <Route path="*" element={<Navigate to="/1" replace />} />
            <Route path="/:id" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  )
}
export default App;