//@ts-nocheck
import { Flex, Img } from '@chakra-ui/react';
import Navbar from 'layouts/main/navbar';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaBullseye } from 'react-icons/fa';
import { getGsgProject, useGsgProject } from 'services/api/lib/gsg/gsg.calls';
import { useOrganization } from 'services/api/lib/organization';
import { useUser } from 'services/api/lib/user';
import HeaderHero from '../../components/projectDetail/hero';

const PublicChallenge: NextPage = ({ project, projectId, isAdmin }) => {
    const [routerQuery, setRouterQuery] = useState();

    const router = useRouter();
    const { data: userProfile } = useUser();
    const { data: orga } = useOrganization(true);
    const { data: gsg, mutate, isValidating } = useGsgProject(projectId, isAdmin);

    return (
        <>
            <NextSeo
                title={`${project?.title} - MATCH`}
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

                <HeaderHero
                    project={gsg?.data?.gsg_project}
                    user={userProfile}
                    orga={orga}
                    mutate={mutate}
                    isValidating={isValidating}
                />
            </Flex>
        </>
    );
};

export default PublicChallenge;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const projectId = ctx.params?.projectid as string | undefined;
    const { adminPreview } = ctx.query;

    if (projectId) {
        const data = await getGsgProject(process.env.NEXT_PUBLIC_API_URL!, projectId);

        return {
            props: {
                project: data?.data?.gsg_project ?? null,
                projectId: projectId,
                isAdmin: adminPreview === 'true' ? true : false,
            },
        };
    } else {
        return {
            props: null,
        };
    }
};
