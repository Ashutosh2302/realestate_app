import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "../../utils/fetchApi";
import { PropertyType } from "../../types";
import Carousel from "react-multi-carousel";
import Image from "next/image";

interface Props {
  propertyDetails: PropertyType;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const PropertyDetails: React.FC<Props> = ({ propertyDetails }) => {
  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  } = propertyDetails;

  return (
    <Box>
      <Box
        width={{ sm: "20rem", md: "35rem", lg: "40rem" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        margin="2rem auto 4rem auto"
      >
        {photos && (
          <Carousel
            keyBoardControl
            autoPlay
            autoPlaySpeed={2000}
            responsive={responsive}
            showDots
            rewind
            pauseOnHover
          >
            {photos.map((image) => (
              <Box
                key={image.id}
                display="flex"
                justifyContent="center"
                margin="2rem 5rem"
              >
                <Image src={image.url} alt="photo" width={500} height={360} />
              </Box>
            ))}
          </Carousel>
        )}
      </Box>

      <Box w="full" p="6">
        <Flex paddingTop="2" alignItems="center">
          <Box paddingRight="3" color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            AED {price} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar size="sm" src={agency?.logo?.url}></Avatar>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms}
          <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </Flex>
      </Box>
      <Box marginTop="2" padding="6">
        <Text fontSize="lg" marginBottom="2" fontWeight="bold">
          {title}
        </Text>
        <Text lineHeight="2" color="gray.600">
          {description}
        </Text>
      </Box>
      <Flex
        flexWrap="wrap"
        textTransform="uppercase"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Type</Text>
          <Text fontWeight="bold">{type}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Furnishing Status</Text>
            <Text fontWeight="bold">{furnishingStatus}</Text>
          </Flex>
        )}
      </Flex>
      <Box padding="6">
        {amenities.length && (
          <Text fontSize="2xl" fontWeight="black" marginTop="5">
            Facilites:
          </Text>
        )}
        <Flex flexWrap="wrap">
          {amenities?.map((item) =>
            item?.amenities?.map((amenity) => (
              <Text
                key={amenity.text}
                fontWeight="bold"
                color="blue.400"
                fontSize="l"
                p="2"
                bg="gray.200"
                m="1"
                borderRadius="5"
              >
                {amenity.text}
              </Text>
            ))
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: String };
}) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
