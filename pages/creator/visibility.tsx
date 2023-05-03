// Dependencies
// @ts-nocheck
import {
    Avatar,
    Button,
    Container,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Icon,
    Image,
    Img,
    Input,
    Link,
    Stack,
    Text,
    Textarea,
    Tooltip,
    useDisclosure,
    useToast,
    VStack,
    Select,
    Progress,
    Collapse,
} from '@chakra-ui/react';
import TooltipPrettie from 'common/tooltip';
import { PrivatePage } from '@clyc/next-route-manager';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select as CharkaSelect } from 'chakra-react-select';
import CropperModalBase64 from 'common/cropperModalBase64';
import UploadButton from 'common/uploadButton';
import AddMembersModal from 'components/project/addMembersModal';
import SuccessModal from 'components/project/successModal';
import Messure from 'components/projectDetail/formatText/messure';
import ThirdParties from 'components/projectDetail/formatText/thirdParties';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa';
import { FiPaperclip } from 'react-icons/fi';
import {
    IoIosArrowDown,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoYoutube,
    IoMdEye,
} from 'react-icons/io';
import { useMembers } from 'services/api/lib/member';
import { getQualities } from 'services/api/lib/qualities';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';
import { getGsgProject } from 'services/api/lib/gsg';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import Sector from 'components/projectDetail/formatText/sector';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { IProjectForm, projectSchema } from 'forms/projectVisibility';
import CurrentGoalModal from 'components/creator/currentGoalModal';
import EmailCopyModal from 'components/explorer/statusProject/emailCopyModal';
import { useAccelerators } from 'services/api/lib/accelerator';
import Navbar from 'components/creator/navbar';
import ProgressBar from 'common/progressBar';

