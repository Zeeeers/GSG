import { Quality } from './Quality';

type ThirdParty = ['certified-b', 'prize-org', 'incubators', 'corfo', 'other'];

type Stage = ['development', 'mvp', 'ready_to_launch', 'already_launched'];

type CapitalStage = [
    'pre-seed',
    'seed',
    'series-a',
    'series-b',
    'series-c',
    'series-d',
    'senior-debt',
    'mezzanine-debt',
    'other',
];

type TimeLapse = ['unti-a-year', 'until-2-years', 'until-3-years', 'until-4-years', 'more-than-4-years'];

type FinanceGoal = ['less-than-20', '20-49', '50-99', '100-249', '250', 'more-than-250', 'more-than-1000'];

type ExpectedRentability = ['1-5', '6-10', '11-20', 'more-than-21'];

export interface Interest {
    third_party: ThirdParty;
    stage: Stage;
    capital_stage: CapitalStage;
    finance_goal: FinanceGoal;
    time_lapse: TimeLapse;
    expected_rentability: ExpectedRentability;
    qualities: Array<Quality>;
}
