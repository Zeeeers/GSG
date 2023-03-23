//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { Flex, Input, Select, InputGroup, InputLeftElement, Text, HStack } from '@chakra-ui/react';
import Flag from 'react-world-flags';
import { AsYouType } from 'libphonenumber-js';
import { getCountryTelCode } from './../services/countries';

export default function PhoneNumberInput({
    size,
    value,
    country,
    options,
    onChange,
    placeholder,
    defaultValue,
    ...rest
}) {
    let [number, setNumber] = useState(value || '');
    let [selectedCountry, setSelectedCountry] = useState(country || '');
    let [countryCode, setCountryCode] = useState(getCountryTelCode(country) || '');

    useEffect(() => {
        setSelectedCountry(country);
        setCountryCode(getCountryTelCode(country));
    }, [country]);

    const onCountryChange = (e) => {
        let value = e.target.value;
        let code = getCountryTelCode(value);
        let parsedNumber = new AsYouType().input(`${code}${number}`);

        setCountryCode(code);
        setSelectedCountry(value);
        onChange(parsedNumber);
    };

    const onPhoneNumberChange = (e) => {
        let value = e.target.value;
        let parsedNumber = new AsYouType().input(`${countryCode}${value}`);

        setNumber(value);
        onChange(parsedNumber);
    };

    return (
        <InputGroup border="none">
            <InputLeftElement
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="7rem"
                bg="gray.800"
                rounded="8px"
                h="30px"
            >
                <Select
                    top={-1}
                    left="0"
                    zIndex={1}
                    bottom={0}
                    opacity={0}
                    height="100%"
                    position="absolute"
                    value={selectedCountry}
                    variant="flushed"
                    onChange={onCountryChange}
                >
                    {options.map((option) => (
                        <option key={option} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
                <Flex pl={2} width="100%" alignItems="center">
                    <HStack alignItems="center" mr="10px" width="50%">
                        <Flag height="1rem" code={selectedCountry || ''} width="20px" />
                        <Text fontSize="16px" color="gray.300" fontFamily="inter">
                            {countryCode}
                        </Text>
                    </HStack>
                </Flex>
            </InputLeftElement>

            <Input
                pl="8rem"
                type="text"
                value={number}
                pattern="[0-9]"
                variant="flushed"
                color="white"
                _placeholder={{ color: 'gray.700', fontSize: '24px' }}
                borderColor="gray.700"
                fontSize="24px"
                placeholder={placeholder}
                onChange={onPhoneNumberChange}
                defaultValue={defaultValue}
            />
        </InputGroup>
    );
}

PhoneNumberInput.defaultProps = {
    options: [],
    size: 'md',
};
