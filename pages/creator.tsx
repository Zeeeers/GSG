// Dependencies
// @ts-nocheck
import {
    Avatar,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Link,
    Stack,
    Text,
    Textarea,
    Tooltip,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { PrivatePage } from '@clyc/next-route-manager';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select as CharkaSelect } from 'chakra-react-select';
import CropperModalBase64 from 'common/cropperModalBase64';
import UploadButton from 'common/uploadButton';
import AddMembersModal from 'components/project/addMembersModal';
import SuccessModal from 'components/project/successModal';
import FinanceGoal from 'components/projectDetail/formatText/financeGoal';
import Garantee from 'components/projectDetail/formatText/garantee';
import Messure from 'components/projectDetail/formatText/messure';
import Objetive from 'components/projectDetail/formatText/objective';
import Rentability from 'components/projectDetail/formatText/rentability';
import Stage from 'components/projectDetail/formatText/stage';
import StageCapital from 'components/projectDetail/formatText/stageCapital';
import ThirdParties from 'components/projectDetail/formatText/thirdParties';
import Time from 'components/projectDetail/formatText/time';
import { IProjectForm, projectSchema } from 'forms/project';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { FiPaperclip } from 'react-icons/fi';
import { useMembers } from 'services/api/lib/member';
import { getQualities } from 'services/api/lib/qualities';
import { Descendant } from 'slate';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';
import { getGsgProject } from '../services/api/lib/gsg';

