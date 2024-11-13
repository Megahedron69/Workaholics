import type { FC } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";

import { EmailAndPassInput } from "../Components/FormComponents";
const { height, width } = Dimensions.get("screen");
const scale = width / 375;

const getResponsiveFontSize = (size: number) => {
  return size * scale;
};

type AuthScreenParams = {
  SignIn: {
    heading: string;
    isSignIn: boolean;
  };
};

const LoginScreen: FC = () => {
  const route = useRoute<RouteProp<AuthScreenParams, "SignIn">>();
  const { heading, isSignIn } = route.params;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/AuthBg.png")}
        style={styles.container}
        resizeMode="cover"
        imageStyle={styles.container}
      >
        <View style={styles.emailCont}>
          <Text style={styles.heading}>{heading}</Text>
          <EmailAndPassInput isSignIn={isSignIn} />
        </View>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "transparent",
    marginTop: 15,
  },
  emailCont: {
    flex: 1,
    borderWidth: 4,
  },
  heading: {
    color: "#FF6F61",
    fontWeight: "600",
    fontSize: getResponsiveFontSize(64),
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
