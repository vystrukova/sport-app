import React from "react";
import {
    View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import {Calc, Home} from "../screens"
import { SettingsPage } from "../screens"
import { TabIcon } from "../components"
import { Recipe } from "../screens"
import { COLORS, icons } from "../constants"
import {createStackNavigator} from "@react-navigation/stack";
import Graphics from "../screens/Graphics";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="HomeScreen" component={Home}/>
            <Stack.Screen name="Recipe" component={Recipe}/>
            <Stack.Screen name="CalcScreen" component={Calc}/>
        </Stack.Navigator>
    )
}

const SettingPageNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="SettingScreen" component={SettingsPage}/>
            <Stack.Screen name="CalcScreen" component={Calc}/>
        </Stack.Navigator>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator

            tabBarOptions={{
                showLabel:false,
                style: {
                    elevation: 0,
                    backgroundColor: COLORS.white,
                    borderTopColor: "transparent",
                    height: 100
                }
            }}
        >

            <Tab.Screen
                name="Home"
                component={HomeNavigation}
                options={{
                    tabBarIcon: ({focused}) => <TabIcon focused = {focused}
                                                        icon={icons.home} />
                }}

            />
            <Tab.Screen
                name="Search"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => <TabIcon focused = {focused}
                                                        icon={icons.search} />
                }}
            />
            <Tab.Screen
                name="Graphics"
                component={Graphics}
                options={{
                    tabBarIcon: ({focused}) => <TabIcon focused = {focused}
                                                        icon={icons.graphics} />
                }}
            />
            <Tab.Screen
                name="SettingPage"
                component={SettingPageNavigator}
                options={{
                    tabBarIcon: ({focused, color}) => <TabIcon style={{}}
                        focused = {focused}
                                                        icon={icons.settings}
                    />

                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;