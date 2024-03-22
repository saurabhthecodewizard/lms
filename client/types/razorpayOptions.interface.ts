
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    handler: (response: any) => void;
    prefill?: {
        name: string;
        email: string;
        contact: string;
    };
    notes?: {
        address: string;
    };
    theme?: {
        color: string;
    };
}

export default RazorpayOptions;