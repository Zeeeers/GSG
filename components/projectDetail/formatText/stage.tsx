const Stage = (capitalStage: string) => {
    let stage = undefined;
    switch (capitalStage) {
        case 'pre-seed':
            return (stage = 'Pre-seed');

        case 'seed':
            return (stage = 'Seed');

        case 'serie-a':
            return (stage = 'Serie A');

        case 'serie-b':
            return (stage = 'Serie B');

        case 'serie-c':
            return (stage = 'Serie C');

        case 'serie-d':
            return (stage = 'Serie D');

        case 'senior-debt':
            return (stage = 'Deuda senior');

        case 'mezzanine-debt':
            return (stage = 'Deuda mezzanine');

        case 'other':
            return (stage = 'Ninguno');
        default: {
            return stage;
        }
    }
};

export default Stage;
