import React from "react";
import App from "next/app";
import {
  createOvermind,
  createOvermindSSR,
  rehydrate,
  Overmind,
} from "overmind";
import { Provider } from "overmind-react";
import { IAppContext, storeConfig } from "@lib/store";
import { CacheProvider, Global, ThemeProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import { primaryTheme, secondaryTheme } from "@lib/styles/theme";
import { Themes } from "@lib/store/base/state";
import { cssReset } from "@lib/styles/cssReset";

class MyApp extends App {
  private readonly overmind: Overmind<IAppContext>;
  private disposeReaction: any;

  constructor(props: any) {
    super(props);

    const mutations = props.pageProps.mutations || [];

    if (typeof window !== "undefined") {
      this.overmind = createOvermind(storeConfig);
      this.overmind.actions.changePage(mutations);
    } else {
      this.overmind = createOvermindSSR(storeConfig);
      rehydrate(this.overmind.state, mutations);
    }
  }

  componentDidMount() {
    this.disposeReaction = this.overmind.reaction(
      (state) => state.theme,
      () => this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.disposeReaction();
  }

  componentDidUpdate() {
    this.overmind.actions.changePage(this.props.pageProps.mutations || []);
  }

  render() {
    const { Component } = this.props;
    const { mutations, ...props } = this.props.pageProps;

    return (
      <>
        <Global styles={cssReset} />
        <Provider value={this.overmind}>
          <CacheProvider value={cache}>
            <ThemeProvider
              theme={
                this.overmind.state.theme === Themes.primary
                  ? primaryTheme
                  : secondaryTheme
              }
            >
              <Component {...props} />
            </ThemeProvider>
          </CacheProvider>
        </Provider>
      </>
    );
  }
}

export default MyApp;
