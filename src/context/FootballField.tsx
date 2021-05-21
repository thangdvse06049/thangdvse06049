import React from "react";

const DEFAULT_STATE = {
  formation: "",
  budget: 10000000,
  rank: 5,
  player: {},
  tpiToPpi: {},
};

const ACTIONS = {
  UPDATE_FILTERS: "UPDATE_FILTER",
  UPDATE_FORMATION: "UPDATE_FORMATION",
  UPDATE_TPI_PPI: "UPDATE_TPI_PPI",
  UPDATE_PLAYER: "UPDATE_PLAYER",
};

export const FootballFieldCtx = React.createContext({ ...DEFAULT_STATE });

const reducer = (state: any, action: any) => {
  const { formation, budget, rank, player, tpiToPpi } = action;
  switch (action.type) {
    case ACTIONS.UPDATE_FILTERS:
      return {
        ...state,
        budget,
        rank,
      };
    case ACTIONS.UPDATE_FORMATION:
      return {
        ...state,
        formation,
      };
    case ACTIONS.UPDATE_TPI_PPI:
      return {
        ...state,
        tpiToPpi,
      };
    case ACTIONS.UPDATE_PLAYER:
      return {
        ...state,
        player,
      };
    default: {
      return state;
    }
  }
};

// DIspatch
const updateFilters = (dispatch: any, rank: number, budget: number) => {
  dispatch({ type: ACTIONS.UPDATE_FILTERS, rank, budget });
};

const updateFormation = (dispatch: any, formation: string) => {
  dispatch({ type: ACTIONS.UPDATE_FORMATION, formation });
};

const updatePlayer = (dispatch: any, player: any) => {
  dispatch({ type: ACTIONS.UPDATE_PLAYER, player });
};

const updateTpiToPpi = (dispatch: any, tpiToPpi: any) => {
  dispatch({ type: ACTIONS.UPDATE_TPI_PPI, tpiToPpi });
};

export const FootballFieldProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...DEFAULT_STATE,
  });

  const setter = {
    updateFilters: (rank: number, budget: number) =>
      updateFilters(dispatch, rank, budget),
    updateFormation: (formation: string) =>
      updateFormation(dispatch, formation),
    updatePlayer: (player: any) => updatePlayer(dispatch, player),
    updateTpiToPpi: (tpiToPpi: any) => updateTpiToPpi(dispatch, tpiToPpi),
  };

  // const value = ;
  return (
    <FootballFieldCtx.Provider value={{ ...setter, ...state }}>
      {children}
    </FootballFieldCtx.Provider>
  );
};

export default FootballFieldProvider;
