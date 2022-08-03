const Rentability = (rentabilityProp: string) => {
    let rentability = undefined;
    switch (rentabilityProp) {
        case '1-5':
            return (rentability = 'Entre 1 y 5%');
        case '6-10':
            return (rentability = 'Entre 6 y 10%');
        case '11-20':
            return (rentability = 'Entre 11 y 20%');
        case 'more-than-21':
            return (rentability = 'Más de 21%');
        default: {
            return rentability;
        }
    }
};

export default Rentability;
