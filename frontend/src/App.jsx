import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/helper/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import ViewingNoteModal from './components/ViewingNoteModal';
import PageNotFound from './pages/404';
import Admin from './pages/Admin';
import MyNotes from './pages/MyNotes';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/my-profile" element={<PrivateRoute />}>
        <Route index element={<MyProfile />} />
      </Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route index element={<MyNotes />} />
        <Route path=":id" element={<ViewingNoteModal />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
