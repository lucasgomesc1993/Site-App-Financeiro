import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import { CALCULATOR_CATEGORIES, getColorClasses, CalculatorItem } from '../constants/calculators';

export const RelatedCalculators: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // 1. Find the current category
    const currentCategory = CALCULATOR_CATEGORIES.find(cat =>
        cat.items.some(item => item.href === currentPath)
    );

    // 2. Get items related to the current one (same category)
    let relatedItems: (CalculatorItem & { color: string })[] = [];

    if (currentCategory) {
        relatedItems = currentCategory.items
            .filter(item => item.href !== currentPath)
            .map(item => ({ ...item, color: currentCategory.color }));
    }

    // 3. If we have fewer than 4 items, add some popular/random ones from other categories
    if (relatedItems.length < 4) {
        const otherCategories = CALCULATOR_CATEGORIES.filter(cat => cat !== currentCategory);
        const allOtherItems = otherCategories.flatMap(cat =>
            cat.items.map(item => ({ ...item, color: cat.color }))
        );

        // Shuffle array to get random items
        const shuffled = allOtherItems.sort(() => 0.5 - Math.random());

        // Add items until we have enough
        const needed = 4 - relatedItems.length; // Ensure at least 4 items total
        relatedItems = [...relatedItems, ...shuffled.slice(0, needed + 2)]; // Add a few more to be safe/interesting
    }

    // Limit to 4 items for a clean row, or 8 for two rows if desired. Let's start with 4.
    const displayItems = relatedItems.slice(0, 4);

    return (
        <section className="py-12 border-t border-white/5 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Calculator className="w-5 h-5 text-blue-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Calculadoras Relacionadas</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {displayItems.map((item, index) => {
                        const colors = getColorClasses(item.color);
                        return (
                            <Link key={index} to={item.href} className="group">
                                <div className={`bg-[#1a1a1a]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:bg-[#1a1a1a]/80 transition-all duration-300 ${colors.hoverBorder} h-full relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] flex flex-col`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center mb-3 border border-white/5 group-hover:scale-110 transition-transform`}>
                                            <item.icon className={`${colors.text} w-5 h-5`} />
                                        </div>
                                        <h3 className="text-base font-bold text-white mb-2 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 line-clamp-2 mb-4 flex-grow">
                                            {item.description}
                                        </p>
                                        <span className={`inline-flex items-center gap-1 ${colors.text} text-xs font-bold group-hover:gap-2 transition-all mt-auto`}>
                                            Acessar <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
