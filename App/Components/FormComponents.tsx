import { useState, type FC } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import {
  signInWithEmailzAndPassword,
  signUpWithEmailAndPassword,
} from "../Auth/auth";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
type SigninProps = {
  isSignIn: boolean;
};
const EmailAndPassInput: FC<SigninProps> = ({ isSignIn }) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(false);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(false);
  };

  const handleSubmit = async () => {
    const emailRegex = /^[\w+.-]+@[\da-z-]+\.[\d.a-z-]+$/i;

    const isEmailValid = email && emailRegex.test(email);
    const isPasswordValid = password && password.length >= 6;
    const isConfirmPasswordValid = isSignIn || password === confirmPassword;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setConfirmPasswordError(!isConfirmPasswordValid);

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      if (isSignIn) {
        await signInWithEmailzAndPassword(email, password, navigation);
      } else {
        await signUpWithEmailAndPassword(email, password, navigation);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        mode="flat"
        style={styles.input}
        theme={{
          colors: { primary: "#FFEA70" },
        }}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        error={emailError}
        left={<TextInput.Icon icon="email" color="#FF6F61" />}
      />
      <HelperText type="error" visible={emailError}>
        Please enter a valid email.
      </HelperText>

      <TextInput
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        mode="flat"
        style={styles.input}
        theme={{
          colors: { primary: "#FF6F61" },
        }}
        autoCapitalize="none"
        textContentType="password"
        error={passwordError}
        left={<TextInput.Icon icon="lock" color="#FF6F61" />}
      />
      <HelperText type="error" visible={passwordError}>
        Password must be at least 6 characters long.
      </HelperText>

      {!isSignIn && (
        <View>
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry
            mode="flat"
            style={styles.input}
            theme={{
              colors: { primary: "#FF6F61" },
            }}
            autoCapitalize="none"
            textContentType="password"
            error={confirmPasswordError}
            left={<TextInput.Icon icon="lock" color="#FF6F61" />}
          />
          <HelperText type="error" visible={confirmPasswordError}>
            Passwords must match.
          </HelperText>
        </View>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        labelStyle={{
          color: "#fff",
          fontWeight: "500",
          fontSize: 20,
          textAlign: "center",
        }}
        buttonColor="#FF6F61"
      >
        Submit
      </Button>
      <View style={styles.navTextCont}>
        {isSignIn ? (
          <TouchableHighlight
            underlayColor={"#FFEA70"}
            onPress={() => {
              navigation.navigate("SignIn", {
                isSignIn: false,
                heading: "Signup",
              });
            }}
          >
            <HelperText style={styles.navText} type="info">
              Not registered? Signup
            </HelperText>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor={"#FFEA70"}
            onPress={() => {
              navigation.navigate("SignIn", {
                isSignIn: true,
                heading: "Login",
              });
            }}
          >
            <HelperText style={styles.navText} type="info">
              Already registered? Login
            </HelperText>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 40,
    borderRadius: 25,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#D2691E",
  },
  navTextCont: {
    display: "flex",
    alignItems: "flex-end",
  },
  navText: {
    color: "#FF6F61",
    fontWeight: "300",
    fontSize: 16,
    textAlign: "left",
    marginTop: 1,
  },
});

export { EmailAndPassInput };
