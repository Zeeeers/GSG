import { Text } from '@chakra-ui/react';

interface Props {
    number: number;
    fontSize: string;
    fontWeight: string;
}

const CurrencyFormat: React.FC<Props> = ({ number, fontSize, fontWeight }) => {
    return (
        <Text fontSize={fontSize} fontWeight={fontWeight}>
            {'$' + number?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </Text>
    );
};

export default CurrencyFormat;
