export enum Pages {
  index = "Index",
  about = "About",
}

export enum Themes {
  primary,
  secondary,
}

type State = {
  page: Pages;
  theme: Themes;
};

export const state: State = {
  page: Pages.index,
  theme: Themes.primary,
};
