import React, { useEffect, useState } from 'react';
import AdminTable from '../components/AdminTable';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Admin() {
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axiosPrivate.get(`/users`);
        setData(response.map((res) => ({ ...res, id: res._id })));
      } catch (error) {
        console.error(error);
      }
    };
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    console.log('list id', checkedKeys);
  };
  return (
    <div style={{ height: '100vh' }}>
      <h1>User Management Page</h1>
      <div>
        <AdminTable data={data} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Admin;
