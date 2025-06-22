import React, { useState } from 'react';
import { ChartComponent, ChartType } from '../ChartComponent';
import { DataCategory } from '../../util/Interface';
import {
    dummyAnnualcashFlowData,
    dummyAnnualfinancialPositionData,
    dummyAnnualoperatingData,
    dummycashFlowData,
    dummyfinancialPositionData,
    dummyoperatingData,
    incomeAnnualStatementData,
    incomeStatementData
} from '../../util/DummyData';
import { DataTable } from './ReportResultDataTable';
import { Box, Button, Flex, Tabs } from '@chakra-ui/react';


const chartConfigurations = {
    income: [
        { title: 'Revenue', dataKey: 'revenue', color: '#4a5568', format: 'currency' },
        { title: 'EBITDA', dataKey: 'ebitda', color: '#1a365d', format: 'currency' },
        { title: 'EBITDA Margin', dataKey: 'ebitdaMargin', color: '#38a169', format: 'percentage' },
        { title: 'Profit for the period', dataKey: 'profitForPeriod', color: '#7a8084', format: 'currency' },
        { title: 'Net profit margin', dataKey: 'netProfitMargin', color: '#d69e2e', format: 'percentage' },
        { title: 'Dividends declared', dataKey: 'dividendsDeclared', color: '#e53e3e', format: 'currency' }
    ],
    position: [
        { title: 'Total Assets', dataKey: 'totalAssets', color: '#4a5568', format: 'currency' },
        { title: 'Current Assets', dataKey: 'currentAssets', color: '#38a169', format: 'currency' },
        { title: 'Non-Current Assets', dataKey: 'nonCurrentAssets', color: '#d69e2e', format: 'currency' },
        { title: 'Total Liabilities', dataKey: 'totalLiabilities', color: '#e53e3e', format: 'percentage' },
        { title: 'Equity', dataKey: 'equity', color: '#805ad5', format: 'percentage' },
        { title: 'Gross Debt', dataKey: 'grossDebt', color: '#1a365d', format: 'currency' },
        { title: 'Net Debt', dataKey: 'netDebt', color: '#7a8084', format: 'currency' }
    ],
    cashflow: [
        { title: 'Operating Activities', dataKey: 'operatingActivities', color: '#38a169', format: 'currency' },
        { title: 'Investing Activities', dataKey: 'investingActivities', color: '#d69e2e', format: 'currency' },
        { title: 'Financing Activities', dataKey: 'financingActivities', color: '#e53e3e', format: 'currency' },
        { title: 'Free Cash Flow', dataKey: 'freeashFlow', color: '#4a5568', format: 'currency' },
        { title: 'FCF Margin', dataKey: 'freeashFlowMargin', color: '#805ad5', format: 'percentage' }
    ],
    operating: [
        { title: 'Toll Gates', dataKey: 'tollGates', color: '#d69e2e', format: 'number' },
        { title: 'Total Trips', dataKey: 'totalTrips', color: '#4a5568', format: 'number' },
        { title: 'Revenue Generating Trips', dataKey: 'revenueGeneratingTrips', color: '#38a169', format: 'number' },
        { title: 'Discounted Trips', dataKey: 'discountedTrips', color: '#e53e3e', format: 'number' },
        { title: 'Net Toll Traffic', dataKey: 'netTollTraffic', color: '#805ad5', format: 'number' }
    ]
};

const tableColumns = {
    income: [
        { key: 'period', header: 'Period' },
        { key: 'revenue', header: 'Revenue', format: 'currency' },
        { key: 'ebitda', header: 'EBITDA', format: 'currency' },
        { key: 'ebitdaMargin', header: 'EBITDA Margin', format: 'percentage' },
        { key: 'profitForPeriod', header: 'Net Profit', format: 'currency' },
        { key: 'netProfitMargin', header: 'Net Margin', format: 'percentage' },
        { key: 'dividendsDeclared', header: 'Dividends Declared', format: 'currency' }
    ],
    position: [
        { key: 'period', header: 'Period' },
        { key: 'totalAssets', header: 'Total Assets', format: 'currency' },
        { key: 'currentAssets', header: 'Current Assets', format: 'currency' },
        { key: 'nonCurrentAssets', header: 'Non-Current Assets', format: 'currency' },
        { key: 'totalLiabilities', header: 'Total Liabilities', format: 'percentage' },
        { key: 'equity', header: 'Equity', format: 'percentage' },
        { key: 'grossDebt', header: 'Gross Debt', format: 'currency' },
        { key: 'netDebt', header: 'Net Debt', format: 'currency' }
    ],
    cashflow: [
        { key: 'period', header: 'Period' },
        { key: 'operatingActivities', header: 'Operating CF', format: 'currency' },
        { key: 'investingActivities', header: 'Investing CF', format: 'currency' },
        { key: 'financingActivities', header: 'Financing CF', format: 'currency' },
        { key: 'freeashFlow', header: 'Free Cash Flow', format: 'currency' },
        { key: 'freeashFlowMargin', header: 'FCF Margin', format: 'percentage' }
    ],
    operating: [
        { key: 'period', header: 'Period' },
        { key: 'tollGates', header: 'Toll Gates', format: 'number' },
        { key: 'totalTrips', header: 'Total Trips (M)', format: 'number' },
        { key: 'discountedTrips', header: 'Discounted Trips (M)', format: 'number' },
        { key: 'netTollTraffic', header: 'Net Toll Traffic (M)', format: 'number' },
        { key: 'revenueGeneratingTrips', header: 'Revenue Trips (M)', format: 'number' }
    ]
};

