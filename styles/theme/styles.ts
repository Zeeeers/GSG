import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
    global: {
        body: {
            fontFamily: 'body',
            color: 'gray.800',
            bg: 'white.base',
            transitionProperty: 'background-color',
            transitionDuration: 'normal',
            lineHeight: 'base',
        },
        '*::placeholder': {
            color: 'gray.400',
        },
        '*, *::before, &::after': {
            borderColor: 'gray.200',
            wordWrap: 'break-word',
        },
    },
};

export default styles;
