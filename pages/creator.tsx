// Dependencies
// @ts-nocheck
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Collapse,
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
    InputGroup,
    InputLeftAddon,
    InputLeftElement,
    Link,
    Stack,
    Text,
    Textarea,
    Tooltip,
    useDisclosure,
    useToast,
    VStack,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react';
import TooltipPrettie from 'common/tooltip';
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
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaCheck, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { FiPaperclip } from 'react-icons/fi';
import {
    IoIosArrowDown,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoYoutube,
    IoMdEye,
    IoMdGlobe,
    IoMdInformationCircle,
} from 'react-icons/io';
import { useMembers } from 'services/api/lib/member';
import { getQualities } from 'services/api/lib/qualities';
import { Descendant } from 'slate';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';
import { getGsgProject } from '../services/api/lib/gsg';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsCheckCircleFill } from 'react-icons/bs';
import Sector from 'components/projectDetail/formatText/sector';
import { motion } from 'framer-motion';
import Router, { useRouter } from 'next/router';

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
    const [isOpenToggle, onToggle] = useState(false);

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

    const [postulationEmployee, setPostulationEmployee] = useState(false);
    const [postulationProject, setPostulationProject] = useState(false);
    const router = useRouter();

    const [isActiveItem, setIsActiveItem] = useState({
        description: true,
        finance: false,
        other: false,
    });

    const getNameFile = (url) => {
        return url(url.indexOf('/') + 2).split('/');
    };

    const { data: members, mutate } = useMembers();
    const toast = useToast({});

    const optionsQuality = quality?.map((item) => ({
        value: item.id,
        label: `${item.id}) ${'  '} ${item.icon.name}`,
    }));

    const general_description = useRef<HTMLBodyElement>(null);
    const finance_description = useRef<HTMLBodyElement>(null);
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
            business_web: project?.business_web,
            third_parties: { value: project?.third_parties ?? '', label: ThirdParties(project?.third_parties) },
            sector: { value: project?.sector ?? '', label: Sector(project?.sector) },
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
            rentability_time: project?.rentability_time,
            last_sales12: project?.business_model?.split(';;')[0],
            last_sales6: project?.business_model?.split(';;')[1],

            last_client12: project?.business_model?.split(';;')[2],
            last_client6: project?.business_model?.split(';;')[3],

            ebitda: project?.business_model?.split(';;')[4],
            patrimony: project?.business_model?.split(';;')[5],
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
        { value: 'in-process-external', label: 'Estoy en proceso de medición de resultados validados por un externo' },
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

        if (watch('sector')?.value !== undefined) {
            percent.push(watch('sector')?.value);
        }

        if (proyectParties !== '') {
            percent.push(proyectParties);
        }

        if (proyectMore !== '') {
            percent.push(proyectMore);
        }

        return percent.length;
    };

    const percentFinance = () => {
        const percent = [];

        if (isCheckCapital) {
            if (watch('capital_stage')?.value !== undefined) {
                percent.push(watch('capital_stage')?.value);
            }

            if (watch('expected_rentability')?.value !== undefined) {
                percent.push(watch('expected_rentability')?.value);
            }

            if (proyectInvestType?.value !== undefined) {
                percent.push(proyectInvestType?.value);
            }
        }

        if (isCheckDeuda) {
            if (proyectDept?.value !== undefined) {
                percent.push(proyectDept?.value);
            }
        }

        if (watch('guarantee')?.value !== undefined) {
            percent.push(watch('guarantee')?.value);
        }

        if (watch('stage')?.value !== undefined) {
            percent.push(watch('stage')?.value);
        }

        if (watch('finance_goal')?.value !== undefined) {
            percent.push(watch('finance_goal')?.value);
        }

        if (watch('time_lapse')?.value !== undefined) {
            percent.push(watch('time_lapse')?.value);
        }

        if (watch('investment_objective')?.value !== undefined) {
            percent.push(watch('investment_objective')?.value);
        }

        if (proyectBusiness !== undefined) {
            percent.push(proyectBusiness);
        }

        return percent.length;
    };

    const percentOther = () => {
        const percent = [];

        if (watch('better_project') !== '') {
            percent.push(watch('better_project'));
        }

        if (watch('additional_info') !== '') {
            percent.push(watch('additional_info'));
        }

        return percent.length;
    };

    const handleScroll = () => {
        let general_descriptionY = general_description.current?.getBoundingClientRect().y ?? 0;
        let finance_descriptionY = finance_description.current?.getBoundingClientRect().y ?? 0;
        let otherY = other.current?.getBoundingClientRect().y ?? 0;

        if (general_descriptionY < 100) {
            setIsActiveItem({
                ...isActiveItem,
                description: true,
                finance: false,
                other: false,
            });
        }

        if (Math.round(finance_descriptionY) < 100) {
            setIsActiveItem({
                ...isActiveItem,
                description: false,
                finance: true,
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
                title: data.title,
                description: data.description,
                main_image: baseImgMain,
                social_impact: baseSocialPdf?.base64,
                more_info: data.more_info?.value,
                third_parties: data.third_parties?.value,
                sector: data.sector?.value,
                stage: data.stage?.value,
                investment_objective: data.investment_objective?.value,
                capital_stage: isCheckCapital ? data.capital_stage?.value : null,
                debt: isCheckDeuda ? data.debt?.value : null,
                rentability_time: `${data.last_sales12};;${data.last_sales6};;${data.last_client12};;${data.last_client6};;${data.ebitda};;${data.patrimony}`,

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

    const handleDraft = async (data: IProjectForm, isPreview: boolean = false) => {
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
                sector: watch('sector')?.value,
                capital_stage: isCheckCapital ? watch('capital_stage')?.value : null,
                debt: isCheckDeuda ? proyectDept?.value : null,
                investment_types: isCheckCapital ? proyectInvestType?.value : null,
                expected_rentability: isCheckCapital ? watch('expected_rentability')?.value : null,
                stage: watch('stage')?.value,
                guarantee: watch('guarantee')?.value,
                finance_goal: watch('finance_goal')?.value,
                time_lapse: watch('time_lapse')?.value,
                rentability_time: watch('rentability_time').value,
                business_model: `${watch('last_sales12')};;${watch('last_sales6')};;${watch('last_client12')};;${watch(
                    'last_client6',
                )};;${watch('ebitda')};;${watch('patrimony')}`,
                investment_objective: watch('investment_objective')?.value,
                additional_info: watch('additional_info')?.value,
                additional_document: baseAdditional?.base64,
                better_project: watch('better_project'),
                status: 'sketch',
                investment_type: postulationProject
                    ? 'Un proyecto específico dentro de la empresa'
                    : 'Un proyecto para la empresa',
                progress: Math.round(
                    ((percentDescription() + percentFinance() + percentOther()) * 100) /
                        (isCheckCapital && isCheckDeuda
                            ? 18
                            : isCheckCapital && !isCheckDeuda
                            ? 17
                            : !isCheckCapital && isCheckDeuda
                            ? 15
                            : 18),
                ).toString(),
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
                if (isPreview) {
                    window.open(`https://gsgmatch.netlify.app/projectDetail/${project?.id}`, '_blank');
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
    const proyectMainImage = watch('main_image');
    const proyectOds = watch('qualities');
    const proyectParties = watch('third_parties');
    const proyectMore = watch('more_info');

    const proyectWeb = watch('business_web');
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <NextSeo title={'Creador de proyecto - GSG'} />
            <PrivatePage cookieName={process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME!} fallbackUrl="/login" />

            <HStack
                align="flex-start"
                justify="flex-start"
                position="fixed"
                bg="gray.800"
                w="full"
                py={{ base: '15px', md: '14px' }}
                zIndex={20}
            >
                <Container
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    maxWidth="1250px"
                    px={{ base: '16px', xl: '50px' }}
                    marginLeft={{ base: '0px', lg: 'auto' }}
                >
                    <HStack spacing="10px">
                        <Img src="/images/logo_empty.png" w="40px" h="40px" />
                        <Text fontSize="24px" fontWeight="bold">
                            MATCH
                        </Text>
                    </HStack>

                    <Button
                        onClick={() => handleDraft({}, true)}
                        variant="solid"
                        background="blue.700"
                        leftIcon={<IoMdEye />}
                        fontSize="14px"
                        _hover={{ background: 'blue.600' }}
                        isLoading={saveDraft}
                        loadingText="Cargando vista previa"
                    >
                        Vista previa
                    </Button>
                </Container>
            </HStack>

            <HStack align="flex-start" w="full">
                <Container
                    display="flex"
                    maxWidth="900px"
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
                                Porfavor detalla al inversionista en qué consiste el proyecto, cuál es su enfoque, los
                                objetivos generales y específicos que tienen, y cualquier otra información que
                                consideres relevante.
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

                        {/*TODO: useCropper for upload image product*/}

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

                            {proyectParties?.value === 'other' && <Input placeholder="¿Cuál?" mt="10px" />}

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

                            {proyectParties?.value === 'other' && <Input placeholder="¿Cuál?" mt="10px" />}

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
                                    7. ¿Actualmente tienes información sobre cómo mides tus resultados de impacto?{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
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

                        <VStack align="flex-start" ref={finance_description}>
                            <Text fontSize="30px" fontWeight="bold" pt="60px" textTransform="uppercase">
                                Descripción financiera
                            </Text>

                            <Text fontSize="16px" color="gray.50" lineHeight="140%" fontFamily="inter">
                                Una ronda de financiación es un proceso que permite que una empresa obtenga nuevo
                                capital a través de inversores. En este proceso, entran nuevos socios que adquieren una
                                parte del capital social de la empresa y, por tanto, el control de una parte de ésta.
                                Por otro lado, la deuda comprende el entregar al equipo emprendedor un monto de dinero
                                con el compromiso de ser devuelto en su totalidad e incluyendo intereses.
                            </Text>
                        </VStack>

                        <VStack w={'full'} align="flex-start" spacing="40px">
                            <VStack spacing="15px">
                                <Text fontSize="16px" fontFamily="inter" color="gray.50" lineHeight="140%">
                                    9. ¿Buscas capital para un proyecto específico dentro de tu empresa o para tu
                                    empresa? *
                                </Text>
                                <HStack justify="start" w="full">
                                    <Button
                                        fontSize="16px"
                                        fontWeight="normal"
                                        height="42px"
                                        px="30px"
                                        variant="solid"
                                        background={postulationProject ? 'gray.600' : 'gray.700'}
                                        _hover={{ background: 'gray.600' }}
                                        leftIcon={postulationProject && <FaCheck color="#319795" />}
                                        onClick={() => {
                                            setPostulationProject(true);
                                            setPostulationEmployee(false);
                                        }}
                                    >
                                        Proyecto específico
                                    </Button>
                                    <Button
                                        fontSize="16px"
                                        fontWeight="normal"
                                        variant="solid"
                                        height="42px"
                                        px="30px"
                                        background={postulationEmployee ? 'gray.600' : 'gray.700'}
                                        _hover={{ background: 'gray.600' }}
                                        leftIcon={postulationEmployee && <FaCheck color="#319795" />}
                                        onClick={() => {
                                            setPostulationEmployee(true);
                                            setPostulationProject(false);
                                        }}
                                    >
                                        Empresa
                                    </Button>
                                </HStack>
                            </VStack>

                            <VStack align="flex-start" w="full" spacing="20px">
                                <VStack spacing="5px" align="flex-start" w="full">
                                    <Text fontSize="16px" fontFamily="inter" color="gray.50" lineHeight="140%">
                                        10. ¿Qué tipo de financiamiento buscas?
                                    </Text>
                                    <Text textColor="gray.300" fontFamily="inter">
                                        Puedes elegir seleccionar capital, deuda o ambos
                                    </Text>
                                </VStack>

                                <VStack>
                                    <HStack spacing="60px">
                                        <Checkbox
                                            isChecked={isCheckCapital}
                                            onChange={(e) => {
                                                setIsCheckCapital(e.target.checked);
                                                setValue('capital_stage', e.target.checked === false && undefined);
                                                setValue('investment_types', e.target.checked === false && undefined);
                                                setValue(
                                                    'expected_rentability',
                                                    e.target.checked === false && undefined,
                                                );
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
                                    <FormControl w={{ base: '100%', md: '60%' }}>
                                        <FormLabel fontSize="16px" fontFamily="inter" color="gray.50" lineHeight="140%">
                                            11. Financiamiento de capital <span style={{ color: '#4FD1C5' }}>*</span>
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

                                    <FormControl id="investment_types" w={{ base: '100%', md: '60%' }}>
                                        <HStack align="flex-start" spacing="0px">
                                            <FormLabel>
                                                12. ¿Qué tipo de inversionista buscas?{' '}
                                                <span style={{ color: '#4FD1C5' }}>*</span>
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
                                                        Tipos de inversionista
                                                    </Text>

                                                    <UnorderedList
                                                        fontSize="14px"
                                                        color="gray.300"
                                                        fontFamily="inter"
                                                        px="15px"
                                                        spacing="15px"
                                                    >
                                                        <ListItem>
                                                            Inversor Ancla: Generalmente es el primer inversor que
                                                            realiza un compromiso de capital sustancial en un fondo,
                                                            invirtiendo un monto considerable o mayoritario en relación
                                                            a otros inversores
                                                        </ListItem>
                                                        <ListItem>
                                                            Inversor Atomizado: Refiere a la presencia de múltiples
                                                            inversores, todos con una inversión de tamaño reducido o
                                                            relativamente similar.
                                                        </ListItem>
                                                        <ListItem>
                                                            Sponsor: A menudo se conoce como el socio general (GP),
                                                            mientras que el resto de los inversores son socios limitados
                                                            (LP).
                                                        </ListItem>
                                                        <ListItem>
                                                            Minoritarios: Se refiere a uno o varios inversores que son
                                                            dueño/s de menos del 50% de una compañía. Esta categoría
                                                            agrupa a todos los socios que individualmente poseen menos
                                                            de la mitad del patrimonio de una sociedad mercantil.
                                                        </ListItem>
                                                    </UnorderedList>
                                                </>
                                            </TooltipPrettie>
                                        </HStack>

                                        <Controller
                                            name="investment_types"
                                            control={control}
                                            render={({ field }) => (
                                                <CharkaSelect {...field} useBasicStyles options={optionsInvestor} />
                                            )}
                                        />
                                        {errors.investment_types?.message}
                                    </FormControl>

                                    <FormControl id="expected_rentability" w={{ base: '100%', md: '60%' }}>
                                        <FormLabel lineHeight="140%">
                                            13. ¿Cuál es la rentabilidad que esperas para tu proyecto?{' '}
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
                                <FormControl w={{ base: '100%', md: '60%' }}>
                                    <FormLabel>
                                        14. Financiamiento de deuda <span style={{ color: '#4FD1C5' }}>*</span>
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

                            <FormControl id="guarantee" isInvalid={!!errors.guarantee} w={{ base: '100%', md: '60%' }}>
                                <FormLabel lineHeight="140%">
                                    15. ¿El producto o servicio que quiere financiar cuenta con garantías?{' '}
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

                            <FormControl id="stage" isInvalid={!!errors.stage} w={{ base: '100%', md: '60%' }}>
                                <FormLabel>
                                    16. ¿En qué etapa se encuentra tu proyecto?{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
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
                                w={{ base: '100%', md: '60%' }}
                            >
                                <FormLabel lineHeight="140%">
                                    17. Por favor selecciona el rango del monto de aporte aproximado que estás buscando
                                    (CLP) <span style={{ color: '#4FD1C5' }}>*</span>
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

                            <FormControl id="rentability_time" w="full" isInvalid={!!errors.rentability_time}>
                                <FormLabel>
                                    18. Indica el tiempo que requerirás para que tu empresa, producto o servicio sea
                                    rentable. <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>

                                <HStack>
                                    <Input {...register('rentability_time')} maxW="95px" type="number" />
                                    <Text>Meses</Text>
                                </HStack>
                            </FormControl>

                            <FormControl
                                id="time_lapse"
                                isInvalid={!!errors.time_lapse}
                                w={{ base: '100%', md: '60%' }}
                            >
                                <FormLabel>
                                    19. Selecciona los plazos de inversión que buscas{' '}
                                    <span style={{ color: '#4FD1C5' }}>*</span>
                                </FormLabel>
                                <Controller
                                    name="time_lapse"
                                    control={control}
                                    render={({ field }) => (
                                        <CharkaSelect {...field} useBasicStyles options={optionsTime} />
                                    )}
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

                            <Stack
                                spacing="60px"
                                direction={{ base: 'column', md: 'row' }}
                                alignItems="baseline"
                                w="full"
                            >
                                <FormControl
                                    id="investment_objective"
                                    isInvalid={!!errors.investment_objective}
                                    w={{ base: '100%', md: '60%' }}
                                >
                                    <FormLabel>
                                        20. ¿Cuál es el objetivo que tienes para buscar inversión?{' '}
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

                            <VStack w="full" align="flex-start" gap="15px">
                                <Text fontSize="16px" fontFamily="inter" color="gray.50" lineHeight="140%">
                                    21. En relación a tu trayectoria, por favor completa los siguientes campos. Si no
                                    registras datos, coloca 0
                                </Text>

                                <VStack w="full" gap="15px">
                                    <FormControl
                                        id="last_sales12"
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        isInvalid={!!errors.last_sales12}
                                    >
                                        <FormLabel w="full">
                                            Ventas en los últimos 12 meses <span style={{ color: '#4FD1C5' }}>*</span>
                                        </FormLabel>
                                        <VStack w="full" align="flex-end">
                                            <Input maxW="420px" {...register('last_sales12')} />
                                            <FormErrorMessage
                                                textColor="red.400"
                                                fontFamily="inter"
                                                fontSize="16px"
                                                fontWeight={'medium'}
                                            >
                                                {errors.last_sales12?.message}
                                            </FormErrorMessage>
                                        </VStack>
                                    </FormControl>

                                    <FormControl
                                        id="last_sales6"
                                        sInvalid={!!errors.last_sales6}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <FormLabel w="full">
                                            Ventas en los últimos 6 meses <span style={{ color: '#4FD1C5' }}>*</span>
                                        </FormLabel>
                                        <VStack w="full" align="flex-end">
                                            <Input maxW="420px" {...register('last_sales6')} />
                                            <FormErrorMessage
                                                textColor="red.400"
                                                fontFamily="inter"
                                                fontSize="16px"
                                                fontWeight={'medium'}
                                            >
                                                {errors.last_sales6?.message}
                                            </FormErrorMessage>
                                        </VStack>
                                    </FormControl>

                                    <FormControl
                                        id="last_client12"
                                        sInvalid={!!errors.last_client12}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <FormLabel w="full">
                                            Clientes en los últimos 12 meses <span style={{ color: '#4FD1C5' }}>*</span>
                                        </FormLabel>
                                        <VStack w="full" align="flex-end">
                                            <Input maxW="420px" {...register('last_client12')} />
                                            <FormErrorMessage
                                                textColor="red.400"
                                                fontFamily="inter"
                                                fontSize="16px"
                                                fontWeight={'medium'}
                                            >
                                                {errors.last_client12?.message}
                                            </FormErrorMessage>
                                        </VStack>
                                    </FormControl>

                                    <FormControl
                                        id="last_client6"
                                        sInvalid={!!errors.last_client6}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <FormLabel w="full">
                                            Clientes en los últimos 6 meses <span style={{ color: '#4FD1C5' }}>*</span>
                                        </FormLabel>
                                        <VStack w="full" align="flex-end">
                                            <Input maxW="420px" {...register('last_client6')} />
                                            <FormErrorMessage
                                                textColor="red.400"
                                                fontFamily="inter"
                                                fontSize="16px"
                                                fontWeight={'medium'}
                                            >
                                                {errors.last_client6?.message}
                                            </FormErrorMessage>
                                        </VStack>
                                    </FormControl>

                                    <FormControl
                                        id="ebitda"
                                        sInvalid={!!errors.ebitda}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <FormLabel w="full">
                                            EBITDA último año fiscal <span style={{ color: '#4FD1C5' }}>*</span>
                                        </FormLabel>
                                        <VStack w="full" align="flex-end">
                                            <Input maxW="420px" {...register('ebitda')} />
                                            <FormErrorMessage
                                                textColor="red.400"
                                                fontFamily="inter"
                                                fontSize="16px"
                                                fontWeight={'medium'}
                                            >
                                                {errors.ebitda?.message}
                                            </FormErrorMessage>
                                        </VStack>
                                    </FormControl>

                                    <FormControl
                                        id="patrimony"
                                        sInvalid={!!errors.patrimony}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <FormLabel w="full">
                                            Deuda / Patrimionio último año fiscal{' '}
                                            <span style={{ color: '#4FD1C5' }}>*</span>
                                        </FormLabel>
                                        <VStack w="full" align="flex-end">
                                            <Input maxW="420px" {...register('patrimony')} />
                                            <FormErrorMessage
                                                textColor="red.400"
                                                fontFamily="inter"
                                                fontSize="16px"
                                                fontWeight={'medium'}
                                            >
                                                {errors.patrimony?.message}
                                            </FormErrorMessage>
                                        </VStack>
                                    </FormControl>
                                </VStack>
                            </VStack>
                        </VStack>

                        <Divider pt="60px" />

                        <Text fontSize="30px" fontWeight="bold" pt="60px" ref={other} textTransform="uppercase">
                            Otra información relevante
                        </Text>

                        <VStack w="100%" align="flex-start" spacing="10px">
                            <VStack w="100%" align="flex-start" spacing="5px">
                                <Text fontSize="2xl" fontWeight="24px">
                                    22. Miembros del equipo
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

                            <Stack w="full" pt="40px">
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
                                23. Selecciona la o las plataformas/redes sociales que consideras pueden ser relevantes
                                para que inversionistas conozcan mejor tu proyecto. (Opcional)
                            </Text>

                            <VStack spacing="15px" w="full">
                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={IoLogoLinkedin} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Linkedin</Text>
                                    </HStack>

                                    <FormControl maxW="720px">
                                        <Input />
                                    </FormControl>
                                </HStack>

                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={IoLogoInstagram} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Instagram</Text>
                                    </HStack>

                                    <FormControl maxW="720px">
                                        <Input />
                                    </FormControl>
                                </HStack>

                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={IoLogoFacebook} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Facebook</Text>
                                    </HStack>

                                    <Input maxW="720px" />
                                </HStack>

                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={IoLogoYoutube} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Youtube</Text>
                                    </HStack>

                                    <Input maxW="720px" />
                                </HStack>

                                <HStack justify="space-between" p="8px" background="gray.800" w="full" rounded="8px">
                                    <HStack>
                                        <Icon as={AiOutlineGlobal} w="40px" h="40px" />
                                        <Text display={{ base: 'none', md: 'block' }}>Sitio Web</Text>
                                    </HStack>

                                    <Input maxW="720px" />
                                </HStack>
                            </VStack>
                        </VStack>

                        <VStack w="100%" align="flex-start" spacing="10px">
                            <FormControl name="additional_info" isInvalid={!!errors.additional_info}>
                                <FormLabel lineHeight="140%">
                                    24. Información Complementaria: Agrega cualquier descripción o comentario que
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
                                25. ¿Tienes algún archivo (PDF) que consideres necesario subir como información
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
                            <FormLabel lineHeight="140%">
                                26. Espacio de mejora continua: ¿Cómo crees que tu proyecto podría beneficiarse de una
                                potencial inserción de un inversionista? <span style={{ color: '#4FD1C5' }}>*</span>
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

                            <FormErrorMessage
                                textColor="red.400"
                                fontFamily="inter"
                                fontSize="16px"
                                fontWeight={'medium'}
                            >
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

                <Stack
                    display={{ base: 'none', md: 'flex' }}
                    position="sticky"
                    justify="space-between"
                    maxWidth="271px"
                    h="389px"
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
                                {`${Math.round(
                                    ((percentDescription() + percentFinance() + percentOther()) * 100) /
                                        (isCheckCapital && isCheckDeuda
                                            ? 18
                                            : isCheckCapital && !isCheckDeuda
                                            ? 17
                                            : !isCheckCapital && isCheckDeuda
                                            ? 15
                                            : 18),
                                )}%`}
                            </Text>
                        </HStack>

                        <Stack position="relative" w="full" h="10px" background="gray.100" rounded="20px">
                            <Stack
                                w={`${Math.round(
                                    ((percentDescription() + percentFinance() + percentOther()) * 100) /
                                        (isCheckCapital && isCheckDeuda
                                            ? 18
                                            : isCheckCapital && !isCheckDeuda
                                            ? 17
                                            : !isCheckCapital && isCheckDeuda
                                            ? 15
                                            : 18),
                                )}%`}
                                h="full"
                                background="teal.400"
                                rounded="20px"
                            ></Stack>
                        </Stack>
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
                                finance_description?.current.scrollIntoView({
                                    behavior: 'smooth',
                                })
                            }
                            w="full"
                            cursor="pointer"
                            py="10px"
                            pl={`${isActiveItem.finance ? 0 : '10px'}`}
                            pr="10px"
                            justify="space-between"
                            background={`${isActiveItem.finance && 'gray.700'}`}
                            _hover={{ background: 'gray.700' }}
                        >
                            <HStack>
                                {isActiveItem.finance && (
                                    <Stack h="22px" w="2px" background="#319795" rounded="16px"></Stack>
                                )}
                                <Text>Descripción financiera</Text>
                            </HStack>
                            {(percentFinance() === 9 || percentFinance() === 7 || percentFinance() === 10) && (
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
                            {percentOther() === 2 && <Icon as={BsCheckCircleFill} color="teal.500" w="25px" h="25px" />}
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
                                isDisabled={isSubmitted ? isValid : true}
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
                                    disabled={isSubmitted ? !isValid : false}
                                >
                                    Postular proyecto
                                </Button>
                            </Tooltip>
                        </VStack>

                        <Text fontFamily="inter" fontSize="14px">
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
                            {`${Math.round(
                                ((percentDescription() + percentFinance() + percentOther()) * 100) /
                                    (isCheckCapital && isCheckDeuda
                                        ? 18
                                        : isCheckCapital && !isCheckDeuda
                                        ? 17
                                        : !isCheckCapital && isCheckDeuda
                                        ? 15
                                        : 18),
                            )}%`}
                        </Text>
                    </HStack>

                    <Stack position="relative" w="full" h="10px" background="gray.100" rounded="20px">
                        <Stack
                            w={`${Math.round(
                                ((percentDescription() + percentFinance() + percentOther()) * 100) /
                                    (isCheckCapital && isCheckDeuda
                                        ? 18
                                        : isCheckCapital && !isCheckDeuda
                                        ? 17
                                        : !isCheckCapital && isCheckDeuda
                                        ? 15
                                        : 18),
                            )}%`}
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
                            disabled={isSubmitted ? !isValid : false}
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
export default Creator;
