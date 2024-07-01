// pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

import { AppType } from "next/app";
import { ExtendedAppProps } from "./_app";
import { retrieveInitialStoreFromCookies } from "utils/cookies";
import { setCookie } from "cookies-next";

export const runtime = "experimental-edge";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;
  let initialStoreFromCookies = retrieveInitialStoreFromCookies(
    ctx?.req,
    ctx?.res
  );

  const locale = ctx.locale || ctx.defaultLocale || ctx.query.locale || "pt";

  setCookie("NEXT_LOCALE", locale, { req: ctx.req, res: ctx.res });

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<
          React.ComponentProps<AppType> & ExtendedAppProps
        >
      ) =>
        function EnhanceApp(props) {
          const propsData = {
            ...props,
            initialStoreFromCookies,
            locale,
          };
          return <App {...propsData} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153

  return {
    ...initialProps,
  };
};

export default MyDocument;
