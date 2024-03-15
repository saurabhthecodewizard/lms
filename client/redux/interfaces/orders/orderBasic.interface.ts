interface OrderBasic {
    _id: string;
    createdAt: string;
    user: {
        _id: string;
        name: string;
    };
    course: {
        _id: string;
        name: string;
    };
}

export default OrderBasic;