export const ReportsSummary: React.FC = () => {
    const [showTable, setShowTable] = useState(false);
    const [activeTab, setActiveTab] = useState<DataCategory>('income');
    const [chartType, setChartType] = useState<ChartType>('bar');

    const getDataByCategory = (category: DataCategory) => {
        switch (category) {
            case 'income': return incomeStatementData;
            case 'position': return dummyfinancialPositionData;
            case 'cashflow': return dummycashFlowData;
            case 'operating': return dummyoperatingData;
            default: return incomeStatementData;
        }
    };
    const getDataByAnnualCategory = (category: DataCategory) => {
        switch (category) {
            case 'income': return incomeAnnualStatementData;
            case 'position': return dummyAnnualfinancialPositionData;
            case 'cashflow': return dummyAnnualcashFlowData;
            case 'operating': return dummyAnnualoperatingData;
            default: return incomeStatementData;
        }
    };

    const getChartTitle = (category: DataCategory) => {
        switch (category) {
            case 'income': return 'Income Statement';
            case 'position': return 'Financial Position';
            case 'cashflow': return 'Cash Flow';
            case 'operating': return 'Operating Data';
            default: return 'Financial Data';
        }
    };

    const renderSingleChart = (key: string) => {
        const data = key === "quarterly" ? getDataByCategory(activeTab) : getDataByAnnualCategory(activeTab);
        const configs = chartConfigurations[activeTab];
        const title = getChartTitle(activeTab);

        return (
            <ChartComponent
                key={activeTab}
                data={data}
                configs={configs}
                type={chartType}
                title={title}
                height={500}
            />
        );
    };


    const Naming = (category: string) => {
        switch (category) {
            case "income":
                return "Income Statement"
            case "position":
                return "Financial Position"
            case "cashflow":
                return "Cash FLow"
            case "operating":
                return "Key Operating Figure"

            default:
                return "Income";
        }
    }
    return (
        <div style={{
            padding: '20px',
            background: '#f7fafc',
            minHeight: '100vh'
        }}>
            <Flex
                direction="column"
                maxW={{ base: '100%', md: '90%', lg: '1500px' }}
                mx="auto"
                h="full"
                borderRadius="lg"
                overflow="hidden"
            >
                <Tabs.Root defaultValue="analysts" fitted variant="enclosed" colorPalette="teal">
                    <Tabs.List
                        flexDirection={{ base: 'column', md: 'row' }}
                        overflowX={{ base: 'visible' }}
                        flexWrap="nowrap"
                        background="teal"
                    >
                        <Tabs.Trigger value="analysts" w={{ base: '100%', md: 'auto' }}
                            color="white"
                            bg="transparent"
                            borderRadius="md"
                            px={4}
                            py={3}
                            fontSize="sm"
                            fontWeight="medium"
                            transition="all 0.2s"

                            _selected={{
                                bg: "white",
                                color: "teal.600",
                                fontWeight: "semibold",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                            }}>
                            Annual Key Figure
                        </Tabs.Trigger>
                        <Tabs.Trigger value="consensus" w={{ base: '100%', md: 'auto' }}
                            color="white"
                            bg="transparent"
                            borderRadius="md"
                            px={4}
                            py={3}
                            fontSize="sm"
                            fontWeight="medium"
                            transition="all 0.2s"

                            _selected={{
                                bg: "white",
                                color: "teal.600",
                                fontWeight: "semibold",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                            }}>
                            Quarterly Key Figure
                        </Tabs.Trigger>

                    </Tabs.List>

                    <Box flex="1" overflowY="auto" px={{ base: 2, md: 4 }} py={4}>
                        <Tabs.Content value="analysts">
                            <div style={{
                                background: 'white',
                                borderRadius: '12px',
                                padding: '24px',
                                marginBottom: '20px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }}>

                                <div style={{
                                    display: 'flex',
                                    gap: '20px',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    {/* Tab Selection */}
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
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    fontWeight: '500',
                                                    textTransform: 'capitalize',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {Naming(category)}
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

                                    {/* Table Toggle */}
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
                                    data={getDataByAnnualCategory(activeTab)}
                                    columns={tableColumns[activeTab]}
                                    title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Statement`}
                                />
                            ) : (
                                <div>
                                    {renderSingleChart("annual")}
                                </div>
                            )}
                        </Tabs.Content>

                        <Tabs.Content value="consensus">
                            <div style={{
                                background: 'white',
                                borderRadius: '12px',
                                padding: '24px',
                                marginBottom: '20px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                            }}>


                                <div style={{
                                    display: 'flex',
                                    gap: '20px',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    {/* Tab Selection */}
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
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    fontWeight: '500',
                                                    textTransform: 'capitalize',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {Naming(category)}
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
                                    {renderSingleChart("quarterly")}
                                </div>
                            )}
                        </Tabs.Content>


                    </Box>
                </Tabs.Root>
            </Flex>

        </div>
    );
};