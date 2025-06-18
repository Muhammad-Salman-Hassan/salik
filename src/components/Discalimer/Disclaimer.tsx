import React, { useState } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { FaRegFileExcel, FaRegFilePdf } from 'react-icons/fa';
import { DisclaimerProps } from '../../util/Interface';

const Disclaimer: React.FC<DisclaimerProps> = ({
  companyName = "Salik",
  pdfPath = "/your-download-path.pdf",
  excelPath = "/your-download-path.xlsx",
  showDownloads = true,
  customText,
  initiallyExpanded = false,
  containerProps = {},
  titleProps = {},
}) => {
  const [isOpen, setIsOpen] = useState(initiallyExpanded);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const defaultDisclaimerText = `${companyName} (hereafter referred to as "The Company") is followed by the analyst(s) listed above. Please note that any opinions, estimates or forecasts regarding The Company's performance made by these analysts are theirs alone and do not represent opinions, forecasts or predictions of The Company or its management. The Company does not by its reference above or distribution imply its endorsement of or concurrence with such information, conclusions or recommendations.`;

  const expandedText = [
    "The information on these web pages does not represent opinions, forecasts or predictions of The Company nor its management. The Company has no control over the content, quality, nature or reliability of any such third party web pages, and shall have no liability whatsoever in respect to the information provided on these web pages. A link to a third party web page does not imply any endorsement, investigation or verification by The Company of any information contained on this web page, and the information is not intended to imply any endorsement of or provide any investment advice.",
    "Euroland.com AS does not represent or warrant that any information anywhere on these web pages is accurate or complete and it should not be relied upon as such. The information on these web pages is provided for informational purposes only. Any information on these web pages is of an indicative nature and does not, and is not intended to, constitute an offer, solicitation, invitation or recommendation to buy, sell or deliver (directly or indirectly) any securities or derivatives thereon by any recipient. Each recipient shall be deemed to have made its own investigation and appraisal of the financial status of the companies in question. No liability whatsoever is accepted for any direct or consequential loss, expense or damage arising from or in connection with the use of the information on these web pages, including the data stated therein. Nor can this information be interpreted as advice for a particular investment strategy or for any other purpose."
  ];

  return (
    <Box 
      w="100%" 
      fontSize="sm" 
      mt={6} 
      bg="gray.50" 
      p={4} 
      borderRadius="md"
      {...containerProps}
    >
      <Flex justifyContent="space-between" align="flex-start">
        <Text fontSize={20} {...titleProps}>
          Disclaimer
        </Text>
        
        {showDownloads && (
          <Text mb={3} fontWeight="semibold">
            <Flex alignItems="center" gap={2}>
              <Text>Download:</Text>
              <Link href={pdfPath} color="teal.600" target="_blank" rel="noopener noreferrer">
                <FaRegFilePdf color="red" fontSize="20" />
              </Link>
              <Link href={excelPath} color="teal.600" target="_blank" rel="noopener noreferrer">
                <FaRegFileExcel color="green" fontSize="20" />
              </Link>
            </Flex>
          </Text>
        )}
      </Flex>

      <Text mb={2}>
        {customText || defaultDisclaimerText}
        <Link 
          onClick={onToggle} 
          mt={2} 
          ml={2}
          display="inline-block" 
          color="teal.600" 
          fontWeight="semibold"
          cursor="pointer"
          _hover={{ textDecoration: 'underline' }}
        >
          {isOpen ? 'Read less' : 'Read more'}
        </Link>
      </Text>

      {isOpen && (
        <>
          {expandedText.map((paragraph, index) => (
            <Text key={index} mb={2}>
              {paragraph}
            </Text>
          ))}
        </>
      )}
    </Box>
  );
};

export default Disclaimer;

