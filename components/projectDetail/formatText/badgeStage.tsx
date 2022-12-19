import { Badge } from '@chakra-ui/react';
import React from 'react';
import Stage from './stage';

type StageProps = {
    capitalStage:
        | 'pre-seed'
        | 'seed'
        | 'series-a'
        | 'series-b'
        | 'series-c'
        | 'series-d'
        | 'senior-debt'
        | 'mezzanine-debt'
        | 'other';
};

const BadgeStage: React.FC<StageProps> = ({ capitalStage }) => {
    return (
        <>
            <Badge
                variant="solid"
                colorScheme="green"
                textAlign="center"
                alignItems="center"
                py="2px"
                px="8px"
                rounded="6px"
                mt={0}
                fontFamily="inter"
            >
                {Stage(capitalStage)}
            </Badge>
        </>
    );
};

export default BadgeStage;
