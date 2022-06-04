import React, {useState, createContext, useContext, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Login, Recipe, SignUp } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";
import LoginUp from "./screens/LoginUp";
import {auth} from "./kotik/firebase";
import {LogBox} from "react-native";

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreAllLogs()

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({})

const AuthenticatedUserProvider = ({children}) => {
    const [ user, setUser ] = useState(null)

    return (
        <AuthenticatedUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthenticatedUserContext.Provider>
    )
}

const LoginNavigation = () => {
    return (

            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Login'}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="LoginUp"
                    component={LoginUp}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                />
            </Stack.Navigator>
    )
}

const RouteNavigation = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext)

    useEffect(() => {
        onAuthStateChanged(auth, async authUser => {
            if (authUser) {
                setUser(authUser)
            }
            else {
                setUser(null)
            }
        })
    },[user])

    return (
        <NavigationContainer>
            {user ? <Tabs/>: <LoginNavigation/>}
        </NavigationContainer>
    )
}

const App = () => {
    return (
        <AuthenticatedUserProvider>
            <RouteNavigation/>
        </AuthenticatedUserProvider>
    )

}

export default App;