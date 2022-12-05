//@ts-nocheck
import {
    Avatar,
    forwardRef,
    Grid,
    GridItem,
    HStack,
    Image,
    Link,
    Stack,
    Text,
    VStack,
    Wrap,
    WrapItem,
    Button,
} from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa';
import { GrDocumentPdf } from 'react-icons/gr';
import FinanceGoal from './formatText/financeGoal';
import Garantee from './formatText/garantee';
import Messure from './formatText/messure';
import Objetive from './formatText/objective';
import Rentability from './formatText/rentability';
import Sector from './formatText/sector';
import Stage from './formatText/stage';
import StageCapital from './formatText/stageCapital';
import ThirdParties from './formatText/thirdParties';
import Time from './formatText/time';
import cookies from 'nookies';

const Body = forwardRef<any, any>(({ project, user, orga }, ref) => {
    const { impact, description_finance, other } = ref?.current;
    const adminCookie = cookies.get()[process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!];

    const getInvestorType = () => {
        const lastWord = project?.investment_types?.at(-1);
        const newArray = project?.investment_types?.filter((i) => i !== lastWord);
        const investorTypes = ['Inversor ancla', 'Inversores atomizados', 'Sponsor', 'Minoritarios'];
        const lastInvestor = investorTypes.at(-1);
        const newInvestorTypes = investorTypes.filter((i) => i !== lastInvestor);

        if (lastWord === 'Cualquiera') {
            return newInvestorTypes.join(', ') + ' o ' + lastInvestor;
        }

        if (newArray.length === 0) {
            return lastWord;
        } else {
            return newArray.join(', ') + ' o ' + lastWord;
        }
    };

    return (
        <Stack alignItems="start" pt="90px" pb="150px" px={{ xl: '227px' }} spacing="40px" scrollPaddingTop="100px">
            <Stack pl="27px" pr="30px" spacing="30px">
                <Text scrollMarginTop="100px" ref={impact} fontSize={{ base: '3xl', md: '4xl' }}>
                    El impacto de {project?.organization?.name}
                </Text>
            </Stack>
            {Object.values(project?.qualities || {}).length > 0 && (
                <Stack
                    bg="gray.800"
                    w="full"
                    rounded="16px"
                    py="40px"
                    px={{ base: '24px', md: '35px' }}
                    style={{ marginTop: '30px' }}
                >
                    <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                        ODS que incorpora el proyecto
                    </Text>

                    <Wrap spacingX="60px" spacingY="15px" pt="30px">
                        {Object.values(project?.qualities || {}).map((item, i) => (
                            <WrapItem key={i}>
                                <HStack spacing="20px">
                                    <Image src={item.image} w="60px" h="60px" rounded="15px" />
                                    <Text
                                        fontFamily="inter"
                                        lineHeight="140%"
                                        fontWeight="medium"
                                        fontSize="20px"
                                        color={item.color}
                                    >
                                        {item.name}
                                    </Text>
                                </HStack>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Stack>
            )}

            <VStack pl="27px" pr="27px" align="flex-start" spacing="40px" w="full" pb="20px">
                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400" lineHeight="140%">
                            Sector al cual pertenece
                        </Text>
                        <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                            {Sector(project?.sector)}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400" lineHeight="140%">
                            Como respaldo de una tercera organización, {project?.organization?.name} cuenta con:
                        </Text>
                        <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                            {ThirdParties(project?.third_parties) ?? project?.third_parties}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start" spacing="5px">
                    <Text as="p" fontFamily="inter" fontSize={'md'} color="gray.400">
                        Medición de resultados asociados al impacto social y/o mediambiental
                    </Text>
                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                        {Messure(project?.more_info)}
                    </Text>
                </VStack>

                {project?.social_impact !== 'https://api.gsg-match.com/cuadrado.png' && (
                    <VStack align="flex-start" spacing="5px" w="full">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            {project?.organization?.name} ha presentado un documento en relación a cómo mide su impacto
                        </Text>
                        <Link href={project?.social_impact} target="_blank" w={'full'}>
                            <HStack
                                bg="gray.600"
                                py="20px"
                                px="30px"
                                w="full"
                                rounded="8px"
                                spacing="20px"
                                _hover={{ bg: 'gray.500' }}
                            >
                                <GrDocumentPdf size={30} />
                                <Text>Medición de impacto {project?.organization?.name}</Text>
                            </HStack>
                        </Link>
                    </VStack>
                )}
            </VStack>

            {user || orga?.gsg_project_id === project?.id || adminCookie ? (
                <>
                    <Stack
                        spacing="40px"
                        bg="gray.800"
                        w="full"
                        rounded="16px"
                        py="40px"
                        px={{ base: '24px', md: '35px' }}
                        ref={description_finance}
                        scrollMarginTop="100px"
                    >
                        <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="medium" lineHeight="130%">
                            Descripción financiera de {project?.organization?.name}
                        </Text>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400" lineHeight="140%">
                                    La búsqueda de capital es para:
                                </Text>
                                <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                    {project?.investment_type}
                                </Text>
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400" lineHeight="140%">
                                    La etapa en la cual se encuentra el proyecto:
                                </Text>
                                <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                    {StageCapital(project?.stage)}
                                </Text>
                            </VStack>
                        </VStack>

                        {project?.debt && (
                            <VStack align="flex-start">
                                <VStack align="flex-start" spacing="5px">
                                    <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                        Tipo de financiamiento buscado:
                                    </Text>
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {Stage(project?.debt)}
                                    </Text>
                                </VStack>
                            </VStack>
                        )}

                        {project?.investment_types?.length > 0 && (
                            <VStack align="flex-start">
                                <VStack align="flex-start" spacing="5px">
                                    <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                        El tipo de inversionista que busca es:
                                    </Text>
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {getInvestorType()}
                                    </Text>
                                </VStack>
                            </VStack>
                        )}

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                    El objetivo que tiene con la inversión es:
                                </Text>
                                <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                    {Objetive(project?.investment_objective) ?? project?.investment_objective}
                                </Text>
                            </VStack>
                        </VStack>

                        {project?.capital_stage && (
                            <VStack align="flex-start">
                                <VStack align="flex-start" spacing="5px">
                                    <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                        El levantamiento actual de capital en la cual se encuentra es:
                                    </Text>
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {Stage(project?.capital_stage)}
                                    </Text>
                                </VStack>
                            </VStack>
                        )}

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                    Cuenta con garantías:
                                </Text>
                                <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                    {Garantee(project?.guarantee)}
                                </Text>
                            </VStack>
                        </VStack>

                        {project?.expected_rentability && (
                            <VStack align="flex-start">
                                <VStack align="flex-start" spacing="5px">
                                    <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                        La rentabilidad que {project?.organization.name} espera obtener es:
                                    </Text>
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {Rentability(project?.expected_rentability)}
                                    </Text>
                                </VStack>
                            </VStack>
                        )}

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                    El rango de monto del aporte que se busca es:
                                </Text>
                                <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                    {FinanceGoal(project?.finance_goal)} (CLP)
                                </Text>
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                    Umbral de rentabilidad o Break Even Point proyectado:
                                </Text>
                                <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                    {project?.rentability_time ?? 0} {project?.rentability_time !== 1 ? 'Meses' : 'Mes'}
                                </Text>
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" lineHeight="140%" fontSize="md" color="gray.400">
                                    En relación a los plazos de inversión, {project?.organization?.name} buscaría un
                                    plazo de:
                                </Text>
                                <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                    {Time(project?.time_lapse)}
                                </Text>
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" lineHeight="140%" fontSize="md" color="gray.400">
                                    Ventas en los últimos 12 meses:
                                </Text>
                                {project?.business_model?.split(';;')[0] !== 'No deseo entregar esta información' ? (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {new Intl.NumberFormat('es-CL', {
                                            style: 'currency',
                                            currency: 'CLP',
                                            minimumFractionDigits: 0,
                                        }).format(project?.business_model?.split(';;')[0] ?? 0)}
                                    </Text>
                                ) : (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        La empresa no desea entregar esta información
                                    </Text>
                                )}
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" lineHeight="140%" fontSize="md" color="gray.400">
                                    Ventas en los últimos 6 meses:
                                </Text>
                                {project?.business_model?.split(';;')[1] !== 'No deseo entregar esta información' ? (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {new Intl.NumberFormat('es-CL', {
                                            style: 'currency',
                                            currency: 'CLP',
                                            minimumFractionDigits: 0,
                                        }).format(project?.business_model?.split(';;')[1] ?? 0)}
                                    </Text>
                                ) : (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        La empresa no desea entregar esta información
                                    </Text>
                                )}
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" lineHeight="140%" fontSize="md" color="gray.400">
                                    Clientes en los últimos 12 meses:
                                </Text>
                                {project?.business_model?.split(';;')[2] !== 'No deseo entregar esta información' ? (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {new Intl.NumberFormat('es-CL', {
                                            minimumFractionDigits: 0,
                                        }).format(project?.business_model?.split(';;')[2] ?? 0)}
                                    </Text>
                                ) : (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        La empresa no desea entregar esta información
                                    </Text>
                                )}
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" lineHeight="140%" fontSize="md" color="gray.400">
                                    Clientes en los últimos 6 meses:
                                </Text>
                                {project?.business_model?.split(';;')[3] !== 'No deseo entregar esta información' ? (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {new Intl.NumberFormat('es-CL', {
                                            minimumFractionDigits: 0,
                                        }).format(project?.business_model?.split(';;')[3] ?? 0)}
                                    </Text>
                                ) : (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        La empresa no desea entregar esta información
                                    </Text>
                                )}
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" lineHeight="140%" fontSize="md" color="gray.400">
                                    EBITDA
                                </Text>
                                {project?.business_model?.split(';;')[4] !== 'No deseo entregar esta información' ? (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {new Intl.NumberFormat('es-CL', {
                                            style: 'currency',
                                            currency: 'CLP',
                                            minimumFractionDigits: 0,
                                        }).format(project?.business_model?.split(';;')[4] ?? 0)}
                                    </Text>
                                ) : (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        La empresa no desea entregar esta información
                                    </Text>
                                )}
                            </VStack>
                        </VStack>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" lineHeight="140%" fontSize="md" color="gray.400">
                                    Deuda/ Patrimonio
                                </Text>
                                {project?.business_model?.split(';;')[5] !== 'No deseo entregar esta información' ? (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        {new Intl.NumberFormat('es-CL', {
                                            style: 'currency',
                                            currency: 'CLP',
                                            minimumFractionDigits: 0,
                                        }).format(project?.business_model?.split(';;')[5] ?? 0)}
                                    </Text>
                                ) : (
                                    <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                        La empresa no desea entregar esta información
                                    </Text>
                                )}
                            </VStack>
                        </VStack>
                    </Stack>

                    <Stack pl="27px" spacing="27px" w="full" ref={other} scrollMarginTop="100px">
                        <Text ref={other} fontSize={{ base: '3xl', md: '4xl' }} fontWeight="medium">
                            Otra información relevante
                        </Text>

                        <VStack align="flex-start" spacing="5px" w="full">
                            <Text fontSize="3xl">Equipo</Text>
                            <Grid
                                w="full"
                                placeContent="space-between"
                                placeItems="start"
                                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
                                gap="50px"
                            >
                                {project?.members
                                    ? Object.values(project?.members || {}).map((member, i) => (
                                          <GridItem key={i}>
                                              <Stack spacing="10px" p={0}>
                                                  <Avatar src={member.main_image} w="96px" h="96px" />
                                                  <VStack align="flex-start" spacing="5px">
                                                      <Text color="gray.50" fontSize="xl" fontWeight="medium">
                                                          {member.name}
                                                      </Text>
                                                      <Text color="gray.500" fontSize="15px">
                                                          {member.position}
                                                      </Text>
                                                  </VStack>
                                                  {member.linkedin && (
                                                      <Link href={member.linkedin} target="_blank" w="fit-content">
                                                          <FaLinkedin size={30} />
                                                      </Link>
                                                  )}
                                              </Stack>
                                          </GridItem>
                                      ))
                                    : 'No hay equipos registrados'}
                            </Grid>
                        </VStack>
                    </Stack>

                    <Stack pl="27px" pr="27px" spacing="40px">
                        <VStack align="flex-start" spacing="5px">
                            <Text as="p" fontSize="3xl">
                                Información complementaria
                            </Text>

                            <Text as="p" fontSize="16px" fontFamily="inter" lineHeight="140%">
                                {project?.additional_info
                                    ? project?.additional_info?.includes('[')
                                        ? 'Sin información'
                                        : project?.additional_info
                                    : 'Sin información'}
                            </Text>
                        </VStack>

                        {project?.additional_document !== 'https://api.gsg-match.com/cuadrado.png' && (
                            <VStack align="flex-start" spacing="5px" w="full">
                                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                                    {project?.organization?.name} ha presentado un documento complementario para que
                                    puedas verlo
                                </Text>
                                <Link href={project?.additional_document} target="_blank" w="full">
                                    <HStack
                                        bg="gray.600"
                                        py="20px"
                                        px="30px"
                                        w="full"
                                        rounded="8px"
                                        spacing="20px"
                                        _hover={{ bg: 'gray.500' }}
                                    >
                                        <GrDocumentPdf size={30} />
                                        <Text>Documento complementario {project?.organization?.name}</Text>
                                    </HStack>
                                </Link>
                            </VStack>
                        )}
                    </Stack>

                    <Stack pl="27px" pr="27px" spacing="27px">
                        <VStack align="flex-start" spacing="5px">
                            <Text as="p" fontSize="3xl">
                                Espacios de mejora continua
                            </Text>
                            <Text as="p" fontSize="16px" fontFamily="inter" lineHeight="140%">
                                {project?.better_project ?? 'Sin información'}
                            </Text>
                        </VStack>
                    </Stack>
                </>
            ) : (
                <Stack pos="relative">
                    <Stack
                        spacing="40px"
                        bg="gray.800"
                        w="full"
                        rounded="16px"
                        py="40px"
                        px={{ base: '24px', md: '35px' }}
                        ref={description_finance}
                        scrollMarginTop="100px"
                    >
                        <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="medium" lineHeight="130%">
                            Descripción financiera de {project?.organization?.name}
                        </Text>

                        <VStack align="flex-start">
                            <VStack align="flex-start" spacing="5px">
                                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400" lineHeight="140%">
                                    La búsqueda de capital es para:
                                </Text>
                                <Text as="p" fontSize={{ base: '20px', md: '24px' }} fontWeight="medium">
                                    {project?.investment_type}
                                </Text>
                            </VStack>
                        </VStack>

                        <Stack
                            pos="absolute"
                            h="500px"
                            bg="gray.800"
                            inset={0}
                            top={{
                                base:
                                    project?.organization?.name.length < 10
                                        ? '80px'
                                        : project?.organization?.name.length < 20
                                        ? '120px'
                                        : '150px',
                                sm: '80px',
                                md: '90px',
                            }}
                            align="center"
                            justify="center"
                            spacing="30px"
                            opacity="0.9"
                        >
                            <VStack maxW="348px" spacing="10px">
                                <Text fontSize="36px" fontWeight="500" lineHeight="32px">
                                    ¿Eres inversionista?
                                </Text>
                                <Text textAlign="center" fontFamily="inter" fontSize="16px" lineHeight="22.4px">
                                    Solicita tu invitación aquí para registrarte y ver toda la información de la empresa
                                </Text>
                            </VStack>

                            <VStack maxW="348px" spacing="15px">
                                <Link href="mailto:contacto@gsg-match.com?Subject=Solicitud%20nuevo%20inversionista">
                                    <Button variant="solid" h="40px">
                                        Solicitar invitación
                                    </Button>
                                </Link>
                                <Link href="https://www.inversiondeimpacto.cl/match" target="_blank">
                                    <Button
                                        variant="unstyled"
                                        borderBottom="2px"
                                        borderColor="gray.50"
                                        rounded="none"
                                        h="fit-content"
                                        fontFamily="inter"
                                        fontSize="16px"
                                    >
                                        Saber más
                                    </Button>
                                </Link>
                            </VStack>
                        </Stack>
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
});

export default Body;
