import { IAppContext } from "@lib/store";
import { rehydrate } from "overmind";
import { Pages, Themes } from "./state";

export const onInitializeOvermind = async () => {
  /**
   * Use effects and other actions onInitialize
   */
};

export const changePage = ({ state }: IAppContext, mutations: any) => {
  rehydrate(state, mutations || []);

  switch (state.page) {
    case Pages.index:
      // Do some additional logic
      break;
    default:
      break;
  }
};

export const toggleTheme = ({ state }: IAppContext) => {
  state.theme =
    state.theme === Themes.primary ? Themes.secondary : Themes.primary;
};
