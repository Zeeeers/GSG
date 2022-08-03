const Objetive = (objetiveProp: string) => {
    let objetive = undefined;
    switch (objetiveProp) {
        case 'to-begin':
            return (objetive = 'Capital para comenzar');
        case 'to-scale':
            return (objetive = 'Capital para escalar');
        case 'to-innovate':
            return (objetive = 'Capital para innovar');
        case 'other':
            return (objetive = 'Otro');

        default: {
            return objetive;
        }
    }
};

export default Objetive;
