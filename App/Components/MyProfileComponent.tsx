import type { FC } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { getUserDetails } from "../Auth/auth";
import { AllDataComp } from "../Screens/EmployeeDetailScreen";

const MyProfileComponent: FC = () => {
  const userz = getUserDetails();
  const infoItems = [
    {
      iconName: "mail-with-circle",
      valueData: userz?.email,
      headingData: "Email",
    },
    {
      iconName: "check",
      valueData: userz?.emailVerified ? "Verified" : "Unverified",
      headingData: "Email verification status",
    },
    {
      iconName: "user",
      valueData: userz?.uid,
      headingData: "User ID",
    },
  ];
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/Images/avatarBg.jpg")}
        style={styles.ImageContainer}
        imageStyle={{ borderRadius: 10 }}
        resizeMode="cover"
        blurRadius={5}
      >
        <Avatar.Image
          size={128}
          source={{ uri: "https://avatar.iran.liara.run/public" }}
          style={styles.avatar}
        />
        <Text style={styles.Nametext}>{userz?.email?.toLowerCase()}</Text>
      </ImageBackground>
      <View style={styles.factCont}>
        {infoItems.map((item, index) => (
          <AllDataComp
            key={index}
            iconName={item.iconName}
            valueData={item.valueData}
            headingData={item.headingData}
          />
        ))}
      </View>
    </View>
  );
};
export default MyProfileComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFEA70",
    alignItems: "center",
    padding: 11,
    marginTop: 50,
  },
  ImageContainer: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
    marginTop: 10,
  },
  avatar: {
    borderWidth: 2,
    borderColor: "green",
    marginTop: 16,
    marginBottom: 5,
  },
  Nametext: {
    fontSize: 28,
    color: "white",
    fontWeight: "500",
    marginTop: 3,
  },
  locn: {
    display: "flex",
    alignItems: "center",
    marginTop: 3,
    flexDirection: "row",
    marginBottom: 5,
  },
  locnText: {
    fontSize: 13,
    color: "white",
    fontWeight: "500",
  },
  factCont: {
    marginTop: 15,
    borderRadius: 25,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  listCont: {
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  iconView: {
    marginRight: 15,
  },
  dataView: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  dataText: {
    fontSize: 16,
    fontWeight: "500",
  },
  headingText: {
    fontSize: 14,
    color: "gray",
  },
});
