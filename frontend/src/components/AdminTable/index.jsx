import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Checkbox, IconButton, Popover, Table, Whisper } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
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

const ActionCell = ({ rowData, dataKey, ...props }) => {
  const navigate = useNavigate();

  return (
    <Cell {...props} className="link-group">
      <Whisper
        placement="autoVerticalStart"
        trigger="click"
        speaker={
          <Popover>
            <div className={styles.renderMenu}>
              <button onClick={() => navigate(`/my-profile/${rowData.id}`)}>View Profile</button>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </Popover>
        }
      >
        <IconButton appearance="subtle" icon={<IoIosMore />} />
      </Whisper>
    </Cell>
  );
};

function AdminTable(props) {
  const { data, checkedKeys, setCheckedKeys } = props;
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
      <Column flexGrow={1}>
        <HeaderCell>{/* <IoIosMore /> */}</HeaderCell>
        <ActionCell dataKey="id" />
      </Column>
    </Table>
  );
}

export default AdminTable;
