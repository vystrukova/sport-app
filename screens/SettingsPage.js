import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    StatusBar, TextInput, Image, Platform, ScrollView
} from 'react-native';

import {signOut} from 'firebase/auth';
import LinearGradient from "react-native-linear-gradient";
import {COLORS, FONTS, icons, images, SIZES} from "../constants";
import {SettingsItem} from "../components";
import {auth, db} from "../kotik/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const SettingsPage = ({ navigation, route }) => {

    const handleSignOut = async () => {
        signOut(auth).catch(error => console.log(error))
    }

    const [ users, setUsers ] = useState([])

    const getUser = async () => {
        const userCol = collection(db, "users")
        const q = query(userCol, where("email", "==", auth.currentUser.email))
        const userDocs = await getDocs(q)
        const user = userDocs.docs.map((doc) => ({
            ...doc.data(),id:doc.id
        }))
        setUsers(user)
    }
    useEffect(() => {
        getUser()
    },[route.params?.load])

    function renderHeader () {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding * 3,
                    paddingHorizontal: SIZES.padding * 1.5
                }}
                onPress={() => navigation.navigate("Home")} //???????
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray
                    }}
                />
                <Text
                    style={{
                        marginLeft: SIZES.padding,
                        color: COLORS.gray,
                        ...FONTS.h3
                    }}
                >Главная</Text>
            </TouchableOpacity>
        )
    }

    function renderProfileDetails () {
        return (
            <View
                style={{
                    flex: 1,
                    paddingTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                <Image
                    source={images.profile}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100
                    }}
                />

                <TouchableOpacity
                    style={{
                        paddingTop: SIZES.padding * 0.5
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.lime,
                            ...FONTS.body3
                        }}
                    >добавить фото</Text>
                </TouchableOpacity>

                <Text
                    style={{
                        paddingTop: SIZES.padding * 0.5,
                        color: COLORS.black,
                        ...FONTS.h2
                    }}
                >
                    {users[0]?.fullName}
                </Text>
            </View>
        )
    }

    function renderSettingsItem () {
        return(
            <View>

                    <SettingsItem
                        text1={"Электронная почта"}
                        text2={auth.currentUser.email}
                        opacityText={"Изменить"}
                        onPress={null}
                    />


                <View
                    style={{marginTop: SIZES.padding}}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            marginHorizontal: SIZES.padding,
                            height: 90,
                            borderRadius: 15,
                            backgroundColor: COLORS.gray2,
                            shadowOffset: { width: 1, height: 1 },
                            shadowColor: COLORS.lime,
                            shadowOpacity: .2,
                            shadowRadius: 5,
                        }}
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <Text
                                style={{
                                    paddingTop: SIZES.radius * 1.5,
                                    paddingHorizontal: SIZES.radius * 1.5,
                                    color: COLORS.black,
                                    ...FONTS.h5
                                }}
                            >
                                Индекс Массы Тела
                            </Text>

                            {users[0]?.bmi !== 0 ?
                                <Text
                                    style={{
                                        paddingTop: SIZES.radius,
                                        paddingBottom: 18,
                                        paddingHorizontal: SIZES.radius * 1.5,
                                        color: COLORS.black,
                                        ...FONTS.body4
                                    }}
                                >
                                    {users[0]?.bmi}
                                </Text> :
                                <Text
                                    style={{
                                        paddingTop: SIZES.radius,
                                        paddingBottom: 18,
                                        paddingHorizontal: SIZES.radius * 1.5,
                                        color: COLORS.black,
                                        ...FONTS.body4
                                    }}
                                >
                                    Неизвестен
                                </Text>
                            }

                        </View>

                        <TouchableOpacity
                            style={{
                                flex: .4,
                                alignItems: 'flex-end'
                            }}
                            onPress={() => navigation.navigate("CalcScreen",{title:"Settings"})}
                        >



                            <Text
                                style={{
                                    paddingTop: SIZES.radius * 1.2,
                                    paddingRight: SIZES.radius * 2,
                                    color: COLORS.lime,
                                    ...FONTS.h4
                                }}
                            >Изменить</Text>


                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        )
    }

    function renderExit () {
        return (
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    marginBottom: SIZES.padding,
                    alignItems: "center",
                }}
            >
                <TouchableOpacity>
                    <Text
                        style={{
                            color: COLORS.lime,
                            ...FONTS.h3
                        }}
                        onPress={handleSignOut}
                    >Выйти</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1}}
        >
            <LinearGradient
                colors={[COLORS.white, COLORS.white]}
                style={{flex: 1}}
            >
                {renderHeader()}
                <ScrollView>
                    {renderProfileDetails()}
                    {renderSettingsItem()}
                </ScrollView>
                {renderExit()}
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default SettingsPage;