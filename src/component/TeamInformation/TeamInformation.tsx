import React, { useEffect, useState } from "react";
import { useStyles } from "./TeamInformation.style";
import { Team } from "../../models/team";

export const TeamInformation = () => {
  const classes = useStyles();
  const [teamInfor, setTeamInfor] = useState<any>();
  useEffect(() => {
    Team.teamFormation().then((response) => {
      setTeamInfor(response);
    });
  }, []);
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
