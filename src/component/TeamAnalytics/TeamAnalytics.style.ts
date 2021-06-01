import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  analyticPanel: {
    display: "flex",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  radarChart: {
    minWidth: "50%",
    display: "block",
  },
  details: {
    borderLeft: "1px solid #E1E3EB",
    width: "50%",
    minWidth: "50%",
  },
  sentenceContent: {},
  expandDetails: {
    marginLeft: "1rem",
    height: 630,
    maxHeight: 630,
    overflowY: "scroll",
  },
  expandGroup: {
    width: "100%",
    padding: "10px 0px",
  },
  accordionSummary: {
    alignItems: "center",
    "& > div": {
      marginRight: "0.5rem",
    },
  },
  sentence: {
    marginBottom: "1rem",
  },
  categoryAdvice: {
    fontSize: 16,
    lineHeight: "21px",
    fontWeight: 400,
  },
  sentenceTitle: {
    fontWeight: 700,
    fontSize: 12,
    lineHeight: "18px",
  },
  performances: {
    margin: "1rem 0",
    width: "100%",
    marginTop: "1rem",
  },
  performancesBody: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryKpi: {
    width: "33%",
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  summaryKpiLabel: {},
  advices: {
    margin: 0,
  },
  heading: {
    fontWeight: 700,
  },
  secondaryHeading: {
    fontWeight: 500,
  },
  detailBox: {
    paddingBottom: 5,
    "& > p": {
      "&:first-child": {
        fontSize: "0.75rem",
        fontWeight: 700,
      },
      "&:last-child": {
        fontSize: "0.75rem",
      },
    },
  },
  detaislRoot: {
    display: "block",
  },
  percent: {
    textAlign: "center",
    width: 30,
    borderRadius: 3,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    color: "#FFFFFF",
  },
  separator: {
    background: "#E1E3EA",
    height: 1,
    width: "100%",
    margin: "1rem 0",
  },
  chartLegend: {
    display: "flex",
    width: "100%",
    marginLeft: "1rem",
    // justifyContent: 'center',
    marginBottom: "1rem",
    alignItems: "center",
  },
  chartItemNote: {
    fontSize: 12,
  },
  chartItemLegend: {
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    height: "30px",
    padding: "7px",
    boxShadow: `0px 2px 13px rgba(59, 89, 152, 0.12)`,
    marginRight: "0.5rem",
  },
  chartItemLegendBadge: {
    width: 16,
    height: 16,
    marginRight: "1rem",
    "&.terrible": {
      background: "#68369a",
    },
    "&.bad": {
      background: "#ec3323",
    },
    "&.average-but-bad": {
      background: "#df8244",
    },
    "&.average-but-good": {
      background: "#e4bd26",
    },
    "&.good": {
      background: "#4BAC5B",
    },
    "&.very-good": {
      background: "#4BAEEA",
    },
  },
  chartItemLegendText: {
    fontSize: "15px",
    fontWeight: 500,
  },
  chartBalance: {
    marginTop: "2rem",
  },
  chartBalanceTitle: {
    marginBottom: "1rem",
  },
  advice: {
    fontSize: 12,
    marginBottom: "0.5rem",
  },
  listWorstPlayer: {
    display: "flex",
  },
  playerAvatar: {
    minHeight: 38,
    minWidth: 38,
    maxHeight: 38,
    maxWidth: 38,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "#fff",
  },
  playerName: {
    textTransform: "uppercase",
    fontStyle: "italic",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    alignItems: "center",
    verticalAlign: "middle",
    padding: `${theme.spacing(1)}px`,
  },
  playerBottom: {
    marginLeft: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    background: "cadetblue",
    color: "#fff",
    fontWeight: 500,
    height: 35,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    position: "relative",
    display: "flex",
    width: 140,
  },
  chartHeader: {
    display: "flex",
  },
  avgTpi: {
    width: "30%",
    fontSize: 20,
    fontWeight: 500,
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    marginTop: 20,
  },
  autoCompleteSeason: { width: "95%" },
  backColor: {
    "& > div > div > input ": {
      width: 170,
      background: "none !important",
      marginTop: 5,
      caretColor: "black !important",
    },
    width: 200,
    marginLeft: 20,
  },
  noDataNoti: {
    marginLeft: 20,
  },
  typo: {
    padding: 5,
    fontSize: 15,
    fontWeight: 500,
  },
  radarChartLeft: {
    marginTop: 10,
  },
  circular: {
    width: "100%",
    height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryBubble: {
    marginTop: 30,
  },
  headingBubble: {
    display: "flex",
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  playerAvatarBottom: {
    minHeight: 38,
    minWidth: 40,
    maxHeight: 38,
    maxWidth: 40,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor: "#fff",
    marginLeft: 20,
    border: "1px solid #dcd1d0",
  },
  footballBalance: {
    padding: 20,
    // marginBottom: 20,
  },
}));
