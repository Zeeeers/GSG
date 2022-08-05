// Dependencies
// @ts-nocheck
import { NextPage } from 'next';
import {
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    Textarea,
    useDisclosure,
    VStack,
    Stack,
    Link,
    Divider,
    Image,
    useToast,
    Avatar,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalHeader,
    Img,
} from '@chakra-ui/react';
import SlateEditor from 'common/slate/SlateEditor';
import { zodResolver } from '@hookform/resolvers/zod';
import { IProjectForm, projectSchema } from 'forms/project';
import { Controller, useForm } from 'react-hook-form';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';
import UploadButton from 'common/uploadButton';
import { useState } from 'react';
import AddMembersModal from 'components/project/addMembersModal';
import { Descendant } from 'slate';
import { NextSeo } from 'next-seo';
import { Select as CharkaSelect } from 'chakra-react-select';
import { PrivatePage } from '@clyc/next-route-manager';
import { useMembers } from 'services/api/lib/member';
import { useQualityList } from 'services/api/lib/qualities';
import { FaTrash } from 'react-icons/fa';
import { FiPaperclip } from 'react-icons/fi';
import SuccessModal from 'components/project/successModal';
import { useDraftStore } from 'stores/draftProject';
import Messure from 'components/projectDetail/formatText/messure';
import ThirdParties from 'components/projectDetail/formatText/thirdParties';
import Stage from 'components/projectDetail/formatText/stage';
import Objetive from 'components/projectDetail/formatText/objective';
import StageCapital from 'components/projectDetail/formatText/stageCapital';
import Garantee from 'components/projectDetail/formatText/garantee';
import Rentability from 'components/projectDetail/formatText/rentability';
import FinanceGoal from 'components/projectDetail/formatText/financeGoal';
import Time from 'components/projectDetail/formatText/time';

