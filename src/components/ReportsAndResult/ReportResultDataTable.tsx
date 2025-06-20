interface Column {
    key: string;
    header: string;
    format?: 'currency' | 'percentage' | 'number';
  }
  
  interface DataTableProps {
    data: any[];
    columns: Column[];
    title: string;
  }
  
  const formatValue = (value: any, format?: string): string => {
    if (value === null || value === undefined) return '-';
    
    switch (format) {
      case 'currency':
        return `AED ${value.toFixed(1)}M`;
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'number':
        return value.toFixed(1);
      default:
        return value.toString();
    }
  };
  
  export const DataTable: React.FC<DataTableProps> = ({ data, columns, title }) => {
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
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ background: '#f7fafc' }}>
                {columns.map((column) => (
                  <th key={column.key} style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#4a5568',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} style={{
                  borderBottom: '1px solid #e2e8f0',
                  ':hover': { background: '#f7fafc' }
                }}>
                  {columns.map((column) => (
                    <td key={column.key} style={{
                      padding: '12px 16px',
                      color: '#2d3748'
                    }}>
                      {formatValue(row[column.key], column.format)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  