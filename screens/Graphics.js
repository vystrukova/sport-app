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

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { FONTS, COLORS, SIZES, icons, images} from "../constants";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "../kotik/firebase";

const Graphics = ({navigation}) => {

    const [ workoutDays, setWorkoutDays ] = useState([])
    const [ workoutDaysCount, setWorkoutDaysCount ] = useState([])
    const [ load, setLoad ] = useState(false)
    const options = [{name:'Январь', flow:1},{name:'Февраль', flow:2},{name:'Март', flow:3},{name:'Апрель', flow:4},{name:'Май', flow:5},{name:'Сентябрь', flow:9},{name:'Октябрь', flow:10},{name:'Ноябрь', flow:11},{name:'Декабрь', flow:12}]

    const getWorkoutDays = async () => {
        const workoutDaysCol = collection(db, "workoutDays")
        const q = query(workoutDaysCol, where("userEmail", "==", auth.currentUser.email))
        const workoutDaysDocs = await getDocs(q)
        const workoutDay = workoutDaysDocs.docs.map((doc) => ({
            ...doc.data(),month: new Date(doc.data().date.seconds * 1000).getMonth()+1,id:doc.id
        }))
        setWorkoutDays(workoutDay)
        const counting = []
        options.map((opt) =>{
            let count = 0
            workoutDay.map((att) => {
                if (opt.flow === att.month){
                    count = count + 1
                }
            })
            counting.push(count)
        })
        setWorkoutDaysCount(counting)
        console.log(workoutDaysCount)
    }

    useEffect(() => {
        getWorkoutDays()
    },[load])



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <View
                style={{
                    height: 70,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: 40
                }}
            >
                <Text
                    style={{
                        marginLeft: 10,
                        color: COLORS.black,
                        ...FONTS.h2
                    }}
                >График тренировок</Text>
                <TouchableOpacity
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10
                    }}
                    onPress={() => setLoad(true)}
                >
                    <Image source={icons.sync}
                           style={{
                               width: "100%",
                               height: "100%",
                           }}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    marginVertical: 0
                }}
            >
                <View
                    style={{
                        alignSelf: "center",
                        alignItems: "center",
                        width: "95%",
                        height: 300,

                    }}
                >
                    {
                        workoutDaysCount.length>0?
                            <LineChart
                                data={{
                                    labels: ["Янв", "Фев", "Март", "Апр", "Май", "Сент", "Окт", "Нояб", "Дек"],
                                    datasets: [
                                        {
                                            data:[
                                                workoutDaysCount[0],
                                                workoutDaysCount[1],
                                                workoutDaysCount[2],
                                                workoutDaysCount[3],
                                                workoutDaysCount[4],
                                                workoutDaysCount[5],
                                                workoutDaysCount[6],
                                                workoutDaysCount[7],
                                                workoutDaysCount[8]
                                            ]
                                        }
                                    ]
                                }}
                                width={380} // from react-native
                                height={220}

                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: COLORS.lime,
                                    backgroundGradientFrom: COLORS.blue,
                                    backgroundGradientTo: COLORS.lime,
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: COLORS.darkGreen
                                    }
                                }}
                                bezier
                                style={{

                                    borderRadius: 16
                                }}
                            />:
                            null
                    }

                </View>
            </View>
        </View>
    )
}

export default Graphics;