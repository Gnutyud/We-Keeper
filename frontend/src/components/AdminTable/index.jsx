import React from 'react';
import { IoIosMore } from 'react-icons/io';
import { Checkbox, IconButton, Popover, Table, Whisper } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

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

const speaker = (
  <Popover title="Title">
    <p>This is a default Popover </p>
    <p>Content</p>
    <p>link</p>
  </Popover>
);

const ActionCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} className="link-group">
    <Whisper placement="autoVerticalStart" trigger="click" speaker={speaker}>
      <IconButton appearance="subtle" icon={<IoIosMore />} />
    </Whisper>
  </Cell>
);

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
      height={600}
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
      <Column width={80} align="center">
        <HeaderCell>Avartar</HeaderCell>
        <ImageCell dataKey="avartar" />
      </Column>
      <Column width={230} fixed sortable>
        <HeaderCell>Username</HeaderCell>
        <Cell dataKey="username" />
      </Column>
      <Column width={400} sortable>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey="status" />
      </Column>
      <Column width={200} sortable>
        <HeaderCell>Role</HeaderCell>
        <Cell dataKey="roles" />
      </Column>
      <Column sortable flexGrow={1}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
      <Column width={120}>
        <HeaderCell>{/* <IoIosMore /> */}</HeaderCell>
        <ActionCell dataKey="id" />
      </Column>
    </Table>
  );
}

export default AdminTable;
