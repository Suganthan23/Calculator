import { useState, useCallback } from 'react';

export const useCalculator = () => {
    const [currentInput, setCurrentInput] = useState('0');
    const [previousInput, setPreviousInput] = useState('');
    const [operator, setOperator] = useState('');
    const [expression, setExpression] = useState('');
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);

    const inputNumber = useCallback((num) => {
        if (isResultDisplayed) {
            setCurrentInput(num);
            setPreviousInput('');
            setOperator('');
            setExpression(num);
            setIsResultDisplayed(false);
        } else if (operator === '%' && previousInput) {
            const newInput = currentInput === '0' ? num : currentInput + num;
            setCurrentInput(newInput);
            setExpression(previousInput + '% of ' + newInput);
        } else if (currentInput === '0') {
            setCurrentInput(num);
            setExpression(previousInput + operator + num);
        } else {
            const newInput = currentInput + num;
            setCurrentInput(newInput);
            setExpression(previousInput + operator + newInput);
        }
    }, [currentInput, previousInput, operator, isResultDisplayed]);

    const inputDecimal = useCallback(() => {
        if (isResultDisplayed) {
            setCurrentInput('0.');
            setPreviousInput('');
            setOperator('');
            setExpression('0.');
            setIsResultDisplayed(false);
        } else if (!currentInput.includes('.')) {
            const newInput = currentInput === '0' ? '0.' : currentInput + '.';
            setCurrentInput(newInput);
            if (operator === '%') {
                setExpression(previousInput + '% of ' + newInput);
            } else {
                setExpression(previousInput + operator + newInput);
            }
        }
    }, [currentInput, previousInput, operator, isResultDisplayed]);

    const clear = useCallback(() => {
        setCurrentInput('0');
        setPreviousInput('');
        setOperator('');
        setExpression('');
        setIsResultDisplayed(false);
    }, []);

    const backspace = useCallback(() => {
        if (isResultDisplayed) {
            clear();
        } else if (currentInput.length > 1) {
            const newInput = currentInput.slice(0, -1);
            setCurrentInput(newInput);
            if (operator === '%') {
                setExpression(previousInput + '% of ' + newInput);
            } else {
                setExpression(previousInput + operator + newInput);
            }
        } else {
            setCurrentInput('0');
            if (operator === '%') {
                setExpression(previousInput + '% of 0');
            } else {
                setExpression(previousInput + operator + '0');
            }
        }
    }, [currentInput, previousInput, operator, isResultDisplayed, clear]);

    const calculate = useCallback((first, second, op) => {
        const a = parseFloat(first);
        const b = parseFloat(second);

        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return b !== 0 ? a / b : 0;
            case '%':
                return (a / 100) * b;
            default:
                return b;
        }
    }, []);

    const performOperation = useCallback((nextOperator) => {
        if (isResultDisplayed) {
            setPreviousInput(currentInput);
            setOperator(nextOperator);
            setExpression(currentInput + ' ' + nextOperator + ' ');
            setIsResultDisplayed(false);
        } else if (previousInput && operator && currentInput) {
            const result = calculate(previousInput, currentInput, operator);
            const resultStr = String(result);
            setCurrentInput(resultStr);
            setPreviousInput(resultStr);
            setOperator(nextOperator);
            setExpression(resultStr + ' ' + nextOperator + ' ');
        } else {
            setPreviousInput(currentInput);
            setOperator(nextOperator);
            setExpression(currentInput + ' ' + nextOperator + ' ');
            setCurrentInput('0');
        }
    }, [currentInput, previousInput, operator, isResultDisplayed, calculate]);

    const performEquals = useCallback(() => {
        if (previousInput && operator && currentInput && !isResultDisplayed) {
            const result = calculate(previousInput, currentInput, operator);
            const resultStr = String(result);

            if (operator === '%') {
                setExpression(previousInput + '% of ' + currentInput + ' = ' + resultStr);
            } else {
                setExpression(previousInput + ' ' + operator + ' ' + currentInput + ' = ' + resultStr);
            }

            setCurrentInput(resultStr);
            setPreviousInput('');
            setOperator('');
            setIsResultDisplayed(true);
        }
    }, [currentInput, previousInput, operator, isResultDisplayed, calculate]);

    const performPercentage = useCallback(() => {
        if (currentInput && !operator && !previousInput) {
            setPreviousInput(currentInput);
            setOperator('%');
            setExpression(currentInput + '% of ');
            setCurrentInput('0');
            setIsResultDisplayed(false);
        } else if (previousInput && operator === '%' && currentInput) {
            const percentage = parseFloat(previousInput);
            const baseValue = parseFloat(currentInput);
            const result = (percentage / 100) * baseValue;
            const resultStr = String(result);

            setCurrentInput(resultStr);
            setExpression(previousInput + '% of ' + currentInput + ' = ' + resultStr);
            setPreviousInput('');
            setOperator('');
            setIsResultDisplayed(true);
        } else {
            const current = parseFloat(currentInput);
            const result = current / 100;
            const resultStr = String(result);
            setCurrentInput(resultStr);
            setExpression(currentInput + '% = ' + resultStr);
            setIsResultDisplayed(true);
        }
    }, [currentInput, previousInput, operator]);

    return {
        currentInput,
        expression,
        inputNumber,
        inputDecimal,
        clear,
        backspace,
        performOperation,
        performEquals,
        performPercentage
    };
};