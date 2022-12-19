const StageCapital = (stage: string) => {
    let stage_p = undefined;
    switch (stage) {
        case 'development':
            return (stage_p = 'Producto o servicio en desarrollo');

        case 'mvp':
            return (stage_p = 'Producto o servicio en prototipo en pilotaje');

        case 'ready_to_launch':
            return (stage_p = 'Producto o servicio listo para lanzar al mercado');

        case 'already_launched':
            return (stage_p = 'Producto o servicio ya en el mercado');

        default: {
            return stage_p;
        }
    }
};

export default StageCapital;
