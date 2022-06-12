import {
  Image,
  Button,
  Box,
  Input,
  Text,
  ScrollView,
  useToast,
} from "native-base";
import { StyleSheet, useWindowDimensions, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/NSALLlogo.png";
import { socket } from "../../Helpers/socket";
import { StoreContext } from "../../Store/StoreContext";
import ToastMsg from "../Modals/ToastMsg";

const LoginPage = ({ navigation, onPress }) => {
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();

  const { storeCtx } = useContext(StoreContext);
  const [store, setStore] = storeCtx;
  const [wrong, setWrong] = useState(false);

  const sendToast=({title,desc,stat})=>{
    toast.show({
      render: () => (
        <ToastMsg
          title={title}
          desc={desc}
          stat={stat}
        />
      ),
      placement: "bottom",
    });
  }

  const onSignUp = () => {
    navigation.navigate("Register")
  }
  const handleLogin = () => {
    socket.emit("login", { username: username, password: password });
  };
  const handleWrong = () => {
    sendToast({title:"Account not found on database!",desc:"Please Check Your Credentials",stat:"F"})
  };
  useEffect(() => {
    socket.on("login-return", ({ status_, userInfo }) => {
      if (status_ == "S") {
        setStore({ ...store, userInfo });
        navigation.reset({
          index: 0,
          routes: [{ name: "Interface" }],
        });
        sendToast({title:"Success!",desc:"Logged in as"+userInfo.name+"!",stat:"S"})
        return;
      }
      handleWrong();
    });

    return ()=> socket.off("login-return")
  }, []);

  return (
    // <ScrollView
    //   showsVerticalScrollIndicator={false}
    //   contentContainerStyle={{ flexGrow: 1 }}
    // >
      <Box style={styles.root} safeArea justifyContent={"center"}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.2 }]}
          resizeMode="contain"
          alt="logo"
        />
        <Input
          placeholder="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
          mt={2}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          mt={2}
        />
        {wrong && <Text color={"red.600"}>Wrong Information!</Text>}
        <Button onPress={handleLogin} style={styles.button1}>
          <Text style={styles.text1}>Log In</Text>
        </Button>

      
        <Button
          onPress={() => {
            handleLogin();
          }}
          mt={2}
        >
          Navigate into app
        </Button>
      </Box>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%",
    borderRadius: 10,
  },
  button1: {
    backgroundColor: "#3B71F3",
    width: "60%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  button2: {
    backgroundColor: "#F9FBFC",
    width: "60%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  button3: {
    backgroundColor: "#FAE9EA",
    width: "60%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  button4: {
    backgroundColor: "#E7EAF4",
    width: "60%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },

  text1: {
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    fontWeight: "bold",
    color: "grey",
  },
  text3: {
    fontWeight: "bold",
    color: "#DD4D44",
  },
  text4: {
    fontWeight: "bold",
    color: "#4765A9",
  },
  text5: {
    fontWeight: "bold",
    color: "black",
  },
});
export default LoginPage;
