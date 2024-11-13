import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ActivityIndicator, Text, Easing } from "react-native";
import DashboardScreen from "./DashboardScreen";
import ProfileScreen from "./ProfileScreen";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommonActions } from "@react-navigation/native";
import { BottomNavigation } from "react-native-paper";
const Tab = createBottomTabNavigator();

const fetchUsers = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${pageParam}&_limit=5`
  );
  const data = await response.json();
  return data;
};

export default function HomeScreen() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 5 ? allPages.length + 1 : undefined;
    },
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#FF6F61" />;
  }

  if (error) {
    return <Text>Error fetching data.</Text>;
  }

  const users =
    data?.pages.flatMap((page, pageIndex) =>
      page.map((user: any) => ({
        ...user,
        uniqueId: `${pageIndex}-${user.id}`,
      }))
    ) || [];

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        tabBar={({ navigation, state, descriptors, insets }) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            activeColor="#FF6F61"
            inactiveColor="gray"
            animationEasing={Easing.in(Easing.ease)}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              return label;
            }}
          />
        )}
      >
        <Tab.Screen
          name="Dashboard"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="pie-chart" size={size} color={color} />
            ),
            headerShown: false,
          }}
        >
          {(props) => (
            <DashboardScreen
              {...props}
              users={users}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            ),
            headerShown: false,
          }}
        >
          {(props) => <ProfileScreen {...props} users={users} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}
