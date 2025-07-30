import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

 const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "testnet";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
      <AptosWalletAdapterProvider
  autoConnect={true}
  dappConfig={{ network: NETWORK,  }}
  onError={(error) => {
    console.log("error", error);
  }}
>
<App />

</AptosWalletAdapterProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
