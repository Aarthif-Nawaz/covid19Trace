import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

function TermsAndConditions({ navigation }) {

    const [accepted, setAccepted] = React.useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>How COVID TRACE Works</Text>
            <ScrollView
                style={styles.tcContainer}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setAccepted(true)
                    }
                }}
            >
                <Text style={styles.tcP}>This information is encrypted
                and only stored in your phone.
                If you test positive to COVID-19 as a
                covid Trace user, a state or territory health
                official will contact you. They will assist with
                voluntary upload of your contact data to a
                highly secure information storage system.
                State or territory health officials can also
                    contact you if you came in close contact with another covid Trace user who tested positive.</Text>
                <Text style={styles.tcP}>It is important that you read the covid Trace
                privacy policy before you register for
                covid Trace.
                If you are under 16 years of age, your parent/
                guardian must also read the
                Use of covid Trace is completely voluntary.
                You can install or delete the application at any
                time. If you delete covid Trace, you may also
                ask for your information to be deleted from the
                secure server.
                To register for covid Trace, you will need to
                    enter only your mobile number</Text>
                <Text style={styles.tcL}>{'\u2022'} For Emergency Services Contact :-1999 </Text>
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate('Telephone')} style={styles.button}><Text style={styles.buttonLabel}>Next</Text></TouchableOpacity>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = {

    container: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        alignSelf: 'center'
    },
    tcP: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 18
    },
    tcP: {
        marginTop: 20,
        fontSize: 18
    },
    tcL: {
        fontStyle:'italic',
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 10,
        fontSize: 17
    },
    tcContainer: {
        marginTop: 15,
        marginBottom: 15,
        height: height * .7
    },

    button: {
        backgroundColor: '#136AC7',
        borderRadius: 5,
        padding: 10
    },

    buttonDisabled: {
        backgroundColor: '#999',
        borderRadius: 5,
        padding: 10
    },

    buttonLabel: {
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center'
    }

}

export default TermsAndConditions;