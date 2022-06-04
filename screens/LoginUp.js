import React, {useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView, Platform, Alert
} from "react-native"

import LinearGradient from "react-native-linear-gradient";
import {signInWithEmailAndPassword} from "firebase/auth"

import { COLORS, FONTS, SIZES, icons, images } from "../constants"
import {CustomButton} from "../components";
import {auth} from "../kotik/firebase";

const LoginUp = ({ navigation }) => {

    const [ showPassword, setShowPassword ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ pass, setPass ] = useState("")

    const handleLogin = async () => {
        if (email !== "" && pass !== "") {
            signInWithEmailAndPassword(auth, email, pass).then(
                () => console.log("Вы авторизировались")
            ).catch(
                (e) => Alert.alert("Ошибка авторизации","Неверный логин или пароль")
            )
        }
    }

    //Header func
    function renderHeader() {
        return(
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding * 3,
                    paddingHorizontal: SIZES.padding * 1.5
                }}
                onPress={() => navigation.replace("Login")} //???????
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />
                <Text
                    style={{
                        marginLeft: SIZES.padding,
                        color: COLORS.white,
                        ...FONTS.h3
                    }}
                >Назад</Text>
            </TouchableOpacity>

        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 2,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.logoKFU}
                    resizeMode="contain"
                    style={{
                        height: 150,
                        width: 300
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return(
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding * 1.3
                }}
            >

                {/* Почта */}
                <View style={{ marginTop: SIZES.padding }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Эл.
                        почта</Text>

                    <TextInput
                        style={{
                            marginVertical: SIZES.padding * 0.5,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Электронная почта"
                        placeholderTextColor={COLORS.lightGray}
                        selectionColor={COLORS.white}
                    />
                </View>

                {/* Пароль */}
                <View style={{ marginTop: SIZES.padding }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                        Пароль</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding * 0.5,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        onChangeText={(text) => setPass(text)}
                        placeholder="Введите пароль"
                        placeholderTextColor={COLORS.lightGray}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.eye : icons.eyeclosed}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />

                    </TouchableOpacity>
                </View>


            </View>
        )
    }

    function  renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 1.5, marginTop: SIZES.padding * 2 }}>
                <CustomButton
                    buttonText="Войти"
                    buttonContainerStyle={{
                        paddingVertical: 18,
                        borderRadius: 20,
                        borderColor: COLORS.white,
                        borderWidth: 1
                    }}
                    colors={[]}
                    onPress={handleLogin}
                />


            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1}}
        >
            <LinearGradient
                colors={[COLORS.lightGreen1, COLORS.blue]}
                style={{flex: 1}}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>

            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default LoginUp;