import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Layouts/CustomerSite/Utils/ScrollToTop.tsx";
import { Notifications } from "react-push-notification";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Notifications />
    <PayPalScriptProvider
      options={{
        clientId:
          "AeFlbozZT7paDROcch5MakAdw7QPYfEhRgtWetVuTFzp5Oe-yoGB48ENuLWPL9CyGP7iZsia4Vv3Wg2d",
      }}
    >
      <App />
    </PayPalScriptProvider>
  </BrowserRouter>
);
