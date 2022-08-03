const Time = (timeProp: string) => {
    let time = undefined;
    switch (timeProp) {
        case 'unti-a-year':
            return (time = 'Hasta 12 meses');
        case 'until-2-years':
            return (time = 'Hasta 24 meses');
        case 'until-3-years':
            return (time = 'Hasta 36 meses');
        case 'until-4-years':
            return (time = 'Hasta 48 meses');
        case 'more-than-4-years':
            return (time = 'Más de 48 meses');
        default: {
            return time;
        }
    }
};

export default Time;
