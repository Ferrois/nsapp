import {
  AspectRatio,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useContext } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StoreContext } from "../../Store/StoreContext";

export default function Profile({ navigation }) {
  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;

  return (
    <ScrollView>
      <Box
        flex={1}
        safeArea
        bg={{
          linearGradient: {
            colors: ["red.600", "orange.400"],
            start: [1, 0.3],
            end: [0, 0],
          },
        }}
      >
        {/* <ScrollView> */}
        <Center flex={1}>
          <Animated.View entering={FadeInDown}>
            <Center>
              <Text
                fontSize={"3xl"}
                mb="4"
                fontFamily={"Poppins"}
                color="white"
              >
                Profile
              </Text>
              <Image
                size={120}
                resizeMode={"contain"}
                borderRadius={100}
                source={{
                  uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
                alt="Alternate Text"
              />
              <Text fontSize={"xl"} color="white" fontFamily={"Poppins"}>
                {store.userInfo.name}
              </Text>
            </Center>
          </Animated.View>
          <Animated.View
            entering={FadeInDown}
            style={{ flex: 1, width: "100%" }}
          >
            <Box
              bg={"light.100"}
              w="100%"
              mt="2"
              flex={1}
              borderTopRadius="xl"
              p="2"
            >
              <VStack>
                <HStack space={"2"}>
                  <AspectRatio ratio={2.5} flex={0.5}>
                    <Button
                      onPress={() => navigation.navigate("Settings")}
                      bg={"gray.700"}
                      flex={1}
                    >
                      <Icon
                        as={Ionicons}
                        name="settings-outline"
                        size={50}
                        color={"gray.300"}
                      />
                    </Button>
                  </AspectRatio>
                  <AspectRatio ratio={2.5} flex={0.5}>
                    <Button
                      onPress={() => navigation.navigate("Settings")}
                      bg={"gray.700"}
                      flex={1}
                    >
                      <Icon
                        as={Ionicons}
                        name="settings-outline"
                        size={50}
                        color={"gray.300"}
                      />
                    </Button>
                  </AspectRatio>
                </HStack>
                <Box
                  bg={"coolGray.300"}
                  rounded={"2xl"}
                  p="4"
                  mt={"2"}
                  shadow={"9"}
                >
                  <Text
                    color={"yellow.600"}
                    fontSize={"3xl"}
                    fontFamily="Poppins"
                  >
                    Medical History
                  </Text>
                  <HStack flexWrap={"wrap"}>
                    {store.userInfo.medicalHist
                      ? store.userInfo.medicalHist.map(
                          ({ disease, has, severity }) => {
                            return (
                              <AspectRatio ratio={1} h={"40"} key={disease}>
                                <Box
                                  bg={"gray.400"}
                                  m="1"
                                  p="2"
                                  borderRadius={"xl"}
                                >
                                  <Text fontFamily={"Poppins"} fontSize={"lg"}>{disease}</Text>
                                  <Text>Ongoing: {JSON.stringify(has)}</Text>
                                  <Text>Severity: {severity}</Text>
                                </Box>
                              </AspectRatio>
                            );
                          }
                        )
                      : "Null"}
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </Animated.View>
        </Center>
        {/* </ScrollView> */}
      </Box>
    </ScrollView>
  );
}
