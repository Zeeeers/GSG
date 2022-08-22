//@ts-nocheck
import { Flex, Img, Text } from '@chakra-ui/react';
import Navbar from 'layouts/main/navbar';
import HeaderHero from '../../components/projectDetail/hero';
import { GetServerSideProps, NextPage } from 'next';
import { useGsgProject, getGsgProject } from 'services/api/lib/gsg/gsg.calls';
import { useRouter } from 'next/router';
import { projects } from 'services/api/data';
import { useOrganizationProject } from 'services/api/lib/organization/organization.calls';
import { useUser } from 'services/api/lib/user';
import { NextSeo } from 'next-seo';

const PublicChallenge: NextPage = ({ project, enriched }) => {
    const router = useRouter();

    const { data: userProfile } = useUser();

    console.log(enriched);

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

                <HeaderHero project={project} textEnriched={enriched} user={userProfile} />
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
                project: data.data.gsg_project ?? null,
                enriched: JSON.parse(data?.data.gsg_project.additional_info ?? '[]'),
            },
        };
    } else {
        return {
            props: null,
        };
    }
};