// Page
const Index: NextPage = () => {
    type basePDFType = {
        base64: string;
        file: File;
    };

    const [baseImgMain, setBaseImgMain] = useState<string>();
    const [baseSocialPdf, setBaseSocialPdf] = useState<basePDFType | undefined>(undefined);
    const [baseAdditional, setBaseAdditional] = useState<basePDFType | undefined>(undefined);

    const { onOpen: onCropperOpen } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure();

    const [createProyect, setCreateProyect] = useState(false);

    const project = useDraftStore((s) => s.project);
    const setMember = useCreateGsgProjectStore((s) => s.setMember);
    const deleteMember = useCreateGsgProjectStore((s) => s.deleteMember);
    const [contenido, setContenido] = useState<Descendant[]>();
    const [selectedOptions, setSelectedOptions] = useState();

    const { data: members, mutate } = useMembers();
    const { data: quality } = useQualityList({ revalidateOnFocus: false });

    const toast = useToast();

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        control,
        watch,
    } = useForm<IProjectForm>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: project.title,
            description: project.description,
            business_web: project.business_web,
            third_parties: { value: project.third_parties, label: ThirdParties(project.third_parties) },
            more_info: { value: project.more_info, label: Messure(project.more_info) },
            /*qualities: Object.values(project?.qualities ?? {}).map((item) => ({
                value: item.en_name,
                label: item.name,
            }))*/
            stage: { value: project.stage, label: StageCapital(project.stage) },
            investment_objective: {
                value: project?.investment_objective,
                label: Objetive(project?.investment_objective),
            },
            capital_stage: { value: project?.capital_stage, label: Stage(project?.capital_stage) },
            guarantee: { value: project?.guarantee, label: Garantee(project?.guarantee) },
            expected_rentability: {
                value: project?.expected_rentability,
                label: Rentability(project?.expected_rentability),
            },
            finance_goal: { value: project?.finance_goal, label: FinanceGoal(project?.finance_goal) },
            time_lapse: { value: project?.time_lapse, label: Time(project?.time_lapse) },
            business_model: project.business_model,
            investment_types: project.investment_types,
            better_project: project.better_project,
        },
    });

    const handleEditField = (values: Descendant[]) => {
        setContenido(values);
    };

    const proyectDescription = watch('description', project.description ?? '0');
    const proyectBetter = watch('better_project', project.better_project ?? '0');
    const proyectTitle = watch('title', project.title ?? '0');

    const optionsQuality = quality?.qualities?.map((item) => ({
        value: item.id,
        label: item.icon.name,
    }));

    const optionsThirty = [
        { value: 'certified-b', label: 'Certificación empresa B' },
        { value: 'prize-org', label: 'Premio o reconocimiento de empresa u organización' },
        { value: 'incubators', label: 'Participación en Incubadoras o Aceleradoras' },
        { value: 'corfo', label: 'Adjudicación fondo CORFO u otro fondo público' },
        { value: 'other', label: 'Otro' },
    ];

    const optionsMore = [
        { value: 'do-not-messure', label: 'No mido resultados de impacto sociales y/o medioambientales' },
        { value: 'in-process', label: 'Estoy en proceso de medición de resultados sociales y/o medioambientales' },
        { value: 'messure', label: 'Mido resultados sociales y/o medioambientales de manera interna' },
        {
            value: 'certified',
            label: 'Mido resultados sociales y/o medioambientales y están certificados y/o validados por terceros independientes a mi organización',
        },
    ];

    const optionsStage = [
        { value: 'development', label: 'Producto o servicio en desarrollo' },
        { value: 'mvp', label: 'Producto o servicio en prototipo en pilotaje' },
        { value: 'ready_to_launch', label: 'Producto o servicio listo para lanzar al mercado' },
        { value: 'already_launched', label: 'Producto o servicio ya en el mercado' },
    ];

    const optionsObject = [
        { value: 'to-begin', label: 'Capital para comenzar' },
        { value: 'to-scale', label: 'Capital para escalar' },
        { value: 'to-innovate', label: 'Capital para innovar' },
        { value: 'other', label: 'Otro' },
    ];

    const optionsCapital = [
        { value: 'pre-seed', label: 'Pre-seed' },
        { value: 'seed', label: 'Seed' },
        { value: 'series-a', label: 'Serie A' },
        { value: 'series-b', label: 'Serie B' },
        { value: 'series-c', label: 'Serie C' },
        { value: 'series-d', label: 'Serie D' },
        { value: 'senior-debt', label: 'Deuda senior' },
        { value: 'mezzanine-debt', label: 'Deuda mezzanine' },
        { value: 'other', label: 'Otro' },
    ];

    const optionsGuarantee = [
        { value: '0-20%', label: 'Entre un 0 y 20%' },
        { value: '21-40%', label: 'Entre un 21 y 40%' },
        { value: '41-60%', label: 'Entre un 41 y 60%' },
        { value: '61-80%', label: 'Entre un 61 y 80%' },
        { value: '81-100%', label: 'Entre un 81 y 100%' },
    ];

    const optionsRenta = [
        { value: '1-5', label: 'Entre 1 y 5%' },
        { value: '6-10', label: 'Entre 6 y 10%' },
        { value: '11-20', label: 'Entre 11 y 20%' },
        { value: 'more-than-21', label: 'Más de 21%' },
    ];

    const optionsFinance = [
        { value: 'less-than-20', label: 'Menos de 20 millones' },
        { value: '20-49', label: '20 millones y hasta 49 millones' },
        { value: '50-99', label: '50 millones y hasta 99 millones' },
        { value: '100-249', label: '100 millones y hasta 249 millones' },
        { value: '250', label: '250 millones' },
        { value: 'more-than-250', label: 'Sobre 250 millones' },
        { value: 'more-than-1000', label: 'Sobre 1000 millones' },
    ];

    const optionsTime = [
        { value: 'unti-a-year', label: 'Hasta 12 meses' },
        { value: 'until-2-years', label: 'Hasta 24 meses' },
        { value: 'until-3-years', label: 'Hasta 36 meses' },
        { value: 'until-4-years', label: 'Hasta 48 meses' },
        { value: 'more-than-4-years', label: 'Más de 48 meses' },
    ];

    const handlePublished = async (data: IProjectForm) => {
        setCreateProyect(true);
        const dataProject = {
            gsg_project: {
                title: data.title,
                description: data.description,
                main_image: baseImgMain,
                social_impact: baseSocialPdf?.base64,
                more_info: data.more_info?.value,
                third_parties: data.third_parties?.value,
                stage: data.stage?.value,
                investment_objective: data.investment_objective?.value,
                capital_stage: data.capital_stage?.value,
                business_model: data.business_model,
                guarantee: data.guarantee?.value,
                expected_rentability: data.expected_rentability?.value,
                finance_goal: data.finance_goal?.value,
                time_lapse: data.time_lapse?.value,
                investment_types: data.investment_types,
                better_project: data.better_project,
                additional_info: '',
                business_web: data.business_web,
                additional_document: baseAdditional?.base64,
                status: 'in-review',
            },
            qualities: selectedOptions?.map((item) => item.value).join(';;'),
            members: JSON.stringify({ members: members?.map((item) => ({ id: item.id })) } ?? {}),
        };

        const { create, updateGsgProject } = await import('../services/api/lib/gsg');

        if (project?.status === 'sketch') {
            const { ok } = await updateGsgProject({ idProject: project?.id, project: dataProject });

            if (ok) {
                setCreateProyect(false);
                onOpenSuccess();
                reset();
            } else {
                setCreateProyect(false);
                toast({
                    title: 'Error al publicar el proyecto',
                    description: 'Ha ocurrido un error la intentar crear el proyecto, porfavor, intentelo de nuevo.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        } else {
            const { ok } = await create({ project: dataProject });

            if (ok) {
                setCreateProyect(false);
                onOpenSuccess();
                reset();
            } else {
                setCreateProyect(false);
                toast({
                    title: 'Error al crear el proyecto',
                    description: 'Ha ocurrido un error la intentar crear el proyecto, porfavor, intentelo de nuevo.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        }
    };

    const handleDraft = async (data: IProjectForm) => {
        const dataProject = {
            gsg_project: {
                title: data.title,
                description: data.description,
                main_image: baseImgMain,
                social_impact: baseSocialPdf?.base64,
                more_info: data.more_info?.value,
                third_parties: data.third_parties?.value,
                stage: data.stage?.value,
                investment_objective: data.investment_objective?.value,
                capital_stage: data.capital_stage?.value,
                business_model: data.business_model,
                guarantee: data.guarantee?.value,
                expected_rentability: data.expected_rentability?.value,
                finance_goal: data.finance_goal?.value,
                time_lapse: data.time_lapse?.value,
                investment_types: data.investment_types,
                better_project: data.better_project,
                additional_info: '',
                business_web: data.business_web,
                additional_document: baseAdditional?.base64,
                status: 'sketch',
            },
            qualities: selectedOptions?.map((item) => item.value)?.join(';;'),
            members:
                members?.length !== 0
                    ? JSON.stringify({ members: members?.map((item) => ({ id: item.id })) } ?? {})
                    : undefined,
        };

        const { create, updateGsgProject } = await import('../services/api/lib/gsg');

        if (project?.status === 'sketch') {
            const { ok } = await updateGsgProject({ idProject: project?.id, project: dataProject });

            if (ok) {
                toast({
                    title: 'Borrador modificado',
                    description: 'El borrador se ha creado con éxito.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                toast({
                    title: 'Error al modificar el borrador',
                    description: 'Ha ocurrido un error la intentar crear el borrador, porfavor, intentelo de nuevo.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        } else {
            const { ok } = await create({ project: dataProject });

            if (ok) {
                toast({
                    title: 'Borrador creado',
                    description: 'El borrador se ha creado con éxito.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                toast({
                    title: 'Error al crear el borrador',
                    description: 'Ha ocurrido un error la intentar crear el borrador, porfavor, intentelo de nuevo.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
        }
    };

    const handleDelete = async (idMember: number) => {
        const { deleteMember } = await import('../services/api/lib/member');
        const { ok } = await deleteMember(idMember);

        if (ok) {
            toast({
                title: 'Miembro eliminado.',
                description: 'El miembro seleccionado se ha eliminado correctamente.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            mutate();
        } else {
            toast({
                title: 'Error al eliminar el miembro',
                description: 'Ha ocurrido un error la intentar eliminar el miembro, porfavor, intentelo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };
    return (
        <>
            <NextSeo title={'Creador de proyecto - GSG'} />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME!} fallbackUrl="/login" />
            <HStack position="fixed" bg="gray.800" w="full" py={{ base: '15px', md: '14px' }} zIndex={20}>
                <Container display="flex" justifyContent="space-between" maxWidth={'container.lg'}>
                    <HStack spacing="23px">
                        <Link href="/explorer">
                            <Button
                                variant="solid"
                                background="gray.100"
                                textColor="gray.800"
                                fontWeight="bold"
                                _hover={{ background: 'gray.300' }}
                                borderRadius="full"
                                w="40px"
                                h="40px"
                            >
                                {'<-'}
                            </Button>
                        </Link>
                        <Text fontSize="3xl" fontWeight="medium">
                            Creador de producto/servicio
                        </Text>
                    </HStack>
                    <HStack spacing="8px">
                        <Button onClick={handleSubmit(handleDraft)} type="button" variant="outline">
                            Guardar borrador
                        </Button>

                        <Button
                            isLoading={createProyect}
                            loadingText="Publicando proyecto"
                            type="button"
                            onClick={handleSubmit(handlePublished)}
                            variant="solid"
                        >
                            Publicar proyecto
                        </Button>
                    </HStack>
                </Container>
            </HStack>

            <Container maxWidth={'container.lg'} paddingTop="7rem" paddingBottom="153px">
                <VStack as="form" align="start" spacing="40px">
                    <Text fontSize={'4xl'} fontWeight="bold">
                        Descripción General
                    </Text>
                    <FormControl id="title" isInvalid={!!errors.title} w={{ base: '100%', md: '50%' }}>
                        <FormLabel>
                            Título del proyecto <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>
                        <Input maxLength={40} {...register('title')} />
                        <Text
                            textColor="gray.300"
                            fontSize={{ base: 'xs', md: 'sm' }}
                            fontWeight="medium"
                            color="gray.400"
                        >
                            {proyectTitle?.length ?? 0}/40 caractéres
                        </Text>
                    </FormControl>

                    <FormControl id="description" isInvalid={!!errors.description}>
                        <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                            Descripción del proyecto <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    maxLength={700}
                                    {...field}
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    focusBorderColor={'primary.400'}
                                    errorBorderColor={'red.400'}
                                />
                            )}
                        />

                        <Text
                            textColor="gray.300"
                            fontSize={{ base: 'xs', md: 'sm' }}
                            fontWeight="medium"
                            color="gray.400"
                        >
                            {proyectDescription?.length ?? 0}/700 caractéres
                        </Text>

                        <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                            {errors.description?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="business_web" isInvalid={!!errors.business_web} w={{ base: '100%', md: '50%' }}>
                        <FormLabel>
                            Sitio web <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon>www.</InputLeftAddon>
                            <Input {...register('business_web')} />
                        </InputGroup>
                        <FormErrorMessage>{errors.business_web?.message}</FormErrorMessage>
                    </FormControl>

                    {/*TODO: useCropper for upload image product*/}

                    <FormControl id="main_image">
                        <FormLabel lineHeight="140%">
                            Sube una foto representativa del proyecto de tu empresa. Esta aparecerá dentro de las
                            tarjetas que inversionistas y público en general podrán ver.
                        </FormLabel>
                        {baseImgMain ? (
                            <Stack position="relative" w="fit-content">
                                <Image
                                    src={baseImgMain}
                                    w="332px"
                                    h="165px"
                                    objectFit="cover"
                                    objectPosition="center"
                                    rounded={3}
                                />
                                <Button
                                    onClick={() => setBaseImgMain(undefined)}
                                    position="absolute"
                                    right={3}
                                    m={0}
                                    pl="11px"
                                    pr="10px"
                                    alignContent="center"
                                    alignItems={'center'}
                                    bg="teal.300"
                                    textColor="white"
                                    _hover={{ bg: 'teal.200' }}
                                >
                                    <FaTrash />
                                </Button>
                            </Stack>
                        ) : (
                            <VStack>
                                <Input type="hidden" {...register('main_image')} />
                                <UploadButton
                                    variant="solid"
                                    bg="gray.700"
                                    color="gray.50"
                                    borderColor="gray.50"
                                    border="1px dashed"
                                    w="full"
                                    h="300px"
                                    colorScheme="basic"
                                    fontWeight="normal"
                                    onChange={async (e) => {
                                        const { validateTypes, getBase64 } = await import('services/images');

                                        if (e.target?.files && validateTypes(e.target.files[0])) {
                                            if (e.target?.files[0].size > 600000) {
                                                toast({
                                                    title: 'La imagen es muy grande',
                                                    status: 'error',
                                                    duration: 9000,
                                                    isClosable: true,
                                                    position: 'top-right',
                                                });
                                            } else {
                                                const base = await getBase64(e.target.files![0]);
                                                setBaseImgMain(base);
                                                onCropperOpen();
                                            }
                                        }
                                    }}
                                >
                                    Arrasta o sube una imagen aquí
                                </UploadButton>
                                <FormErrorMessage fontWeight={'semibold'}>
                                    {errors.main_image?.message}
                                </FormErrorMessage>
                            </VStack>
                        )}
                    </FormControl>

                    <FormControl id="qualities" w={{ base: '100%', md: '50%' }}>
                        <FormLabel>
                            Selecciona los ODS que contribuyes en resolver <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>
                        <Controller
                            name="qualities"
                            control={control}
                            render={({ field }) => (
                                <CharkaSelect
                                    {...field}
                                    tagVariant="solid"
                                    colorScheme="teal"
                                    isOptionDisabled={() => selectedOptions?.length >= 3}
                                    onChange={(o) => setSelectedOptions(o)}
                                    isMulti
                                    useBasicStyles
                                    options={optionsQuality}
                                />
                            )}
                        />
                        <FormHelperText textColor="gray.300">Máximo 3 ODS</FormHelperText>
                        <FormErrorMessage fontWeight={'semibold'}>{errors.qualities?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="third_parties" w={{ base: '100%', md: '50%' }}>
                        <FormLabel lineHeight="140%">
                            Selecciona el respaldo con el que cuentas de una tercera organización{' '}
                            <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>
                        <Controller
                            name="third_parties"
                            control={control}
                            render={({ field }) => <CharkaSelect {...field} useBasicStyles options={optionsThirty} />}
                        />
                        <FormErrorMessage fontWeight={'semibold'}>{errors.third_parties?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="more_info" w={{ base: '100%', md: '50%' }}>
                        <FormLabel lineHeight="140%">
                            Actualmente tienes información sobre cómo mides tus resultados de impacto{' '}
                            <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>
                        <Controller
                            name="more_info"
                            control={control}
                            render={({ field }) => <CharkaSelect {...field} useBasicStyles options={optionsMore} />}
                        />
                        <FormErrorMessage fontWeight={'semibold'}>{errors.more_info?.message}</FormErrorMessage>
                    </FormControl>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <FormControl id="social_impact">
                            <FormLabel>
                                Validación del impacto social/medioambiental: Por favor adjunta material (PDF) que
                                valíde la medición de resultados (opcional)
                            </FormLabel>

                            {baseSocialPdf ? (
                                <HStack align="center">
                                    <FiPaperclip />
                                    <Text fontWeight="bold">{baseSocialPdf.file.name}</Text>
                                    <Button
                                        onClick={() => setBaseSocialPdf(undefined)}
                                        bg="teal.400"
                                        pl="6px"
                                        _hover={{ bg: 'teal.300' }}
                                        leftIcon={<FaTrash />}
                                    ></Button>
                                </HStack>
                            ) : (
                                <Stack>
                                    <Input type="hidden" {...register('social_impact')} />
                                    <UploadButton
                                        variant="solid"
                                        bg="gray.700"
                                        color="gray.50"
                                        borderColor="gray.50"
                                        border="1px dashed"
                                        w="full"
                                        h="300px"
                                        colorScheme="basic"
                                        fontWeight="normal"
                                        onChange={async (e) => {
                                            const { getBase64, isPDF } = await import('services/images');

                                            if (e.target?.files && isPDF(e.target.files[0])) {
                                                const base = await getBase64(e.target.files![0]);
                                                setBaseSocialPdf({ base64: base, file: e.target.files[0] });
                                            } else {
                                                toast({
                                                    title: 'Archivo inválido.',
                                                    description:
                                                        'El archivo subido no es correcto, porfavor, carge un PDF válido.',
                                                    status: 'error',
                                                    duration: 9000,
                                                    isClosable: true,
                                                    position: 'top-right',
                                                });
                                            }
                                        }}
                                    >
                                        Arrasta o sube tu PDF aquí
                                    </UploadButton>
                                    <FormErrorMessage fontWeight={'semibold'}>
                                        {errors.main_image?.message}
                                    </FormErrorMessage>
                                </Stack>
                            )}
                        </FormControl>
                    </VStack>

                    <Divider paddingTop={'60px'} />

                    <Text fontSize={'4xl'} fontWeight="bold" pt="60px">
                        Descripción financiera
                    </Text>

                    <VStack w={'full'} align="flex-start" spacing="40px">
                        <FormControl id="stage" w={{ base: '100%', md: '50%' }}>
                            <FormLabel>
                                ¿En qué etapa se encuentra tu proyecto? <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <Controller
                                name="stage"
                                control={control}
                                render={({ field }) => (
                                    <CharkaSelect {...field} useBasicStyles options={optionsStage} />
                                )}
                            />
                            <FormErrorMessage fontWeight={'semibold'}>{errors.stage?.message}</FormErrorMessage>
                        </FormControl>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} w="full">
                            <FormControl id="investment_objective" w={{ base: '100%', md: '50%' }}>
                                <FormLabel>
                                    ¿Cuál es el objetivo que tienes para buscar inversión?{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <Controller
                                    name="investment_objective"
                                    control={control}
                                    render={({ field }) => (
                                        <CharkaSelect {...field} useBasicStyles options={optionsObject} />
                                    )}
                                />
                                <FormErrorMessage fontWeight={'semibold'}>
                                    {errors.investment_objective?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl id="capital_stage" w={{ base: '100%', md: '50%' }}>
                                <FormLabel>
                                    ¿Cuál es la etapa de levantamiento en la que te encuentras?{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <Controller
                                    name="capital_stage"
                                    control={control}
                                    render={({ field }) => (
                                        <CharkaSelect {...field} useBasicStyles options={optionsCapital} />
                                    )}
                                />
                                <FormErrorMessage fontWeight={'semibold'}>
                                    {errors.capital_stage?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} alignItems="end" w="full">
                            <FormControl id="guarantee" w={{ base: '100%', md: '50%' }}>
                                <FormLabel lineHeight="140%">
                                    Su proyecto que quiere financiar, ¿cuenta con garantías?{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <Controller
                                    name="guarantee"
                                    control={control}
                                    render={({ field }) => (
                                        <CharkaSelect {...field} useBasicStyles options={optionsGuarantee} />
                                    )}
                                />
                                <FormErrorMessage fontWeight={'semibold'}>{errors.guarantee?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl id="expected_rentability" w={{ base: '100%', md: '50%' }}>
                                <FormLabel lineHeight="140%">
                                    ¿Cuál es la rentabilidad que esperas para tu proyecto?{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <Controller
                                    name="expected_rentability"
                                    control={control}
                                    render={({ field }) => (
                                        <CharkaSelect {...field} useBasicStyles options={optionsRenta} />
                                    )}
                                />
                                <FormErrorMessage fontWeight={'semibold'}>
                                    {errors.expected_rentability?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} alignItems="end" w="full">
                            <FormControl id="finance_goal" w={{ base: '100%', md: '50%' }}>
                                <FormLabel lineHeight="140%">
                                    Por favor selecciona el rango del monto de aporte aproximado que estás buscando
                                    (CLP) <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <Controller
                                    name="finance_goal"
                                    control={control}
                                    render={({ field }) => (
                                        <CharkaSelect {...field} useBasicStyles options={optionsFinance} />
                                    )}
                                />
                                <FormErrorMessage fontWeight={'semibold'}>
                                    {errors.finance_goal?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl id="time_lapse" w={{ base: '100%', md: '50%' }}>
                                <FormLabel>
                                    Selecciona los plazos de inversión que buscas{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <Controller
                                    name="time_lapse"
                                    control={control}
                                    render={({ field }) => (
                                        <CharkaSelect {...field} useBasicStyles options={optionsTime} />
                                    )}
                                />
                                <FormErrorMessage fontWeight={'semibold'}>
                                    {errors.time_lapse?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} alignItems="baseline" w="full">
                            <FormControl id="business_model" w={{ base: '100%', md: '50%' }}>
                                <FormLabel>
                                    Trayectoria del producto <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>

                                <FormHelperText pb="15px" justifyContent="flex-start">
                                    <Text textColor="gray.300" fontSize="14px" lineHeight="19.6px" fontFamily="inter">
                                        - Ventas últimos 12 meses - EBITDA último año fiscal <br /> - Deuda/Patrimonio
                                        último año fiscal <br /> - Activo circulante vs Patrimonio último año fiscal{' '}
                                        <br /> - Impuesto declarado en el último año fiscal
                                    </Text>
                                </FormHelperText>

                                <Input
                                    {...register('business_model')}
                                    placeholder="Ventas últimos 12 meses"
                                    mt="63px"
                                />
                                <FormErrorMessage fontWeight={'semibold'}>
                                    {errors.better_project?.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl id="investment_types" w={{ base: '100%', md: '50%' }}>
                                <FormLabel>
                                    ¿Qué tipo de inversionista buscas? <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <FormHelperText pb="15px">
                                    <Text textColor="gray.300" fontSize="14px" lineHeight="19.6px" fontFamily="inter">
                                        - Inversor ancla (recursos, nombre, inteligencia, acceso), <br /> - Inversores
                                        atomizados (dinero de diversas fuentes) <br /> - Sponsor <br /> - Minoritarios{' '}
                                        <br /> - Subordinados <br /> - Cualquiera <br /> - Otra, ¿Cuál?
                                    </Text>
                                </FormHelperText>
                                <Input {...register('investment_types')} placeholder="Inversor ancla" />
                                {errors.investment_types?.message}
                            </FormControl>
                        </Stack>
                    </VStack>

                    <Divider pt="60px" />

                    <Text fontSize="4xl" fontWeight="bold" pt="60px">
                        Otra información relevante
                    </Text>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Miembros del equipo
                        </Text>
                        <Text fontSize="lg" fontWeight="normal">
                            Máximo 10 miembros
                        </Text>

                        {members?.length <= 10 && (
                            <Button onClick={onOpen} variant="solid">
                                Agregar perfil
                            </Button>
                        )}

                        <Stack w="full" pt="40px">
                            {members
                                ? members?.map((member, i) => (
                                      <HStack
                                          key={i}
                                          w="full"
                                          spacing="15px"
                                          justifyContent="space-between"
                                          borderBottom="2px"
                                          borderColor="gray.700"
                                          pb="15px"
                                      >
                                          <Avatar src={member.main_image} name={member.name} alt={member.name} />
                                          <VStack alignItems="start">
                                              <Text textColor="gray.500">Nombre</Text>
                                              <Text>{member.name}</Text>
                                          </VStack>

                                          <VStack alignItems="start">
                                              <Text textColor="gray.500">Posición dentro de la empresa</Text>
                                              <Text>{member.position}</Text>
                                          </VStack>

                                          <HStack>
                                              <Button
                                                  onClick={() => handleDelete(member.id)}
                                                  colorScheme="red"
                                                  variant="solid"
                                                  w="85px"
                                              >
                                                  Eliminar
                                              </Button>
                                              <Button
                                                  variant={'outline'}
                                                  onClick={() => {
                                                      setMember(member);
                                                      onOpen();
                                                  }}
                                                  w="64px"
                                              >
                                                  Editar
                                              </Button>
                                          </HStack>
                                      </HStack>
                                  ))
                                : 'No hay equipo creado'}
                        </Stack>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Información Complementaria
                        </Text>
                        <FormControl>
                            <FormLabel lineHeight="140%">
                                Agrega cualquier descripción, comentario, fuente o recurso que consideres necesario para
                                que el inversionista comprenda mejor tu proyecto{' '}
                                <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <FormHelperText textColor="gray.300">
                                Ejemplo: Aparición en prensa, prospección de mercado etc.
                            </FormHelperText>
                            <SlateEditor
                                handleSaveField={handleEditField}
                                bg="gray.50"
                                color="gray.700"
                                h="fit-content"
                                mt="15px"
                            />
                        </FormControl>
                    </VStack>

                    <FormControl id="additional_document">
                        <FormLabel>
                            ¿Tienes algún archivo (PDF) que consideres necesario subir como información complementaria
                            para que sea vista por el inversionista? (Opcional)
                        </FormLabel>

                        {baseAdditional ? (
                            <HStack align="center">
                                <FiPaperclip />
                                <Text fontWeight="bold">{baseAdditional.file.name}</Text>
                                <Button
                                    onClick={() => setBaseAdditional(undefined)}
                                    bg="teal.400"
                                    pl="6px"
                                    _hover={{ bg: 'teal.300' }}
                                    leftIcon={<FaTrash />}
                                ></Button>
                            </HStack>
                        ) : (
                            <Stack>
                                <Input type="hidden" {...register('additional_document')} />
                                <UploadButton
                                    variant="solid"
                                    bg="gray.700"
                                    color="gray.50"
                                    borderColor="gray.50"
                                    border="1px dashed"
                                    w="full"
                                    h="300px"
                                    colorScheme="basic"
                                    fontWeight="normal"
                                    onChange={async (e) => {
                                        const { getBase64, isPDF } = await import('services/images');

                                        if (e.target?.files && isPDF(e.target.files[0])) {
                                            const base = await getBase64(e.target.files![0]);
                                            setBaseAdditional({ base64: base, file: e.target.files[0] });
                                        } else {
                                            toast({
                                                title: 'Archivo inválido.',
                                                description:
                                                    'El archivo subido no es correcto, porfavor, carge un PDF válido.',
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true,
                                                position: 'top-right',
                                            });
                                        }
                                    }}
                                >
                                    Arrasta o sube tu PDF aquí
                                </UploadButton>
                                <FormErrorMessage fontWeight={'semibold'}>
                                    {errors.additional_document?.message}
                                </FormErrorMessage>
                            </Stack>
                        )}
                    </FormControl>

                    <FormControl id="better_project">
                        <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                            Espacio de mejora continua: ¿Cómo crees que tu proyecto podría beneficiarse?{' '}
                            <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>

                        <Controller
                            name="better_project"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    focusBorderColor={'primary.400'}
                                    errorBorderColor={'red.400'}
                                />
                            )}
                        />

                        <Text
                            textColor="gray.300"
                            fontSize={{ base: 'xs', md: 'sm' }}
                            fontWeight="medium"
                            color="gray.400"
                        >
                            {proyectBetter?.length ?? 0}/700 caractéres
                        </Text>

                        <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                            {errors.better_project?.message}
                        </FormErrorMessage>
                    </FormControl>
                </VStack>
            </Container>

            <AddMembersModal isOpen={isOpen} onClose={onClose} reload={mutate} />
            <SuccessModal isOpen={isOpenSuccess} onClose={onCloseSuccess} />
        </>
    );
};

// Export
export default Index;
