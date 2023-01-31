import React, { useRef, useState } from 'react';
import {
  Stack, Text, Button, useToast,
  Box,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { CopyIcon, DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons';


const DisplayLinks = ({ linkData = [], deleteLink }) => {

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const [delLink, setDelLink] = useState({});

  const getDateString = (stamp) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date(stamp);

    const str = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return str;
  }

  const LinkCard = ({ title = "Sample", urlParam = "www.test.com", linkId = "", isValidUrl = false, createdAt }) => {

    const RedirectBtn = () => (
      <Button
        isDisabled={!isValidUrl}
        onClick={
          () => {
            window.open(urlParam)
          }
        }
        variant="outline"
        colorScheme="green">
        <ExternalLinkIcon />
      </Button>
    )

    return (
      <>
        <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
          <Stack direction={{ base: 'column', md: 'row' }}
            // mb={3}
            justifyContent="space-between">
            <Text fontWeight="bold">{title}</Text>
          </Stack>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
          >
            <Box>
              <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                {urlParam}
              </Text>
              <Text
                fontSize={{ base: 'sm' }}
                fontWeight="bold"
                textAlign={'left'} maxW={'4xl'}
                mt={2}
              >
                Created: {getDateString(createdAt)}
              </Text>
            </Box>
            <Stack direction={{ base: 'column', md: 'row' }}>
              {/* Copy btn */}
              <Button variant="solid" colorScheme="blue"
                onClick={
                  async () => {
                    try {
                      await navigator.clipboard.writeText(urlParam)
                      toast({
                        title: `Text Copied Successfully!`,
                        variant: 'solid',
                        isClosable: true,
                      })
                    } catch (err) {
                      console.log(err);
                      toast({
                        title: `Some error did not copy text!`,
                        status: 'error',
                        isClosable: true,
                      })
                    }
                  }
                }
              >
                <CopyIcon />
              </Button>

              {/* Externally open window */}
              {isValidUrl ? <RedirectBtn /> : (

                <Tooltip
                  hasArrow
                  placement='top-start' label='Cannot Redirect since URL is invalid..!'
                  shouldWrapChildren mt='3'
                  closeDelay={1000}
                >
                  <RedirectBtn />
                </Tooltip>
              )}

              {/* Delete Button */}
              <Button
                onClick={
                  () => {
                    setDelLink({
                      title, urlParam, linkId
                    })
                    onOpen();
                  }
                }
                colorScheme="red"><DeleteIcon /></Button>
            </Stack>
          </Stack>


        </Stack>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete '{delLink.title}'
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red'
                  onClick={
                    () => {
                      deleteLink(delLink.linkId)
                      onClose()
                    }
                  }
                  ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  return (
    <>
      {
        linkData.map((item, key) => (
          <LinkCard
            title={item.title}
            urlParam={item.url}
            linkId={item._id}
            isValidUrl={item.isValidUrl}
            key={key}
            createdAt={item.createdAt}
          />
        ))
      }
    </>
  )
}

export default DisplayLinks