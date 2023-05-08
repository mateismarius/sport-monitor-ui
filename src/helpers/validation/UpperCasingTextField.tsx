import * as React from 'react';
import {fieldToTextField, TextFieldProps} from 'formik-mui';

import MuiTextField from '@mui/material/TextField';

export function UpperCasingTextField(props: TextFieldProps) {
  const {
    form: {setFieldValue},
    field: {name},
  } = props;
  const onChange = React.useCallback(
    (event: { target: { value: any; }; }) => {
      const {value} = event.target;
      setFieldValue(name, value ? value.toUpperCase() : '');
    },
    [setFieldValue, name]
  );
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}