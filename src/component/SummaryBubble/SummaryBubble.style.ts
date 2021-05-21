import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "0px calc(20px - 0.5rem)",
  },
  kpi: {
    margin: "0 0.5rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  kpiTitle: {
    fontWeight: 700,
    size: "16px",
    lineHeight: "24px",
    textAlign: "center",
    textTransform: "uppercase",
  },
  kpiConnector: {
    width: 2,
    height: 23,
    background: "#E1E3EB",
    position: "relative",
  },
  kpiConnectorCircle: {
    position: "absolute",
    left: -5,
    bottom: -6,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#E1E3EB",
  },
  kpiDetails: {
    width: "100%",
    padding: "23px 5px",
    border: "1px solid #E1E3EB",
    borderRadius: 6,
    background: "#F5F7FA",
  },
  kpiDetailsTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
  kpiDetailsRow: {
    fontSize: 12,
    marginLeft: 8,
  },
  kpiRank: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 700,
    width: 120,
    height: 120,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&.excellent": {
      background: "#4BAEEA",
    },
    "&.good": {
      background: "#4BAC5B",
    },
    "&.average-but-good": {
      background: "#e4bd26",
    },
    "&.average-but-bad": {
      background: "#df8244",
    },
    "&.bad": {
      background: "#ec3323",
    },
    "&.terrible": {
      background: "#68369a",
    },
  },
}));
