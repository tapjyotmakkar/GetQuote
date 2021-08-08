import axios from "axios";
import { Quote } from "../models/Quote";
import { IFormData } from "../pages/CreateQuote/CreateQuote";

export async function createQuote(data: IFormData) {
    try{
        var bodyFormData = new FormData();
        bodyFormData.append('firstName', data.firstName);
        bodyFormData.append('lastName', data.lastName);
        bodyFormData.append('email', data.email);
        bodyFormData.append('phone', data.phone);
        bodyFormData.append('fromCurrency', data.fromCurrency);
        bodyFormData.append('toCurrency', data.toCurrency);
        bodyFormData.append('amount', data.amount.toString());
        const response = await axios.post<Quote>('https://localhost:44325/quote/create', bodyFormData);
        return response.data;
    } catch(e) {
        throw new Error(e);
    }
    
}