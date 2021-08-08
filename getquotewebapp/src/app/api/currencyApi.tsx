import axios from "axios";
import { Currency } from "../models/Currency";

export async function getCurrencies() {
    const response = await axios.get<Currency[]>('https://localhost:44325/currencies');
    return response;
}