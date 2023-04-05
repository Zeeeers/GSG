import React, { useState, useEffect, ChangeEvent } from 'react';
import { Flex, Input, Select, InputGroup, InputLeftElement, Text, HStack } from '@chakra-ui/react';
import Flag from 'react-world-flags';
import { CountryCode, formatIncompletePhoneNumber, NationalNumber } from 'libphonenumber-js';
import { COUNTRIES, getCountryTelCode } from '../services/countries/countries';
import { Noop, RefCallBack } from 'react-hook-form';

interface PhoneNumberInputProps {
    value?: NationalNumber | string;
    country?: CountryCode | string;
    options: { label: string; value: CountryCode }[];
    onChange: (value: { code?: string; value: NationalNumber | string }) => void;
    placeholder: string;
    name: string;
    ref: RefCallBack;
    onBlur: Noop;
}

export default function PhoneNumberInput({
    value,
    country = 'CL',
    onChange,
    placeholder,
    name,
    ref,
    onBlur,
}: PhoneNumberInputProps) {
    let [number, setNumber] = useState(value || '');
    let [selectedCountry, setSelectedCountry] = useState(country || '');
    let [countryCode, setCountryCode] = useState<CountryCode | string | undefined>(getCountryTelCode(country) || '');

    const countryOptions = COUNTRIES.map(({ name, iso2 }) => ({
        label: name,
        value: iso2,
    }));

    const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value;
        let code = getCountryTelCode(value);

        setCountryCode(code);
        setSelectedCountry(value);
        onChange({ code: code, value: value });
    };

    const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        setNumber(value);
        onChange({ code: countryCode, value: value });
    };

    useEffect(() => {
        setSelectedCountry(country);
        setCountryCode(getCountryTelCode(country));
    }, [country]);

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
                    {countryOptions.map((option: { label: string; value: CountryCode }) => (
                        <option key={option.label} value={option.value}>
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
                ref={ref}
                onBlur={onBlur}
                pl="8rem"
                type="text"
                // @ts-ignore
                value={formatIncompletePhoneNumber(number, selectedCountry)}
                name={name}
                variant="flushed"
                color="white"
                _placeholder={{ color: 'gray.700', fontSize: '24px' }}
                borderColor="gray.700"
                fontSize="24px"
                placeholder={placeholder}
                onChange={onPhoneNumberChange}
            />
        </InputGroup>
    );
}

PhoneNumberInput.defaultProps = {
    options: [],
    size: 'md',
};
