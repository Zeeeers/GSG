const Sector = (sectorProp: string) => {
    let sector = undefined;
    switch (sectorProp) {
        case 'Fishing':
            return (sector = 'Pesca');
        case 'Agricultural products':
            return (sector = 'Productos Agrícola');
        case 'Forestry and silviculture':
            return (sector = 'Forestal y Silvícola');
        case 'Livestock':
            return (sector = 'Pecuario');
        case 'Winery':
            return (sector = 'Vitivinícola');
        case 'Processed foods':
            return (sector = 'Alimentos procesados');
        case 'Metallic mining':
            return (sector = 'Minería Metálica');
        case 'Non-metallic mining':
            return (sector = 'Minería no metálica');
        case 'Environment':
            return (sector = 'Medioambiente');
        case 'Construction and infrastructure':
            return (sector = 'Construcción e infraestructura');
        case 'Non-conventional renewable energy':
            return (sector = 'Energía renovables no convencionales');
        case 'Energy efficiency':
            return (sector = 'Eficiencia energética - Smart grid');
        case 'Transport':
            return (sector = 'Transporte, logística, almacnto.y serv. conexos');
        case 'Biotechnology':
            return (sector = 'Biotecnología');
        case 'Telecommunications and digital media':
            return (sector = 'Telecomunicaciones y medios digitales');
        case 'Manufacturing':
            return (sector = 'Manufactura');
        case 'Metalmechanics':
            return (sector = 'Metalmecánica');
        case 'Chemical and petrochemical':
            return (sector = 'Química y petroquímica');
        case 'Biomedicine':
            return (sector = 'Biomedicina');
        case 'Public health':
            return (sector = 'Salud pública');
        case 'Creative industries':
            return (sector = 'Industrias creativas');
        case 'Education and training':
            return (sector = 'Educación y capacitación');
        case 'Financial services':
            return (sector = 'Servicios financieros');
        case 'Business and professional services':
            return (sector = 'Servicios empresariales y profesionales');
        case 'Computing and information technology':
            return (sector = 'Informática y tecnologías de la información');
        case 'Trade':
            return (sector = 'Comercio');
        case 'Tourism':
            return (sector = 'Turismo');
        case 'Establishments':
            return (sector = 'Establecimientos de alojamiento turísitico - rest.');
        case 'Others':
            return (sector = 'Otros');
        case 'Multisectorial':
            return (sector = 'Multisectorial');

        default: {
            return sector;
        }
    }
};

export default Sector;
