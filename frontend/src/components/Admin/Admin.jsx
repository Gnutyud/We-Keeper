import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'rsuite';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import appApi from '../../services/appApi';
import AppContext from '../../store/context';
import AdminTable from '../AdminTable';
import AddNewUser from './AddNewUser';
import styles from './Admin.module.scss';

const defaultValues = {
  username: '',
  email: '',
  status: '',
  roles: '',
  password: '',
  verifyPassword: '',
};

function Admin() {
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [data, setData] = useState([]);
  const [isShowAddUser, setIsShowAddUser] = useState(false);
  const formRef = React.useRef();
  const [formValue, setFormValue] = React.useState(defaultValues);
  const [formError, setFormError] = React.useState({});

  const axiosPrivate = useAxiosPrivate();
  // const navigate = useNavigate();
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

  const handleClose = () => {
    setIsShowAddUser(false);
  };

  const handleOpen = () => {
    setIsShowAddUser(true);
  };

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      console.error('Form Error', formError);
      return;
    }
    try {
      await appApi.register(formValue);
      getAllUsers();
      handleClose();
      setFormValue(defaultValues);
    } catch (err) {
      if (err.response?.data?.message) {
        setFormError({ ...formError, error: err.response.data.message });
      } else if (err.errors?.message) {
        console.log(err.errors.message);
        setFormError({ ...formError, error: err.errors.message });
      } else {
        setFormError({ ...formError, error: err.message });
      }
    }
  };

  return (
    <div className={styles.admin}>
      <h2 className={styles.title}>User Management</h2>
      <div className={styles.buttonGroup}>
        <Button disabled={!checkedKeys.length} color="red" appearance="primary" onClick={handleDelete}>
          Delete
        </Button>
        <Button appearance="primary" onClick={handleOpen}>
          Add
        </Button>
      </div>
      <div>
        <AdminTable
          data={data}
          checkedKeys={checkedKeys}
          setCheckedKeys={setCheckedKeys}
          getUsers={getAllUsers}
        />
      </div>
      <Modal open={isShowAddUser} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>Add New User</Modal.Title>
          {formError?.error && (
            <p style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>
              {formError?.error}
            </p>
          )}
        </Modal.Header>
        <Modal.Body>
          <AddNewUser
            formValue={formValue}
            setFormValue={setFormValue}
            formRef={formRef}
            formError={formError}
            setFormError={setFormError}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Admin;
