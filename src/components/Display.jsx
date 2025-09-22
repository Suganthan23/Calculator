import React from 'react';

const Display = ({ currentValue, expression }) => {
  const formatNumber = (value) => {
    if (value.length > 15) {
      const num = parseFloat(value);
      if (Math.abs(num) > 999999999999999 || (Math.abs(num) < 0.000000000000001 && num !== 0)) {
        return num.toExponential(8);
      }
    }
    return value;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 min-h-[100px] flex flex-col justify-between">
      <div className="text-gray-400 text-sm font-mono min-h-[20px] overflow-hidden">
        {expression && (
          <div className="text-right whitespace-nowrap">
            {expression}
          </div>
        )}
      </div>

      <div className="text-right">
        <div className="text-white text-3xl font-mono font-light overflow-hidden">
          {formatNumber(currentValue)}
        </div>
      </div>
    </div>
  );
};

export default Display;