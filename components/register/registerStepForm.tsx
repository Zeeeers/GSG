import React from 'react';
import { useRegisterStore } from 'stores/register';
import RegisterStepOneForm from './registerStepOneForm';
import RegisterStepTwoForm from './registerStepTwoForm';

const RegisterStepForm = () => {
    const step = useRegisterStore((state) => state.step);

    return <>{step === 'ONE' ? <RegisterStepOneForm /> : <RegisterStepTwoForm />}</>;
};

export default RegisterStepForm;
