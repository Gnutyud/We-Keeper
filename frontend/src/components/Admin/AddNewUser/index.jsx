import React from 'react';
import { Form, Input, InputPicker, Schema } from 'rsuite';

const selectData = ['admin', 'user'].map((item) => ({
  label: item,
  value: item,
}));

const { StringType } = Schema.Types;

const model = Schema.Model({
  username: StringType().isRequired('This field is required.'),
  email: StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
  status: StringType(),
  roles: StringType(),
  password: StringType().isRequired('This field is required.'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }

      return true;
    }, 'The two passwords do not match')
    .isRequired('This field is required.'),
});

const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const AddNewUser = (props) => {
  const { formValue, setFormValue, formRef, setFormError } = props;

  return (
    <Form ref={formRef} onChange={setFormValue} onCheck={setFormError} formValue={formValue} model={model}>
      <TextField name="username" label="Username" />
      <TextField name="email" label="Email" />
      <Form.Group controlId="roles">
        <Form.ControlLabel>Select Role</Form.ControlLabel>
        <Form.Control name="roles" data={selectData} accepter={InputPicker} style={{ width: '300px' }} />
      </Form.Group>
      <Form.Group controlId="status">
        <Form.ControlLabel>Status</Form.ControlLabel>
        <Form.Control rows={5} name="status" accepter={Textarea} />
      </Form.Group>
      <TextField name="password" label="Password" type="password" autoComplete="off" />
      <TextField name="verifyPassword" label="Verify password" type="password" autoComplete="off" />
    </Form>
  );
};

export default AddNewUser;
