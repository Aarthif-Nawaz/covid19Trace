import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/HelperFunctions'
import CardView from 'react-native-cardview'
import axios from 'axios'
import { CardThree } from "react-native-card-ui";
import { CardTen } from '../components/CardTen'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { cos } from 'react-native-reanimated';

export default function Newsscreen({ navigation }) {
    const myicon = <Icon name="coronavirus" size={30} color="#900" />;
    const [cases, setCases] = useState([])
    const[visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
        fetch('https://cvid-trace.herokuapp.com/news', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(data => {
                setVisible(false)
                setCases(data)
                console.log(data)
            })
    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#E3E3E3" }}>
            <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../Assets/loading.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
                <Text style={styles.headerText}>Fetching Latest News ....</Text>
            </AnimatedLoader>
            <CardView cardElevation={30}
                cornerRadius={10} style={styles.card}>
                <Text style={styles.headerText}> News </Text>
                <ScrollView style={{ flex: 1, }}>
                    {cases.map((news, index) => (
                        <View key={index}>
                            <CardTen

                                title={news['title']}
                                subTitle={news['news']}
                                image={{
                                    uri:
                                        "https://www.newsradio.lk/wp-content/uploads/2021/01/Breaking-news-4.jpg"
                                }}
                            />
                        </View>
                    ))}
                </ScrollView>
            </CardView>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    lottie: {
        width: 200,
        height: 200
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 40,
        fontFamily: "Oswald-Bold"
    },
    card: {
        height: SCREEN_HEIGHT * 0.75,
        width: SCREEN_WIDTH * 0.85,
        marginBottom: SCREEN_HEIGHT * 0.03,
        marginTop: SCREEN_HEIGHT * 0.04,
        marginLeft: SCREEN_WIDTH * 0.075
    }
})