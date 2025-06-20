
import React, { useState } from 'react';

import { ChartComponent, ChartType } from '../ChartComponent';
import { DataCategory } from '../../util/Interface';
import { dummycashFlowData, dummychartTypes, dummyfinancialPositionData, dummyoperatingData, incomeStatementData } from '../../util/DummyData';
import { DataTable } from './ReportResultDataTable';
import { Button } from '@chakra-ui/react';


const tableColumns = {
    income: [
        { key: 'period', header: 'Period' },
        { key: 'revenue', header: 'Revenue', format: 'currency' },
        { key: 'ebitda', header: 'EBITDA', format: 'currency' },
        { key: 'ebitdaMargin', header: 'EBITDA Margin', format: 'percentage' },
        { key: 'profitForPeriod', header: 'Net Profit', format: 'currency' },
        { key: 'netProfitMargin', header: 'Net Margin', format: 'percentage' }
    ],
    position: [
        { key: 'period', header: 'Period' },
        { key: 'totalAssets', header: 'Total Assets', format: 'currency' },
        { key: 'totalLiabilities', header: 'Total Liabilities', format: 'currency' },
        { key: 'equity', header: 'Equity', format: 'currency' },
        { key: 'grossDebt', header: 'Gross Debt', format: 'currency' },
        { key: 'netDebt', header: 'Net Debt', format: 'currency' }
    ],
    cashflow: [
        { key: 'period', header: 'Period' },
        { key: 'operatingActivities', header: 'Operating CF', format: 'currency' },
        { key: 'investingActivities', header: 'Investing CF', format: 'currency' },
        { key: 'financingActivities', header: 'Financing CF', format: 'currency' },
        { key: 'freeashFlow', header: 'Free Cash Flow', format: 'currency' }
    ],
    operating: [
        { key: 'period', header: 'Period' },
        { key: 'tollGates', header: 'Toll Gates', format: 'number' },
        { key: 'totalTrips', header: 'Total Trips (M)', format: 'number' },
        { key: 'discountedTrips', header: 'Discounted Trips (M)', format: 'number' },
        { key: 'revenueGeneratingTrips', header: 'Revenue Trips (M)', format: 'number' }
    ]
};

export const ReportsSummary: React.FC = () => {
    const [showTable, setShowTable] = useState(false);
    const [activeTab, setActiveTab] = useState<DataCategory>('income');
    const [chartType, setChartType] = useState<ChartType>('line');

    const getDataByCategory = (category: DataCategory) => {
        switch (category) {
            case 'income': return incomeStatementData;
            case 'position': return dummyfinancialPositionData;
            case 'cashflow': return dummycashFlowData;
            case 'operating': return dummyoperatingData;
            default: return incomeStatementData;
        }
    };

    const renderCharts = () => {
        const data = getDataByCategory(activeTab);
        const configs = dummychartTypes[activeTab];

        return Object.entries(configs).map(([key, config]) => (
            <ChartComponent
                key={key}
                data={data}
                configs={config}
                type={chartType}
                title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} - ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                height={400}
            />
        ));
    };

    return (
        <div style={{
            padding: '20px',
            background: '#f7fafc',
            minHeight: '100vh'
        }}>

            <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{
                    color: '#2d3748',
                    margin: '0 0 20px 0',
                    fontSize: '2rem',
                    fontWeight: '700'
                }}>
                    Key Figures
                </h1>

               
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        {(['income', 'position', 'cashflow', 'operating'] as DataCategory[]).map((category) => (
                            <Button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                bg={activeTab === category ? 'teal.800' : 'teal'}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: 'none',

                                    color: activeTab === category ? 'white' : 'white',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    textTransform: 'capitalize',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {category === 'cashflow' ? 'Cash Flow' : category}
                            </Button>
                        ))}
                    </div>


                    <div style={{ display: 'flex', gap: '8px' }}>
                        {(['line', 'bar', 'area'] as ChartType[]).map((type) => (
                            <Button
                                key={type}
                                onClick={() => setChartType(type)}
                                bg={chartType === type ? 'blue.600' : 'white'}
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #e2e8f0',

                                    color: chartType === type ? 'white' : '#4a5568',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    textTransform: 'capitalize',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {type}
                            </Button>
                        ))}
                    </div>


                    <Button
                        onClick={() => setShowTable(!showTable)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            background: showTable ? '#d69e2e' : 'white',
                            color: showTable ? 'white' : '#4a5568',
                            cursor: 'pointer',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        📊 {showTable ? 'Hide Table' : 'Show Table'}
                    </Button>
                </div>
            </div>

           
            {showTable ? (
                <DataTable
                    data={getDataByCategory(activeTab)}
                    columns={tableColumns[activeTab]}
                    title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Statement`}
                />
            ) : (
                <div>
                    {renderCharts()}
                </div>
            )}
        </div>
    );
};
