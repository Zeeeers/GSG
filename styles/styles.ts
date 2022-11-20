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
        /* --- Scroll bar class --- */
        '.custom-scroll::-webkit-scrollbar': {
            width: '16px',
        },
        '.custom-scroll::-webkit-scrollbar-track': {
            bgColor: 'transparent',
        },
        /*thumb*/
        '.custom-scroll::-webkit-scrollbar-thumb': {
            bgColor: 'black.alpha.24',
            borderRadius: '2xl',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            h: '25vh',
            transition: 'background-color 2s ease-in-out',
        },
        /*thumb hover*/
        '.custom-scroll::-webkit-scrollbar-thumb:hover': {
            bgColor: 'black.alpha.32',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            transition: 'background-color 2s ease-in-out',
        },
        /*thumb pressed*/
        '.custom-scroll::-webkit-scrollbar-thumb:active': {
            bgColor: 'black.alpha.48',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            transition: 'background-color 2s ease-in-out',
        },
    },
};

export default styles;
