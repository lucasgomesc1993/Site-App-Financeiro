import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

interface BlogLayoutProps {
    children: React.ReactNode;
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
            <Header />
            <main className="pt-24 pb-12">
                {children}
            </main>
            <Footer />
        </div>
    );
};
