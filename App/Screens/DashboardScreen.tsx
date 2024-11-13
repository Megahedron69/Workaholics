import type { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

type DashboardProps = {
  users: Array<any>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const DashboardScreen: FC<DashboardProps> = ({
  users,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("EmployeeDetailScreen", { data: [item] })
      }
    >
      <View style={styles.row}>
        <Avatar.Image size={40} source={{ uri: "https://i.pravatar.cc/300" }} />
        <View style={styles.center}>
          <Text style={styles.username}>{item.name}</Text>
          <Text style={styles.email}>{item.email.toLowerCase()}</Text>
        </View>
        <Text style={styles.city}>{item.address.city}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={users}
        keyExtractor={(item) => item.uniqueId}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        estimatedItemSize={50}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#FF6F61" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEA70",
    paddingTop: 50,
  },
  itemContainer: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    borderColor: "#FF6F61",
    borderWidth: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  center: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  city: {
    fontSize: 14,
    color: "#333",
  },
});

export default DashboardScreen;
