interface OrderInfo {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id: string | null;
    status: string;
    attempts: number;
    notes: any[]; // Assuming notes can be an array of any type
    created_at: number; // Assuming created_at is a timestamp in milliseconds
}

export default OrderInfo;