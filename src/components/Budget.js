import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses, currency } = useContext(AppContext);
    const [editable, setEditable] = useState(false);
    const [newBudget, setNewBudget] = useState(budget);

    const handleIncrease = () => {
        const increasedBudget = newBudget + 10;
        if (increasedBudget <= 20000) {
            setNewBudget(increasedBudget);
        } else {
            alert('Budget cannot exceed 20,000.');
        }
    };

    const handleDecrease = () => {
        const decreasedBudget = newBudget - 10;
        if (decreasedBudget >= 0) {
            setNewBudget(decreasedBudget);
        } else {
            alert('Budget cannot be less than the total allocated spending.');
        }
    };

    const handleSave = () => {
        const totalAllocatedSpending = expenses.reduce(
            (total, item) => total + item.cost,
            0
        );

        if (newBudget >= totalAllocatedSpending) {
            dispatch({
                type: 'SET_BUDGET',
                payload: newBudget,
            });
            setEditable(false);
        } else {
            alert('Budget cannot be less than the total allocated spending.');
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>
                {editable ? (
                    <>
                        <input
                            type="number"
                            value={newBudget}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value >= 0 && value <= 20000) {
                                    setNewBudget(value);
                                } else {
                                    alert('Budget must be between 0 and 20,000.');
                                }
                            }}
                        />
                        <button onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        {currency} {budget}
                        <button onClick={() => setEditable(true)}>Edit</button>
                    </>
                )}
            </span>
            <button onClick={handleIncrease}>+10</button>
            <button onClick={handleDecrease}>-10</button>
        </div>
    );
};

export default Budget;
