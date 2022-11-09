import React from "react";
import Login from "./components/Login";
import { Route, Routes } from 'react-router-dom';
import MyNotes from "./pages/MyNotes";
import ViewingNoteModal from "./components/ViewingNoteModal";
import PrivateRoute from "./components/helper/PrivateRoute";
import Register from "./components/Register";

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<MyNotes />} />
        <Route path=":id" element={<ViewingNoteModal />} />
      </Route>
      <Route path="*" element={<h1>Page not found!</h1>} />
    </Routes>
  );
}

export default App;
