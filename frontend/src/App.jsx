import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/helper/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import ViewingNoteModal from './components/ViewingNoteModal';
import PageNotFound from './pages/404';
import AdminPage from './pages/AdminPage';
import MyNotes from './pages/MyNotes';
import MyProfilePage from './pages/MyProfilePage';
import MySetting from './components/MySetting';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<PrivateRoute />}>
        <Route
          index
          element={
            <Layout>
              <AdminPage />
            </Layout>
          }
        />
      </Route>
      <Route path="/my-profile" element={<PrivateRoute />}>
        <Route
          index
          // path=':userId'
          element={
            <Layout>
              <MyProfilePage />
            </Layout>
          }
        />
        <Route
          path=":userId"
          element={
            <Layout>
              <MyProfilePage />
            </Layout>
          }
        />
      </Route>
      <Route path="/my-setting" element={<PrivateRoute />}>
        <Route
          index
          element={
            <Layout>
              <MySetting />
            </Layout>
          }
        />
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
