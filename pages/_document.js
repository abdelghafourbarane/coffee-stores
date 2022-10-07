import Document, { Html, Main, Head, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link
            rel="stylesheet"
            href="/fonts/fontStyles.css"      
          ></link> */}
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
