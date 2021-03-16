import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 50,
    minHeight: 50,
    maxHeight: 50,
    marginBottom: `${theme.spacing(1)}px`,
    display: "flex",
    "& > div": {
      marginRight: `${theme.spacing(1)}px`,
      "&:last-child": {
        marginRight: 0,
      },
    },
  },
  textFieldInputProps: {
    height: 50,
  },
  inputLabelShrink: {
    "&.MuiInputLabel-outlined": {
      transform: `translate(14px, -0px) scale(0.75)`,
    },
  },
}));
