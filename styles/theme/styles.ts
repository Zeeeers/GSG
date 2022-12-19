import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
    global: {
        body: {
            fontFamily: 'body',
            color: 'gray.50',
            bg: 'gray.900',
            transitionProperty: 'background-color',
            transitionDuration: 'normal',
            lineHeight: 'base',
        },
        '*::placeholder': {
            color: 'gray.50',
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
            bgColor: 'gray.700',
            borderRadius: '2xl',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            h: '25vh',
            transition: 'background-color 2s ease-in-out',
        },
        /*thumb hover*/
        '.custom-scroll::-webkit-scrollbar-thumb:hover': {
            bgColor: 'gray.600',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            transition: 'background-color 2s ease-in-out',
        },
        /*thumb pressed*/
        '.custom-scroll::-webkit-scrollbar-thumb:active': {
            bgColor: 'gray.600',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            transition: 'background-color 2s ease-in-out',
        },

        /*Scroll Bar Light */
        /* --- Scroll bar class --- */
        '.custom-scroll-light::-webkit-scrollbar': {
            width: '16px',
        },
        '.custom-scroll-light::-webkit-scrollbar-track': {
            bgColor: 'transparent',
        },
        /*thumb*/
        '.custom-scroll-light::-webkit-scrollbar-thumb': {
            bgColor: 'gray.600',
            borderRadius: '2xl',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            h: '25vh',
            transition: 'background-color 2s ease-in-out',
        },
        /*thumb hover*/
        '.custom-scroll-light::-webkit-scrollbar-thumb:hover': {
            bgColor: 'gray.500',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            transition: 'background-color 2s ease-in-out',
        },
        /*thumb pressed*/
        '.custom-scroll-light::-webkit-scrollbar-thumb:active': {
            bgColor: 'gray.500',
            border: '4px solid transparent',
            backgroundClip: 'content-box',
            transition: 'background-color 2s ease-in-out',
        },
    },
};

export default styles;
