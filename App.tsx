import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./App/Routes/routes";
import { PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const navColor = () => {
      NavigationBar.setBackgroundColorAsync("#FFEA70");
      NavigationBar.setVisibilityAsync("hidden");
    };
    navColor();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <ToastProvider
          successColor="#37e9bb"
          dangerColor="#FF5449"
          swipeEnabled
          style={{ borderRadius: 30 }}
        >
          <PaperProvider>
            <QueryClientProvider client={queryClient}>
              <RootStack />
            </QueryClientProvider>
          </PaperProvider>
        </ToastProvider>
        <StatusBar style="dark" backgroundColor="#FFEA70" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
