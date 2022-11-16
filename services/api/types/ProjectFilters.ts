import { Certification } from './Certification';
import { ContributionAmount } from './ContributionAmount';
import { ExpectedReturn } from './ExpectedReturn';
import { InvestmentTerms } from './InvestmentTerms';
import { ProjectStage } from './ProjectStage';
import { Quality } from './Quality';
import { SurveyStage } from './SurveyStage';

export type ProjectOrderAttr =
    | 'id'
    | 'projects.id'
    | 'created_at'
    | 'projects.last_status_updated'
    | 'title'
    | 'projects.title'
    | 'status'
    | 'projects.status';

type ProjectSort = 'asc' | 'desc';

export interface ProjectFilters {
    search?: string;
    qualities?: Array<Quality>;
    certification?: Array<Certification>;
    projectStage?: Array<ProjectStage>;
    surveyStage?: Array<SurveyStage>;
    expectedReturn?: Array<ExpectedReturn>;
    contributionAmount?: Array<ContributionAmount>;
    investmentTerms?: Array<InvestmentTerms>;
    order_by?: [order: ProjectOrderAttr | string, sort: ProjectSort];
}
