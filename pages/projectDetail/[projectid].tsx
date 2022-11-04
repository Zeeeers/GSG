//@ts-nocheck
import { Flex, Img } from '@chakra-ui/react';
import Navbar from 'layouts/main/navbar';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { getGsgProject } from 'services/api/lib/gsg/gsg.calls';
import { useUser } from 'services/api/lib/user';
import HeaderHero from '../../components/projectDetail/hero';

const PublicChallenge: NextPage = ({ project }) => {
    const router = useRouter();
    const { data: userProfile } = useUser();

    return (
        <>
            <NextSeo
                title={`${project?.title} - GSG`}
                description={project?.description}
                canonical="https://www.gsg-match.com/"
            />
            <Navbar />
            <Flex flexDir="column" paddingTop={{ base: '60px', md: 20 }}>
                <Img
                    src={project?.main_image}
                    h="345px"
                    w="full"
                    objectFit="cover"
                    objectPosition="center"
                    position="relative"
                    filter="auto"
                    blur="30px"
                />

                <HeaderHero project={project} user={userProfile} />
            </Flex>
        </>
    );
};

export default PublicChallenge;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const projectId = ctx.params?.projectid as string | undefined;

    if (projectId) {
        const data = await getGsgProject(process.env.NEXT_PUBLIC_API_URL!, projectId);

        return {
            props: {
                project: data?.data?.gsg_project ?? null,
            },
        };
    } else {
        return {
            props: null,
        };
    }
};
