import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabelaHorarios from "./pages/Cronograma/Horario";
import HomeScreenII from "./pages/CampusII/HomeScreenII";
import SemestersScreen from "./pages/Semester/SemesterScreen";
import DisciplinesScreen from "./pages/Disciplines/DisciplineScreen";
import CampusScreen from "./pages/Campi/CampusScreen";
import HomeScreenI from "./pages/CampusI/HomeScreenI";
import UserProfileScreen from "./pages/Profile/ProfileScreen";
import AcademicCalendar from "./pages/Calendar/CalendarScreen";
import HomePage from "./pages/Home/HomePageScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            headerTitle: "Insight",
            headerStyle: {
              backgroundColor: "#1f2c34",
            },
            headerTintColor: "#dbe3e5",
          }}
        />
        <Stack.Screen
          name="Profile"
          component={UserProfileScreen}
          options={{
            headerTitle: "Meu Perfil",
            headerStyle: {
              backgroundColor: "#1f2c34",
            },
            headerTintColor: "#dbe3e5",
          }}
        />
        <Stack.Screen
          name="Campi"
          component={CampusScreen}
          options={{
            headerTitle:"Campi",
            headerStyle: {
              backgroundColor: "#1f2c34",
            },
            headerTintColor: "#dbe3e5",
          }}
        />
        <Stack.Screen
          name="HomeII"
          component={HomeScreenII}
          options={{
            headerTitle: "Campus II - Alagoinhas",
            headerStyle: {
              backgroundColor: "#1f2c34",
            },
            headerTintColor: "#dbe3e5",
          }}
        />
        <Stack.Screen
          name="HomeI"
          component={HomeScreenI}
          options={{
            headerTitle: "Campus I - Salvador",
            headerStyle: {
              backgroundColor: "#1f2c34",
            },
            headerTintColor: "#dbe3e5",
          }}
        />
        <Stack.Screen
          name="Horários"
          component={TabelaHorarios}
          options={({ navigation }) => ({
            headerTitle: "Meus Horários",
            headerStyle: {
              backgroundColor: "#1f2c34",
            },
            headerTintColor: "#dbe3e5",
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={30}
                color="#000"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Semestres"
          component={SemestersScreen}
          options={({ route, navigation }) => {
            const { course } = route.params || {};
            return {
              headerTitle: course ? course : "Minha Calculadora",
              headerStyle: {
                backgroundColor: "#1f2c34",
              },
              headerTintColor: "#dbe3e5",
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="#000"
                  style={{ marginLeft: 10 }}
                  onPress={() => navigation.navigate("Profile")}
                />
              ),
            };
          }}
        />
        <Stack.Screen
          name="Disciplinas"
          component={DisciplinesScreen}
          options={({ route, navigation }) => {
            const { params } = route; // Destructuring do objeto route
            return {
              headerStyle: {
                backgroundColor: "#1f2c34",
              },
              headerTintColor: "#dbe3e5",
              headerLeft: () => (
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="#000"
                  style={{ marginLeft: 10 }}
                  onPress={() =>
                    navigation.navigate(params?.screen || "Semestres", {
                      course: params?.course,
                    })
                  }
                />
              ),
            };
          }}
        />
        
        <Stack.Screen
          name="Calendar"
          component={AcademicCalendar}
          options={({ navigation }) => ({
            headerTitle: "Calendário Acadêmico",
            headerStyle: {
              backgroundColor: "#1f2c34",
            },
            headerTintColor: "#dbe3e5",
            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={30}
                color="#000"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
