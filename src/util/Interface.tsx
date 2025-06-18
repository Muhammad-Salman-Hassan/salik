// types.ts
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


 export  interface PriceHistoryPoint {
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
  