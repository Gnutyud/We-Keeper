import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'rsuite';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AppContext from '../../store/context';
import AdminTable from '../AdminTable';
import styles from './Admin.module.scss';

function Admin() {
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [data, setData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useContext(AppContext);

  const getAllUsers = async () => {
    try {
      const response = await axiosPrivate.get(`/users`);
      setData(
        response
          .map((res) => ({ ...res, id: res._id }))
          .filter((dataItem) => dataItem.id !== auth?.userInfo?.userId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    const sendRequestDeleteUser = (id) => axiosPrivate.delete('/users', { data: { id } });
    const promiseArray = checkedKeys.map(sendRequestDeleteUser);
    Promise.all(promiseArray)
      .then(() => {
        getAllUsers();
        setCheckedKeys([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.admin}>
      <h2 className={styles.title}>User Management</h2>
      <div className={styles.buttonGroup}>
        <Button disabled={!checkedKeys.length} color="red" appearance="primary" onClick={handleDelete}>
          Delete
        </Button>
        <Button appearance="primary" onClick={() => navigate('/register')}>
          Add
        </Button>
      </div>
      <div>
        <AdminTable data={data} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
      </div>
    </div>
  );
}

export default Admin;
