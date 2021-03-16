import React from "react";

const DEFAULT_STATE = {
  formation: "4-2-2-2",
  budget: 10000000,
  rank: 5,
};

const ACTIONS = {
  UPDATE_FILTERS: "UPDATE_FILTER",
};

export const FootballFieldCtx = React.createContext({ ...DEFAULT_STATE });

const reducer = (state: any, action: any) => {
  const { formation, budget, rank } = action;
  switch (action.type) {
    case ACTIONS.UPDATE_FILTERS:
      return {
        ...state,
        formation,
        budget,
        rank,
      };
    default: {
      return state;
    }
  }
};

// DIspatch
const updateFilters = (
  dispatch: any,
  formation: string,
  rank: number,
  budget: number
) => {
  dispatch({ type: ACTIONS.UPDATE_FILTERS, formation, rank, budget });
};

export const FootballFieldProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...DEFAULT_STATE,
  });

  const setter = {
    updateFilters: (formation: string, rank: number, budget: number) =>
      updateFilters(dispatch, formation, rank, budget),
  };

  const value = { ...state, ...setter };
  return (
    <FootballFieldCtx.Provider value={value}>
      {children}
    </FootballFieldCtx.Provider>
  );
};

export default FootballFieldProvider;
