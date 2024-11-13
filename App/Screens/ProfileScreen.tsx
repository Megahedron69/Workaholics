import type { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { signOutz } from "../Auth/auth";
import { useNavigation } from "@react-navigation/native";
import EmployeeDetailScreen from "./EmployeeDetailScreen";
import { Button } from "react-native-paper";
import MyProfileComponent from "../Components/MyProfileComponent";

type ProfileProps = {
  users: Array<any>;
};
const ProfileScreen: FC<ProfileProps> = ({ users }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <MyProfileComponent />
      <View style={styles.buttonCont}>
        <Button
          mode="contained"
          onPress={() => {
            signOutz(navigation);
          }}
          style={styles.button}
          labelStyle={{
            color: "#fff",
            fontWeight: "500",
            fontSize: 20,
            textAlign: "center",
          }}
          buttonColor="#FF6F61"
        >
          Sign Out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEA70",
    height: "100%",
    width: "100%",
    marginTop: 50,
    padding: 15,
  },
  buttonCont: {
    marginBottom: 30,
    padding: 5,
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
  },
});
export default ProfileScreen;
