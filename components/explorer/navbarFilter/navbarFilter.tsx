// Dependencies
import { Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useCheckboxGroup } from '@chakra-ui/checkbox';
import CheckCard from 'common/checkCard';
import { useQualityList } from 'services/api/lib/qualities';

// Types
interface Props {}

// Component
const NavbarFilter: React.FC<Props> = ({}) => {
    const { data } = useQualityList();

    const { getCheckboxProps } = useCheckboxGroup({
        defaultValue: [],
        //onChange: (value) => setFilters([...filters, value]),
    });

    return (
        <Wrap spacing="12px">
            {data?.qualities
                .map((item) => item.icon.name)
                ?.map((item, index) => (
                    <CheckCard
                        key={`${index}-explorerFilter`}
                        as={WrapItem}
                        v
                        value={item}
                        cursor="pointer"
                        px={'16px'}
                        py={'8px'}
                        rounded="16px"
                        bg="gray.700"
                        textColor="white"
                        fontWeight="normal"
                        fontFamily="inter"
                        fontSize="md"
                        _hover={{ bg: 'gray.600' }}
                        _checked={{ bg: 'teal.500', textColor: 'white', _hover: { bg: 'teal.600' } }}
                        {...getCheckboxProps({ value: item })}
                    >
                        <Text>{item}</Text>
                    </CheckCard>
                ))}
        </Wrap>
    );
};

// Export
export default NavbarFilter;