// Page
const Visibility: NextPage = ({ project, quality }) => {
    type basePDFType = {
        base64: string;
        file: File;
    };

    const setMember = useCreateGsgProjectStore((s) => s.setMember);

    const [baseImgMain, setBaseImgMain] = useState<string>(project?.main_image);
    const [baseSocialPdf, setBaseSocialPdf] = useState<basePDFType | undefined>(project?.social_impact);
    const [baseAdditional, setBaseAdditional] = useState<basePDFType | undefined>(project?.additional_document);
    const [isDate, setIsDate] = useState(null);

    const [createProyect, setCreateProyect] = useState(false);
    const [saveDraft, setSaveDraft] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState();
    const [otherDescription, setOtherDescription] = useState('');

    const [isActiveItem, setIsActiveItem] = useState({
        description: true,
        other: false,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure();
    const { isOpen: isCropperOpenMain, onOpen: onCropperOpenMain, onClose: onCropperCloseMain } = useDisclosure();
    const { isOpen: isOpenCopy, onOpen: onOpenEmail, onClose: onCloseCopy } = useDisclosure();
    const [isOpenToggle, onToggle] = useState(false);

    const { isOpen: isOpenGoal, onOpen: openGoal, onClose: closeGoal } = useDisclosure();

    const { data: members, mutate } = useMembers();
    const { data: accelerators } = useAccelerators();
    const router = useRouter();
    const toast = useToast({});

    const optionsQuality = quality?.map((item) => ({
        value: item.id,
        label: `${item.id}) ${'  '} ${item.icon.name}`,
    }));

    const general_description = useRef<HTMLBodyElement>(null);
    const other = useRef<HTMLBodyElement>(null);

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
            main_image: baseImgMain ?? '',
            description: project?.description ?? '',
            third_parties: {
                value:
                    (project?.third_parties ?? '') !== ''
                        ? !ThirdParties(project?.third_parties)
                            ? 'other'
                            : project?.third_parties ?? ''
                        : '',
                label: (project?.third_parties ?? '') !== '' ? ThirdParties(project?.third_parties) ?? 'Otro' : '',
            },
            sector: { value: project?.sector ?? '', label: Sector(project?.sector) },
            more_info: { value: project?.more_info ?? '', label: Messure(project?.more_info) },

            better_project: project?.better_project ?? '',
            additional_info: project?.additional_info ?? '',

            linkedinForm: project?.contacts && project?.contacts[0],
            instagramForm: project?.contacts && project?.contacts[1],
            facebookForm: project?.contacts && project?.contacts[2],
            youtubeForm: project?.contacts && project?.contacts[3],
            webForm: project?.contacts && project?.contacts[4],

            monthStart: {
                label:
                    project?.fundraising_start_month !== null
                        ? new Date(project?.fundraising_start_month + 'T00:00:00-03:00').toLocaleString('es-CL', {
                              month: 'long',
                              timeZone: 'UTC',
                          })
                        : null,
                value:
                    project?.fundraising_start_month !== null
                        ? new Date(project?.fundraising_start_month + 'T00:00:00-03:00').getMonth() + 1
                        : null,
            },
            yearStart: {
                label:
                    project?.fundraising_start_month !== null
                        ? new Date(project?.fundraising_start_month + 'T00:00:00-03:00').getFullYear()
                        : null,
                value:
                    project?.fundraising_start_month !== null
                        ? new Date(project?.fundraising_start_month + 'T00:00:00-03:00').getFullYear()
                        : null,
            },
        },
    });

    const proyectTitle = watch('title', project?.title ?? '');
    const proyectDescription = watch('description', project?.description ?? '');
    const proyectParties = watch('third_parties');
    const proyectMore = watch('more_info');

    const proyectBetter = watch('better_project', project?.better_project ?? '');

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
        { value: 'in-process-external', label: 'Estoy en proceso de medición de resultados validados por un externo' },
    ];

    const optionsSector = [
        { value: 'Fishing', label: 'Pesca' },
        { value: 'Agricultural products', label: 'Productos Agrícola' },
        { value: 'Forestry and silviculture', label: 'Forestal y Silvícola' },
        { value: 'Livestock', label: 'Pecuario' },
        { value: 'Winery', label: 'Vitivinícola' },
        { value: 'Processed foods', label: 'Alimentos procesados' },
        { value: 'Metallic mining', label: 'Minería Metálica' },
        { value: 'Non-metallic mining', label: 'Minería no metálica' },
        { value: 'Environment', label: 'Medioambiente' },
        { value: 'Construction and infrastructure', label: 'Construcción e infraestructura' },
        { value: 'Non-conventional renewable energy', label: 'Energía renovables no convencionales' },
        { value: 'Energy efficiency', label: 'Eficiencia energética - Smart grid' },
        { value: 'Transport', label: 'Transporte, logística, almacnto.y serv. conexos' },
        { value: 'Biotechnology', label: 'Biotecnología' },
        { value: 'Telecommunications and digital media', label: 'Telecomunicaciones y medios digitales' },
        { value: 'Manufacturing', label: 'Manufactura' },
        { value: 'Metalmechanics', label: 'Metalmecánica' },
        { value: 'Chemical and petrochemical', label: 'Química y petroquímica' },
        { value: 'Biomedicine', label: 'Biomedicina' },
        { value: 'Public health', label: 'Salud pública' },
        { value: 'Creative industries', label: 'Industrias creativas' },
        { value: 'Education and training', label: 'Educación y capacitación' },
        { value: 'Financial services', label: 'Servicios financieros' },
        { value: 'Business and professional services', label: 'Servicios empresariales y profesionales' },
        { value: 'Computing and information technology', label: 'Informática y tecnologías de la información' },
        { value: 'Trade', label: 'Comercio' },
        { value: 'Tourism', label: 'Turismo' },
        { value: 'Establishments', label: 'Establecimientos de alojamiento turísitico - rest.' },
        { value: 'Others', label: 'Otros' },
        { value: 'Multisectorial', label: 'Multisectorial' },
    ];

    const generateMonthOptions = () => {
        const months = [];
        const date = new Date(2023, 0);

        for (let i = 0; i < 12; i++) {
            months.push({
                value: i + 1,
                label: date.toLocaleString('es-ES', { month: 'long' }),
            });
            date.setMonth(date.getMonth() + 1); // avanzar al siguiente mes
        }

        return months;
    };

    const generateYearOptions = () => {
        const years = [];
        const currentYear = new Date().getFullYear();

        for (let i = 0; i < 3; i++) {
            const year = currentYear + i;
            years.push({ value: year, label: year });
        }

        return years;
    };

    const percentDescription = () => {
        const percent = [];

        if (proyectTitle !== '') {
            percent.push(proyectTitle);
        }

        if (proyectDescription !== '') {
            percent.push(proyectDescription);
        }

        if (baseImgMain) {
            percent.push(baseImgMain);
        }

        if (watch('sector')?.value !== '') {
            percent.push(watch('sector')?.value);
        }

        if (proyectParties.value !== '') {
            percent.push(proyectParties);
        }

        if (proyectMore.value !== '') {
            percent.push(proyectMore);
        }

        return percent.length;
    };

    const percentOther = () => {
        const percent = [];

        /*if (watch('better_project') !== '') {
            percent.push(watch('better_project'));
        }*/

        if (watch('additional_info') !== '') {
            percent.push(watch('additional_info'));
        }

        if (members?.length > 0) {
            percent.push('');
        }

        if (isDate !== null && isDate) {
            percent.push('');
        }

        if (watch('monthStart').value?.toString()) {
            percent.push(watch('monthStart').value?.toString());
        }

        if (watch('yearStart').value?.toString()) {
            percent.push(watch('yearStart').value?.toString());
        }

        return percent.length;
    };

    const handleScroll = () => {
        let general_descriptionY = general_description.current?.getBoundingClientRect().y ?? 0;
        let otherY = other.current?.getBoundingClientRect().y ?? 0;

        if (general_descriptionY < 100) {
            setIsActiveItem({
                ...isActiveItem,
                description: true,
                finance: false,
                other: false,
            });
        }

        if (Math.round(otherY) < 100) {
            setIsActiveItem({
                ...isActiveItem,
                description: false,
                finance: false,
                other: true,
            });
        }
    };

    const handlePublished = async (data: IProjectForm) => {
        setCreateProyect(true);
        const dataProject = {
            gsg_project: {
                current_goal: 'visibility',

                title: data.title,
                description: data.description,
                main_image: baseImgMain,
                social_impact: baseSocialPdf?.base64,
                sector: data.sector?.value,
                more_info: data.more_info?.value,
                third_parties: data.third_parties?.value === 'other' ? otherDescription : data.third_parties?.value,

                //better_project: data.better_project,
                additional_info: data.additional_info,
                additional_document: baseAdditional?.base64,

                status: 'in-review',

                progress: Math.round(((percentDescription() + percentOther()) * 100) / (isDate ? 11 : 8)).toString(),

                contacts: `${data.linkedinForm};;${data.instagramForm};;${data.facebookForm};;${data.youtubeForm};;${data.webForm}`,

                fundraising_start_month: data.yearStart?.value
                    ? new Date(data.yearStart?.value, data.monthStart?.value - 1)
                    : null,
            },
            qualities: selectedOptions?.map((item) => item.value).join(';;'),
            members: JSON.stringify({ members: members?.map((item) => ({ id: item.id })) } ?? {}),
        };

        const { create, updateGsgProject } = await import('../../services/api/lib/gsg');

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

    const handleDraft = async (data: IProjectForm, isPreview: boolean = false) => {
        setSaveDraft(true);

        const dataProject = {
            gsg_project: {
                current_goal: 'visibility',

                title: proyectTitle,
                description: proyectDescription,
                main_image: baseImgMain,
                social_impact: baseSocialPdf?.base64,
                more_info: proyectMore?.value,
                third_parties: proyectParties?.value === 'other' ? otherDescription : proyectParties?.value,
                sector: watch('sector')?.value,

                additional_info: watch('additional_info'),
                additional_document: baseAdditional?.base64,

                status: 'sketch',

                progress: Math.round(((percentDescription() + percentOther()) * 100) / (isDate ? 11 : 8)).toString(),
                contacts: `${watch('linkedinForm')};;${watch('instagramForm')};;${watch('facebookForm')};;${watch(
                    'youtubeForm',
                )};;${watch('webForm')}`,

                fundraising_start_month:
                    watch('yearStart').value || watch('monthStart').value
                        ? new Date(watch('yearStart').value, watch('monthStart').value - 1)
                        : null,
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

        const { create, updateGsgProject } = await import('../../services/api/lib/gsg');

        const { ok } = await updateGsgProject({ idProject: project?.id, project: dataProject });

        if (ok) {
            if (isPreview) {
                window.open(
                    `${window.location.origin}/project/${project?.id}-${project?.title
                        .toLowerCase()
                        .replaceAll(' ', '-')}`,
                    '_blank',
                );
                setSaveDraft(false);
            } else {
                setSaveDraft(false);
                toast({
                    title: 'Borrador modificado',
                    description: 'El borrador se ha creado con éxito.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
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
    };

    const handleDelete = async (idMember: number) => {
        const { deleteMember } = await import('../../services/api/lib/member');
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setValue('members', members, { shouldValidate: true });
    }, [members]);

    useEffect(() => {
        if (watch('yearStart').value !== null && watch('monthStart').value !== null) {
            setIsDate(true);
        } else {
            setIsDate(false);
        }
    }, []);

    return (
        <>
            <NextSeo title="Creador de proyecto - MATCH" noindex />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME!} fallbackUrl="/login" />

            <Navbar handleDraft={handleDraft} saveDraft={saveDraft} />

            <HStack align="flex-start" w="full">
                <Container
                    display="flex"
                    maxWidth="950px"
                    paddingTop={{ base: '100px', sm: '100px' }}
                    paddingBottom="153px"
                    position="relative"
                >
                    <VStack as="form" align="start" spacing="40px">
                        <Link href="/explorer">
                            <HStack align="center" spacing="10px">
                                <Button
                                    variant="unstyled"
                                    textColor="black"
                                    fontWeight="bold"
                                    rounded="full"
                                    w="30px"
                                    h="40px"
                                    background="gray.100"
                                >
                                    {'<-'}
                                </Button>

                                <Text fontSize="14px" fontWeight="medium" fontFamily="inter">
                                    Volver al inicio
                                </Text>
                            </HStack>
                        </Link>

                        <HStack bg="gray.800" py="24px" px="16px" spacing="8px" rounded="8px" w="full">
                            <Text fontSize="16px" fontFamily="inter" color="gray.400">
                                El motivo de la postulación de tu proyecto es{' '}
                                <Text as="span" fontWeight="medium" color="gray.100">
                                    visibilizarlo
                                </Text>
                                . Si deseas cambiar tu elección{' '}
                                <Button
                                    onClick={openGoal}
                                    variant="link"
                                    fontWeight="normal"
                                    fontSize="16px"
                                    fontFamily="inter"
                                    color="gray.50"
                                    _hover={{ textDecoration: 'underline' }}
                                >
                                    hazlo aqui
                                </Button>
                            </Text>
                        </HStack>

                        <VStack align="start" ref={general_description} scrollMarginTop="100px">
                            <Text fontSize={'30px'} fontWeight="bold" textTransform="uppercase">
                                Descripción General
                            </Text>
                            <Text>
                                Los campos con el signo <span style={{ color: '#4FD1C5' }}>*</span> son obligatorios
                            </Text>
                        </VStack>

                        <FormControl id="title" isInvalid={!!errors.title} w={{ base: '100%', md: '50%' }}>
                            <FormLabel fontFamily="inter">
                                1. Título del proyecto <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <Input maxLength={40} {...register('title')} />
                            <Text
                                textColor="gray.300"
                                fontSize={{ base: 'xs', md: 'sm' }}
                                fontWeight="medium"
                                color="gray.400"
                                mt="15px"
                                fontFamily="inter"
                            >
                                {proyectTitle?.length ?? 0}/40 caractéres
                            </Text>
                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors.title?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="description" isInvalid={!!errors.description}>
                            <FormLabel m={0}>
                                2. Descripción del proyecto <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>

                            <FormHelperText mb="10px" fontFamily="inter" color="gray.300" lineHeight="140%">
                                Por favor detalla al inversionista en qué consiste el proyecto, cuál es su propósito,
                                los objetivos generales y específicos que tienen, propuesta de valor y a quién va
                                dirigido
                            </FormHelperText>

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
                                mt="15px"
                                fontFamily="inter"
                            >
                                {proyectDescription?.length ?? 0}/1000 caracteres (Mínimo 700 caracteres)
                            </Text>

                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors?.description?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="main_image" isInvalid={!!errors.main_image}>
                            <FormLabel lineHeight="140%">
                                3. Sube una foto representativa del proyecto de tu empresa. Esta aparecerá dentro de las
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
                                        bg="gray.600"
                                        color="gray.50"
                                        rounded="8px"
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

                        <FormControl id="qualities" w={{ base: '100%', md: '60%' }}>
                            <HStack align="flex-start" spacing="0px">
                                <FormLabel>4. Selecciona los ODS que contribuyes en resolver (Opcional)</FormLabel>
                                <TooltipPrettie>
                                    <>
                                        <Text
                                            textAlign="left"
                                            background="blue.700"
                                            fontSize="24px"
                                            px="10px"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                        >
                                            Objetivos de <br /> desarrollo sostenible
                                        </Text>

                                        <Text fontSize="14px" color="gray.300" fontFamily="inter" pb="15px">
                                            Los Objetivos de desarrollo sostenible (ODS) son el plan maestro para
                                            conseguir un futuro sostenible para todos. Se interrelacionan entre sí e
                                            incorporan los desafíos globales a los que nos enfrentamos día a día, como
                                            la pobreza, la desigualdad, el clima, la degradación ambiental, la
                                            prosperidad, la paz y la justicia.
                                        </Text>

                                        <Link
                                            href="https://www.un.org/sustainabledevelopment/es/sustainable-development-goals/"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            w="full"
                                        >
                                            <Button w="full" variant="solid">
                                                Saber más
                                            </Button>
                                        </Link>
                                    </>
                                </TooltipPrettie>
                            </HStack>

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

                        <FormControl id="sector" isInvalid={!!errors.sector} w={{ base: '100%', md: '60%' }}>
                            <FormLabel lineHeight="140%">
                                5. ¿Cuál es el rubro/sector al cuál pertenece tu proyecto?{' '}
                                <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <Controller
                                name="sector"
                                control={control}
                                render={({ field }) => (
                                    <CharkaSelect {...field} useBasicStyles options={optionsSector} />
                                )}
                            />

                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors.sector?.value?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            id="third_parties"
                            isInvalid={!!errors.third_parties}
                            w={{ base: '100%', md: '60%' }}
                        >
                            <FormLabel lineHeight="140%">
                                6. ¿Cuentas con respaldo o reconocimiento de una organización externa? Selecciona una
                                opción <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>
                            <Controller
                                name="third_parties"
                                control={control}
                                render={({ field }) => (
                                    <CharkaSelect {...field} useBasicStyles options={optionsThirty} />
                                )}
                            />

                            {proyectParties?.value === 'other' && (
                                <Input
                                    placeholder="¿Cuál?"
                                    mt="10px"
                                    value={otherDescription}
                                    onChange={(e) => setOtherDescription(e.target.value)}
                                />
                            )}

                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors.third_parties?.value?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="more_info" isInvalid={!!errors.more_info} w={{ base: '100%', md: '60%' }}>
                            <HStack align="flex-start" spacing="0px">
                                <FormLabel lineHeight="140%">
                                    7. ¿Miden resultados de impacto? <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>

                                <TooltipPrettie>
                                    <>
                                        <Text
                                            textAlign="left"
                                            background="blue.700"
                                            fontSize="24px"
                                            px="10px"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                        >
                                            Medición de impacto
                                        </Text>

                                        <Text fontSize="14px" color="gray.300" fontFamily="inter" pb="15px">
                                            La medición del impacto permite validar la calidad de los resultados
                                            sociales y/o medioambientales que se logran gracias al trabajo de tu
                                            organización. Medir resultados del impacto ayuda a crear un cambio sistémico
                                            y sostenible y también impulsa la creación de valor, permite a las
                                            organizaciones dar cuenta de su desempeño social, valorar su contribución a
                                            la sociedad y generar una mayor credibilidad con las partes interesadas,
                                            como clientes y proveedores.
                                        </Text>
                                    </>
                                </TooltipPrettie>
                            </HStack>
                            <Controller
                                name="more_info"
                                control={control}
                                render={({ field }) => <CharkaSelect {...field} useBasicStyles options={optionsMore} />}
                            />
                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors.more_info?.value?.message}
                            </FormErrorMessage>
                        </FormControl>

                        <VStack w="100%" align="flex-start" spacing="10px">
                            <FormControl id="social_impact">
                                <FormLabel lineHeight="140%">
                                    8. Validación del impacto social/medioambiental: Por favor adjunta material (PDF)
                                    que valide la medición de resultados. (Tamaño máximo 2MB) (Opcional)
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
                                            bg="gray.600"
                                            color="gray.50"
                                            borderColor="gray.50"
                                            border="1px dashed"
                                            rounded="8px"
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
                                                        setValue('social_impact', base, { shouldValidate: true });
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

                        <HStack pt="10px" pb="50px">
                            <Text fontFamily="inter" fontSize="16px" lineHeight="22.4px">
                                <span style={{ fontWeight: 'bold' }}>Importante:</span> La información descrita de aquí
                                en adelante (Descripción financiera e información complementaria), solo podrá ser
                                visualizada por inversionistas y el equipo de Match. Otras empresas y público en general
                                no podrán visualizarla.
                            </Text>
                        </HStack>

                        <Divider />

                        <Text fontSize="30px" fontWeight="bold" pt="60px" ref={other} textTransform="uppercase">
                            Otra información relevante
                        </Text>

                        <VStack w="100%" align="flex-start" spacing="10px">
                            <VStack w="100%" align="flex-start" spacing="5px" mb="10px">
                                <Text fontSize="2xl" fontWeight="24px">
                                    9. Miembros del equipo
                                </Text>
                                <Text fontSize="14px" fontWeight="normal" color="gray.300" fontFamily="inter">
                                    Máximo 10 miembros
                                </Text>
                            </VStack>

                            {members?.length <= 10 && (
                                <Button onClick={onOpen} variant="solid">
                                    Agregar perfil
                                </Button>
                            )}

                            {members?.length === 0 && (
                                <Text textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                                    Agrege almenos 1 miembro
                                </Text>
                            )}

                            <Stack w="full" pt="10px">
                                {members
                                    ? members?.map((member, i) => (
                                          <Stack
                                              key={i}
                                              w="full"
                                              direction={{ base: 'column', md: 'row' }}
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
                                          </Stack>
                                      ))
                                    : 'No hay equipo creado'}
                            </Stack>
                        </VStack>

                        <VStack>
                            <Text fontSize="16px" fontFamily="inter" color="gray.50" lineHeight="140%">
                                10. Copia y pega la URL de la/las plataformas/redes sociales que consideras pueden ser
                                relevantes para que inversionistas conozcan mejor tu proyecto (Opcional)
                            </Text>

                            <VStack spacing="15px" w="full">
                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={IoLogoLinkedin} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Linkedin</Text>
                                    </HStack>

                                    <FormControl id="linkedinForm" maxW="720px" isInvalid={!!errors.linkedinForm}>
                                        <Input {...register('linkedinForm')} />
                                        <FormErrorMessage>{errors.linkedinForm?.message}</FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={IoLogoInstagram} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Instagram</Text>
                                    </HStack>

                                    <FormControl id="instagramForm" maxW="720px" isInvalid={!!errors.instagramForm}>
                                        <Input {...register('instagramForm')} />
                                        <FormErrorMessage>{errors.instagramForm?.message}</FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={IoLogoFacebook} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Facebook</Text>
                                    </HStack>

                                    <FormControl id="facebookForm" maxW="720px" isInvalid={!!errors.facebookForm}>
                                        <Input {...register('facebookForm')} />
                                        <FormErrorMessage>{errors.facebookForm?.message}</FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={IoLogoYoutube} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Youtube</Text>
                                    </HStack>

                                    <FormControl id="youtubeForm" maxW="720px" isInvalid={!!errors.youtubeForm}>
                                        <Input {...register('youtubeForm')} />
                                        <FormErrorMessage>{errors.youtubeForm?.message}</FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={AiOutlineGlobal} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Sitio Web</Text>
                                    </HStack>

                                    <FormControl id="webForm" maxW="720px" isInvalid={!!errors.webForm}>
                                        <Input {...register('webForm')} />
                                        <FormErrorMessage>{errors.webForm?.message}</FormErrorMessage>
                                    </FormControl>
                                </HStack>
                            </VStack>
                        </VStack>

                        <VStack w="100%" align="flex-start" spacing="10px">
                            <FormControl name="additional_info" isInvalid={!!errors.additional_info}>
                                <FormLabel lineHeight="140%">
                                    11. Información Complementaria: Agrega cualquier descripción o comentario que
                                    consideres necesario para que el inversionista comprenda mejor tu proyecto{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <FormHelperText textColor="gray.300" mt="0px" mb="15px">
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
                                    maxLength={1000}
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
                            <FormLabel lineHeight="140%">
                                12. ¿Tienes algún archivo (PDF) que consideres necesario subir como información
                                complementaria para que sea vista por el inversionista? (Tamaño máximo 2MB) (Opcional)
                            </FormLabel>

                            {baseAdditional !== 'https://api.gsg-match.com/cuadrado.png' &&
                            baseAdditional !== undefined ? (
                                <HStack align="center">
                                    <FiPaperclip />
                                    {baseAdditional?.file?.name ? (
                                        <Text fontWeight="bold">{baseAdditional?.file.name}</Text>
                                    ) : (
                                        <Link
                                            fontFamily="inter"
                                            fontWeight="medium"
                                            href={baseAdditional}
                                            target="_blank"
                                        >
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
                                        bg="gray.600"
                                        color="gray.50"
                                        borderColor="gray.50"
                                        border="1px dashed"
                                        rounded="8px"
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
                                                    setValue('additional_document', base, { shouldValidate: true });
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

                        {/*  <FormControl id="better_project" isInvalid={!!errors.better_project}>
                            <FormLabel lineHeight="140%">
                                13. Espacio de mejora continua: ¿Cómo crees que tu proyecto podría beneficiarse de una
                                potencial inserción de un inversionista? <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>

                            <Controller
                                name="better_project"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        maxLength={700}
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

                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
                                {errors.better_project?.message}
                            </FormErrorMessage>
                        </FormControl>*/}

                        <FormControl>
                            <FormLabel lineHeight="140%">
                                14. ¿Buscas levantar financiamiento dentro de un plazo cercano? (Menor a un año){' '}
                                <span style={{ color: '#4FD1C5' }}>*</span>
                            </FormLabel>

                            <HStack w="full" maxW="395px">
                                <Button
                                    onClick={() => {
                                        setIsDate(true);
                                        setValue('monthStart.value', '', {
                                            shouldValidate: true,
                                            shouldDirty: false,
                                        });
                                        setValue('yearStart.value', '', {
                                            shouldValidate: true,
                                            shouldDirty: false,
                                        });
                                    }}
                                    variant="solid"
                                    w="full"
                                    h="40px"
                                    bg={isDate !== null && isDate ? 'teal.500' : 'gray.700'}
                                    _hover={{ bg: 'gray.600' }}
                                >
                                    Si
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsDate(false);
                                        setValue(
                                            'monthStart',
                                            { value: null, label: null },
                                            {
                                                shouldValidate: true,
                                                shouldDirty: false,
                                            },
                                        );
                                        setValue(
                                            'yearStart',
                                            { value: null, label: null },
                                            {
                                                shouldValidate: true,
                                                shouldDirty: false,
                                            },
                                        );
                                    }}
                                    variant="solid"
                                    w="full"
                                    h="40px"
                                    bg={isDate !== null && !isDate ? 'teal.500' : 'gray.700'}
                                    _hover={{ bg: 'gray.600' }}
                                >
                                    No
                                </Button>
                            </HStack>

                            {isDate === null && (
                                <Text color="red.400" fontWeight="medium" fontFamily="inter" mt="15px">
                                    Selecciona una opcion
                                </Text>
                            )}
                        </FormControl>

                        {isDate && (
                            <VStack
                                as={motion.div}
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                w="full"
                                align="start"
                                spacing="15px"
                            >
                                <Text fontSize="16px" fontFamily="inter" lineHeight="140%">
                                    15. Selecciona la fecha aproximada <span style={{ color: '#4FD1C5' }}>*</span>
                                </Text>

                                <HStack w="full" align="start">
                                    <FormControl w="full" id="monthStart" isInvalid={!!errors.monthStart}>
                                        <FormLabel lineHeight="140%">Mes</FormLabel>

                                        <Controller
                                            name="monthStart"
                                            control={control}
                                            render={({ field }) => (
                                                <CharkaSelect
                                                    {...field}
                                                    useBasicStyles
                                                    options={generateMonthOptions()}
                                                />
                                            )}
                                        />

                                        <FormErrorMessage
                                            textColor="red.400"
                                            fontFamily="inter"
                                            fontSize="16px"
                                            fontWeight={'medium'}
                                        >
                                            {errors.monthStart?.value?.message}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl w="full" id="monthStart" isInvalid={!!errors.yearStart}>
                                        <FormLabel lineHeight="140%">Año</FormLabel>

                                        <Controller
                                            name="yearStart"
                                            control={control}
                                            render={({ field }) => (
                                                <CharkaSelect
                                                    {...field}
                                                    useBasicStyles
                                                    options={generateYearOptions()}
                                                />
                                            )}
                                        />

                                        <FormErrorMessage
                                            textColor="red.400"
                                            fontFamily="inter"
                                            fontSize="16px"
                                            fontWeight={'medium'}
                                        >
                                            {errors.yearStart?.value?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </HStack>
                            </VStack>
                        )}

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
                                    isDisabled={isSubmitted ? (isValid ? true : false) : true}
                                >
                                    <Button
                                        isLoading={createProyect}
                                        loadingText="Publicando proyecto"
                                        type="button"
                                        onClick={handleSubmit(handlePublished)}
                                        variant="solid"
                                        w="full"
                                        h="40px"
                                        isDisabled={isSubmitted ? (isValid ? false : true) : false}
                                    >
                                        Postular proyecto
                                    </Button>
                                </Tooltip>
                            </Stack>
                        </HStack>
                    </VStack>
                </Container>

                <Stack
                    display={{ base: 'none', md: 'flex' }}
                    position="sticky"
                    justify="space-between"
                    maxWidth="271px"
                    h="fit-content"
                    alignItems="center"
                    background="gray.800"
                    py="20px"
                    px="15px"
                    rounded="16px"
                    right="0px"
                    top="300px"
                    marginLeft="40px"
                >
                    <VStack w="100%">
                        <HStack w="full" justify="space-between" color="gray.500" fontFamily="inter">
                            <Text fontSize="15px">Tu progreso actual</Text>
                            <Text fontSize="15px" fontWeight="semibold">
                                {`${Math.round(((percentDescription() + percentOther()) * 100) / (isDate ? 11 : 8))}%`}
                            </Text>
                        </HStack>

                        <ProgressBar
                            value={`${Math.round(
                                ((percentDescription() + percentOther()) * 100) / (isDate ? 11 : 8),
                            )}%`}
                        />
                    </VStack>

                    <VStack align="flex-start" fontSize="16px" fontFamily="inter" w="full">
                        <HStack
                            onClick={() =>
                                general_description?.current.scrollIntoView({
                                    behavior: 'smooth',
                                })
                            }
                            py="10px"
                            pl={`${isActiveItem.description ? 0 : '10px'}`}
                            pr="10px"
                            background={`${isActiveItem.description && 'gray.700'}`}
                            w="full"
                            justify="space-between"
                            cursor="pointer"
                            _hover={{ background: 'gray.700' }}
                        >
                            <HStack>
                                {isActiveItem.description && (
                                    <Stack h="22px" w="2px" background="#319795" rounded="16px"></Stack>
                                )}
                                <Text>Descripción general</Text>
                            </HStack>
                            {percentDescription() === 6 && (
                                <Icon as={BsCheckCircleFill} color="teal.500" w="25px" h="25px" />
                            )}
                        </HStack>

                        <HStack
                            onClick={() =>
                                other?.current.scrollIntoView({
                                    behavior: 'smooth',
                                })
                            }
                            w="full"
                            cursor="pointer"
                            py="10px"
                            pl={`${isActiveItem.other ? 0 : '10px'}`}
                            pr="10px"
                            justify="space-between"
                            background={`${isActiveItem.other && 'gray.700'}`}
                            _hover={{ background: 'gray.700' }}
                        >
                            <HStack>
                                {isActiveItem.other && (
                                    <Stack h="22px" w="2px" background="#319795" rounded="16px"></Stack>
                                )}
                                <Text>Otra información relevante</Text>
                            </HStack>
                            {percentOther() === (isDate ? 5 : 2) && (
                                <Icon as={BsCheckCircleFill} color="teal.500" w="25px" h="25px" />
                            )}
                        </HStack>
                    </VStack>

                    <VStack spacing="30px">
                        <VStack spacing="8px" w="full">
                            <Button
                                onClick={handleDraft}
                                type="button"
                                variant="solid"
                                background="gray.200"
                                _hover={{ background: 'gray.100' }}
                                color="gray.800"
                                w="full"
                                isLoading={saveDraft}
                                loadingText="Guardando proyecto"
                            >
                                Guardar borrador
                            </Button>

                            <Tooltip
                                hasArrow
                                label="Hay campos sin completar"
                                isDisabled={isSubmitted ? (isValid ? true : false) : true}
                                shouldWrapChildren
                                bg="red.500"
                                w="full"
                            >
                                <Button
                                    isLoading={createProyect}
                                    loadingText="Publicando proyecto"
                                    type="button"
                                    onClick={handleSubmit(handlePublished)}
                                    variant="solid"
                                    w="241px"
                                    isDisabled={isSubmitted ? (isValid ? false : true) : false}
                                >
                                    Postular proyecto
                                </Button>
                            </Tooltip>
                        </VStack>

                        <Text
                            fontFamily="inter"
                            fontSize="14px"
                            cursor="pointer"
                            _hover={{ textDecor: 'underline' }}
                            onClick={onOpenEmail}
                        >
                            ¿Necesitas ayuda? Contáctanos
                        </Text>
                    </VStack>
                </Stack>
            </HStack>

            <Stack
                display={{ base: 'block', md: 'none' }}
                bottom={0}
                position="fixed"
                bg="gray.800"
                w="full"
                h="fit-content"
                py="20px"
                px="16px"
                zIndex={20}
                spacing="15px"
            >
                <Button
                    onClick={() => onToggle(!isOpenToggle)}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="40px"
                    h="40px"
                    background="gray.600"
                    rounded="full"
                    top="-20px"
                    right="45%"
                    zIndex={20}
                >
                    <Stack as={motion.div} initial={{ rotate: 180 }} animate={{ rotate: isOpenToggle ? 0 : 180 }}>
                        <Icon as={IoIosArrowDown} w="30px" h="30px" rotate="90px" />
                    </Stack>
                </Button>

                <VStack w="100%">
                    <HStack w="full" justify="space-between" color="gray.50" fontFamily="inter">
                        <Text fontSize="15px">Tu progreso actual</Text>
                        <Text fontSize="15px" fontFamily="inter" fontWeight="medium">
                            {`${Math.round(((percentDescription() + percentOther()) * 100) / (isDate ? 11 : 8))}%`}
                        </Text>
                    </HStack>

                    <Stack position="relative" w="full" h="10px" background="gray.100" rounded="20px">
                        <Stack
                            w={`${Math.round(((percentDescription() + percentOther()) * 100) / (isDate ? 11 : 8))}%`}
                            h="full"
                            background="teal.400"
                            rounded="20px"
                        ></Stack>
                    </Stack>
                </VStack>

                <Collapse in={isOpenToggle} animateOpacity>
                    <VStack spacing="8px" w="full">
                        <Button
                            onClick={handleDraft}
                            type="button"
                            variant="solid"
                            background="gray.200"
                            _hover={{ background: 'gray.100' }}
                            color="gray.800"
                            w="full"
                            h="38px"
                            isLoading={saveDraft}
                            loadingText="Guardando proyecto"
                        >
                            Guardar borrador
                        </Button>

                        <Button
                            isLoading={createProyect}
                            loadingText="Publicando proyecto"
                            type="button"
                            onClick={handleSubmit(handlePublished)}
                            variant="solid"
                            w="full"
                            py="8px"
                            h="38px"
                            isDisabled={isSubmitted ? (isValid ? false : true) : false}
                        >
                            Postular proyecto
                        </Button>
                    </VStack>
                </Collapse>
            </Stack>

            {isCropperOpenMain && (
                <CropperModalBase64
                    title={'Recortar imagen'}
                    baseImg={baseImgMain}
                    isOpen={isCropperOpenMain}
                    onClose={onCropperCloseMain}
                    onCropSave={(img) => {
                        setValue('main_image', img, { shouldValidate: true });
                    }}
                />
            )}

            <AddMembersModal isOpen={isOpen} onClose={onClose} reload={mutate} />
            <SuccessModal isOpen={isOpenSuccess} onClose={onCloseSuccess} />

            <CurrentGoalModal isOpen={isOpenGoal} onClose={closeGoal} isCreated={false} projectId={project?.id} />
            <EmailCopyModal isOpen={isOpenCopy} onClose={onCloseCopy} />
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
                    project: data?.data?.gsg_project ?? null,
                    quality: quality?.qualities ?? null,
                },
            };
        } else {
            return {
                props: {
                    quality: quality?.qualities ?? null,
                },
            };
        }
    } catch (error) {
        return {
            props: {
                quality: {},
            },
        };
    }
};

// Export
export default Visibility;
