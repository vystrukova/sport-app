import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    Animated,
    Linking, Alert
} from 'react-native';

import { BlurView } from "@react-native-community/blur";
import { SIZES, FONTS, COLORS, icons } from "../constants";
import {addDoc, collection, getDocs, query, where, serverTimestamp} from "firebase/firestore";
import {auth, db} from "../kotik/firebase";
import images from "../constants/images";
import firebase from "firebase/compat";

const HEADER_HEIGHT = 350; //header with picture

const RecipeCreatorCardDetail = ({selectedRecipe}) => {

    const handleLink = async (url) => {
        if (url) {
            const supported = await Linking.canOpenURL(url)
            if (supported) {
                await Linking.openURL(url)
            } else {
                Alert.alert("Ошибка", "Невозможно открыть ссылку...")
            }
        } else {
            Alert.alert("Ошибка", "Ссылка отсутствует")
        }
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            {/*Фотография преподавателя*/}
            <View
                style={{
                    width: 40,
                    height: 40,
                    marginLeft: 20
                }}
            >
                <Image
                    source={{uri:selectedRecipe?.authorPick}}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20
                    }}
                />
            </View>

            {/*Labels*/}
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 20
                }}
            >
                <Text
                    style={{
                        color: COLORS.lightGray2,
                        ...FONTS.body4
                    }}
                >Автор: </Text>
                <Text
                    style={{
                        color: COLORS.white2,
                        ...FONTS.h3
                    }}
                >{selectedRecipe?.authorName}</Text>
            </View>

            {/*Кнопки*/}
            <TouchableOpacity
                style={{
                    width: 30,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: COLORS.lightGreen1
                }}
                onPress={() => handleLink(selectedRecipe?.link)}
            >
                <Image
                    source={icons.rightArrow}
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.lightGreen1
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

const RecipeCreatorCardInfo = ({selectedRecipe}) => {
    if(Platform.OS === 'ios') {
        return (
            <BlurView
                style = {{
                    flex: 1,
                    borderRadius: SIZES.radius
                }}
                blurType = "dark"
            >
                <RecipeCreatorCardDetail
                    selectedRecipe = {selectedRecipe}
                />
            </BlurView>
        )
    } else {
        return (
            <View
                style={{
                    flex: 1,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.transparentBlack9
                }}
            >
                <RecipeCreatorCardDetail
                    selectedRecipe = {selectedRecipe}
                />
            </View>
        )
    }
}

