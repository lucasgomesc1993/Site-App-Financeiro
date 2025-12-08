import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { RelatedCalculators } from './RelatedCalculators';

import { AuthorBadge } from './AuthorBadge';
import { CalculatorContext } from '../context/CalculatorContext';

export const CalculatorLayout: React.FC = () => {
    return (
        <>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                <CalculatorContext.Provider value={true}>
                    <Outlet />
                    <RelatedCalculators />
                </CalculatorContext.Provider>
            </Suspense>
        </>
    );
};


