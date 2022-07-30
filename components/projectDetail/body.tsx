//@ts-nocheck
import {
    Avatar,
    forwardRef,
    Grid,
    GridItem,
    HStack,
    Icon,
    Img,
    Link,
    Stack,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { GrDocumentPdf } from 'react-icons/gr';
import { Gsg } from 'services/api/types/Gsg';
import { HiHeart } from 'react-icons/hi';
import { FaLinkedin } from 'react-icons/fa';

const Body = forwardRef<any, any>(({ project }, ref) => {
    const { impact, description_finance, other } = ref?.current;

    const members = [
        {
            name: 'Nicolás henríquez',
            position: 'Gerente general',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        },
        {
            name: 'Nicolás henríquez',
            position: 'Gerente general',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        },
    ];
    return (
        <Stack
            alignItems="start"
            mt="5rem"
            px={{ base: '34px', md: '227px' }}
            spacing="50px"
            py="207px"
            scrollPaddingTop="100px"
        >
            <Stack pl="27px" pr="30px" spacing="30px">
                <Text scrollMarginTop="100px" ref={impact} fontSize="4xl">
                    El impacto de {project?.business_name}
                </Text>
            </Stack>

            <Stack bg="gray.800" w="full" rounded="16px" py="40px" px={{ base: '24px', md: '35px' }}>
                <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                    ODS que incorpora el producto/servicio
                </Text>

                <Wrap spacingX="60px" spacingY="30px">
                    {Object.values(project.qualities || {}).map((item) => (
                        <WrapItem>
                            <HStack spacing="20px" pt="15px">
                                <Stack p="15px" bg="green.600" rounded="15px">
                                    <Icon w={10} h={10} color="gray.50" as={HiHeart} />
                                </Stack>
                                <Text
                                    fontWeight="medium"
                                    fontSize="20px"
                                    color="#279B48
"
                                >
                                    {item.name}
                                </Text>
                            </HStack>
                        </WrapItem>
                    ))}
                </Wrap>
            </Stack>

            <VStack pl="27px" pr="27px" align="flex-start" spacing="40px" w="full">
                <VStack align="flex-start" spacing="5px">
                    <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                        Medición de resultados asociados al impacto social y/o mediambiental
                    </Text>
                    <Text as="p" fontSize="24px" fontWeight="medium">
                        {project.more_info}
                    </Text>
                </VStack>

                {project.social_impact !== 'https://dev-api.skalachile.com/cuadrado.png' && (
                    <VStack align="flex-start" spacing="5px" w="full">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            Northstar SpA ha presentado un documento en relación a cómo mide su impacto
                        </Text>
                        <HStack bg="gray.600" py="20px" px="30px" w="full" rounded="8px" spacing="20px">
                            <GrDocumentPdf size={30} />
                            <Text>Medición de impacto Northstar SpA</Text>
                        </HStack>
                    </VStack>
                )}

                <VStack align="flex-start" spacing="5px">
                    <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                        Como respaldo de una tercera organización, Northstar SpA cuenta con:
                    </Text>
                    <Text as="p" fontSize="24px" fontWeight="medium">
                        {project.third_parties}
                    </Text>
                </VStack>
            </VStack>

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
                <Text fontSize="4xl" fontWeight="medium">
                    Descripción financiera de {project?.business_name}
                </Text>
                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            Como respaldo de una tercera organización, Northstar SpA cuenta con:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.third_parties}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            El objetivo que tiene con la inversión es:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.investment_objective}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            El levantamiento actual de capital en la cual se encuentra es:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.capital_stage}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            Cuenta con garantías:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.guarantee}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            La rentabilidad que Northstar SpA espera obtener es:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.expected_rentability}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            El rango de monto del aporte que se busca es:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.finance_goal}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            En relación a los plazos de inversión, Northstar SpA buscaría un plazo de:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.time_lapse}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            La trayectoria del negocio es:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.business_model}
                        </Text>
                    </VStack>
                </VStack>

                <VStack align="flex-start">
                    <VStack align="flex-start" spacing="5px">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            El tipo de inversionista que busca es:
                        </Text>
                        <Text as="p" fontSize="24px" fontWeight="medium">
                            {project.investment_types}
                        </Text>
                    </VStack>
                </VStack>
            </Stack>

            <Stack pl="27px" spacing="27px" w="full" ref={other} scrollMarginTop="100px">
                <Text ref={other} fontSize="4xl" fontWeight="medium">
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
                            ? Object.values(project?.members | {}).map((member, i) => (
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

                                          <Link href={member.linkedin} target="_blank" w="fit-content">
                                              <FaLinkedin size={30} />
                                          </Link>
                                      </Stack>
                                  </GridItem>
                              ))
                            : 'No hay equipos registrados'}
                    </Grid>
                </VStack>
            </Stack>

            <Stack pl="27px" pr="27px" spacing="27px">
                <VStack align="flex-start" spacing="5px">
                    <Text as="p" fontSize="3xl">
                        Espacios de mejora continua
                    </Text>
                    <Text as="p" fontSize="16px">
                        {project.better_project}
                    </Text>
                </VStack>
            </Stack>

            <Stack pl="27px" pr="27px" spacing="60px">
                <VStack align="flex-start" spacing="5px">
                    <Text as="p" fontSize="3xl">
                        Información complementaria
                    </Text>
                    <Text as="p" fontSize="16px">
                        Históricamente, la clase de activos de capital de riesgo ha sido dominio exclusivo de las
                        empresas de capital de riesgo, los inversores profesionales y las personas de alto patrimonio
                        neto.
                    </Text>
                    <Img src={project?.main_image} w="615px" h="219px" objectFit="cover" objectPosition="center" />
                </VStack>

                {project.additional_document !== 'https://dev-api.skalachile.com/cuadrado.png' && (
                    <VStack align="flex-start" spacing="5px" w="full">
                        <Text as="p" fontFamily="inter" fontSize="md" color="gray.400">
                            Northstar SpA ha presentado un documento complementario para que puedas verlo
                        </Text>
                        <HStack bg="gray.600" py="20px" px="30px" w="full" rounded="8px" spacing="20px">
                            <GrDocumentPdf size={30} />
                            <Text>Medición de impacto Northstar SpA</Text>
                        </HStack>
                    </VStack>
                )}
            </Stack>
        </Stack>
    );
});

export default Body;
