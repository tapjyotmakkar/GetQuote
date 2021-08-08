import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { getQuote } from "../../api/getQuoteAPI";
import { Quote } from "../../models/Quote";

export function GetQuote() {
    const history = useHistory();
    const [quote, setQuote] = React.useState<Quote>();

    useEffect(() => {
        getQuote()
            .then((response) => {
                setQuote(response);
            })
    }, [])

    return (
        <main role="main" className="container pt-4">
            <h3 className="border-bottom border-gray pb-2">Quick Quote</h3>

            <div className="card bg-light text-center quotecard p-2">

                <div className="card-body">
                    <div>
                        <h4>OFX Customer Rate</h4>
                        <h4 className="text-success">{quote?.rate}</h4>
                    </div>
                    <h5 className="card-title">From</h5>
                    <h4 className="card-text"><span>{quote?.fromCurrency}</span><span className="text-primary"> {quote?.amount}</span></h4>
                    <h5 className="card-title">To</h5>
                    <h4 className="card-text"><span>{quote?.toCurrency}</span><span className="text-primary"> {quote?.convertedAmount}</span></h4>
                    <div className="pt-4">
                        <small className="d-block text-center">
                            <button type="button" onClick={() => { history.push('/create') }} className="roundedButton btn btn-primary btn-sm">START NEW QUOTE</button>
                        </small>
                    </div>
                </div>

            </div>
        </main>
    );
};
