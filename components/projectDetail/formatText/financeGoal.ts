const FinanceGoal = (financeGoal: string) => {
    let finance = '';
    switch (financeGoal) {
        case 'less-than-20':
            return (finance = 'Menos de 20 millones');
        case '20-49':
            return (finance = '20 millones y hasta 49 millones');
        case '50-99':
            return (finance = '50 millones y hasta 99 millones');
        case '100-249':
            return (finance = '100 millones y hasta 249 millones');
        case '250':
            return (finance = '250 millones');
        case 'more-than-250':
            return (finance = 'Sobre 250 millones');
        case 'more-than-1000':
            return (finance = 'Sobre 1000 millones');

        default: {
            return finance;
        }
    }
};

export default FinanceGoal;
