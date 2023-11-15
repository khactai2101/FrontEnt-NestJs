import { PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder } from "../../../../API/user";
import { message } from "antd";
type Props = {
  amount: number;
  handleCheckoutPaypal(status: any): void;
  dataPaypal: any;
};
const token = localStorage.getItem("accessToken");

import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");
const PaypalButton = (props: Props) => {
  const { amount } = props;

  const handlePaymentSuccess = async () => {
    const response = await createOrder(props.dataPaypal, token);
    message.open({
      type: "success",
      content: "Đặt hàng thành công",
    });
    // Gửi emit khi đặt hàng thành công
    socket.emit("order", "order!");
    props.handleCheckoutPaypal(response);
  };
  return (
    <div className="mt-4">
      <PayPalButtons
        createOrder={(_data, actions) => {
          {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: String(amount),
                  },
                  description: `purchase at ${new Date().toDateString()}`,
                },
              ],
            });
          }
        }}
        onApprove={(_, action): any => {
          return action.order?.capture().then(() => handlePaymentSuccess());
        }}
      />
    </div>
  );
};

export default PaypalButton;
