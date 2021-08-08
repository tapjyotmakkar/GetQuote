import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { CreateQuote } from './CreateQuote';
import * as axios from 'axios';
import { Quote } from '../../models/Quote';
import { Currency } from '../../models/Currency';


describe('GetQuote page', () => {
    const renderGetQuote = (
        <CreateQuote />
    );

    it('should show createquote form', () => {
        const { getByTestId, getByText } = render(renderGetQuote);
        expect(getByText('Quick Quote')).toBeInTheDocument();
        expect(getByTestId('text-firstName')).toBeInTheDocument();
        expect(getByTestId('text-lastName')).toBeInTheDocument();
        expect(getByTestId('text-email')).toBeInTheDocument();
        expect(getByTestId('text-phone')).toBeInTheDocument();
        expect(getByTestId('select-fromCurrency')).toBeInTheDocument();
        expect(getByTestId('select-toCurrency')).toBeInTheDocument();
        expect(getByTestId('text-amount')).toBeInTheDocument();
        expect(getByTestId('btn-getQuote')).toBeInTheDocument();
    });

    it('should show call createquote api on get quote button click', async () => {
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

        var currencies: Currency[] = [
            {
                symbol: 'AUD',
                name: 'Australian Dollar'
            },
            {
                symbol: 'USD',
                name: 'United Stated Dollar'
            }
        ]

        const getCurrenciesSpy = jest.spyOn(axios.default, 'get')
            .mockImplementationOnce((url) => {
                if (url.endsWith('/currencies')) {
                    return Promise.resolve({
                        data: currencies,
                    });
                }
            });

        const createQuoteSpy = jest.spyOn(axios.default, 'get')
            .mockImplementationOnce((url) => {
                if (url.endsWith('/create')) {
                    return Promise.resolve({
                        data: testQuote,
                    });
                }
            });

        const { getByTestId, getByText } = render(renderGetQuote);
        await waitFor(() => expect(getCurrenciesSpy).toHaveBeenCalledTimes(1));
        expect(getByText('Quick Quote')).toBeInTheDocument();
        expect(getByTestId('text-firstName')).toBeInTheDocument();
        expect(getByTestId('text-lastName')).toBeInTheDocument();
        expect(getByTestId('text-email')).toBeInTheDocument();
        expect(getByTestId('text-phone')).toBeInTheDocument();
        expect(getByTestId('select-fromCurrency')).toBeInTheDocument();
        expect(getByTestId('select-toCurrency')).toBeInTheDocument();
        expect(getByTestId('text-amount')).toBeInTheDocument();
        expect(getByTestId('btn-getQuote')).toBeInTheDocument();

        fireEvent.change(getByTestId('text-firstName'), {
            target: { value: 'Test' }
        });
        fireEvent.change(getByTestId('text-lastName'), {
            target: { value: 'Test' }
        });
        const fromInput = getByTestId('select-fromCurrency').querySelector('input');
        if (fromInput != null) {
            fireEvent.change(fromInput, {
                target: { value: 'AUD' }
            });
        }
        const toInput = getByTestId('select-toCurrency').querySelector('input');
        if (toInput != null) {
            fireEvent.change(toInput, {
                target: { value: 'USD' }
            });
        }
        fireEvent.change(getByTestId('text-amount'), {
            target: { value: '10' }
        });

        await (act(async () => {
            fireEvent.click(getByTestId('btn-getQuote'));
        }));

        expect(createQuoteSpy).toHaveBeenCalledTimes(1);

    });
})



