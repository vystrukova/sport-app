import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    StatusBar, TextInput, Image, Platform, ScrollView
} from 'react-native';

import LinearGradient from "react-native-linear-gradient";
import {images, COLORS, SIZES, FONTS, icons} from "../constants";
import { CustomButton } from "../components";
import {collection, getDocs, query, where, updateDoc, doc} from "firebase/firestore";
import {auth, db} from "../kotik/firebase";

const Calc = ({ navigation, route }) => {

    function renderHeader () {
        if (route.params?.title === "Settings") {
            return (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.padding * 3,
                        paddingHorizontal: SIZES.padding * 1.5
                    }}
                    onPress={() => navigation.navigate("SettingScreen", {load:true})}
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
                    >Профиль</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.padding * 3,
                        paddingHorizontal: SIZES.padding * 1.5
                    }}
                    onPress={() => navigation.navigate("HomeScreen")}
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
    }

    function renderCalc() {

        const [ rost, setRost ] = useState(0)
        const [ ves, setVes ] = useState(0)
        const [ bmiResult, setBmiResult ] = useState('')
        const [ result, setResult ] = useState('')
        const [ user, setUser ] = useState([])

        const getUser = async () => {
            const userCol = collection(db,"users")
            const q = query(userCol, where("email", "==", auth.currentUser.email))
            const userDocs = await getDocs(q)
            const user = userDocs.docs.map((doc) => ({
                ...doc.data(),id:doc.id
            }))
            setUser(user)
        }
        useEffect(() => {
            getUser()
        },[])

        async function calc() {
            const bmi = (ves / Math.pow(rost, 2)).toFixed(1)

            setBmiResult(bmi)

            if (bmi <= 16) {
                setResult("Выраженный дефицит массы тела")
            }
            else if (bmi <= 18.5 && bmi > 16) {
                setResult("Недостаточная (дефицит) масса тела")
            }
            else if (bmi <= 25 && bmi > 18.5) {
                setResult("Норма")
            }
            else if (bmi <= 30 && bmi > 25) {
                setResult("Избыточная масса тела (предожирение)")
            }
            else if (bmi <= 35 && bmi > 30) {
                setResult("Ожирение первой степени")
            }
            else if (bmi <= 40 && bmi > 35) {
                setResult("Ожирение второй степени")
            }
            else if (bmi > 40) {
                setResult("Ожирение третьей степени")
            }

            const necUser = doc(db,"users",user[0]?.id)
            await updateDoc(necUser,{bmi:bmi})
        }

        return(
            <View
                style={{
                    marginTop: SIZES.padding * 0.5,
                    marginHorizontal: SIZES.padding * 1.3
                }}
            >
                {/*Text*/}
                <Text
                    style={{
                        padding: SIZES.padding,
                        textAlign: 'center',
                        color: COLORS.lime,
                        ...FONTS.h1
                    }}
                >Калькулятор ИМТ</Text>

                <Text
                    style={{
                        opacity: .9,
                        color: COLORS.gray,
                        ...FONTS.body3
                    }}
                >Расчёт индекса массы тела определяет в каком соотношении
                    находятся вес и рост, калькулятор подходит для взрослых мужчин и женщин.</Text>

                {/* Рост */}
                <View style={{marginTop: SIZES.padding }}>
                    <Text style={{ color: COLORS.lime, ...FONTS.h3}}>Рост
                        (СМ)</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding * 0.5,
                            borderBottomColor: COLORS.lime,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        placeholder="Введите рост в сантиметрах"
                        onChangeText={(text) => setRost(text/100)}
                        placeholderTextColor={COLORS.lime}
                        selectionColor={COLORS.lime}
                    />

                </View>

                {/* Вес */}
                <View style={{marginTop: SIZES.padding }}>
                    <Text style={{ color: COLORS.lime, ...FONTS.h3}}>Вес
                        (КГ)</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding * 0.5,
                            borderBottomColor: COLORS.lime,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                        placeholder="Введите вес в килограммах"
                        onChangeText={(text) => setVes(text)}
                        placeholderTextColor={COLORS.lime}
                        selectionColor={COLORS.lime}
                    />

                    <View style={{ margin: SIZES.padding * 1.5, marginTop: SIZES.padding * 2 }}>
                        <CustomButton
                            buttonText="Рассчитать"
                            buttonContainerStyle={{
                                paddingVertical: 18,
                                borderRadius: 20,
                                borderColor: COLORS.black,
                                borderWidth: 1
                            }}
                            colors={[COLORS.darkGreen, COLORS.lime]}
                            onPress={calc}
                        />
                    </View>


                        {result !== "" &&
                        <View
                            style={{
                                marginTop: SIZES.padding * 2,
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    marginBottom: 5,
                                    ...FONTS.body3
                                }}
                            >
                                {bmiResult}
                            </Text>

                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            >
                                {result}
                            </Text>
                        </View>
                        }

                </View>
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
                <ScrollView>
                    {renderHeader()}
                    {renderCalc()}
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Calc;



