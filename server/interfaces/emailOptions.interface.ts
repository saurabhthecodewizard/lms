interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
}

export default EmailOptions;