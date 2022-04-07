import { Controller } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormLabel, Image } from '@chakra-ui/react';
import { Select } from '@clyc/options';
import { useQualityList } from 'services/api/lib/qualities';
const SelectOds = () => {
    const { data } = useQualityList();
    return (
        <Select
            isMulti
            variant="outline"
            placeholder=""
            closeMenuOnSelect={false}
            options={data?.qualities?.map((quality) => ({
                label: quality.name,
                value: quality.id,
                leftElement: (
                    <Image
                        src={quality.icon.image}
                        alt={quality.icon.name}
                        tWidth={50}
                        tHeight={50}
                        fitIn
                        w={6}
                        h={6}
                        objectFit="contain"
                        mr={3}
                    />
                ),
            }))}
        />
    );
};

export default SelectOds;
