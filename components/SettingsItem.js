import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {COLORS, FONTS, SIZES} from "../constants";


function SettingsItem({text1, text2, opacityText, onPress}) {
    return(
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
                        {text1}
                    </Text>

                    {text2 !== 0 ?
                        <Text
                            style={{
                                paddingTop: SIZES.radius,
                                paddingBottom: 18,
                                paddingHorizontal: SIZES.radius * 1.5,
                                color: COLORS.black,
                                ...FONTS.body4
                            }}
                        >
                            {text2}
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
                    onPress={() => onPress}
                >



                        <Text
                            style={{
                                paddingTop: SIZES.radius * 1.2,
                                paddingRight: SIZES.radius * 2,
                                color: COLORS.lime,
                                ...FONTS.h4
                            }}
                        >{opacityText}</Text>


                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SettingsItem