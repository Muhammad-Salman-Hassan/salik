import { CompanyRating, EstimateData, PriceHistoryPoint, RatingFilter, RecommendationData, RecommendationPeriod, RecommendationHistoryPoint } from "./Interface";


function subtractDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - days);
  return newDate;
}

function subtractMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - months);
  return newDate;
}

function subtractYears(date: Date, years: number): Date {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() - years);
  return newDate;
}

export function filterRatings(data: CompanyRating[], filter: RatingFilter): CompanyRating[] {
  let cutoffDate = new Date();

  switch (filter.filterType) {
    case '14_days':
      cutoffDate = subtractDays(new Date(), 14);
      break;
    case '1_month':
      cutoffDate = subtractMonths(new Date(), 1);
      break;
    case '3_months':
      cutoffDate = subtractMonths(new Date(), 3);
      break;
    case '6_months':
      cutoffDate = subtractMonths(new Date(), 6);
      break;
    case '1_year':
      cutoffDate = subtractYears(new Date(), 1);
      break;
    case 'custom':
      if (filter.customDate) {
        cutoffDate = new Date(filter.customDate);
      }
      break;
  }

  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= cutoffDate;
  });
}
export function filterEstimatesRatings(data: EstimateData[], filter: RatingFilter): EstimateData[] {
  let cutoffDate = new Date();

  switch (filter.filterType) {
    case '14_days':
      cutoffDate = subtractDays(new Date(), 14);
      break;
    case '1_month':
      cutoffDate = subtractMonths(new Date(), 1);
      break;
    case '3_months':
      cutoffDate = subtractMonths(new Date(), 3);
      break;
    case '6_months':
      cutoffDate = subtractMonths(new Date(), 6);
      break;
    case '1_year':
      cutoffDate = subtractYears(new Date(), 1);
      break;
    case 'custom':
      if (filter.customDate) {
        cutoffDate = new Date(filter.customDate);
      }
      break;
  }

  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= cutoffDate;
  });
}
// export function filterPriceHistory(data: PriceHistoryPoint[], filter: RatingFilter): PriceHistoryPoint[] {
//   let cutoffDate = new Date();

//   switch (filter.filterType) {
//     case '14_days':
//       cutoffDate = subtractDays(new Date(), 14);
//       break;
//     case '1_month':
//       cutoffDate = subtractMonths(new Date(), 1);
//       break;
//     case '3_months':
//       cutoffDate = subtractMonths(new Date(), 3);
//       break;
//     case '6_months':
//       cutoffDate = subtractMonths(new Date(), 6);
//       break;
//     case '1_year':
//       cutoffDate = subtractYears(new Date(), 1);
//       break;
//     case 'custom':
//       if (filter.customDate) {
//         cutoffDate = new Date(filter.customDate);
//       }
//       break;
//   }

//   return data.filter((item) => {
//     const itemDate = new Date(item.date);
//     return itemDate >= cutoffDate;
//   });
// }
// export function filterEstimatesRecomendation(data: RecommendationData, filter: RatingFilter): RecommendationData {
//   let cutoffDate = new Date();

//   switch (filter.filterType) {
//     case '14_days':
//       cutoffDate = subtractDays(new Date(), 14);
//       break;
//     case '1_month':
//       cutoffDate = subtractMonths(new Date(), 1);
//       break;
//     case '3_months':
//       cutoffDate = subtractMonths(new Date(), 3);
//       break;
//     case '6_months':
//       cutoffDate = subtractMonths(new Date(), 6);
//       break;
//     case '1_year':
//       cutoffDate = subtractYears(new Date(), 1);
//       break;
//     case 'custom':
//       if (filter.customDate) {
//         cutoffDate = new Date(filter.customDate);
//       }
//       break;
//   }

  
// }

export function filterRecommendationPeriods(data: RecommendationPeriod[], filter: RatingFilter): RecommendationPeriod[] {
    return data.filter(item => {
        switch (filter.filterType) {
            case '14_days':
            case '1_month':
                return item.period === '1 mo.';
            case '3_months':
                return item.period === '3 mo.';
            case '6_months':
                return item.period === '6 mo.';
            case '1_year':
                return item.period === '1 yr.';
            default:
                return true;
        }
    });
}

export function filterRecommendationHistory(data: RecommendationHistoryPoint[], filter: RatingFilter): RecommendationHistoryPoint[] {
    const now = new Date();
    return data.filter(item => {
        const diffTime = Math.abs(now.getTime() - item.date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (filter.filterType) {
            case '14_days':
                return diffDays <= 14;
            case '1_month':
                return diffDays <= 30;
            case '3_months':
                return diffDays <= 90;
            case '6_months':
                return diffDays <= 180;
            case '1_year':
                return diffDays <= 365;
            default:
                return true;
        }
    });
}

export function filterPriceHistory(data: PriceHistoryPoint[], filter: RatingFilter): PriceHistoryPoint[] {
    const now = new Date();
    return data.filter(item => {
        const diffTime = Math.abs(now.getTime() - item.date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (filter.filterType) {
            case '14_days':
                return diffDays <= 14;
            case '1_month':
                return diffDays <= 30;
            case '3_months':
                return diffDays <= 90;
            case '6_months':
                return diffDays <= 180;
            case '1_year':
                return diffDays <= 365;
            default:
                return true;
        }
    });
}
