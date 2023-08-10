// @ts-nocheck
import { Flex, Img, useDisclosure } from '@chakra-ui/react';
import LoginChooseModal from 'components/login/loginModal';
import Navbar from 'layouts/main/navbar';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getGsgProject, getGsgProjectView, useGsgProject } from 'services/api/lib/gsg/gsg.calls';
import { GetGsgProjectResponse } from 'services/api/lib/gsg/gsg.types';
import { useOrganization } from 'services/api/lib/organization';
import { useUser } from 'services/api/lib/user';
import HeaderHero from '../../components/projectDetail/hero';

interface Props {
    project: GetGsgProjectResponse;
}

const PublicChallenge: NextPage = ({ project }: Props) => {
    const { data: userProfile, mutate: reloadUser } = useUser();
    const { data: orga, mutate: reloadOrga } = useOrganization(true);
    const { data: gsg, mutate, isValidating } = useGsgProject(project?.data.gsg_project.id, { initialData: project });
    const [url, setUrl] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    const router = useRouter();

    useEffect(() => {
        setUrl(window.location.href);
    }, [router.query]);

    return (
        <>
            <NextSeo
                title={`${project?.data.gsg_project.title} - Impact Matching`}
                description={project?.data.gsg_project.description}
                canonical="https://www.gsg-match.com/"
                openGraph={{
                    title: project?.data.gsg_project.title,
                    description: project?.data.gsg_project.description,
                    url: url,
                    images: [
                        {
                            url: project?.data.gsg_project.main_image,
                            alt: project?.data.gsg_project.title,
                        },
                    ],
                    site_name: 'Impact Matching',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />

            <Navbar />

            <Flex flexDir="column" paddingTop={{ base: '60px', md: 20 }}>
                <Img
                    src={gsg.data.gsg_project.main_image}
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
                    onOpenLogin={onOpen}
                    user={userProfile?.user}
                    orga={orga}
                    mutate={mutate}
                    isValidating={isValidating}
                />
            </Flex>

            <LoginChooseModal isOpen={isOpen} onClose={onClose} investorReload={reloadUser} orgaReload={reloadOrga} />
        </>
    );
};

export default PublicChallenge;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, query, req }) => {
    try {
        const projectId = params?.projectid as string | undefined;
        const response = await getGsgProjectView(Number.parseInt(projectId), query?.view ? query?.view : 'direct');

        const data = await getGsgProject(process.env.NEXT_PUBLIC_API_URL!, Number.parseInt(projectId));

        if (data.error === 'Not Found') {
            throw new Error(data.error);
        }

        return {
            props: {
                project: data,
            },
        };
    } catch (error) {
        console.error(error);

        return {
            notFound: true,
        };
    }
};
