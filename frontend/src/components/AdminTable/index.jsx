import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Checkbox, IconButton, Popover, Table, Whisper, Modal, Button, InputPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import styles from './AdminTable.module.scss';

const { Column, HeaderCell, Cell } = Table;

const ImageCell = ({ rowData, dataKey, ...props }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block',
      }}
    >
      <img src={rowData.avatar} width="40" alt="avatar" />
    </div>
  </Cell>
);

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const ActionCell = ({ rowData, dataKey, getAllUsers, ...props }) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { id, roles } = rowData;
  const [openModal, setOpenModal] = React.useState(false);
  const [roleValue, setRoleValue] = React.useState(roles);

  const handleDeleteUser = async () => {
    try {
      await axiosPrivate.delete('/users', { data: { id } });
      getAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUserRole = async () => {
    try {
      if (roleValue !== roles) {
        await axiosPrivate.patch('/users/role', { id, role: roleValue });
        getAllUsers();
      }
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Cell {...props} className="link-group">
      <Whisper
        placement="autoVerticalStart"
        trigger="click"
        speaker={
          <Popover>
            <div className={styles.renderMenu}>
              <button onClick={() => navigate(`/my-profile/${id}`)}>View Profile</button>
              <button onClick={() => setOpenModal(true)}>Edit Role</button>
              <button onClick={handleDeleteUser}>Delete</button>
            </div>
          </Popover>
        }
      >
        <IconButton appearance="subtle" icon={<IoIosMore />} />
      </Whisper>
      <Modal size="xs" open={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <Modal.Title>Update User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputPicker
            value={roleValue}
            onChange={setRoleValue}
            data={['admin', 'user'].map((item) => ({ label: item, value: item }))}
            style={{ width: '100%' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditUserRole} appearance="primary">
            Ok
          </Button>
          <Button onClick={() => setOpenModal(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Cell>
  );
};

function AdminTable(props) {
  const { data, checkedKeys, setCheckedKeys, getUsers } = props;
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);
  //   const [checkedKeys, setCheckedKeys] = React.useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checkedValue) => {
    const keys = checkedValue ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };

  const handleCheck = (value, checkedValue) => {
    const keys = checkedValue ? [...checkedKeys, value] : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        }
        return y - x;
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumns, sortTypes) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumns);
      setSortType(sortTypes);
    }, 500);
  };

  return (
    <Table
      height={420}
      data={getData()}
      fillHeight
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
    >
      <Column width={50} align="center">
        <HeaderCell style={{ padding: 0 }}>
          <div style={{ lineHeight: '40px' }}>
            <Checkbox inline checked={checked} indeterminate={indeterminate} onChange={handleCheckAll} />
          </div>
        </HeaderCell>
        <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
      </Column>
      <Column width={75} align="center">
        <HeaderCell>Avartar</HeaderCell>
        <ImageCell dataKey="avartar" />
      </Column>
      <Column flexGrow={1} fixed sortable>
        <HeaderCell>Username</HeaderCell>
        <Cell dataKey="username" />
      </Column>
      <Column width={100} sortable>
        <HeaderCell>Notes</HeaderCell>
        <Cell dataKey="totalNotes" />
      </Column>
      <Column sortable flexGrow={1.5}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
      <Column flexGrow={1} sortable>
        <HeaderCell>Role</HeaderCell>
        <Cell dataKey="roles" />
      </Column>
      <Column flexGrow={1.5} sortable>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="status" />
      </Column>
      <Column flexGrow={1.5}>
        <HeaderCell>{/* <IoIosMore /> */}</HeaderCell>
        <ActionCell dataKey="id" getAllUsers={getUsers} />
      </Column>
    </Table>
  );
}

export default AdminTable;
