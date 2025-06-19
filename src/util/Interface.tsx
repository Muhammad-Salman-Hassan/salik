// =================RATINGFILTER==========================
export type RatingFilterOption =
    | '14_days'
    | '1_month'
    | '3_months'
    | '6_months'
    | '1_year'
    | 'custom';

export interface RatingFilter {
    filterType: RatingFilterOption;
    customDate?: string;
}

// =================ANALYST PAGE==========================

export interface Analyst {
    name: string;
    email: string;
    phone: string;
    lastRatingDate: string;
}

export interface CompanyRating {
    company: string;
    analyst: Analyst;
    country: string;
    rating: 'Buy' | 'Hold' | 'Sell';
    ratingValue: 1 | 2 | 3 | 4 | 5;
    date: string;
}


export interface RatingScaleTooltipProps {
    value: 1 | 2 | 3 | 4 | 5;
    label: 'Buy' | 'Hold' | 'Sell';
}


export interface EstimateData {
    metric: string;
    actual?: number;
    estimates: {
        [year: string]: {
            average?: number;
            median?: number;
            high?: number;
            low?: number;
            contributors: number;
        };
    };
    unit: string;
    isPercentage?: boolean;
    date: string;
}

export interface ChartData {
    year: string;
    value: number;
}

export type ViewType = 'main' | 'chart' | 'summary';

export interface ViewState {
    type: ViewType;
    metric?: string;
    year?: string;
    chartType?: string;
}

// =================DISCLAIMER COMPONENT==========================


export interface DisclaimerProps {

    companyName?: string;
    pdfPath?: string;
    excelPath?: string;
    showDownloads?: boolean;
    customText?: string;
    initiallyExpanded?: boolean;
    containerProps?: any;
    titleProps?: any;
}


export interface ChartDataPoint {
    year: string;
    actual?: number;
    average?: number;
    median?: number;
    high?: number;
    low?: number;
}

// =================CONSENSUS PAGE==========================


export interface ConsensusBarChartProps {
    data: ChartDataPoint[];
    title?: string;
    unit?: string;
    height?: number;
    showActual?: boolean;
    showAverage?: boolean;
    showMedian?: boolean;
    showHigh?: boolean;
    showLow?: boolean;
    colors?: {
        actual?: string;
        average?: string;
        median?: string;
        high?: string;
        low?: string;
    };
}


export interface RecommendationData {
    buy: number;
    outperform: number;
    hold: number;
    underperform: number;
    sell: number;
}

export interface ConsensusRecommendationProps {
    data: RecommendationData;
    consensusValue?: number;
    showDetailed?: boolean;
    title?: string;

}

export interface RecommendationPeriod {
    period: string;
    average: number;
    buy: number;
    outperform: number;
    hold: number;
    underperform: number;
    sell: number;
}

export interface RecommendationHistoryPoint {
    month: string;
    date: Date;
    recommendation: number; // 1-5 scale
    recommendationType: string; // 'Buy', 'Outperform', etc.
}

export interface RecommendationsTableProps {
    data: RecommendationPeriod[];
    title?: string;
}

export interface RecommendationHistoryChartProps {
    data: RecommendationHistoryPoint[];
    title?: string;
    height?: number;
}


export interface PriceHistoryPoint {
    month: string;
    date: Date;
    targetPrice: number;
    closingPrice: number;
}

export interface TargetPriceHistoryProps {
    data: PriceHistoryPoint[];
    title?: string;
    height?: number;
    currency?: string;
    showLegend?: boolean;
}

// =================STOCK SHARES PAGE==========================


export interface ShareData {
    id: string;
    selectShare: string;
    market: string;
    currency: string;
    dataStartingFrom: string;
}

export interface ShareSelectionTableProps {
    data?: ShareData[];
    onShareSelect?: (shareId: string) => void;
}


// =================DIVIDEND PAAAGE===========================
export interface CalculationInputs {
    dateOfInvestment: string;
    endDateOfInvestment: string;
    amountInvested: string;
    sharesPurchased: string;
    currency: string;
}

export interface ApiResponse {
    investment: number;
    dividendsPaidOut: number;
    dividendsFrequency: string;
    reinvested: {
        dividendsTotal: number;
        yieldOnInvestment: number;
        annualizedYield: number;
        endShares: number;
        totalReturn: number;
    };
    cashedOut: {
        dividendsTotal: number;
        yieldOnInvestment: number;
        annualizedYield: number;
        endShares: number;
        totalReturn: number;
    };
    chartData: Array<{
        year: string;
        reinvested: number;
        cashedOut: number;
    }>;
}

export interface DividendCalculatorProps {
    onCalculate?: (inputs: CalculationInputs) => Promise<ApiResponse>;
    isLoading?: boolean;
}


export interface DividendData {
    date: string;
    value: number;
    type: 'Semi-Annual' | 'Annual' | 'Interim';
    color: string;
}

export interface DividendTableData {
    financialPeriod: string;
    type: string;
    dividendAdjusted: number;
    exDividendDate: string;
    registryCloseDate: string;
    paymentDate: string;
}

export interface DividendPerShareProps {
    chartData?: DividendData[];
    tableData?: DividendTableData[];
    onViewChange?: (view: string) => void;
}


export interface ReturnData {
    date: string;
    periodicReturn: number;
    cumulativeReturn: number;
    annualReturn: number;
}

export interface ReturnTableData {
    period: string;
    periodicReturn: number;
    cumulativeReturn: number;
    annualReturn: number;
}

export type ChartType = 'periodic' | 'cumulative' | 'annual';
export type TimeRange = '1year' | '3year' | 'all';



export interface DividendOverviewData {
    latestDividend: {
        amount: number;
        currency: string;
        exDividendDate: string;
        paymentDate: string;
        type: string;
    };
    dividendYield: {
        currentYield: number;
        monthlyDividend: number;
        currency: string;
    };
    totalReturns: {
        twelveMonths: number;
        threeYears: number;
    };
    annualDividend: Array<{
        year: string;
        amount: number;
    }>;
    annualDividendYield: Array<{
        year: string;
        yield: number;
    }>;
    chartData: {
        twelveMonths: Array<{ month: string; value: number }>;
        threeYears: Array<{ month: string; value: number }>;
    };
}

export interface DividendDashboardProps {
    data?: DividendOverviewData;
}