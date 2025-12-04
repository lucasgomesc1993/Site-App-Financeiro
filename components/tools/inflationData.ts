export type InflationIndex = 'IPCA' | 'IGPM';

interface AnnualInflation {
    year: number;
    ipca: number; // Percentage (e.g., 47.43 for 47.43%)
    igpm: number; // Percentage
}

// Data source: IBGE (IPCA) and FGV (IGP-M) - Annual Accumulated
export const INFLATION_DATA: AnnualInflation[] = [
    { year: 1994, ipca: 47.43, igpm: 27.24 }, // July-Dec (Plano Real start approx) - simplified for annual context or partial
    { year: 1995, ipca: 22.41, igpm: 15.25 },
    { year: 1996, ipca: 9.56, igpm: 9.20 },
    { year: 1997, ipca: 5.22, igpm: 7.48 },
    { year: 1998, ipca: 1.65, igpm: 1.78 },
    { year: 1999, ipca: 8.94, igpm: 20.10 },
    { year: 2000, ipca: 5.97, igpm: 9.95 },
    { year: 2001, ipca: 7.67, igpm: 10.37 },
    { year: 2002, ipca: 12.53, igpm: 25.31 },
    { year: 2003, ipca: 9.30, igpm: 8.71 },
    { year: 2004, ipca: 7.60, igpm: 12.41 },
    { year: 2005, ipca: 5.69, igpm: 1.20 },
    { year: 2006, ipca: 3.14, igpm: 3.83 },
    { year: 2007, ipca: 4.46, igpm: 7.75 },
    { year: 2008, ipca: 5.90, igpm: 9.81 },
    { year: 2009, ipca: 4.31, igpm: -1.72 },
    { year: 2010, ipca: 5.91, igpm: 11.32 },
    { year: 2011, ipca: 6.50, igpm: 5.10 },
    { year: 2012, ipca: 5.84, igpm: 7.82 },
    { year: 2013, ipca: 5.91, igpm: 5.51 },
    { year: 2014, ipca: 6.41, igpm: 3.69 },
    { year: 2015, ipca: 10.67, igpm: 10.54 },
    { year: 2016, ipca: 6.29, igpm: 7.17 },
    { year: 2017, ipca: 2.95, igpm: -0.52 },
    { year: 2018, ipca: 3.75, igpm: 7.54 },
    { year: 2019, ipca: 4.31, igpm: 7.30 },
    { year: 2020, ipca: 4.52, igpm: 23.14 },
    { year: 2021, ipca: 10.06, igpm: 17.78 },
    { year: 2022, ipca: 5.79, igpm: 5.45 },
    { year: 2023, ipca: 4.62, igpm: -3.18 },
    { year: 2024, ipca: 4.62, igpm: 6.54 }, // Estimated/Partial
    { year: 2025, ipca: 4.68, igpm: -1.03 }  // Estimated/Partial
];

export const calculateInflation = (
    initialValue: number,
    startYear: number,
    indexType: InflationIndex
): { correctedValue: number; totalInflation: number; multiplier: number } => {
    let multiplier = 1;

    // Filter years from startYear (exclusive) to present
    // Logic: If I had 100 in 1994, I need to apply 1995 inflation, 1996, etc?
    // Or if I had 100 in Dec 1994?
    // Standard correction logic: Value * (1 + rate_year1) * (1 + rate_year2)...
    // We will assume the value is from the BEGINNING of startYear, so we include startYear's inflation.

    const relevantYears = INFLATION_DATA.filter(data => data.year >= startYear);

    relevantYears.forEach(data => {
        const rate = indexType === 'IPCA' ? data.ipca : data.igpm;
        multiplier *= (1 + rate / 100);
    });

    const correctedValue = initialValue * multiplier;
    const totalInflation = (multiplier - 1) * 100;

    return {
        correctedValue,
        totalInflation,
        multiplier
    };
};
