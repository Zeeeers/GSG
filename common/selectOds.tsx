import { Image } from '@chakra-ui/react';
import { Select } from '@clyc/options';
import { useQualityList } from 'services/api/lib/qualities';
const SelectOds = () => {
    const { data } = useQualityList();
    return (
        <Select
            isMulti
            placeholder=""
            variant="filled"
            closeMenuOnSelect={false}
            options={data?.qualities?.map((quality) => ({
                label: quality.name,
                value: quality.id,
                leftElement: (
                    <Image src={quality.icon.image} alt={quality.icon.name} w={4} h={4} objectFit="contain" mr={3} />
                ),
            }))}
        />
    );
};

export default SelectOds;
