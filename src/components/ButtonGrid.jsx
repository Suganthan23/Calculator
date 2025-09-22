import React from 'react';
import Button from './Button';

const ButtonGrid = ({
    onNumberClick,
    onOperatorClick,
    onEqualsClick,
    onDecimalClick,
    onClearClick,
    onBackspaceClick,
    onPercentageClick
}) => {
    return (
        <div className="grid grid-cols-4 gap-3">
            <Button type="special" onClick={onClearClick}>C</Button>
            <Button type="special" onClick={onPercentageClick}>%</Button>
            <Button type="special" onClick={onBackspaceClick}>⌫</Button>
            <Button type="operator" onClick={() => onOperatorClick('/')}>÷</Button>
            <Button type="number" onClick={() => onNumberClick('7')}>7</Button>
            <Button type="number" onClick={() => onNumberClick('8')}>8</Button>
            <Button type="number" onClick={() => onNumberClick('9')}>9</Button>
            <Button type="operator" onClick={() => onOperatorClick('*')}>×</Button>
            <Button type="number" onClick={() => onNumberClick('4')}>4</Button>
            <Button type="number" onClick={() => onNumberClick('5')}>5</Button>
            <Button type="number" onClick={() => onNumberClick('6')}>6</Button>
            <Button type="operator" onClick={() => onOperatorClick('-')}>−</Button>
            <Button type="number" onClick={() => onNumberClick('1')}>1</Button>
            <Button type="number" onClick={() => onNumberClick('2')}>2</Button>
            <Button type="number" onClick={() => onNumberClick('3')}>3</Button>
            <Button type="operator" onClick={() => onOperatorClick('+')}>+</Button>
            <Button type="number" onClick={() => onNumberClick('0')} className="col-span-2">0</Button>
            <Button type="number" onClick={onDecimalClick}>.</Button>
            <Button type="equals" onClick={onEqualsClick}>=</Button>
        </div>
    );
};

export default ButtonGrid;