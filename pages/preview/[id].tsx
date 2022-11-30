import { GetServerSideProps } from 'next';
import React from 'react';
import { getGsgProject } from 'services/api/lib/gsg';
import { Gsg } from 'services/api/types/Gsg';

const PreviewPage = ({ projects }: any) => {
    console.log(projects);

    return <div>Creator</div>;
};

export default PreviewPage;

export const getServerSideProps: GetServerSideProps<{ projects: Gsg }> = async (ctx) => {
    const id = ctx.params?.id as string;

    const data = await getGsgProject(process.env.NEXT_PUBLIC_API_URL!, parseInt(id));

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { projects: data?.data?.gsg_project },
    };
};
