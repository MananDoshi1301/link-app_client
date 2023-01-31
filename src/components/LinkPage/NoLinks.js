import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const NoLinks = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <InfoIcon boxSize={'50px'} color={'blue.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Add Some Links...!
      </Heading>
      <Text color={'gray.500'}>
        It seems that you have no links saved with us. Look at the top right and click on Add Link to save some links.
      </Text>
    </Box>
  )
}

export default NoLinks