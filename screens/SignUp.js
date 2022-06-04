import React, { useState }from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView, Platform, Alert
} from "react-native"

import LinearGradient from "react-native-linear-gradient";

import { COLORS, FONTS, SIZES, icons, images } from "../constants"
import {CustomButton} from "../components";

import {collection, query, addDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../kotik/firebase";

const SignUp = ({ navigation }) => {

    const [ showPassword, setShowPassword ] = useState(false)
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ pass, setPass ] = useState("")

    const handleSignUp = async () => {
        if (name !== "" && email !== "" && pass !== "") {
            createUserWithEmailAndPassword(auth, email, pass).then(
                () => createUser(name, email)
            ).catch(
                (e) => Alert.alert("Ошибка регистрации","Something get wrong")
            )
        }
    }

    const createUser =  async (name, email) => {
        const userCol = collection(db, "users")
        await addDoc(userCol, {fullName:name, email:email, bmi:0, image:""})
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
                onPress={() => navigation.navigate("Login")} //???????
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

                {/* Полное Имя */}
                <View style={{ marginTop: SIZES.padding }}>
                    <Text style={{ color: COLORS.white, ...FONTS.h3}}>Полное
                        имя</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding * 0.5,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        onChangeText={(text) => setName(text)}
                        placeholder="Введите полное имя"
                        placeholderTextColor={COLORS.lightGray}
                        selectionColor={COLORS.white}
                    />
                </View>

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
                    buttonText="Зарегистрироваться"
                    buttonContainerStyle={{
                        paddingVertical: 18,
                        borderRadius: 20,
                        borderColor: COLORS.white,
                        borderWidth: 1
                    }}
                    colors={[]}
                    onPress={handleSignUp}
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

export default SignUp;