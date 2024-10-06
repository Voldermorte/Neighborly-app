import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";

import { HomeScreen } from "./HomeScreen";
import { ServiceListScreen } from "./ServiceListScreen";
import { ServiceDetailsScreen } from "./ServiceDetailsScreen";
import { BookServiceScreen } from "./BookServiceScreen";
import { ProfileScreen } from "./ProfileScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#65adf1",
                },
                headerTintColor: "white",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Neighborly" }}
            />
            <StackNavigator.Screen
                name="ServiceList"
                component={ServiceListScreen}
                options={({ route }) => ({ title: route.params.category })}
            />
            <StackNavigator.Screen
                name="ServiceDetails"
                component={ServiceDetailsScreen}
                options={{ title: "Service Details" }}
            />
            <StackNavigator.Screen
                name="BookService"
                component={BookServiceScreen}
                options={{ title: "Book Service" }}
            />
            <StackNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "Profile" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);