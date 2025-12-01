import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOpClick = (op: string) => {
    const currentValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(currentValue);
    } else if (operator) {
      const result = calculate(prevValue, currentValue, operator);
      setDisplay(String(result));
      setPrevValue(result);
    }

    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleEqual = () => {
    if (operator && prevValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(prevValue, currentValue, operator);
      setDisplay(String(result));
      setPrevValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (waitingForNewValue) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ label, onClick, className = '' }: any) => (
    <button
      onClick={onClick}
      className={`h-8 w-full win95-border-outset active:win95-border-inset bg-[#c0c0c0] font-bold text-sm flex items-center justify-center ${className}`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#c0c0c0] p-2 select-none">
      {/* Menu Bar Placeholder */}
      <div className="flex gap-2 text-xs mb-2 text-gray-700">
        <span>Edit</span>
        <span>View</span>
        <span>Help</span>
      </div>

      {/* Display */}
      <div className="bg-white text-right font-mono text-xl p-1 mb-3 win95-border-inset border-2 h-10 truncate">
        {display}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-1.5 flex-1">
        {/* Row 1 */}
        <div className="col-span-1"></div> {/* Empty for alignment like classic calc */}
        <Button label="Back" onClick={handleBackspace} className="text-[10px]" />
        <Button label="CE" onClick={handleClear} className="text-[10px]" />
        <Button label="C" onClick={handleClear} className="text-[10px]" />

        {/* Row 2 */}
        <Button label="MC" onClick={() => {}} className="text-red-800" />
        <Button label="7" onClick={() => handleNumClick('7')} className="text-blue-900" />
        <Button label="8" onClick={() => handleNumClick('8')} className="text-blue-900" />
        <Button label="9" onClick={() => handleNumClick('9')} className="text-blue-900" />
        <Button label="/" onClick={() => handleOpClick('/')} className="text-red-800" />

        {/* Row 3 */}
        <Button label="MR" onClick={() => {}} className="text-red-800" />
        <Button label="4" onClick={() => handleNumClick('4')} className="text-blue-900" />
        <Button label="5" onClick={() => handleNumClick('5')} className="text-blue-900" />
        <Button label="6" onClick={() => handleNumClick('6')} className="text-blue-900" />
        <Button label="*" onClick={() => handleOpClick('*')} className="text-red-800" />

        {/* Row 4 */}
        <Button label="MS" onClick={() => {}} className="text-red-800" />
        <Button label="1" onClick={() => handleNumClick('1')} className="text-blue-900" />
        <Button label="2" onClick={() => handleNumClick('2')} className="text-blue-900" />
        <Button label="3" onClick={() => handleNumClick('3')} className="text-blue-900" />
        <Button label="-" onClick={() => handleOpClick('-')} className="text-red-800" />

        {/* Row 5 */}
        <Button label="M+" onClick={() => {}} className="text-red-800" />
        <Button label="0" onClick={() => handleNumClick('0')} className="text-blue-900" />
        <Button label="+/-" onClick={() => setDisplay(String(parseFloat(display) * -1))} className="text-blue-900" />
        <Button label="." onClick={() => !display.includes('.') && handleNumClick('.')} className="text-blue-900" />
        <Button label="+" onClick={() => handleOpClick('+')} className="text-red-800" />

        {/* Row 6 */}
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
        <div className="col-span-1"></div>
        <div className="col-span-1">
           <Button label="=" onClick={handleEqual} className="text-red-800 border-red-800" />
        </div>
      </div>
    </div>
  );
};

export default Calculator;