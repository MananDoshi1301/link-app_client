import React, { useState } from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const AddLink = ({userid}) => {
  
  const [linkDet, setLinkDet] = useState({
    title:"", url:""
  })

  const handleInputChange = (e) => {
    setLinkDet({ ...linkDet, [e.target.name]: e.target.value });
  }

  const checkUrlValidity = (url) => {
    const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;

    return matchpattern.test(url);
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { title, url } = linkDet;
    const isValidUrl = checkUrlValidity(url);
    // console.log(title, url);

    const response = await fetch("/link-page/add-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid:userid,
        links:{title, url, isValidUrl}
      })
    });

    const res_data = await response.json();
    // console.log(res_data)
    if (response.status === 422 || !res_data) {
      window.alert("Error\n" + res_data.message);
    } else {
      // window.alert(res_data.message);
      if (res_data.error === false) { 
        setLinkDet({title:"", url:""})    
        window.alert(res_data.message);
      }
    }

  }

  return (
    <>
    <Flex
      minH={'85vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter Link Details
        </Heading>


        <FormControl isRequired>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input id="title" name='title' value={linkDet.title}
          onChange={handleInputChange}
           type="text" />
        </FormControl>

        
        <FormControl isRequired>
          <FormLabel>URL</FormLabel>
          <Input
          name='url' 
          value={linkDet.url}

            placeholder="test_example.com"
            onChange={handleInputChange}
            _placeholder={{ color: 'gray.500' }}
            type="url"
          />
        </FormControl>




        <Stack spacing={6}>
          <Button
            onClick={PostData}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </>
  )
}

export default AddLink
// export default function ResetPasswordForm(): JSX.Element {
//   return (
    
//   );
// }