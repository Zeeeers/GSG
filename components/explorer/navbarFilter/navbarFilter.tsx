// Dependencies
//@ts-nocheck
import { Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useCheckboxGroup } from '@chakra-ui/checkbox';
import CheckCard from 'common/checkCard';
import { useGsg } from 'services/api/lib/gsg';
import { useFilterStore } from 'stores/filters';

// Types
interface Props {}

// Component
const NavbarFilter: React.FC<Props> = ({}) => {
    const { data } = useGsg();
    const setFilters = useFilterStore((s) => s.setFilters);
    const filters = useFilterStore((s) => s.filters);

    const { getCheckboxProps } = useCheckboxGroup({
        defaultValue: [],
        onChange: (value) => setFilters({ ...filters, qualities: value }),
    });

    return (
        <Wrap spacing="12px">
            {data?.data?.qualities
                ?.map((item) => item.icon.name)
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
