import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  // Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, LinkIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ details, setDetails }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const NavLink = ({ children }) => (
  //   <Link
  //     px={2}
  //     py={1}
  //     rounded={'md'}
  //     _hover={{
  //       textDecoration: 'none',
  //       bg: useColorModeValue('gray.200', 'gray.700'),
  //     }}
  //     href={'#'}>
  //     {children}
  //   </Link>
  // );

  const navigate = useNavigate();

  const checkLogIn = () => {
    const session = JSON.parse(sessionStorage.getItem('details'));
    if (details.isLoggedIn === false && session === null) {
      // navigate("/");
      return 0;
    }
    else if (details.isLoggedIn === true && !details.id) {
      setDetails({
        email: session.email,
        id: session.id,
        isLoggedIn: true,
      })
    }
  }
  useEffect(() => {
    checkLogIn();
  })

  const AddLink = () => (
    // <Flex h="100vh" justifyContent="center" alignItems="center">
    <Button
      /* flex={1} */
      px={4}
      fontSize={'sm'}
      rounded={'full'}
      bg={'blue.400'}
      color={'white'}
      boxShadow={
        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
      }
      _hover={{
        bg: 'blue.500',
      }}
      _focus={{
        bg: 'blue.500',
      }}>
      Add Link
    </Button>
    // </Flex>
  );

  const NavbarComp = () => (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

        <Box
          style={{ "cursor": "pointer" }}
          onClick={() => {
            checkLogIn();
            details.isLoggedIn ? navigate('/link-page') : navigate('/')
          }}
        >
          <LinkIcon />
        </Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>


            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            {details.email !== "user" && <Link to={"./link-page/add-link"}><AddLink /></Link>}

            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Center>
                <br />
                <Center>
                  <p>{`Hello ${details.email.split('@')[0]}!`}</p>
                </Center>
                <br />
                <MenuDivider />
                {
                  details.email === "user" ? (
                    <>
                      <Link to={'./signin'}><MenuItem>Sign In</MenuItem></Link>
                      <Link to={'./signup'}><MenuItem>Sign Up</MenuItem></Link>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => {
                          sessionStorage.clear();
                          setDetails({
                            email: "user", id: "", isLoggedIn: "false"
                          });
                          navigate("/");
                        }
                        }>Logout</MenuItem>
                    </>
                  )
                }
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
  return (
    <>
      <NavbarComp />
    </>
  )
}

export default Navbar