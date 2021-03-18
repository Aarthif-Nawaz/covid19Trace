  
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";


let screenWidth = Dimensions.get("window").width;

export class CardNine extends Component {
    static defaultProps={
  
    }
    constructor(props) {
      super(props);
      this.state = {
        count: 1,
        image: {
          uri:
          "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        }
      };
    }
    render() {
      return (
        <View
          style={{
            margin: scale(25),
            alignSelf: "flex-end",
            width: screenWidth-175,
            height: verticalScale(165),
            borderRadius: 12,
            elevation: 50,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 4,
            shadowOffset: {
              height: 1,
              width: 0
            },
            borderRadius: 50,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "flex-start"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={this.props.image}
              borderRadius={10}
              style={{
                width: scale(130),
                height: verticalScale(150),
                marginLeft: scale(-20)
              }}
            />
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                padding: scale(10)
              }}
            >
              <Text
                style={{
                  height: verticalScale(20),
                  color: "#404852",
                  marginTop: scale(25),
                  fontSize: scale(18),
                  fontWeight: "700",
                  letterSpacing: -0.36,
                  lineHeight: scale(20)
                }}
              >
                {this.props.title}
              </Text>
              <Text
                style={{
                  width: scale(150),
                  color: "#adb3bf",
                  textAlign: "justify",
                  fontSize: 18,
                  fontWeight: "600",
                  letterSpacing: -0.29,
                  lineHeight: scale(16),
                  marginTop: scale(12),
                  marginBottom: scale(10)
                }}
              >
                {this.props.subTitle}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }