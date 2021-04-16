import React, { useEffect, useState } from "react";
import { useStyles } from "./TeamInformation.style";
import { Team } from "../../models/team";
import { UserCtx } from "../../context/User";

export const TeamInformation = () => {
  const classes = useStyles();
  const [teamInfor, setTeamInfor] = useState<any>();
  const { user } = React.useContext<any>(UserCtx);

  useEffect(() => {
    Team.teamFormation(user.teamId).then((response) => {
      setTeamInfor(response);
    });
  }, [user.teamId]);

  return (
    <div className={classes.root}>
      <div
        className={classes.avatar}
        style={{
          backgroundImage: `url(${
            teamInfor?.imageDataURL || "https://via.placeholder.com/150"
          })`,
        }}
      ></div>
      <div className={classes.teamName}>{teamInfor?.name}</div>
    </div>
  );
};

export default TeamInformation;
