const Garantee = (garanteeProp: string) => {
    let garantee = '';
    switch (garanteeProp) {
        case '100%':
            return (garantee = 'Sí, por el 100% de la inversión buscada');
        case '50%':
            return (garantee = 'Sí, por el 50% de la inversión buscada');
        case '25%':
            return (garantee = 'Sí, por el 25% de la inversión buscada');
        case 'no-garantee':
            return (garantee = 'Sin garantía');

        default: {
            return garantee;
        }
    }
};

export default Garantee;
