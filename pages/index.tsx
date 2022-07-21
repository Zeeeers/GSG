// Dependencies
//@ts-nocheck
import { NextPage } from 'next';
import { CgShapeSquare, CgShapeCircle, CgShapeTriangle, CgSortAz } from 'react-icons/cg';
import { BsPlus } from 'react-icons/bs';
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
    Select,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
    Textarea,
    useDisclosure,
    VStack,
    Stack,
    Link,
    Divider,
} from '@chakra-ui/react';
import SlateEditor from 'common/slate/SlateEditor';
import SelectOds from 'common/selectOds';
import { zodResolver } from '@hookform/resolvers/zod';
import { IProjectForm, projectSchema } from 'forms/project';
import { useForm } from 'react-hook-form';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';
import UploadButton from 'common/uploadButton';
import { useState } from 'react';
import AddMembersModal from 'components/project/addMembersModal';
import { Descendant } from 'slate';

/*
    TODO: change type values in data products and validation
    TODO: migrate page to component and implement test
    TODO: change heigth input
*/

// Page
const Index: NextPage = () => {
    const [baseImg, setBaseImg] = useState<string>();
    const { onOpen: onCropperOpen } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const project = useCreateGsgProjectStore((s) => s.project);
    const members = useCreateGsgProjectStore((s) => s.members);
    const setMember = useCreateGsgProjectStore((s) => s.setMember);
    const deleteMember = useCreateGsgProjectStore((s) => s.deleteMember);
    const [contenido, setContenido] = useState<Descendant[]>();

    const {
        register,
        formState: { errors },
        watch,
    } = useForm<IProjectForm>({
        defaultValues: {
            title: project.title ?? '',
            description: project.description ?? '',
            main_image: project.main_image ?? '',
            status: project.status,
            finance_goal: project.finance_goal,
            end_date: project.end_date,
            business_name: project.business_name,
            business_web: project.business_web,
            qualities: project.qualities,
        },
        resolver: zodResolver(projectSchema),
    });

    const handleEditField = (values: Descendant[]) => {
        setContenido(values);
    };

    const proyectDescription = watch('description', project.description ?? '');

    return (
        <>
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
                        {/*TODO: saved proyect in cookies and API*/}
                        <Button>Guardar borrador</Button>
                        {/*TODO: publish product and redirect to product publish success view*/}
                        <Button variant={'solid'}>Publicar producto</Button>
                    </HStack>
                </Container>
            </HStack>

            <Container maxWidth={'container.lg'} paddingTop="7rem" paddingBottom="153px">
                <VStack as="form" align="start" spacing="30px">
                    <Text fontSize={'4xl'} fontWeight="bold">
                        Descripción General de tu producto/servicio
                    </Text>
                    <FormControl id="title" isInvalid={!!errors.title} w={{ base: '100%', md: '50%' }}>
                        <FormLabel>Título del producto/servicio</FormLabel>
                        <Input {...register('title')} />
                    </FormControl>

                    <FormControl id="description" isInvalid={!!errors.description}>
                        <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Descripción del producto/servicio</FormLabel>

                        <Textarea
                            fontSize={{ base: 'sm', md: 'md' }}
                            focusBorderColor={'primary.400'}
                            errorBorderColor={'red.400'}
                            {...register('description')}
                        />

                        <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                            {proyectDescription?.length}/700 caractéres
                        </Text>

                        <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                            {errors.description?.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/*TODO: useCropper for upload image product*/}
                    <FormControl id="main_image" isInvalid={!!errors.main_image}>
                        <FormLabel>
                            Sube una foto representativa del producto/servicio, aparecerá dentro de las tarjetas que
                            inversionistas y público en general podrán ver
                        </FormLabel>

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
                                    const base = await getBase64(e.target.files![0]);
                                    setBaseImg(base);
                                    onCropperOpen();
                                }
                            }}
                        >
                            Arrasta o sube una imagen aquí
                        </UploadButton>
                        <FormErrorMessage fontWeight={'semibold'}>{errors.main_image?.message}</FormErrorMessage>
                    </FormControl>

                    <VStack w={'full'} align="flex-start" spacing="40px">
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} w="full">
                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>¿Cuál es el propósito de tu producto/servicio?</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>

                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>Selecciona los ODS que contribuyes en resolver</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                                <FormHelperText>Máximo 3 ODS</FormHelperText>
                            </FormControl>
                        </Stack>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} w="full">
                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>Medición de impacto***********</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>

                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>Sitio web</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>www.</InputLeftAddon>
                                    <Input {...register('business_web')} />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <FormControl id="main_image" isInvalid={!!errors.main_image}>
                            <FormLabel>
                                Validación del impacto social/medioambiental: Por favor adjunta material que valide la
                                medición de resultados{' '}
                            </FormLabel>

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
                                        const base = await getBase64(e.target.files![0]);
                                        setBaseImg(base);
                                        onCropperOpen();
                                    }
                                }}
                            >
                                Arrasta o sube una imagen aquí
                            </UploadButton>
                            <FormErrorMessage fontWeight={'semibold'}>{errors.main_image?.message}</FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '45%' }}>
                        <FormLabel>Selecciona el respaldo con el que cuentas de una tercera organización</FormLabel>
                        <Select {...register('status')} placeholder="Seleccionar" />
                    </FormControl>

                    <Divider paddingTop={'60px'} />

                    <Text fontSize={'4xl'} fontWeight="bold" pt="60px">
                        Descripción financiera
                    </Text>

                    <VStack w={'full'} align="flex-start" spacing="40px">
                        <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '47%' }}>
                            <FormLabel>¿En qué etapa se encuentra tu producto/servicio?</FormLabel>
                            <Select {...register('status')} placeholder="Seleccionar" />
                        </FormControl>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} w="full">
                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>¿Cuál es el objetivo que tienes para buscar inversión?</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>

                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>¿Cuál es la etapa de levantamiento en la que te encuentras?</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>
                        </Stack>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} alignItems="end" w="full">
                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>Garantías**************</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>

                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>¿Cuál es la rentabilidad que esperas para tu producto/ servicio?</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>
                        </Stack>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} alignItems="end" w="full">
                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>
                                    Por favor selecciona el rango del monto de aporte aproximado que estás buscando{' '}
                                </FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>

                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>Selecciona los plazos de inversión que buscas</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>
                        </Stack>
                        <Stack spacing="60px" direction={{ base: 'column', md: 'row' }} alignItems="end" w="full">
                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>Trayectoria del negocio*************</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
                            </FormControl>

                            <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                                <FormLabel>¿Qué tipo de inversionista buscas?</FormLabel>
                                <Select {...register('status')} placeholder="Seleccionar" />
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

                        <Button onClick={onOpen} variant="solid">
                            Agregar perfil
                        </Button>

                        <Stack w="full" pt="30px">
                            {members.map((member, i) => (
                                <HStack
                                    key={i}
                                    w="full"
                                    spacing="15px"
                                    justifyContent="space-between"
                                    borderBottom="2px"
                                    borderColor="gray.700"
                                    pb="15px"
                                >
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
                                            onClick={() => deleteMember(member.name)}
                                            colorScheme="red"
                                            variant="solid"
                                            w="85px"
                                        >
                                            Eliminar
                                        </Button>
                                        <Button
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
                            ))}
                        </Stack>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Información Complementaria
                        </Text>
                        <FormControl>
                            <FormLabel>
                                Agrega cualquier descripción, comentario, fuente o recurso que consideres necesario para
                                que el inversionista comprenda mejor el proyecto
                            </FormLabel>
                            <FormHelperText>Ejemplo: Aparición en prensa, prospección de mercado etc.</FormHelperText>
                            <SlateEditor
                                handleSaveField={handleEditField}
                                bg="gray.50"
                                color="gray.700"
                                h="300px"
                                mt="15px"
                            />
                        </FormControl>
                    </VStack>

                    <FormControl id="description" isInvalid={!!errors.description}>
                        <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                            Espacio de mejora continua: ¿Cómo crees que tu producto/ servicio podría beneficiarse?
                        </FormLabel>

                        <Textarea
                            fontSize={{ base: 'sm', md: 'md' }}
                            focusBorderColor={'primary.400'}
                            errorBorderColor={'red.400'}
                            {...register('description')}
                        />

                        <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                            {proyectDescription?.length}/700 caractéres
                        </Text>

                        <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                            {errors.description?.message}
                        </FormErrorMessage>
                    </FormControl>
                </VStack>
            </Container>

            <AddMembersModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

// Export
export default Index;
