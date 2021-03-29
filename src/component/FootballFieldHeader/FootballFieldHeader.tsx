import { Button, MenuItem } from "@material-ui/core";
import React, { useEffect } from "react";
import { FORMATIONS } from "../../constants/formation";
import { TETextFieldOutlined } from "../TETextFieldOutlined";
import { useStyles } from "./FootballFieldHeader.style";
import { map } from "lodash";
import { FootballFieldCtx } from "../../context/FootballField";
import { Formation } from "../../models/formation";

export const FootballFieldHeader = () => {
  const classes = useStyles();
  const { formation, rank, budget } = React.useContext(FootballFieldCtx);

  useEffect(() => {
    Formation.list().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div className={classes.root}>
      <TETextFieldOutlined
        id="input-budget"
        label="Budget Max Player"
        type="number"
        defaultValue={budget}
        fullWidth
      />
      <TETextFieldOutlined
        id="input-rank"
        label="Rank"
        type="number"
        defaultValue={rank}
        fullWidth
      />
      <TETextFieldOutlined
        id="input-formation"
        label="Formation"
        select
        defaultValue={formation}
        fullWidth
      >
        {map(FORMATIONS, (v: Array<any>, formation: string, i: number) => (
          <MenuItem key={i} value={formation}>
            {formation}
          </MenuItem>
        ))}
      </TETextFieldOutlined>
      <Button variant="contained" color="primary" fullWidth>
        Refresh
      </Button>
    </div>
  );
};

export default FootballFieldHeader;
