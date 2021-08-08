export interface Quote {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    fromCurrency: string;
    toCurrency: string;
    amount: number;
    convertedAmount: number;
    rate: number;
    date: Date;
}
