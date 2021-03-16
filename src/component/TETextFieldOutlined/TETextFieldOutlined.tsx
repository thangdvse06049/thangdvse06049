import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";
import { useStyles } from "./TETextFieldOutlined.style";

const height = 50;

export const TETextFieldOutlined = (props: TextFieldProps) => {
  const classes = useStyles();

  // height of the TextField

  // magic number which must be set appropriately for height
  // const labelOffset = -4;
  // const focused = false;

  const { style, InputLabelProps, inputProps, children, ...rest } = props;

  return (
    <TextField
      style={{ height, ...style }}
      /* styles the label component */
      InputLabelProps={{
        ...InputLabelProps,
        classes: {
          ...InputLabelProps?.classes,
          shrink: classes.inputLabelShrink,
        },
      }}
      /* styles the input component */
      SelectProps={{
        style: {
          height,
          padding: "0 14px",
        },
      }}
      inputProps={{
        ...inputProps,
        style: {
          ...inputProps?.style,
          height,
          padding: "0 14px",
        },
      }}
      {...rest}
      variant="outlined"
    >
      {children}
    </TextField>
  );
};

export default TETextFieldOutlined;
