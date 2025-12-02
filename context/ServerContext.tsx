import React, { createContext, useContext } from 'react';

// Context to hold data injected by prerender
export const ServerContext = createContext<any>(null);

export const ServerDataProvider: React.FC<{ value: any; children: React.ReactNode }> = ({ value, children }) => {
    return <ServerContext.Provider value={value}>{children}</ServerContext.Provider>;
};

// Hook to use the data
export const useServerData = () => {
    return useContext(ServerContext);
};
