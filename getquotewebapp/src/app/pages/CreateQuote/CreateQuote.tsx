import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getCurrencies } from "../../api/currencyApi";
import { createQuote } from "../../api/createQuoteAPI";
import { Currency } from "../../models/Currency";
import { Quote } from "../../models/Quote";
import { useHistory } from "react-router-dom";

export interface IFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    fromCurrency: string;
    toCurrency: string;
    amount: number;
}

export function CreateQuote() {
    const history = useHistory();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [fromCurrencies, setFromCurrencies] = React.useState<Currency[]>([]);
    const [toCurrencies, setToCurrencies] = React.useState<Currency[]>([]);
    const [fromCurrency, setFromCurrency] = React.useState<Currency>();
    const [toCurrency, setToCurrency] = React.useState<Currency>();
    const [error, setError] = React.useState<string>();

    useEffect(() => {
        getCurrencies()
            .then((response) => {
                let fromCurrencies = [...response.data];
                setFromCurrencies(fromCurrencies);
                let aud = fromCurrencies.find(x => x.symbol === "AUD");
                setFromCurrency(aud);
                let toCurrencies = [...response.data];
                setToCurrencies(fromCurrencies);
                let usd = toCurrencies.find(x => x.symbol === "USD");
                setToCurrency(usd);
            }
            )
    }, [])

    const onSubmit = async (data: IFormData) => {
        try {
            await createQuote({...data, fromCurrency: fromCurrency ? fromCurrency.symbol : 'TJ', toCurrency: toCurrency ? toCurrency.symbol : 'singh'})
            .then(response => displayQuote(response));
        } catch (e) {
            setError('Error creating quote. Please retry.')
        }
    }

    const displayQuote = (quote: Quote) => {
        history.push('/');
    };

    const resetForm = () => {
        setError(undefined);
        reset();
    }

    return (
        <div className="container">
            <div className="p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row p-2">
                        <h4>Quick Quote</h4>
                    </div>
                    <div className="row border border-gray">
                        <div className="row p-2">
                            <div className="col-md-6">
                                <label className="required-field">First Name</label>
                                <input className="form-control" placeholder="First Name" autoFocus
                                    {...register("firstName", { required: true })} />
                                {errors.firstName?.type === 'required' && <span className="text-danger">First name is required</span>}
                            </div>
                            <div className="col-md-6">
                                <label className="required-field">Last Name</label>
                                <input className="form-control" placeholder="Last Name" {...register("lastName", { required: true })} />
                                {errors.lastName?.type === 'required' && <span className="text-danger">Last name is required</span>}
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-md-12">
                                <label>Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" {...register("email")} />
                            </div>
                        </div>
                        <div className="row pt-2 pb-4">
                            <label>Telephone/Mobile</label>
                            <div className="col-md-1">
                                <select id="inputState" className="form-control">
                                    <option selected>+61</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="col-md-11">
                                <input type="text" className="form-control" id="phone" {...register("phone")} />
                            </div>
                        </div>
                        <div className="border bg-light">
                            <div className="row pt-2">
                                <div className="col-md-6">
                                    <label className="required-field">From Currency</label>
                                    <select className="form-control form-select" {...register('fromCurrency')} value={fromCurrency?.symbol} onChange={(event) => setFromCurrency(fromCurrencies.filter(x => x.symbol === event.target.value)[0])}>
                                        {fromCurrencies && fromCurrencies.map((curr) => (
                                            <option value={curr.symbol}>{curr.name} ({curr.symbol})</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="col-md-6">
                                    <label className="required-field">To Currency</label>
                                    <select id="inputState" className="form-control form-select" {...register("toCurrency")} value={toCurrency?.symbol} onChange={(event) => setToCurrency(toCurrencies.filter(x => x.symbol === event.target.value)[0])}>
                                        {toCurrencies && toCurrencies.map((curr) => (
                                            <option value={curr.symbol}>{curr.name} ({curr.symbol})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row pt-2">
                                <div className="col-md-6">
                                    <label className="required-field">Amount</label>
                                    <input type="number" step=".01" className="form-control" {...register("amount", { required: true })} />
                                    {errors.amount?.type === 'required' && <span className="text-danger">Amount is required</span>}
                                </div>
                            </div>
                            <div className="row pt-4 pb-4">
                                <div className="col-md-12 text-center">
                                    <button className="roundedButton btn btn-primary m-4" onClick={() => { resetForm() }}>RESET</button>
                                    <button type="submit" className="roundedButton btn btn-primary">GET QUOTE</button>
                                </div>
                            </div>
                            {error && (
                                <div className="row pt-4 pb-4">
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {error}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
