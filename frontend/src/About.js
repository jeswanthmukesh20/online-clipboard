import React,{Component} from "react";
import NavBar from "./components/Navbar";
import {
    Box,
    Heading,
    Container, 
    Text,
    Avatar,
    Stack,
    Icon
} from "@chakra-ui/react";
import { motion } from 'framer-motion';
import {
    FaGithub,
    FaLinkedinIn,
    FaTwitter
} from "react-icons/fa";
// import {FaGithub} from "react"

const ps = "5px"
const breakpoints = {
    base: "90%",
    sm: '90%',
    md: '80%',
    lg: '70%',
    xl: '70%',
    '2xl': '70%',
  }

const Hover = () => {

}

export default class About extends Component{
    render(){
        return(
            <div>
                <NavBar />
                
                <Container
                    marginTop="20px"
                    bg="#ffffff"
                    maxH={breakpoints}
                    maxW={breakpoints}
                    padding="20px"
                    // position="relative"
                    boxShadow='2xl'
                    // style={{
                    //     alignItems: "center",
                    //     justifyContent: "center"
                    // }}
                    borderRadius="15px"
                >
                    <Heading
                        marginBottom="25px"
                    >About CopyTxT</Heading>
                    <Box>
                        <Text padding="5px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat volutpat viverra. Ut congue enim eget eros consequat, id fermentum massa pellentesque. Etiam tristique dui vel massa condimentum aliquet. In vitae malesuada sapien. Maecenas et lectus sit amet dolor molestie porttitor dapibus eu neque. Phasellus vitae tortor in lectus ullamcorper porta dictum varius urna. Quisque erat lorem, eleifend id nisi ac, sodales cursus massa. Fusce eu placerat lectus, eget tincidunt diam. Curabitur fermentum sagittis sapien, a lobortis mi ornare sed. Curabitur faucibus eget metus tincidunt lobortis. Curabitur fringilla tempor lectus eget maximus.
                        </Text>

                        <Text padding="5px">
                            Ut sit amet velit vitae tortor porttitor sollicitudin vitae a nisl. Vivamus est risus, <b>[ VH10703 - JESWANTH MUKESH ]</b> aliquam vitae finibus sed, malesuada ut enim. Maecenas eget arcu faucibus, viverra arcu eget, dictum neque. Aliquam urna libero, aliquam et vulputate vitae, elementum et nisl. Donec eros urna, blandit non arcu ac, faucibus vehicula nisi. Phasellus sodales vulputate augue sed iaculis. Aenean at arcu quis justo scelerisque imperdiet et tristique nibh. Ut malesuada aliquam nulla sed hendrerit. Nullam vel lacus varius magna sodales congue. Praesent rutrum sagittis hendrerit. Pellentesque accumsan velit condimentum enim feugiat tempor. Nunc mattis auctor lectus, porta ultricies erat dignissim sit amet. Aenean hendrerit felis nibh, quis maximus risus vestibulum vitae.
                        </Text>
                    </Box>
                </Container>
                <Container
                    marginTop="20px"
                    bg="container.light"
                    maxH={breakpoints}
                    maxW={breakpoints}
                    padding="20px"
                    // style={{
                    //     alignItems: "center",
                    //     justifyContent: "center"
                    // }}
                    boxShadow='2xl'
                    justifyItems="center"
                    borderRadius="15px"
                >

                    <Box margin="20px">
                        <Heading marginTop="10px" marginBottom="25px">Our Team</Heading>

                        {/* User */}
                        <Box as={motion.div} whileHover={{ scale: 1.03, boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.2)" }} maxW='lg' margin="15px" borderWidth='1px' borderRadius='lg' overflow='hidden' padding="10px">
                            <Stack 
                                direction='row' 
                                spacing={4}
                                
                                align="Center"
                            >
                                <Avatar
                                    name='Ryan Florence' 
                                    src='https://avatars.githubusercontent.com/u/52715899?v=4' 
                                />
                                <Text 
                                    fontSize="4xl"
                                    fontWeight="bold"
                                    fontFamily="Ubuntu"
                                >
                                    Jeswanth Mukesh
                                </Text>
                            </Stack>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat volutpat viverra. Ut congue enim eget eros consequat, 
                                amet dolor molestie porttitor dapibus eu neque. Phasellus vitae tortor in lectus ullamcorper porta dictum varius urna. Quisque erat 
                                lobortis mi ornare sed. Curabitur faucibus eget metus tincidunt lobortis. Curabitur fringilla tempor lectus eget maximus.
                                
                            </Text>
                            <Stack marginTop="10px" direction="row" spacing={2}>
                                <Icon as={FaGithub}/>
                                <Icon color="#0077b5" as={FaLinkedinIn}/>
                                <Icon color="#00acee" as={FaTwitter}/>
                            </Stack>    
                        </Box>

                        <Box maxW='lg' as={motion.div} whileHover={{ scale: 1.03,boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.2)" }} transition={{ duration: 2 }}  margin="15px" borderWidth='1px' borderRadius='lg' overflow='hidden' padding="10px">
                            <Stack 
                                direction='row' 
                                spacing={4} 
                                align="Center"
                            >
                                <Avatar
                                    name='Ryan Florence' 
                                    src='https://avatars.dicebear.com/api/male/ashwin.svg?mood[]=happy' 
                                />
                                <Text 
                                    fontSize="4xl"
                                    fontWeight="bold"
                                    fontFamily="Ubuntu"
                                >
                                    Ashwin
                                </Text>
                            </Stack>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat volutpat viverra. Ut congue enim eget eros consequat, 
                                amet dolor molestie porttitor dapibus eu neque. Phasellus vitae tortor in lectus ullamcorper porta dictum varius urna. Quisque erat 
                                lobortis mi ornare sed. Curabitur faucibus eget metus tincidunt lobortis. Curabitur fringilla tempor lectus eget maximus.
                                
                            </Text>
                            <Stack marginTop="10px" direction="row" spacing={2}>
                                <Icon as={FaGithub}/>
                                <Icon color="#0077b5" as={FaLinkedinIn}/>
                                <Icon color="#00acee" as={FaTwitter}/>
                            </Stack>    
                        </Box>
                    
                    </Box>
                </Container>
            </div>
        )
    }
}