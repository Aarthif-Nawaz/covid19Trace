import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Button, SafeAreaView, StyleSheet } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/HelperFunctions'
import CardView from 'react-native-cardview'
import axios from 'axios'
import { CardThree } from "react-native-card-ui";
import { CardNine} from '../components/CardNine'
import Icon from 'react-native-vector-icons/MaterialIcons';
import AnimatedLoader from "react-native-animated-loader";
export default function LocalCases({ navigation }) {
    const myicon = <Icon name="coronavirus" size={30} color="#900" />;
    const [cases, setCases] = useState([])
    const [visible,setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
        fetch('https://www.hpb.health.gov.lk/api/get-current-statistical', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(data => {
                setVisible(false)
                setCases(data.data)
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
                <Text style={styles.headerText}>Fetching Latest Cases ....</Text>
            </AnimatedLoader>
            <CardView cardElevation={30}
                cornerRadius={10} style={styles.card}>
                <Text style={styles.headerText}> Local Cases </Text>
                <ScrollView style={{ flex: 1, }}>
                    <CardNine
                        title={"Total Cases"}
                        subTitle={String(cases.local_total_cases)}
                        image={{
                            uri:
                                "https://media.nationalgeographic.org/assets/photos/569/648/2adb092b-1726-4e56-a0dd-30056756ddae.jpg"
                        }}
                    />
                     <CardNine
                        title={"New Cases"}
                        subTitle={String(cases.local_new_cases)}
                        image={{
                            uri:
                                "https://media.nationalgeographic.org/assets/photos/569/648/2adb092b-1726-4e56-a0dd-30056756ddae.jpg"
                        }}
                    />
                    <CardNine
                        title={"Active Cases"}
                        subTitle={String(cases.local_active_cases)}
                        image={{
                            uri:
                                "https://media.nationalgeographic.org/assets/photos/569/648/2adb092b-1726-4e56-a0dd-30056756ddae.jpg"
                        }}
                    />
                    <CardNine
                        title={"Deaths"}
                        subTitle={String(cases.local_deaths)}
                        image={{
                            uri:
                                "https://media.nationalgeographic.org/assets/photos/569/648/2adb092b-1726-4e56-a0dd-30056756ddae.jpg"
                        }}
                    />
                    <CardNine
                        title={"Recovered"}
                        subTitle={String(cases.local_recovered)}
                        image={{
                            uri:
                                "https://media.nationalgeographic.org/assets/photos/569/648/2adb092b-1726-4e56-a0dd-30056756ddae.jpg"
                        }}
                    />
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
        marginTop: 45,
        fontFamily: "Oswald-Bold"
    },
    card: {
        height: SCREEN_HEIGHT * 0.7,
        width: SCREEN_WIDTH * 0.85,
        marginBottom: SCREEN_HEIGHT * 0.03,
        marginTop: SCREEN_HEIGHT * 0.05,
        marginLeft: SCREEN_WIDTH * 0.075
    }
})