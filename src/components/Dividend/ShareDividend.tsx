import React from 'react';
import {
  Box,
  Table,
} from '@chakra-ui/react';
import { ShareData, ShareSelectionTableProps } from '../../util/Interface';



const ShareDividendTable: React.FC<ShareSelectionTableProps> = ({ 
  data = [],
  onShareSelect 
}) => {
  // Dummy data for demonstration
  const defaultData: ShareData[] = [
    {
      id: '1',
      selectShare: 'KPT',
      market: 'Karachi',
      currency: 'RS',
      dataStartingFrom: '29/09/2022'
    },
    {
      id: '2',
      selectShare: 'NASDK',
      market: 'India',
      currency: 'IND RS',
      dataStartingFrom: '15/03/2019'
    },
   
  ];

  const tableData = data.length > 0 ? data : defaultData;

  const handleRowClick = (shareId: string) => {
    if (onShareSelect) {
      onShareSelect(shareId);
    }
  };

  return (
    <Box w="full" overflowX="auto">
      <Table.Root variant="outline" size="md">
        <Table.Header bg="#008080">
          <Table.Row>
            <Table.ColumnHeader color="white" py={4} px={6}>
              Select Share
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" py={4} px={6} textAlign="center">
              Market
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" py={4} px={6} textAlign="center">
              Currency
            </Table.ColumnHeader>
            <Table.ColumnHeader color="white" py={4} px={6} textAlign="center">
              Data starting from
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map((share, index) => (
            <Table.Row 
              key={share.id}
              bg={index % 2 === 0 ? 'white' : 'gray.50'}
              _hover={{ bg: 'blue.50', cursor: 'pointer' }}
              onClick={() => handleRowClick(share.id)}
            >
              <Table.Cell py={4} px={6} fontWeight="medium">
                {share.selectShare}
              </Table.Cell>
              <Table.Cell py={4} px={6} textAlign="center">
                {share.market}
              </Table.Cell>
              <Table.Cell py={4} px={6} textAlign="center">
                {share.currency}
              </Table.Cell>
              <Table.Cell py={4} px={6} textAlign="center">
                {share.dataStartingFrom}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};



export default ShareDividendTable;
