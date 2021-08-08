import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { GetQuote } from './GetQuote';
import * as axios from 'axios';
import { Quote } from '../../models/Quote';


describe('GetQuote page', () => {
    const renderGetQuote = (
        <GetQuote />
    );

    it('should show getquote page heading', () => {
        const { getByText } = render(renderGetQuote);
        expect(getByText('Quick Quote')).toBeInTheDocument();
    });

    it('should show prepopulate a quote', async () => {
        const testQuote: Quote = {
            firstName: 'testUser',
            lastName: 'testUser',
            fromCurrency: 'TEST_FROM',
            toCurrency: 'TEST_TO',
            amount: 20,
            convertedAmount: 10,
            id: 1,
            date: new Date(),
            email: 'test',
            phone: 'phone',
            rate: 3,
        };

        const getQuoteSpy = jest.spyOn(axios.default, 'get')
            .mockImplementationOnce((url) => {
                if (url.endsWith('/quote')) {
                    return Promise.resolve({
                        data: testQuote,
                        status: 200
                    });
                }
            });
        const { getByText } = render(renderGetQuote);
        await waitFor(() => expect(getQuoteSpy).toHaveBeenCalledTimes(1));
        expect(getByText('Quick Quote')).toBeInTheDocument();
        expect(getByText('TEST_FROM')).toBeInTheDocument();
        expect(getByText('TEST_TO')).toBeInTheDocument();
        expect(getByText('10')).toBeInTheDocument();
        expect(getByText('20')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
    });
})



