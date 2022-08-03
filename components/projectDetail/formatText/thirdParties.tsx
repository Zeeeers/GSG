const ThirdParties = (thirdProp: string) => {
    let third = undefined;
    switch (thirdProp) {
        case 'certified-b':
            return (third = 'Certificación empresa  B');
        case 'prize-org':
            return (third = 'Premio o reconocimiento de empresa u organización');
        case 'incubators':
            return (third = 'Participación en Incubadoras o Aceleradoras');
        case 'corfo':
            return (third = 'Adjudicación fondo CORFO u otro fondo público');
        case 'other':
            return (third = 'Otro');
        default: {
            return third;
        }
    }
};

export default ThirdParties;
