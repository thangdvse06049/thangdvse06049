import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  analyticPanel: {
    display: "flex",
    padding: 16,
  },
  radarChart: {
    minWidth: "50%",
    display: "block",
  },
  details: {
    borderLeft: "1px solid #E1E3EB",
    width: "100%",
  },
  sentenceContent: {},
  expandDetails: {
    marginLeft: "1rem",
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
    "&.very-bad": {
      background: "#FF0000",
    },
    "&.bad": {
      background: "#ED7D31",
    },
    "&.normal": {
      background: "#7030A0",
    },
    "&.good": {
      background: "#00B050",
    },
    "&.very-good": {
      background: "#00B0F0",
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
}));
