import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencyChanger = () => {
    const { currency, dispatch } = useContext(AppContext);

    const handleCurrencyChange = (newCurrency) => {
        // Dispatch currency change action
        dispatch({
            type: 'CHG_CURRENCY',
            payload: newCurrency,
        });
    };

    const currencyOptions = [
        { code: 'USD', symbol: '$', name: 'Dollar' },
        { code: 'GBP', symbol: '£', name: 'Pound' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'INR', symbol: '₹', name: 'Ruppee' },
    ];

    return (
        <div className="bg-primary p-3 text-light">
            <label htmlFor="currencySelect" className="text-light">Select Currency:</label>
            <select
                id="currencySelect"
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="form-select text-dark"
            >
                {currencyOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                        {option.code} - {option.symbol} {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrencyChanger;
