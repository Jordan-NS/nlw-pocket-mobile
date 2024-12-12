import { Stack } from "expo-router"
import { colors } from "@/styles/colors"
import { Loading } from "@/components/loading"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import {
  useFonts,
  Rubik_600SemiBold,
  Rubik_400Regular,
  Rubik_700Bold,
  Rubik_500Medium
} from "@expo-google-fonts/rubik"
export default function Layout() {

  const [fontsLoaded] = useFonts({
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_700Bold,
    Rubik_500Medium
  })

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[100] },
        }} />
    </GestureHandlerRootView>
  );
}