const Recipe = ({ navigation, route }) => {

    const scrollY = useRef(new Animated.Value(0)).current;

    const [ exercises, setExercises ] = useState([])
    const [ workoutDays, setWorkoutDays ] = useState([])
    const [ load, setLoad ] = useState(false)

    const getExercise = async () => {
        const exerciseCol = collection(db, "exercise")
        const q = query(exerciseCol, where("nameEx", "==", route.params?.recipe?.name))
        const exerciseDocs = await getDocs(q)
        const ex = exerciseDocs.docs.map((doc) => ({
            ...doc.data(), id:doc.id
        }))

        setExercises(ex)
    }

    useEffect(() => {
        getExercise()
    },[])

    const createWorkoutDay = async () => {
        setLoad(true)
        const workoutDayCol = collection(db, "workoutDays")
        await addDoc(workoutDayCol, {date: serverTimestamp(), userEmail:auth.currentUser.email,
        name: route.params?.recipe?.name})
        Alert.alert("Успех!", "Вы выполнили тренировку.")
        setLoad(false)
    }

    const getWorkoutDay = async () => {
        const workoutDayCol = collection(db, "workoutDays")
        const q = query(workoutDayCol, where("name","==",  route.params?.recipe?.name))
        const workoutDayDocs = await getDocs(q)
        const workoutDay = workoutDayDocs.docs.map((doc) => ({
            ...doc.data(),id:doc.id
        }))
        const userWorkoutDate = workoutDay.filter((item) => item.userEmail === auth.currentUser.email)
        setWorkoutDays(userWorkoutDate)
    }

    useEffect(() => {
        getWorkoutDay()
    },[load])

    function renderHeaderBar() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 90,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 10
                }}
            >
                {/*Screen Overlay*/}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.black,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100,
                            HEADER_HEIGHT - 70],
                            outputRange: [0, 1]
                        })
                    }}
                />

                {/*Header Bar Title*/}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 10,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                            outputRange: [0, 1]
                        }),
                        transform: [{
                            translateY: scrollY.interpolate({
                                inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                                outputRange: [50, 0],
                                extrapolate: 'clamp'
                            })
                        }]
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.lightGray2,
                            ...FONTS.body4
                        }}
                    >Автор: </Text>
                    <Text
                        style={{
                            color: COLORS.white2,
                            ...FONTS.h3
                        }}
                    >{route.params?.recipe?.authorName}</Text>

                </Animated.View>

                {/*Кнопка назад*/}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
                        width: 35,
                        borderRadius: 18,
                        borderWidth: 1,
                        borderColor: COLORS.lightGray,
                        backgroundColor: COLORS.transparentBlack5
                    }}
                    onPress={() => navigation.navigate("HomeScreen")}
                >
                    <Image
                        source={icons.back}
                        style={{
                            width: 15,
                            height: 15,
                            tintColor: COLORS.lightGray
                        }}
                    />
                </TouchableOpacity>

                {/*Кнопка Избранное*/}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
                        width: 35,

                    }}
                >
                    <Image
                        source={icons.bookmark}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.darkGreen
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderRecipeCardHeader() {
        const [ workout, setWorkout ] = useState([])
        const [ exercise, setExercise ] = useState([])

        const getWorkout = async () => {

        }

        return(
            <View
                style={{
                    marginTop: -1000,
                    paddingTop: 1000,
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                {/*Background Image*/}
                <Animated.Image
                    source={{uri:route.params?.recipe?.image}}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT,
                        width: "200%",
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [-HEADER_HEIGHT / 2, 0,
                                        HEADER_HEIGHT * 0.75]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0,
                                    HEADER_HEIGHT],
                                    outputRange: [2, 1, 0.75] //при скролинге скейл фоновой картинки
                                })
                            }
                        ]
                    }}
                />

                {/*Creator Card*/}
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 30,
                        right: 30,
                        height: 80,
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [0, 170, 250],
                                    outputRange: [0, 0, 100],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                >
                    <RecipeCreatorCardInfo
                        selectedRecipe={route.params?.recipe}
                    />

                </Animated.View>

            </View>
        )
    }

    function renderRecipeInfo() {
        return (
            <View
                style={{
                    width: SIZES.width,
                    paddingHorizontal: 30,
                    paddingVertical: 0

            }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        height: 120,
                        width: SIZES.width,
                        alignItems: 'center'
                    }}
                >
                    {/*Recipe*/}
                    <View
                        style={{
                            flex: 1.5,
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.h2
                            }}
                        >{route.params?.recipe?.name}</Text>
                        <Text
                            style={{
                                marginTop: 5,
                                color: COLORS.lightGray2,
                                ...FONTS.body4
                            }}
                        >{route.params?.recipe?.duration} Длительность выполнения</Text>

                    </View>
                </View>

                <View
                    style={{
                        height: 60,
                        width: SIZES.width,
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            marginRight: 20,
                            width: 30,
                            height: 30,
                            borderRadius: 40
                        }}
                        onPress={createWorkoutDay}
                    >
                        <Image source={images.check}
                               style={{
                                   width: "100%",
                                   height: "100%"
                               }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: COLORS.black,
                            ...FONTS.body3
                        }}
                    >Выполнено всего: {workoutDays.length}</Text>
                </View>

            </View>
        )
    }

    function renderIngredientHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 30,
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.padding
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        ...FONTS.h3
                    }}
                >Упражнения</Text>

                <Text
                    style={{
                        color: COLORS.lightGray2,
                        ...FONTS.body4
                    }}
                >всего: {exercises.length}</Text>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <Animated.FlatList //используется для анимирования header
                data={exercises}
                keyExtractor={ item => '${item.id}'}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/*Header*/}
                        {renderRecipeCardHeader()}

                        {/*Info*/}
                        {renderRecipeInfo()}

                        {/*Title Section*/}
                        {renderIngredientHeader()}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    {nativeEvent: {contentOffset: {y: scrollY}}}
                ], {useNativeDriver: true})}
                renderItem={({item}) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 30,
                            marginVertical: 5
                        }}
                    >
                        {/*Icon*/}
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 50,
                                width: 25,
                                borderRadius: 5,
                                backgroundColor: COLORS.white
                            }}
                        >
                            <View style={{
                                width: 5,
                                height: 5,
                                backgroundColor: COLORS.lime,
                                borderRadius: 40
                            }}
                            />
                        </View>

                        {/*Описание*/}
                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: 20,
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>

                        {/*Количество*/}
                        <View
                            style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.body3
                                }}
                            >
                                {item.quantity}
                            </Text>
                        </View>
                    </View>
                )}

            />

            {/*Header Bar*/}

            {renderHeaderBar()}

        </View>
    )
}

export default Recipe;