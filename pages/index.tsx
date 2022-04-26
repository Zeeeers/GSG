// Dependencies
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
    Flex,
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

// Page
const Index: NextPage = () => {
    const [baseImg, setBaseImg] = useState<string>();
    const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const project = useCreateGsgProjectStore((s) => s.project);
    const members = useCreateGsgProjectStore((s) => s.members);
    const setMember = useCreateGsgProjectStore((s) => s.setMember);
    const deleteMember = useCreateGsgProjectStore((s) => s.deleteMember);

    const {
        register,
        formState: { errors },
        handleSubmit,
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

    const proyectDescription = watch('description', project.description ?? '');

    return (
        <>
            <Container maxWidth={'container.lg'} paddingBottom="153px">
                <HStack justifyContent="space-between">
                    <Text fontSize="3xl" fontWeight="medium">
                        Creador de proyecto
                    </Text>
                    <HStack spacing="8px">
                        <Button>Guardar borrador</Button>
                        <Button variant={'solid'}>Publicar proyecto</Button>
                    </HStack>
                </HStack>

                <VStack as="form" align="start" spacing="30px">
                    <FormControl id="title" isInvalid={!!errors.title} w={{ base: '100%', md: '50%' }}>
                        <FormLabel>Título del proyecto</FormLabel>
                        <Input {...register('title')} />
                    </FormControl>

                    <FormControl id="description" isInvalid={!!errors.description}>
                        <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Descripción del proyecto</FormLabel>

                        <Textarea
                            fontSize={{ base: 'sm', md: 'md' }}
                            focusBorderColor={'primary.400'}
                            errorBorderColor={'red.400'}
                            {...register('description')}
                        />

                        <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                            {proyectDescription?.length}/300 caractéres
                        </Text>

                        <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                            {errors.description?.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="main_image" isInvalid={!!errors.main_image}>
                        <FormLabel>
                            Sube una foto representativa del proyecto, aparecerá dentro de las tarjetas que
                            inversionistas y público en general podrán ver
                        </FormLabel>

                        <Input type="hidden" {...register('main_image')} />
                        <UploadButton
                            variant="outline"
                            w="full"
                            h="300px"
                            colorScheme="basic"
                            fontWeight="bold"
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

                    <FormControl id="status" isInvalid={!!errors.status} w={{ base: '100%', md: '50%' }}>
                        <FormLabel>¿En qué etapa de levantamiento te encuentras?</FormLabel>
                        <Select {...register('status')} placeholder="Seleccionar" />
                    </FormControl>

                    <VStack w={{ base: '100%', md: '50%' }} align="flex-start" spacing="20px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Levantamiento de capital
                        </Text>
                        <Stack spacing="25px" direction={{ base: 'column', md: 'row' }} w="full">
                            <FormControl id="finance_goal" isInvalid={!!errors.finance_goal}>
                                <FormLabel>Capital a levantar</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children="$" />
                                    <Input {...register('finance_goal')} type="number" />
                                </InputGroup>
                                <FormHelperText>Ingresa el monto</FormHelperText>
                            </FormControl>

                            <FormControl id="end_date" isInvalid={!!errors.end_date}>
                                <FormLabel>Fecha de término </FormLabel>
                                <Input {...register('end_date')} />
                                <FormHelperText>Para la búsqueda de levantamiento</FormHelperText>
                            </FormControl>
                        </Stack>
                        <Stack spacing="25px" direction={{ base: 'column', md: 'row' }} w="full">
                            <FormControl id="business_name" isInvalid={!!errors.business_name}>
                                <FormLabel>Nombre de tu empresa</FormLabel>
                                <Input {...register('business_name')} />
                            </FormControl>
                            <FormControl id="business_web" isInvalid={!!errors.business_web}>
                                <FormLabel>Sitio web</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children="www." />
                                    <Input {...register('business_web')} />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Acerca de tu proyecto
                        </Text>
                        <FormControl>
                            <FormLabel>De manera más detallada cuéntanos respecto a tu proyecto</FormLabel>
                            <SlateEditor />
                        </FormControl>
                    </VStack>

                    <VStack w={{ base: '100%', md: '50%' }} align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Impacto
                        </Text>
                        <FormControl id="qualities" isInvalid={!!errors.qualities}>
                            <FormLabel>
                                Selecciona los ODS que contribuyes en resolver a través de tu solución
                            </FormLabel>
                            <SelectOds />
                        </FormControl>
                    </VStack>

                    <VStack w="full" align="flex-start" spacing="40px">
                        <Text fontSize="2xl" fontWeight="medium">
                            5 dimensiones de impacto
                        </Text>
                        <HStack w="full" justifyContent="space-between">
                            <Tag
                                size="lg"
                                variant="subtle"
                                colorScheme="red"
                                borderRadius="16px"
                                fontSize="20px"
                                lineHeight="32px"
                                p="10px"
                                w="107px"
                            >
                                <TagLeftIcon boxSize="27px" as={CgShapeSquare} />
                                <TagLabel>Qué</TagLabel>
                            </Tag>
                            <FormControl w="70%">
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                    Describe del “Qué” de tu proyecto
                                </FormLabel>

                                <Textarea
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    {...register('description')}
                                    focusBorderColor={'primary.400'}
                                    errorBorderColor={'red.400'}
                                />

                                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                    {proyectDescription?.length}/300 caractéres
                                </Text>

                                <FormErrorMessage
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    fontWeight="medium"
                                    color="red.400"
                                >
                                    {errors.description?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </HStack>

                        <HStack w="full" justifyContent="space-between">
                            <Tag
                                size="lg"
                                variant="subtle"
                                colorScheme="green"
                                borderRadius="16px"
                                fontSize="18px"
                                lineHeight="32px"
                                p="10px"
                                w="127px"
                            >
                                <TagLeftIcon boxSize="27px" as={CgShapeCircle} />
                                <TagLabel>Quién</TagLabel>
                            </Tag>
                            <FormControl w="70%">
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                    Describe del “Quién” de tu proyecto
                                </FormLabel>

                                <Textarea
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    focusBorderColor={'primary.400'}
                                    errorBorderColor={'red.400'}
                                />

                                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                    {proyectDescription?.length}/300 caractéres
                                </Text>

                                <FormErrorMessage
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    fontWeight="medium"
                                    color="red.400"
                                >
                                    {errors.description?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </HStack>

                        <HStack w="full" justifyContent="space-between">
                            <Tag
                                size="lg"
                                variant="subtle"
                                colorScheme="cyan"
                                borderRadius="16px"
                                fontSize="18px"
                                lineHeight="32px"
                                p="10px"
                                w="143px"
                            >
                                <TagLeftIcon boxSize="27px" as={CgSortAz} />
                                <TagLabel>Cuanto</TagLabel>
                            </Tag>
                            <FormControl w="70%">
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                    Describe el “Cuánto” de tu proyecto
                                </FormLabel>

                                <Textarea
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    focusBorderColor={'primary.400'}
                                    errorBorderColor={'red.400'}
                                />

                                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                    {proyectDescription?.length}/300 caractéres
                                </Text>

                                <FormErrorMessage
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    fontWeight="medium"
                                    color="red.400"
                                >
                                    {errors.description?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </HStack>

                        <HStack w="full" justifyContent="space-between">
                            <Tag
                                size="lg"
                                variant="subtle"
                                colorScheme="purple"
                                borderRadius="16px"
                                fontSize="18px"
                                lineHeight="32px"
                                p="10px"
                                w="210px"
                            >
                                <TagLeftIcon boxSize="27px" as={BsPlus} />
                                <TagLabel>Contribución</TagLabel>
                            </Tag>
                            <FormControl w="70%">
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                    Describe la ”contribución” de tu proyecto
                                </FormLabel>

                                <Textarea
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    focusBorderColor={'primary.400'}
                                    errorBorderColor={'red.400'}
                                />

                                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                    {proyectDescription?.length}/300 caractéres
                                </Text>

                                <FormErrorMessage
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    fontWeight="medium"
                                    color="red.400"
                                >
                                    {errors.description?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </HStack>

                        <HStack w="full" justifyContent="space-between">
                            <Tag
                                size="lg"
                                variant="subtle"
                                colorScheme="yellow"
                                borderRadius="16px"
                                fontSize="18px"
                                lineHeight="32px"
                                p="10px"
                                w="157px"
                            >
                                <TagLeftIcon boxSize="27px" as={CgShapeTriangle} />
                                <TagLabel>Riesgos</TagLabel>
                            </Tag>
                            <FormControl w="70%">
                                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                    Describe los “riesgos” de tu proyecto
                                </FormLabel>

                                <Textarea
                                    fontSize={{ base: 'sm', md: 'md' }}
                                    focusBorderColor={'primary.400'}
                                    errorBorderColor={'red.400'}
                                />

                                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                    {proyectDescription?.length}/300 caractéres
                                </Text>

                                <FormErrorMessage
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    fontWeight="medium"
                                    color="red.400"
                                >
                                    {errors.description?.message}
                                </FormErrorMessage>
                            </FormControl>
                        </HStack>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Problema
                        </Text>
                        <FormControl id="description" isInvalid={!!errors.description}>
                            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                Describe el problema que actualmente estás buscando solucionar
                            </FormLabel>

                            <Textarea
                                fontSize={{ base: 'sm', md: 'md' }}
                                focusBorderColor={'primary.400'}
                                errorBorderColor={'red.400'}
                            />

                            <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                {proyectDescription?.length}/300 caractéres
                            </Text>

                            <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Solución
                        </Text>
                        <FormControl id="description" isInvalid={!!errors.description}>
                            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                Describe cómo resuelves esa problemática comentada en la pregunta anterior del proyecto
                            </FormLabel>

                            <Textarea
                                fontSize={{ base: 'sm', md: 'md' }}
                                focusBorderColor={'primary.400'}
                                errorBorderColor={'red.400'}
                            />

                            <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                {proyectDescription?.length}/300 caractéres
                            </Text>

                            <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Información Complementaria
                        </Text>
                        <FormControl id="description" isInvalid={!!errors.description}>
                            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                Agrega cualquier descripción, comentario, fuente o recurso que consideres necesario para
                                que el inversionista comprenda mejor el proyecto
                            </FormLabel>
                            <FormHelperText>Ejemplo: Aparición en prensa, prospección de mercado etc.</FormHelperText>
                            <Textarea
                                fontSize={{ base: 'sm', md: 'md' }}
                                focusBorderColor={'primary.400'}
                                errorBorderColor={'red.400'}
                            />

                            <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                {proyectDescription?.length}/300 caractéres
                            </Text>

                            <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Finanzas
                        </Text>
                        <FormControl id="description" isInvalid={!!errors.description}>
                            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                Sube un documento con tu estado financiero actual. (PDF o Excel)
                            </FormLabel>

                            <Textarea
                                fontSize={{ base: 'sm', md: 'md' }}
                                focusBorderColor={'primary.400'}
                                errorBorderColor={'red.400'}
                            />

                            <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                {proyectDescription?.length}/300 caractéres
                            </Text>

                            <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Modelo de negocios
                        </Text>
                        <FormControl id="description" isInvalid={!!errors.description}>
                            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>xxx</FormLabel>

                            <Textarea
                                fontSize={{ base: 'sm', md: 'md' }}
                                focusBorderColor={'primary.400'}
                                errorBorderColor={'red.400'}
                            />

                            <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                {proyectDescription?.length}/300 caractéres
                            </Text>

                            <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Uso de ingresos
                        </Text>
                        <FormControl id="description" isInvalid={!!errors.description}>
                            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                Describe cómo realizarás la distribución del capital que buscas obtener en las
                                diferentes áreas de tu negocio.
                            </FormLabel>

                            <Textarea
                                fontSize={{ base: 'sm', md: 'md' }}
                                focusBorderColor={'primary.400'}
                                errorBorderColor={'red.400'}
                            />

                            <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                {proyectDescription?.length}/300 caractéres
                            </Text>

                            <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

                    <VStack w="100%" align="flex-start" spacing="10px">
                        <Text fontSize="2xl" fontWeight="medium">
                            Oportunidad de inversión
                        </Text>
                        <FormControl id="description" isInvalid={!!errors.description}>
                            <FormLabel fontSize={{ base: 'sm', md: 'md' }}>
                                ¿Cuál es el tamaño del mercado al que apuntas? ¿Por qué el inversor debería invertir
                                ahora en ti? ¿Cuánto se multiplicaría su inversión y en cuánto tiempo?
                            </FormLabel>

                            <Textarea
                                fontSize={{ base: 'sm', md: 'md' }}
                                focusBorderColor={'primary.400'}
                                errorBorderColor={'red.400'}
                            />

                            <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="gray.400">
                                {proyectDescription?.length}/300 caractéres
                            </Text>

                            <FormErrorMessage fontSize={{ base: 'xs', md: 'sm' }} fontWeight="medium" color="red.400">
                                {errors.description?.message}
                            </FormErrorMessage>
                        </FormControl>
                    </VStack>

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
                </VStack>
            </Container>

            <AddMembersModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

// Export
export default Index;
