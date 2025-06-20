import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ['#3182ce', '#38a169', '#d69e2e', '#e53e3e', '#805ad5', '#dd6b20', '#319795', '#c53030'];

const formatTooltipValue = (value: any, format?: string): string => {
    if (format === 'currency') return `AED ${value}M`;
    if (format === 'percentage') return `${value}%`;
    return value.toString();
};

export type ChartType = 'line' | 'bar' | 'area' | 'pie';
export interface ChartProps {
    data: any[];
    configs: ChartConfig[];
    type: ChartType;
    title: string;
    height?: number;
}

export interface ChartConfig {
    title: string;
    dataKey: string;
    color: string;
    format?: 'currency' | 'percentage' | 'number';
}

export const ChartComponent: React.FC<ChartProps> = ({
    data,
    configs,
    type,
    title,
    height = 400
}) => {
    const renderChart = () => {
        switch (type) {
            case 'line':
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="period"
                            stroke="#718096"
                            fontSize={12}
                        />
                        <YAxis stroke="#718096" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                            formatter={(value, name, props) => {
                                const config = configs.find(c => c.dataKey === name);
                                return [formatTooltipValue(value, config?.format), config?.title || name];
                            }}
                        />
                        <Legend />
                        {configs.map((config, index) => (
                            <Line
                                key={config.dataKey}
                                type="monotone"
                                dataKey={config.dataKey}
                                stroke={config.color || COLORS[index % COLORS.length]}
                                strokeWidth={2}
                                dot={{ fill: config.color || COLORS[index % COLORS.length], strokeWidth: 2, r: 4 }}
                                name={config.title}
                            />
                        ))}
                    </LineChart>
                );

            case 'bar':
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="period"
                            stroke="#718096"
                            fontSize={12}
                        />
                        <YAxis stroke="#718096" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                            formatter={(value, name) => {
                                const config = configs.find(c => c.dataKey === name);
                                return [formatTooltipValue(value, config?.format), config?.title || name];
                            }}
                        />
                        <Legend />
                        {configs.map((config, index) => (
                            <Bar
                                key={config.dataKey}
                                dataKey={config.dataKey}
                                fill={config.color || COLORS[index % COLORS.length]}
                                name={config.title}
                                radius={[4, 4, 0, 0]}
                            />
                        ))}
                    </BarChart>
                );

            case 'area':
                return (
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="period"
                            stroke="#718096"
                            fontSize={12}
                        />
                        <YAxis stroke="#718096" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                            formatter={(value, name) => {
                                const config = configs.find(c => c.dataKey === name);
                                return [formatTooltipValue(value, config?.format), config?.title || name];
                            }}
                        />
                        <Legend />
                        
                        {configs.map((config, index) => (
                            <Area
                                key={config.dataKey}
                                type="monotone"
                                dataKey={config.dataKey}
                                stackId="1"
                                stroke={config.color || COLORS[index % COLORS.length]}
                                fill={config.color || COLORS[index % COLORS.length]}
                                fillOpacity={0.1}
                                name={config.title}
                            />
                        ))}
                    </AreaChart>
                );

            case 'pie':
                const pieData = data.map((item, index) => ({
                    name: item.period,
                    value: item[configs[0].dataKey],
                    fill: COLORS[index % COLORS.length]
                }));

                return (
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => {
                                const config = configs[0];
                                return [formatTooltipValue(value, config?.format), config?.title];
                            }}
                        />
                    </PieChart>
                );

            default:
                return null;
        }
    };

    return (
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            margin: '20px 0'
        }}>
            <h3 style={{
                marginBottom: '20px',
                color: '#2d3748',
                fontSize: '1.5rem',
                fontWeight: '600'
            }}>
                {title}
            </h3>

            <ResponsiveContainer width="100%" height={height}>
                {renderChart()}
            </ResponsiveContainer>
        </div>
    );
};