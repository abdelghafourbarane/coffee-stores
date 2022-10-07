import { config } from "@fortawesome/fontawesome-svg-core";

import CoffeeStoreProvider from "../store/store-context";

import "../styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }) {
  
  return (
    <CoffeeStoreProvider>
      <div className="layout">
        <Component {...pageProps} />
      </div>
    </CoffeeStoreProvider>
  );
}

export default MyApp;
