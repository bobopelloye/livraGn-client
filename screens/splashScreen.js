import React, { Component } from "react";
import { SafeAreaView, View, Image, StatusBar } from "react-native";
import { Colors } from "../constants/styles";
import { Bounce } from 'react-native-animated-spinkit'
import { withNavigation } from "react-navigation";

class SplashScreen extends Component {
    render() {

        setTimeout(() => {
            this.props.navigation.navigate('Onboarding');
        }, 2000);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image
                        source={require('../assets/images/login-icon.png')}
                        style={{ width: 200.0, height: 150.0, alignSelf: 'center' }}
                        resizeMode="contain"
                    />
                    <Bounce size={40} color={Colors.primaryColor}
                        style={{ alignSelf: 'center', }}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export default withNavigation(SplashScreen);