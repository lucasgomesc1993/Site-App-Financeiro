import { createContext, useContext } from 'react';

export const CalculatorContext = createContext<boolean>(false);

export const useCalculatorContext = () => useContext(CalculatorContext);
