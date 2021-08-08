import axios from "axios";
import { Quote } from "../models/Quote";

export async function getQuote() {
    try{
        const response = await axios.get<Quote>('https://localhost:44325/quote');
        return response.data;
    } catch(e) {
        throw new Error(e);
    }
    
}