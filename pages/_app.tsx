import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { NextIntlClientProvider } from "next-intl";
import { withRouter } from "next/router";
import type { AppProps } from "next/app";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SnackbarProvider } from "notistack";

import "../global.css";
import { AuthProvider } from "../contexts/AuthContext";
import { UserProvider } from "../contexts/UserContext"; // Ajuste o caminho de importação conforme necessário

import { StoreProvider } from "stores/RootStore";

export const runtime = "experimental-edge";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface ExtendedAppProps extends AppProps {
  initialStoreFromCookies?: Record<string, any>;
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps, router }: ExtendedAppProps) {
  const locale = (router.query?.locale as string) ?? "pt";

  return (
    <React.Fragment>
      <title>dsf-scout-new</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta httpEquiv="content-language" content={locale}></meta>
      <NextIntlClientProvider
        locale={locale}
        messages={pageProps.messages}
        timeZone="UTC"
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AuthProvider>
            <UserProvider>
              <StoreProvider initialStoreFromPage={pageProps.initialStore}>
                <SnackbarProvider maxSnack={3}>
                  <Component {...pageProps} />
                </SnackbarProvider>
              </StoreProvider>
            </UserProvider>
          </AuthProvider>
        </AppRouterCacheProvider>
      </NextIntlClientProvider>
    </React.Fragment>
  );
}

export default withRouter(MyApp);
