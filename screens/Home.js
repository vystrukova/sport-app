import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList
} from 'react-native';

import { FONTS, COLORS, SIZES, icons, images, dummyData} from "../constants";

import { CategoryCard, TrendingCard } from "../components"
import {collection, query, orderBy, getDocs} from "firebase/firestore";
import {db} from "../kotik/firebase";



const Home = ({ navigation }) => {

    const [ workout, setWorkout ] = useState([])
    const [ workoutRand, setWorkoutRand ] = useState([])
    const [ search, setSearch ] = useState("")
    const [ filteredWorkout, setFilteredWorkout ] = useState([])
    const [ filteredWorkoutRand, setFilteredWorkoutRand ] = useState([])

    const nav = (item) => {
        setSearch("")
        navigation.navigate("Recipe", { recipe: item })
    }

    const getWorkout = async () => {
        const workoutCol = collection(db, "workout")
        const q = query(workoutCol, orderBy("flow", "asc"))
        const workoutDocs = await getDocs(q)
        const work = workoutDocs.docs.map((doc) => ({
            ...doc.data(), id:doc.id
        }))
        setWorkout(work)
        setFilteredWorkout(work)
    }

    useEffect(() => {
        getWorkout()
        getWorkoutRand()
    },[])

    const getWorkoutRand = async () => {
        const workoutCol = collection(db, "workout")
        const q = query(workoutCol)
        const workoutDocs = await getDocs(q)
        const work = workoutDocs.docs.map((doc) => ({
            ...doc.data(), id:doc.id
        }))
        setWorkoutRand(work)
        setFilteredWorkoutRand(work)
    }

    useEffect(() => {
        handleSearch()
    },[search])

    const handleSearch = () => {

        if (search) {

            const workSR = workout.filter(item => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
                const textData = search.toUpperCase()
                return itemData.indexOf(textData) > -1
            })

            setFilteredWorkout(workSR)
        } else {

            setFilteredWorkout(workout)
        }
    }


    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    alignItems: 'center',
                    height: 80
                }}
            >
                {/* Text */}
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGreen,
                            ...FONTS.h2
                        }}
                    >Приветствую, студент</Text>

                    <Text
                        style={{
                            marginTop: 3,
                            color: COLORS.gray,
                            ...FONTS.body3
                        }}
                    >Пора заняться спортом
                    </Text>
                </View>

                {/* Image */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("SettingPage")}
                >
                    <Image
                        source={images.profile}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderSearchBar() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGray
                }}
            >
                <Image
                    source={icons.search}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray
                    }}
                />

                <TextInput
                    style={{
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
                    }}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    placeholderTextColor={COLORS.gray}
                    placeholder="Поиск упражнений"
                />
            </View>
        )
    }

    function renderSeeRecipeCard () {
        return(
            <View
                style={{
                    flexDirection: "row",
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen
                }}
            >
                {/* Image */}
                <View
                    style={{
                        width: 100,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={images.recipe}
                        style={{
                            width: 80,
                            height: 80
                        }}
                    />

                </View>

                {/* Text */}
                <View
                    style={{
                        flex: 1,
                        paddingVertical: SIZES.radius
                    }}
                >
                    <Text
                        style={{
                            width: "70%",
                            ...FONTS.body4
                        }}
                    >
                        Узнайте свой Индекс Массы Тела
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginTop: 10
                        }}
                        onPress={() => navigation.replace("CalcScreen")}
                    >
                        <Text
                            style={{
                                color: COLORS.darkGreen,
                                textDecorationLine: 'underline',
                                ...FONTS.h4
                            }}
                        >
                            Калькулятор

                        </Text>

                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    function renderTrendingSection() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text
                    style={{
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2
                    }}
                >
                    Популярные тренировки
                </Text>

                <FlatList
                    data={filteredWorkout}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => '${item.id}'}
                    renderItem={({item, index}) => {
                        return(
                            <TrendingCard
                                containerStyle={{
                                    marginLeft: index == 0 ? SIZES.padding : 0
                                }}
                                recipeItem={item}
                                onPress={() => nav(item)}
                            />
                        )
                    }}
                />

            </View>
        )
    }

    function renderCategoryHeader () {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                    marginHorizontal: SIZES.padding
                }}
            >
                {/* Section Title */}
                <Text
                    style={{
                        flex: 1,
                        ...FONTS.h2
                    }}
                >
                    Тренировки
                </Text>

                {/* View All */}
                <TouchableOpacity>
                    <Text
                        style={{
                            color: COLORS.gray,
                            ...FONTS.body4
                        }}
                    >
                        Показать все
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <FlatList
                data={filteredWorkoutRand}
                keyExtractor={item => '${item.id'}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderHeader()}

                        {/* Search Bar */}
                        {renderSearchBar()}

                        {/* See Recipe Card */}
                        {renderSeeRecipeCard()}

                        {/* Trending Section */}
                        {renderTrendingSection()}

                        {/* Category Header */}
                        {renderCategoryHeader()}
                    </View>
                }
                renderItem={({item}) => {
                    return (
                        <CategoryCard
                            containerStyle={{
                                marginHorizontal: SIZES.padding
                            }}
                            categoryItem={item}
                            onPress={() => navigation.navigate
                            ("Recipe", { recipe: item })}
                        />
                    )
                }}
                ListFooterComponent={
                    <View
                        style={{
                            marginBottom: 100
                        }}
                    />
                }
            />

        </SafeAreaView>
    )
}

export default Home;