import { Button, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TETextFieldOutlined } from "../TETextFieldOutlined";
import { useStyles } from "./FootballFieldHeader.style";
import { FootballFieldCtx } from "../../context/FootballField";
import { Formation } from "../../models/formation";
import { map, maxBy } from "lodash";

export const FootballFieldHeader = () => {
  const classes = useStyles();
  const { rank, budget, updateFormation } = React.useContext<any>(
    FootballFieldCtx
  );
  const [listFormations, setListFormations] = useState([] as any);
  const [localFormation, setLocalFormation] = useState(null as any);

  const loadScheme = async (scheme: string) => {
    const players = await Formation.getScheme(scheme);
    const formation = {
      scheme,
      players,
    };
    updateFormation(formation);
  };

  useEffect(() => {
    Formation.list().then((response) => {
      const formations = map(response.formations, (obj, scheme) => ({
        scheme,
        ...obj,
      }));

      const max = maxBy(formations, "count");
      setLocalFormation(max);
      setListFormations(formations);

      loadScheme(max.scheme);
    });
  }, []);

  const onChangeFormation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const scheme = event.target.value;
    const formation = listFormations.find((f: any) => f.scheme === scheme);
    setLocalFormation(formation);
  };

  const onApply = async () => {
    loadScheme(localFormation.scheme);
  };

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
        key={listFormations.length}
        defaultValue={localFormation?.scheme}
        value={localFormation?.scheme}
        fullWidth
        onChange={onChangeFormation}
      >
        {map(listFormations, (formation: any, i: number) => (
          <MenuItem key={i} value={formation.scheme}>
            {formation.scheme}
          </MenuItem>
        ))}
      </TETextFieldOutlined>
      <Button variant="contained" color="primary" fullWidth onClick={onApply}>
        Refresh
      </Button>
    </div>
  );
};

export default FootballFieldHeader;
