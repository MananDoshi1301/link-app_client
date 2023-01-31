import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  // Checkbox,
  Stack,
  // Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Signin = ({ setDetails }) => {

  const [cred, setCred] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { email, password } = cred;


    const response = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const res_data = await response.json();
    // console.log(res_data)
    if (response.status === 422 || !res_data) {
      window.alert("Invalid Login\n" + res_data.message);
    } else {
      window.alert(res_data.message);
      if (res_data.error === false) {
        sessionStorage.setItem("details", JSON.stringify({
          email: email, id: res_data.id, isLoggedIn: true,
        }))
        setDetails({ email: email, id: res_data.id, isLoggedIn: true });
        navigate("/link-page");
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
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>

            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <form method="post">

              <Stack spacing={4}>

                <FormControl isRequired>
                  <FormLabel htmlFor='email'>Email address</FormLabel>
                  <Input id='email' type='email' name={'email'}
                    value={cred.email}
                    onChange={handleInputChange} />
                </FormControl>


                <FormControl isRequired>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input id='password' type='password' name={'password'}
                    value={cred.password}
                    onChange={handleInputChange} />
                </FormControl>
                <Stack spacing={10}>
                  {/* <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack> */}
                  <Button
                    onClick={PostData}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </form>

          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default Signin