// Page
const Creator: NextPage = ({ project, quality }) => {
    type basePDFType = {
        base64: string;
        file: File;
    };

    const [baseImgMain, setBaseImgMain] = useState<string>(project?.main_image);
    const [baseSocialPdf, setBaseSocialPdf] = useState<basePDFType | undefined>(project?.social_impact);
    const [baseAdditional, setBaseAdditional] = useState<basePDFType | undefined>(project?.additional_document);

    const { onOpen: onCropperOpen } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure();
    const { isOpen: isCropperOpenMain, onOpen: onCropperOpenMain, onClose: onCropperCloseMain } = useDisclosure();

    const [createProyect, setCreateProyect] = useState(false);
    const [saveDraft, setSaveDraft] = useState(false);
    const [isStage, setIsStage] = useState(false);

    //const project = useDraftStore((s) => s.project);
    const setMember = useCreateGsgProjectStore((s) => s.setMember);
    const deleteMember = useCreateGsgProjectStore((s) => s.deleteMember);
    const [contenido, setContenido] = useState<Descendant[]>();
    const [selectedOptions, setSelectedOptions] = useState();
    const [isOtherParties, setIsOtherParties] = useState(false);

    const [isCheckCapital, setIsCheckCapital] = useState(false);
    const [isCheckDeuda, setIsCheckDeuda] = useState(false);

    const getNameFile = (url) => {
        return url(url.indexOf('/') + 2).split('/');
    };

    const { data: members, mutate } = useMembers();
    const toast = useToast();

    const optionsQuality = quality.map((item) => ({
        value: item.id,
        label: `${item.id}) ${'  '} ${item.icon.name}`,
    }));

    const {
        register,
        formState: { errors, isValid, isSubmitted },
        reset,
        setValue,
        handleSubmit,
        control,
        watch,
    } = useForm<IProjectForm>({
        mode: 'all',
        resolver: zodResolver(projectSchema),

        defaultValues: {
            title: project?.title ?? '',
            description: project?.description ?? '',
            business_web: project?.business_web,
            third_parties: { value: project?.third_parties ?? '', label: ThirdParties(project?.third_parties) },
            more_info: { value: project?.more_info ?? '', label: Messure(project?.more_info) },
            stage: { value: project?.stage ?? '', label: StageCapital(project?.stage) },
            capital_stage: { value: project?.capital_stage, label: Stage(project?.capital_stage) },
            debt: { value: project?.debt, label: Stage(project?.debt) },
            investment_objective: {
                value: project?.investment_objective ?? '',
                label: Objetive(project?.investment_objective),
            },
            guarantee: { value: project?.guarantee ?? '', label: Garantee(project?.guarantee) },
            expected_rentability: {
                value: project?.expected_rentability ?? '',
                label: Rentability(project?.expected_rentability),
            },
            finance_goal: { value: project?.finance_goal ?? '', label: FinanceGoal(project?.finance_goal) },
            time_lapse: { value: project?.time_lapse ?? '', label: Time(project?.time_lapse) },
            business_model: project?.business_model ?? '',
            investment_types: { value: project?.investment_types ?? '', label: project?.investment_types },
            better_project: project?.better_project ?? '',
            additional_info: project?.better_project ?? '',
        },
    });

    const optionsThirty = [
        { value: 'certified-b', label: 'Certificación empresa B' },
        { value: 'prize-org', label: 'Premio o reconocimiento de empresa u organización' },
        { value: 'incubators', label: 'Participación en Incubadoras o Aceleradoras' },
        { value: 'corfo', label: 'Adjudicación fondo CORFO u otro fondo público' },
        { value: 'other', label: 'Otro' },
        { value: 'nothing', label: 'Ninguno' },
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

    const optionsCapital = [
        { value: 'pre-seed', label: 'Pre-seed' },
        { value: 'seed', label: 'Seed' },
        { value: 'series-a', label: 'Serie A' },
        { value: 'series-b', label: 'Serie B' },
        { value: 'series-c', label: 'Serie C' },
        { value: 'series-d', label: 'Serie D' },
    ];

    const optionsDeuda = [
        { value: 'senior-debt', label: 'Deuda senior' },
        { value: 'mezzanine-debt', label: 'Deuda mezzanine' },
    ];

    const optionsObject = [
        { value: 'to-begin', label: 'Capital para comenzar' },
        { value: 'to-scale', label: 'Capital para escalar' },
        { value: 'to-innovate', label: 'Capital para innovar' },
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

    const optionsInvestor = [
        { value: 'Inversor ancla', label: 'Inversor ancla' },
        { value: 'Inversores atomizados', label: 'Inversores atomizados' },
        { value: 'Sponsor', label: 'Sponsor' },
        { value: 'Minoritarios', label: 'Minoritarios' },
        { value: 'Cualquiera', label: 'Cualquiera' },
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
                capital_stage: isCheckCapital ? data.capital_stage?.value : null,
                debt: isCheckDeuda ? data.debt?.value : null,
                business_model: data.business_model,
                guarantee: data.guarantee?.value,
                expected_rentability: isCheckCapital ? data.expected_rentability?.value : null,
                finance_goal: data.finance_goal?.value,
                time_lapse: data.time_lapse?.value,
                investment_types: isCheckCapital ? data.investment_types?.value : null,
                better_project: data.better_project,
                additional_info: data.additional_info,
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
        console.log(isCheckDeuda);
        setSaveDraft(true);
        const dataProject = {
            gsg_project: {
                title: proyectTitle,
                description: proyectDescription,
                business_web: proyectWeb,
                main_image: baseImgMain,
                social_impact: baseSocialPdf?.base64,
                more_info: proyectMore?.value,
                third_parties: proyectParties?.value,
                capital_stage: isCheckCapital ? watch('capital_stage')?.value : null,
                debt: isCheckDeuda ? proyectDept?.value : null,
                investment_types: isCheckCapital ? proyectInvestType?.value : null,
                expected_rentability: isCheckCapital ? watch('expected_rentability')?.value : null,
                stage: watch('stage')?.value,
                guarantee: watch('guarantee')?.value,
                finance_goal: watch('finance_goal')?.value,
                time_lapse: watch('time_lapse')?.value,
                business_model: watch('business_model'),
                investment_objective: watch('investment_objective')?.value,
                additional_info: watch('additional_info')?.value,
                additional_document: baseAdditional?.base64,
                better_project: watch('better_project'),
                status: 'sketch',
            },
            qualities:
                selectedOptions?.map((item) => item.value).join(';;') ??
                Object.values(project?.qualities ?? [])
                    .map((item) => item.id)
                    .join(';;'),

            members:
                members?.length !== 0
                    ? JSON.stringify({ members: members?.map((item) => ({ id: item.id })) } ?? {})
                    : undefined,
        };

        const { create, updateGsgProject } = await import('../services/api/lib/gsg');

        if (project?.status === 'sketch') {
            const { ok } = await updateGsgProject({ idProject: project?.id, project: dataProject });

            if (ok) {
                setSaveDraft(false);
                toast({
                    title: 'Borrador modificado',
                    description: 'El borrador se ha creado con éxito.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                setSaveDraft(false);
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
                setSaveDraft(false);
                toast({
                    title: 'Borrador creado',
                    description: 'El borrador se ha creado con éxito.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                setSaveDraft(false);
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

    const proyectTitle = watch('title', project?.title ?? '');
    const proyectDescription = watch('description', project?.description ?? '');
    const proyectWeb = watch('business_web');
    const proyectMainImage = watch('main_image');
    const proyectOds = watch('qualities');
    const proyectParties = watch('third_parties');
    const proyectMore = watch('more_info');
    const proyectSocial = watch('social_impact');
    const proyectCapital = watch('capital_stage');
    const proyectDept = watch('debt');
    const proyectInvestType = watch('investment_types');
    const proyectRentability = watch('expected_rentability');

    const proyectBetter = watch('better_project', project?.better_project ?? '');
    const proyectBusiness = watch('business_model', project?.business_model ?? '');

    const proyectObject = watch('investment_objective');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (project?.capital_stage) {
            setIsCheckCapital(true);
        }

        if (project?.debt) {
            setIsCheckDeuda(true);
        }
    }, [project?.debt, project?.capital_stage]);

    return (
        <>
            <NextSeo title={'Creador de proyecto - GSG'} />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME!} fallbackUrl="/login" />
            <HStack position="fixed" bg="gray.800" w="full" py={{ base: '15px', md: '14px' }} zIndex={20}>
                <Container
                    display="flex"
                    flexDirection={{ base: 'column', md: 'row' }}
                    justifyContent={{ base: 'center', md: 'space-between' }}
                    maxWidth={'container.lg'}
                >
                    <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: '10px', md: '23px' }}>
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
                            Creador de proyecto
                        </Text>
                    </Stack>
                    <HStack spacing="8px" mt={{ base: '10px', md: 0 }}>
                        <Button
                            onClick={handleDraft}
                            type="button"
                            variant="outline"
                            w="full"
                            isLoading={saveDraft}
                            loadingText="Guardando proyecto"
                        >
                            Guardar borrador
                        </Button>

                        <Tooltip
                            hasArrow
                            label="Hay campos sin completar"
                            isDisabled={isSubmitted ? isValid : true}
                            shouldWrapChildren
                            bg="red.500"
                        >
                            <Button
                                isLoading={createProyect}
                                loadingText="Publicando proyecto"
                                type="button"
                                onClick={handleSubmit(handlePublished)}
                                variant="solid"
                                w="full"
                                disabled={isSubmitted ? !isValid : false}
                            >
                                Postular proyecto
                            </Button>
                        </Tooltip>
                    </HStack>
                </Container>
            </HStack>

            <Container maxWidth={'container.lg'} paddingTop={{ base: '17rem', sm: '10rem' }} paddingBottom="153px">
                <VStack as="form" align="start" spacing="40px">
                    <VStack align="start">
                        <Text fontSize={'4xl'} fontWeight="bold">
                            Descripción General
                        </Text>
                        <Text>
                            Los campos con el signo <span style={{ color: '#4FD1C5' }}>*</span> son obligatorios
                        </Text>
                    </VStack>
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
                        <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                            {errors.title?.message}
                        </FormErrorMessage>
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
                                    maxLength={1000}
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
                            {proyectDescription?.length ?? 0}/1000 caracteres (Mínimo 700 caracteres)
                        </Text>

                        <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                            {errors?.description?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="business_web" isInvalid={!!errors.business_web} w={{ base: '100%', md: '50%' }}>
                        <FormLabel>Sitio web (opcional)</FormLabel>
                        <InputGroup>
                            <InputLeftAddon>www.</InputLeftAddon>
                            <Input {...register('business_web')} />
                        </InputGroup>
                        <FormErrorMessage>{errors.business_web?.message}</FormErrorMessage>
                    </FormControl>

                    {/*TODO: useCropper for upload image product*/}

                    <FormControl id="main_image" isInvalid={!!errors.main_image}>
                        <FormLabel lineHeight="140%">
                            Sube una foto representativa del proyecto de tu empresa. Esta aparecerá dentro de las
                            tarjetas que inversionistas y público en general podrán ver. (Tamaño máximo 2MB){' '}
                            <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>
                        {baseImgMain ? (
                            <Stack position="relative" w="fit-content">
                                <Image
                                    src={watch().main_image}
                                    w="332px"
                                    h="165px"
                                    objectFit="cover"
                                    objectPosition="center"
                                    rounded={3}
                                    alt="cover"
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
                                            if (e.target?.files[0].size >= 2000000) {
                                                toast({
                                                    title: 'La imagen es muy grande, porfavor, suba una imagen menor o igual a 2MB',
                                                    status: 'error',
                                                    duration: 9000,
                                                    isClosable: true,
                                                    position: 'top-right',
                                                });
                                            } else {
                                                const base = await getBase64(e.target.files![0]);
                                                setBaseImgMain(base);
                                                onCropperOpenMain();
                                            }
                                        }
                                    }}
                                >
                                    Arrastra o sube tu imagen aquí (min 800x400px)
                                </UploadButton>
                                <FormErrorMessage
                                    textColor="red.400"
                                    fontFamily="inter"
                                    fontSize="16px"
                                    fontWeight={'medium'}
                                    textAlign="start"
                                    w="full"
                                >
                                    {errors.main_image?.message}
                                </FormErrorMessage>
                            </VStack>
                        )}
                    </FormControl>

                    <FormControl id="qualities" w={{ base: '100%', md: '50%' }}>
                        <FormLabel>Selecciona los ODS que contribuyes en resolver (opcional)</FormLabel>
                        <FormHelperText textColor="gray.300" lineHeight="140%" mb="20px">
                            Los Objetivos de desarrollo sostenible son el plan maestro para conseguir un futuro
                            sostenible para todos. Se interrelacionan entre sí e incorporan los desafíos globales a los
                            que nos enfrentamos día a día, como la pobreza, la desigualdad, el clima, la degradación
                            ambiental, la prosperidad, la paz y la justicia.{' '}
                            <Link
                                href="https://www.un.org/sustainabledevelopment/es/sustainable-development-goals/"
                                target="_blank"
                                rel="noreferrer noopener"
                                color="#fff"
                            >
                                Ver más
                            </Link>
                        </FormHelperText>
                        <Controller
                            name="qualities"
                            control={control}
                            render={({ field }) => (
                                <CharkaSelect
                                    {...field}
                                    defaultValue={Object.values(project?.qualities ?? []).map(
                                        (item) => optionsQuality[item.id - 1],
                                    )}
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

                        <FormHelperText textColor="gray.300" lineHeight="140%">
                            Máximo 3 ODS
                        </FormHelperText>

                        <FormErrorMessage fontWeight={'semibold'}>{errors.qualities?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl id="third_parties" isInvalid={!!errors.third_parties} w={{ base: '100%', md: '50%' }}>
                        <FormLabel lineHeight="140%">
                            Selecciona el respaldo con el que cuentas de una tercera organización{' '}
                            <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>
                        <Controller
                            name="third_parties"
                            control={control}
                            render={({ field }) => <CharkaSelect {...field} useBasicStyles options={optionsThirty} />}
                        />

                        {proyectParties?.value === 'other' && <Input placeholder="¿Cuál?" mt="10px" />}

                        <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                            {errors.third_parties?.value?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="more_info" isInvalid={!!errors.more_info} w={{ base: '100%', md: '50%' }}>
                        <FormLabel lineHeight="140%">
                            Actualmente tienes información sobre cómo mides tus resultados de impacto{' '}
                            <span style={{ color: '#4FD1C5' }}>*</span>
                        </FormLabel>
                        <Controller
                            name="more_info"
                            control={control}
                            render={({ field }) => <CharkaSelect {...field} useBasicStyles options={optionsMore} />}
                        />
                        <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                            {errors.more_info?.value?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <FormControl id="social_impact">
                            <FormLabel>
                                Validación del impacto social/medioambiental: Por favor adjunta material (PDF) que
                                valide la medición de resultados. (Tamaño máximo 2MB) (opcional)
                            </FormLabel>

                            {baseSocialPdf !== 'https://api.gsg-match.com/cuadrado.png' &&
                            baseSocialPdf !== undefined ? (
                                <HStack align="center">
                                    <FiPaperclip />
                                    {baseSocialPdf?.file?.name ? (
                                        <Text fontWeight="bold">{baseSocialPdf?.file.name}</Text>
                                    ) : (
                                        <Link
                                            fontFamily="inter"
                                            fontWeight="medium"
                                            href={baseSocialPdf}
                                            target="_blank"
                                        >
                                            Ver PDF
                                        </Link>
                                    )}

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
                                                if (e.target?.files[0].size >= 2000000) {
                                                    toast({
                                                        title: 'El archivo es muy grande, porfavor, suba una PDF menor o igual a 2MB',
                                                        status: 'error',
                                                        duration: 9000,
                                                        isClosable: true,
                                                        position: 'top-right',
                                                    });
                                                } else {
                                                    const base = await getBase64(e.target.files![0]);
                                                    setValue('social_impact', e.target.files[0]);
                                                    setBaseSocialPdf({ base64: base, file: e.target.files[0] });
                                                }
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

                    <VStack align="flex-start">
                        <Text fontSize={'4xl'} fontWeight="bold" pt="60px">
                            Descripción financiera
                        </Text>

                        <Text textColor="gray.300" fontSize="14px" lineHeight="19.6px" fontFamily="inter">
                            Una ronda de financiación es un proceso que permite que una empresa obtenga nuevo capital a
                            través de inversores. En este proceso, entran nuevos socios que adquieren una parte del
                            capital social de la empresa y, por tanto, el control de una parte de ésta. Por otro lado,
                            la deuda comprende el entregar al equipo emprendedor un monto de dinero con el compromiso de
                            ser devuelto en su totalidad e incluyendo intereses.
                        </Text>
                    </VStack>

                    <VStack w={'full'} align="flex-start" spacing="40px">
                        <VStack align="flex-start" w="full" spacing="20px">
                            <VStack spacing="5px" align="flex-start" w="full">
                                <Text fontSize={'2xl'} fontWeight="medium">
                                    ¿Qué tipo de financiamiento buscas?
                                </Text>
                                <Text textColor="gray.300">Puedes elegir seleccionar capital, deuda o ambos</Text>
                            </VStack>

                            <VStack>
                                <HStack spacing="60px" pt="20px">
                                    <Checkbox
                                        isChecked={isCheckCapital}
                                        onChange={(e) => {
                                            setIsCheckCapital(e.target.checked);
                                            setValue('capital_stage', e.target.checked === false && undefined);
                                            setValue('investment_types', e.target.checked === false && undefined);
                                            setValue('expected_rentability', e.target.checked === false && undefined);
                                        }}
                                    >
                                        Capital
                                    </Checkbox>
                                    <Checkbox
                                        isChecked={isCheckDeuda}
                                        onChange={(e) => {
                                            setIsCheckDeuda(e.target.checked);
                                            setValue('debt', e.target.checked === false && undefined);
                                        }}
                                    >
                                        Deuda
                                    </Checkbox>
                                </HStack>
                                <Text textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                                    {!isCheckCapital && !isCheckDeuda && 'Seleccione almenos 1 opción'}
                                </Text>
                            </VStack>
                        </VStack>
                        {isCheckCapital && (
                            <VStack w={'full'} align="flex-start" spacing="40px">
                                <FormControl w={{ base: '100%', md: '50%' }}>
                                    <FormLabel>
                                        Financiamiento de capital <span style={{ color: '#4FD1C5' }}>*</span>
                                    </FormLabel>
                                    <Controller
                                        name="capital_stage"
                                        control={control}
                                        render={({ field }) => (
                                            <CharkaSelect
                                                {...field}
                                                defaultValue={
                                                    project?.capital_stage
                                                        ? {
                                                              label: Stage(project?.capital_stage),
                                                              value: project?.capital_stage,
                                                          }
                                                        : [optionsCapital[6]]
                                                }
                                                useBasicStyles
                                                options={optionsCapital}
                                            />
                                        )}
                                    />
                                    <FormErrorMessage fontWeight={'semibold'}>
                                        {errors.capital_stage?.message}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl id="investment_types" w={{ base: '100%', md: '50%' }}>
                                    <FormLabel>
                                        ¿Qué tipo de inversionista buscas? <span style={{ color: '#4FD1C5' }}>*</span>
                                    </FormLabel>

                                    <Controller
                                        name="investment_types"
                                        control={control}
                                        render={({ field }) => (
                                            <CharkaSelect {...field} useBasicStyles options={optionsInvestor} />
                                        )}
                                    />
                                    {errors.investment_types?.message}
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
                            </VStack>
                        )}

                        {isCheckDeuda && (
                            <FormControl w={{ base: '100%', md: '50%' }}>
                                <FormLabel>
                                    Financiamiento de deuda <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <Controller
                                    name="debt"
                                    control={control}
                                    render={({ field }) => (
                                        <CharkaSelect
                                            {...field}
                                            useBasicStyles
                                            options={optionsDeuda}
                                            defaultValue={
                                                project?.debt
                                                    ? {
                                                          label: Stage(project?.debt),
                                                          value: project?.debt,
                                                      }
                                                    : [optionsDeuda[2]]
                                            }
                                        />
                                    )}
                                />
                            </FormControl>
                        )}

                        <FormControl id="guarantee" isInvalid={!!errors.guarantee} w={{ base: '100%', md: '50%' }}>
                            <FormLabel lineHeight="140%">
                                ¿El producto o servicio que quiere financiar cuenta con garantías?{' '}
                                <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <Controller
                                name="guarantee"
                                control={control}
                                render={({ field }) => (
                                    <CharkaSelect {...field} useBasicStyles options={optionsGuarantee} />
                                )}
                            />
                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors?.guarantee?.value?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="stage" isInvalid={!!errors.stage} w={{ base: '100%', md: '50%' }}>
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
                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors?.stage?.value?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            id="finance_goal"
                            isInvalid={!!errors.finance_goal}
                            w={{ base: '100%', md: '50%' }}
                        >
                            <FormLabel lineHeight="140%">
                                Por favor selecciona el rango del monto de aporte aproximado que estás buscando (CLP){' '}
                                <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <Controller
                                name="finance_goal"
                                control={control}
                                render={({ field }) => (
                                    <CharkaSelect {...field} useBasicStyles options={optionsFinance} />
                                )}
                            />
                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors?.finance_goal?.value?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="time_lapse" isInvalid={!!errors.time_lapse} w={{ base: '100%', md: '50%' }}>
                            <FormLabel>
                                Selecciona los plazos de inversión que buscas{' '}
                                <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <Controller
                                name="time_lapse"
                                control={control}
                                render={({ field }) => <CharkaSelect {...field} useBasicStyles options={optionsTime} />}
                            />
                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors?.time_lapse?.value?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="business_model" w="full" isInvalid={!!errors.business_model}>
                            <FormLabel>
                                Trayectoria del producto <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <FormHelperText pb="15px" justifyContent="flex-start">
                                <Text textColor="gray.300" fontSize="14px" lineHeight="19.6px" fontFamily="inter">
                                    Coméntanos de tus ventas de los últimos 12 meses, EBITDA último año fiscal,
                                    Deuda/Patrimonio último año fiscal, Activo circulante vs Patrimonio último año
                                    fiscal, Impuesto declarado en el último año fiscal.
                                </Text>
                            </FormHelperText>
                            <Controller
                                name="business_model"
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
                                {proyectBusiness?.length ?? 0}/700 caractéres
                            </Text>
                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors.business_model?.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} alignItems="baseline" w="full">
                            <FormControl
                                id="investment_objective"
                                isInvalid={!!errors.investment_objective}
                                w={{ base: '100%', md: '50%' }}
                            >
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
                                {proyectObject?.value === 'other' && <Input placeholder="¿Cuál?" mt="10px" />}
                                <FormErrorMessage
                                    textColor="red.400"
                                    fontFamily="inter"
                                    fontSize="16px"
                                    fontWeight={'medium'}
                                >
                                    {errors?.investment_objective?.value?.message}
                                </FormErrorMessage>
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
                        <FormControl name="additional_info" isInvalid={!!errors.additional_info}>
                            <FormLabel lineHeight="140%">
                                Agrega cualquier descripción, comentario, fuente o recurso que consideres necesario para
                                que el inversionista comprenda mejor tu proyecto{' '}
                                <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <FormHelperText textColor="gray.300">
                                Ejemplo: Aparición en prensa, prospección de mercado etc.
                            </FormHelperText>

                            <Controller
                                name="additional_info"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        mt="10px"
                                        maxLength={1000}
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
                                {watch().additional_info?.length ?? 0}/1000 caracteres
                            </Text>

                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors?.additional_info?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <FormControl id="additional_document">
                        <FormLabel>
                            ¿Tienes algún archivo (PDF) que consideres necesario subir como información complementaria
                            para que sea vista por el inversionista? (Tamaño máximo 2MB) (Opcional)
                        </FormLabel>

                        {baseAdditional !== 'https://api.gsg-match.com/cuadrado.png' && baseAdditional !== undefined ? (
                            <HStack align="center">
                                <FiPaperclip />
                                {baseAdditional?.file?.name ? (
                                    <Text fontWeight="bold">{baseAdditional?.file.name}</Text>
                                ) : (
                                    <Link fontFamily="inter" fontWeight="medium" href={baseAdditional} target="_blank">
                                        Ver PDF
                                    </Link>
                                )}
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
                                            if (e.target?.files[0].size >= 2000000) {
                                                toast({
                                                    title: 'El archivo es muy grande, porfavor, suba una PDF menor o igual a 2MB',
                                                    status: 'error',
                                                    duration: 9000,
                                                    isClosable: true,
                                                    position: 'top-right',
                                                });
                                            } else {
                                                const base = await getBase64(e.target.files![0]);
                                                setBaseAdditional({ base64: base, file: e.target.files[0] });
                                            }
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

                    <FormControl id="better_project" isInvalid={!!errors.better_project}>
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

                        <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                            {errors.better_project?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <HStack spacing="20px" mt={{ base: '10px', md: 0 }} w="full">
                        <Button
                            onClick={handleDraft}
                            type="button"
                            variant="outline"
                            w="full"
                            h="40px"
                            isLoading={saveDraft}
                            loadingText="Guardando proyecto"
                        >
                            Guardar borrador
                        </Button>

                        <Stack w="full">
                            <Tooltip
                                hasArrow
                                label="Hay campos sin completar"
                                shouldWrapChildren
                                bg="red.500"
                                isDisabled={isSubmitted ? isValid : true}
                            >
                                <Button
                                    isLoading={createProyect}
                                    loadingText="Publicando proyecto"
                                    type="button"
                                    onClick={handleSubmit(handlePublished)}
                                    variant="solid"
                                    w="full"
                                    h="40px"
                                    disabled={isSubmitted ? !isValid : false}
                                >
                                    Postular proyecto
                                </Button>
                            </Tooltip>
                        </Stack>
                    </HStack>
                </VStack>
            </Container>

            {isCropperOpenMain && (
                <CropperModalBase64
                    title={'Recortar imagen'}
                    baseImg={baseImgMain}
                    isOpen={isCropperOpenMain}
                    onClose={onCropperCloseMain}
                    onCropSave={(img) => {
                        setValue('main_image', img);
                    }}
                />
            )}

            <AddMembersModal isOpen={isOpen} onClose={onClose} reload={mutate} />
            <SuccessModal isOpen={isOpenSuccess} onClose={onCloseSuccess} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const projectId = ctx.query.id as string | undefined;
    const quality = await getQualities(`${process.env.NEXT_PUBLIC_API_URL!}/quality`);

    try {
        if (projectId) {
            const data = await getGsgProject(process.env.NEXT_PUBLIC_API_URL!, projectId);

            return {
                props: {
                    project: data?.data?.gsg_project,
                    quality: quality?.qualities,
                },
            };
        } else {
            return {
                props: {
                    quality: quality?.qualities,
                },
            };
        }
    } catch (error) {
        return {
            props: {},
        };
    }
};

// Export
export default Creator;
