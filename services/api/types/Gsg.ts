// Types
export interface Gsg {
    id: number;
    title: string;
    description: string;
    status: string;
    finance_goal: number;
    end_date: string;
    business_name: string;
    business_web: string;
    qualities: Array<String>;
    impact_what: string;
    impact_who: string;
    impact_how_much: string;
    impact_contribution: string;
    impact_risk: string;
    problem: string;
    solution: string;
    more_info: string;
    finance: string;
    business_model: string;
    expenses_use: string;
    investment_opportunity: string;
    created_at: string;
    updated_at: string;
    tags: string;
    main_image: string;
}

export interface GsgFormated {
    id: number;
    title: string;
    description: string;
    finance_goal: number;
    end_date: string;
    business_name: string;
    business_web: string;
    impact_what: string;
    impact_who: string;
    impact_how_much: string;
    impact_contribution: string;
    impact_risk: string;
    problem: string;
    solution: string;
    more_info: string;
    finance: string;
    business_model: string;
    expenses_use: string;
    investment_opportunity: string;
    created_at: string;
    updated_at: string;
    tags: string;
    main_image: string;
}
