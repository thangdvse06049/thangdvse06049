import { Button, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { TETextFieldOutlined } from "../TETextFieldOutlined";
import { useStyles } from "./FootballFieldHeader.style";
import { FootballFieldCtx } from "../../context/FootballField";
import { Formation } from "../../models/formation";
import { map, maxBy, sortBy } from "lodash";
import { UserCtx } from "../../context/User";

export const FootballFieldHeader = () => {
  const classes = useStyles();
  const { rank, budget, updateFormation, updateFilters, updatePlayer } =
    React.useContext<any>(FootballFieldCtx);

  const { user } = React.useContext<any>(UserCtx);
  const [listFormations, setListFormations] = useState([] as any);
  const [localFormation, setLocalFormation] = useState(null as any);
  const [localRank, setLocalRank] = useState<any>(rank);

  const loadScheme = async (scheme: string) => {
    const players = await Formation.getScheme(scheme);

    const formation = {
      scheme,
      players,
    };
    updateFormation(formation);
    updatePlayer(formation.players[2]);
  };

  useEffect(() => {
    rank && setLocalRank(rank);
  }, [rank]);

  useEffect(() => {
    if (user) {
      Formation.list().then((response) => {
        const formations = map(response?.formations, (obj, scheme) => ({
          scheme,
          percentUsed: Math.floor(obj.ratioUsed * 100),
          ...obj,
        }));
        const max = maxBy(formations, (o) => o.percentUsed);

        setLocalFormation(max);
        const sortedByScheme = sortBy(formations, (o: any) => o.scheme.length);
        setListFormations(sortedByScheme);
        loadScheme(max?.scheme);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onChangeFormation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const scheme = event.target.value;
    const formation = listFormations.find((f: any) => f.scheme === scheme);
    setLocalFormation(formation);
  };

  const onChangeRank = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalRank(event.target.value);
  };

  const onApply = async () => {
    loadScheme(localFormation.scheme);
    updateFilters(localRank);
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
        inputProps={{ min: 0 }}
        onChange={onChangeRank}
        value={localRank}
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
            {formation.scheme &&
              `${formation.scheme} (${formation.percentUsed}%) - ${formation.countMatches} times`}
          </MenuItem>
        ))}
      </TETextFieldOutlined>
      <Button
        variant="contained"
        color="primary"
        className={classes.refreshBtn}
        onClick={onApply}
      >
        Refresh
      </Button>
    </div>
  );
};

export default FootballFieldHeader;
