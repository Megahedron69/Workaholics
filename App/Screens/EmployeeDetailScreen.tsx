import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import type { FC } from "react";
import type { User } from "../types/User";
import Entypo from "@expo/vector-icons/Entypo";
import { useRoute } from "@react-navigation/native";
type Props = {
  data?: Array<User>;
  isMyProf?: boolean;
};

type AllDataCompProps = {
  iconName: string;
  valueData: string | null | undefined;
  headingData: string | null;
};

export const AllDataComp: FC<AllDataCompProps> = ({
  iconName,
  valueData,
  headingData,
}) => {
  return (
    <View style={styles.listCont}>
      <View style={styles.listItem}>
        <View style={styles.iconView}>
          <Entypo name={iconName} size={42} color="#FF6F61" />
        </View>
        <View style={styles.dataView}>
          <Text style={styles.dataText}>{valueData}</Text>
          <Text style={styles.headingText}>{headingData}</Text>
        </View>
      </View>
    </View>
  );
};

const EmployeeDetailScreen: FC<Props> = ({ isMyProf = false }) => {
  const route = useRoute();
  const { data = [] } = route.params || {};
  const employee = data[0];
  const infoItems = [
    {
      iconName: "location-pin",
      valueData: `${employee.address.suite.split(" ")[1]}, ${
        employee.address.street
      }, ${employee.address.city}`,
      headingData: "Address",
    },
    {
      iconName: "network",
      valueData: employee.company.name,
      headingData: "Organisation",
    },
    {
      iconName: "mail-with-circle",
      valueData: employee.email.toLowerCase(),
      headingData: "Email",
    },
    {
      iconName: "phone",
      valueData: employee.phone,
      headingData: "Phone",
    },
    {
      iconName: "browser",
      valueData: employee.website,
      headingData: "Website",
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
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={styles.avatar}
        />
        <Text style={styles.Nametext}>{employee.name}</Text>
        <View style={styles.locn}>
          <Entypo name="location-pin" size={24} color="white" />
          <Text style={styles.locnText}>
            {employee.address.street}, {employee.address.city}
          </Text>
        </View>
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

export default EmployeeDetailScreen;

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
