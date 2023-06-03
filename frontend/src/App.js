import React, { createContext , useReducer } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
// import WriteBlog from './components/HomeRoute/WriteBlogO';
// import WriteBlog from './components/HomeRoute/WriteBlog';
import WriteBlog from './components/HomeRoute/WriteBlogE';
import EditBlog from './components/HomeRoute/EditBlog';
import ReadBlog from './components/HomeRoute/ReadBlog';
import Blogs from './components/HomeRoute/Blogs';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logout from './components/Logout';
import Contact from './components/Contact';
import { initialState , reducer } from "./reducer/UseReducer";


export const UserContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>

        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/contact' element={<Contact />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/writeblog' element={<WriteBlog />} />
            <Route exact path='/blogs/:id' element={<ReadBlog />} />
            <Route exact path='/blogs' element={<Blogs />} />
            <Route exact path='/logout' element={<Logout />} />
            <Route exact path='/editBlog/:id' element={<EditBlog />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App

