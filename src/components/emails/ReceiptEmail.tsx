import { Product } from "../../payload-types";

type ReceiptEmailProps = {
   email: string;
   date: Date;
   orderId: string;
   products: Product[];
};

const ReceiptEmail = ({ email, date, orderId, products }: ReceiptEmailProps) => {
   return <div>ReceiptEmail</div>;
};

export default ReceiptEmail;
