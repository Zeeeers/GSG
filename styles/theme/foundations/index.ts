import colors from './colors';
import shadows from './shadows';
import typography from './typography';
import radii from './radius';

const foundations = {
    colors,
    radii,
    ...typography,
    shadows,
};

export default foundations;
