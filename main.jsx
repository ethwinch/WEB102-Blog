import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Header from './routes/Header'
import CreatePost from './routes/CreatePost'
import FullPost from './routes/FullPost'
import EditPost from './routes/EditPost'
import NotFound from './routes/NotFound'

import { BrowserRouter, Route, Routes } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />} >
        <Route index element={<App />}/>
        <Route path="create_post" element={<CreatePost />} />
        <Route path="post/:post" element={<FullPost />} />
        <Route path="edit_post/:post" element={<EditPost />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
)
