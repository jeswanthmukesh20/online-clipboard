import React,{Component} from "react";
import Seo from '../../components/Seo'
import breakpoints from "../../components/Breakpoints";
import Sidebar from '../../components/Sidebar';
import {
    Box,
    Heading,
    Container,
    Text,
    Avatar,
    Stack,
    Icon,
    SimpleGrid
} from "@chakra-ui/react";
import { motion } from 'framer-motion';
import {
    FaGithub,
    FaLinkedinIn,
    FaTwitter
} from "react-icons/fa";
import Avatar1 from '../../Assets/profile/avatar1.jpeg'
import Avatar2 from '../../Assets/profile/Avatar2.jpeg'

const ps = "5px"


const Hover = () => {

}

class About extends Component{
    render(){
        return(
            <div>
                <Seo/>
                <Container
                    // margin="20px"
                    marginTop={70}
                    marginRight="30px"
                    bg="#ffffff"
                    maxH={breakpoints.TextContainer}
                    maxW={breakpoints.TextContainer}
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
                            CopyTxT is a free online clipboard that makes sharing text or code snippets between devices easy and anonymous. The content posted on the clipboard is stored in the cloud. It can be retrieved using a 4-digit unique retrieve ID provided.
                        </Text>
                    </Box>
                </Container>
                <Container
                    // margin="20px"
                    marginTop={10}
                    marginRight="30px"
                    bg="container.light"
                    maxH={breakpoints.TextContainer}
                    maxW={breakpoints.TextContainer}
                    padding="20px"
                    // style={{
                    //     alignItems: "center",
                    //     justifyContent: "center"
                    // }}
                    boxShadow='2xl'
                    justifyItems="center"
                    borderRadius="15px"
                >

                    <Box margin="15px">
                        <Heading marginTop="10px" marginBottom="25px" children="<Developers />"/>

                        {/* User */}
                        <SimpleGrid columns={[1, null, 2]} spacing={4}>
                            <Box as={motion.div} whileHover={{ scale: 1.03, boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.2)" }} maxW="lg"  borderWidth='1px' borderRadius='lg' overflow='hidden' padding="10px">
                                <Stack
                                    direction='row'
                                    spacing={4}

                                    align="Center"
                                >
                                    <Avatar
                                        name='Jeswanth Mukesh'
                                        src={Avatar1}
                                    />
                                    <Text
                                        fontSize="4xl"
                                        fontWeight="bold"
                                        fontFamily="Ubuntu"
                                    >
                                        Jeswanth Mukesh
                                    </Text>
                                </Stack>
                                <Box mt={3} padding={3}>
                                <Text>I'm a self-taught developer pursuing B.Tech in Artificial Intelligence and Data Science at Vel Tech High Tech Engineering college, Chennai. And currently working as an intern at Facetgr. I’m Interested in Machine Learning and Web Design.
                                </Text></Box>
                                <Stack direction="row" spacing={2}>
                                    <a href="https://github.com/jeswanthmukesh20" target="_blank">
                                        <Icon as={FaGithub}/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/jeswanth-mukesh-a01b82194/" target="_blank">
                                        <Icon color="#0077b5" as={FaLinkedinIn}/>
                                    </a>
                                    <a href="https://twitter.com/killshot_exe" target="_blank">
                                        <Icon color="#00acee" as={FaTwitter}/>
                                    </a>
                                </Stack>
                            </Box>

                            <Box as={motion.div} whileHover={{ scale: 1.03,boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.2)" }} maxW="lg"  borderWidth='1px' borderRadius='lg' overflow='hidden' padding="10px">
                                <Stack
                                    direction='row'

                                    align="Center"
                                >
                                    <Avatar
                                        name='Ashwin'
                                        src={Avatar2}
                                    />
                                    <Text
                                        fontSize="4xl"
                                        fontWeight="bold"
                                        fontFamily="Ubuntu"
                                    >
                                        Ashwin
                                    </Text>
                                </Stack>
                                <Box mt={3} padding={3}>
                                <Text>I'm a 19 year old developer pursuing B.Tech in Artificial Intelligence and Data Science at Vel Tech High Tech Engineering college, Chennai. I’m currently learning Website-Design and Machine Learning.
                                </Text></Box>
                                <Stack  direction="row" spacing={2}>
                                    <a href="https://github.com/ashwin3005" target="_blank">
                                        <Icon as={FaGithub}/>
                                    </a>
                                    <a href="https://www.linkedin.com/in/" target="_blank">
                                        <Icon color="#0077b5" as={FaLinkedinIn}/>
                                    </a>
                                    <a href="https://twitter.com/" target="_blank">
                                        <Icon color="#00acee" as={FaTwitter}/>
                                    </a>
                                </Stack>
                            </Box>
                        </SimpleGrid>

                    </Box>
                </Container>
            </div>
        )
    }
}

export default About;
