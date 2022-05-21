import { Flex, Img, Text } from '@chakra-ui/react';
import Navbar from 'layouts/main/navbar';
import HeaderHero from '../../components/projectDetail/hero';
import { NextPage } from 'next';
import { useGsgProject } from 'services/api/lib/gsg/gsg.calls';
import { useRouter } from 'next/router';
import { projects } from 'services/api/data';

const PublicChallenge: NextPage = () => {
    const router = useRouter();
    /*const { data: project } = useGsgProject(
        router.query.projectid ? Number.parseInt(router.query?.projectid as string) : undefined,
    );*/

    const project = projects.find((project) => project.id === Number.parseInt(router.query?.projectid as string));

    return (
        <>
            <Navbar />
            <Flex flexDir="column" paddingTop={{ base: '60px', md: 20 }}>
                <Img
                    src={project?.main_image?.url}
                    h="345px"
                    w="full"
                    objectFit="cover"
                    objectPosition="center"
                    position="relative"
                    filter="auto"
                    blur="30px"
                />

                <HeaderHero project={project} />
            </Flex>
        </>
    );
};

export default PublicChallenge;
