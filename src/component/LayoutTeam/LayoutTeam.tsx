import { Navigation } from "../Navigation";
import TeamAnalytics from "../TeamAnalytics/TeamAnalytics";
import { useStyles } from "./LayoutTeam.style";

export const LayoutTeam = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation />
      <TeamAnalytics />
    </div>
  );
};

export default LayoutTeam;
