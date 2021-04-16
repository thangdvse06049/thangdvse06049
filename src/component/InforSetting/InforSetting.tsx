import React, { useEffect, useState } from "react";
import { useStyles } from "./InforSetting.style";
import { UserCtx } from "../../context/User";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Autocomplete } from "@material-ui/lab";
import { Season } from "../../models/season";
import { Team } from "../../models/team";
import { User } from "../../models/user";
import { find } from "lodash";

export const InforSetting = (props: any) => {
  const { openSettings, setOpenSettings } = props;
  const classes = useStyles();
  const { user, update, login } = React.useContext<any>(UserCtx);
  const [season, setSeason] = useState<any>();
  const [team, setTeam] = useState<any>();

  const [seasonOption, setSeasonOption] = useState<any>([]);
  const [teamOption, setTeamOption] = useState<any>([]);

  const onChangeSeason = (event: any, option: any) => {
    setSeason(option);
  };

  const onChangeTeam = (event: any, option: any) => {
    setTeam(option);
  };

  const onApplySetting = async () => {
    if (season?._id && team?._id) {
      update({ ...user, seasonId: season._id, teamId: team._id });
      try {
        await User.updateUser({
          seasonId: season._id,
          teamId: team._id,
        });

        const res = await User.refreshToken();
        login(res.data.token);
      } catch (e) {
        console.log(e);
      }
    }

    setOpenSettings(false);
  };

  useEffect(() => {
    fetchSeason();
  }, []);

  useEffect(() => {
    if (season) {
      fetchTeam();
    }
  }, [season]);

  const fetchSeason = async () => {
    const resSeason = await Season.getListSeasonByCompetitionId();
    const season = find(resSeason, { _id: user.seasonId });
    setSeasonOption(resSeason);
    setSeason(season);
  };

  const fetchTeam = async () => {
    const resTeam = await Team.getListTeamBySeasonId(season._id);
    const team = find(resTeam, { _id: user.teamId });
    setTeamOption(resTeam);
    setTeam(team);
  };

  return (
    <div>
      <Dialog open={openSettings} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">User Settings</DialogTitle>
        <DialogContent>
          <div className={classes.listSettings}>
            <Autocomplete
              className={classes.backColor}
              options={seasonOption.map((c: any) => ({
                name: c.name,
                _id: c._id,
              }))}
              getOptionLabel={(option: any) => option.name}
              id="auto-complete"
              autoComplete
              value={season ? season : null}
              onChange={onChangeSeason}
              includeInputInList
              renderInput={(params: any) => (
                <TextField {...params} label="Season" margin="none" />
              )}
            />

            <Autocomplete
              className={classes.backColor}
              options={teamOption.map((c: any) => ({
                name: c.name,
                _id: c._id,
              }))}
              getOptionLabel={(option: any) => option.name}
              id="auto-complete"
              autoComplete
              value={team ? team : null}
              onChange={onChangeTeam}
              includeInputInList
              renderInput={(params: any) => (
                <TextField {...params} label="Team" margin="none" />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettings(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={onApplySetting} color="primary">
            Refresh
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InforSetting;
