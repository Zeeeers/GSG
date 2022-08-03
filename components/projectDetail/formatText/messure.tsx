const Messure = (messureProp: string) => {
    let messure = undefined;
    switch (messureProp) {
        case 'do-not-messure':
            return (messure = 'No mido resultados de impacto sociales y/o medioambientales');
        case 'in-process':
            return (messure =
                'Estoy en proceso de medición de resultados sociales y/o medioambientales (aún no tengo resultados, pero están diseñados los indicadores que queremos medir)');
        case 'messure':
            return (messure = 'Mido resultados sociales y/o medioambientales de manera interna');
        case 'certified':
            return (messure =
                'Mido resultados sociales y/o medioambientales y están certificados y/o validados por terceros independientes a mi organización');

        default: {
            return messure;
        }
    }
};

export default Messure;
