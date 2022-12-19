const Garantee = (garanteeProp: string) => {
    let garantee = '';
    switch (garanteeProp) {
        case '0-20%':
            return (garantee = 'Entre un 0 y 20%');
        case '21-40%':
            return (garantee = 'Entre un 21 y 40%');
        case '41-60%':
            return (garantee = 'Entre un 41 y 60%');
        case '61-80%':
            return (garantee = 'Entre un 61 y 80%');
        case '81-100%':
            return (garantee = 'Entre un 81 y 100%');

        default: {
            return garantee;
        }
    }
};

export default Garantee;
