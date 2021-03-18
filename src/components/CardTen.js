import React, { Component } from "react";
import {
    Text,
    View,
    Image,
    Dimensions,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";


let screenWidth = Dimensions.get("window").width;
export class CardTen extends Component {
    static defaultProps = {

    }
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        };
    }
    render() {
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        zIndex: 3,
                        alignSelf: "center",
                        width: this.props.width ? screenWidth / 2 - scale(10) : scale(250),
                        height: verticalScale(360),
                        margin: scale(40),
                        borderRadius: 45,
                        elevation: 40,
                        shadowColor: "#888",
                        shadowOpacity: 0.16,
                        shadowRadius: 10,
                        shadowOffset: {
                            height: 1,
                            width: 0
                        },

                        borderRadius: 50,
                        backgroundColor: "#ffffff",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <View style={{ flexDirection: "column" }}>
                        <Image
                            source={this.props.image}
                            borderRadius={20}
                            style={{
                                width: this.props.width
                                    ? scale(this.props.width - 20)
                                    : scale(230),
                                height: this.props.width
                                    ? verticalScale(100)
                                    : verticalScale(100),
                                marginTop: this.props.width
                                    ? verticalScale(11)
                                    : verticalScale(0),
                                alignSelf: "center"
                            }}
                        />
                        <View
                            style={{
                                width: this.props.width
                                    ? scale(this.props.width - 0)
                                    : scale(224),
                                justifyContent: "center",
                                alignItems: "flex-start",
                                padding: scale(10),
                                marginBottom: scale(5)
                            }}
                        >
                            <Text
                                style={{
                                    color: "#404852",
                                    fontSize: verticalScale(15),
                                    fontWeight: "700",
                                    letterSpacing: -0.36
                                }}
                            >
                                {this.props.title}
                            </Text>
                            <Text
                                style={{
                                    color: "#adb3bf",
                                    fontSize: scale(12),
                                    fontWeight: "400",
                                    letterSpacing: -0.29,
                                    lineHeight: scale(20)
                                }}
                            >
                                {this.props.subTitle}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}