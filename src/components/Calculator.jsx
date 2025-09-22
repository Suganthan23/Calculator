import React, { useEffect } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import Display from './Display';
import ButtonGrid from './ButtonGrid';

const Calculator = () => {
    const {
        currentInput,
        expression,
        inputNumber,
        inputDecimal,
        clear,
        backspace,
        performOperation,
        performEquals,
        performPercentage
    } = useCalculator();

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;

            if (
                (key >= '0' && key <= '9') ||
                ['+', '-', '*', '/', '=', 'Enter', 'Escape', 'Backspace', '.', '%', 'c', 'C'].includes(key)
            ) {
                event.preventDefault();
            }
            if (key >= '0' && key <= '9') {
                inputNumber(key);
            } else if (key === '+') {
                performOperation('+');
            } else if (key === '-') {
                performOperation('-');
            } else if (key === '*') {
                performOperation('*');
            } else if (key === '/') {
                performOperation('/');
            } else if (key === '%') {
                performPercentage();
            } else if (key === '=' || key === 'Enter') {
                performEquals();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clear();
            } else if (key === 'Backspace') {
                backspace();
            } else if (key === '.') {
                inputDecimal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputNumber, inputDecimal, clear, backspace, performOperation, performEquals, performPercentage]);

    return (
        <div className="w-80 bg-gray-900 p-6 rounded-2xl shadow-2xl">
            <div className="text-center mb-4">
                <h1 className="text-white text-xl font-bold">Calculator</h1>
            </div>
            <Display currentValue={currentInput} expression={expression} />
            <ButtonGrid
                onNumberClick={inputNumber}
                onOperatorClick={performOperation}
                onEqualsClick={performEquals}
                onDecimalClick={inputDecimal}
                onClearClick={clear}
                onBackspaceClick={backspace}
                onPercentageClick={performPercentage}
            />
        </div>
    );
};

export default Calculator;