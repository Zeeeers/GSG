const Stage = (capitalStage: string) => {
    let stage = undefined;
    switch (capitalStage) {
        case 'pre-seed':
            return (stage = 'Pre-seed');

        case 'seed':
            return (stage = 'Seed');

        case 'series-a':
            return (stage = 'Serie A');

        case 'series-b':
            return (stage = 'Serie B');

        case 'series-c':
            return (stage = 'Serie C');

        case 'series-d':
            return (stage = 'Serie D');

        case 'senior-debt':
            return (stage = 'Deuda senior');

        case 'mezzanine-debt':
            return (stage = 'Deuda mezzanine');

        case 'other':
            return (stage = 'otro');
        default: {
            return stage;
        }
    }
};

export default Stage;
