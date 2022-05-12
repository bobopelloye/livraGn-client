import React, { Component } from "react";
import { SafeAreaView, View, StatusBar, Dimensions, Animated, BackHandler, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios'
const { height } = Dimensions.get('screen');
import {AsyncStorage} from 'react-native';
class SigninScreen extends Component {

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    login = () => {
         console.log('clicked');

        let data = JSON.stringify({
            username: this.state.username,
            password: this.state.password
          });
          this.setState({redirect: true})

          console.log('value', data)
        if (this.state.username.length && this.state.password.length) {
            axios.post('http://164.92.231.252/login/',
                  data,{headers:{"Content-Type" : "application/json"}})
                 .then(response => {
                    console.log('success', response.data)
                    this.storeData(`token ${response.data.token}`);
                    this.getstoreData();
                 })
                 .catch(error => console.log('error', error))
        }
        else {
            console.log('inputs empty')
        }
    }

    storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', value)
        } catch (e) {
          // saving error
          console.log('error stored data', e)
        }
    }
    
    getstoreData = async () => {
        try {
            const t = await AsyncStorage.get('token')
            console.log('token here', t);
        } catch (e) {
            console.log('error get data',e)
        }
    }

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.04 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }

    state = {
        backClickCount: 0,
        redirect: false,
        username: '',
        password: ''
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <View style={{ flex: 1, }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}>
                        {this.appLogo()}
                        {this.signinText()}
                        {this.emailAddressTextField()}
                        {this.passwordTextField()}
                        {this.continueButton()}
                        {this.otpInfo()}
                        {this.logionWithGoogleButton()}
                    </ScrollView>
                </View>
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor16Regular }}>
                        Appuyez à nouveau sur Retour pour quitter.
                    </Text>
                </Animated.View>
                <Text>
                    {this.state.redirect ? this.props.navigation.push('Signin'): ""}
                </Text>
                
            </SafeAreaView>
        )
    }

    otpInfo() {
        return (
            <Text style={{
                ...Fonts.grayColor15Medium,
                textAlign: 'center',
                marginTop: Sizes.fixPadding * 5.0,
                marginBottom: Sizes.fixPadding * 1.0,
            }}>
                Vous n'avez pas du compte?
            </Text>
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.login()}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    se connecter
                </Text>
            </TouchableOpacity>
        )
    }

    mobileNumberTextField() {
        return (
            <IntlPhoneInput
                onChangeText={({ phoneNumber }) => this.setState({ phoneNumber: phoneNumber })}
                defaultCountry="GN"
                containerStyle={styles.phoneNumberWrapStyle}
                dialCodeTextStyle={{ ...Fonts.blackColor16Medium }}
                phoneInputStyle={{ flex: 1, marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Medium }}
                placeholder="Numero de telephone"
                dialCodeTextStyle={{ ...Fonts.blackColor16Medium }}
            />
        )
    }

    logionWithGoogleButton() {
        return (
            <View style={styles.loginWithGoogleButtonStyle}>
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('Register')}
                >
                <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding * 2.0 }}>
                    Creer votre compte
                </Text>
                </TouchableOpacity>
            </View >
        )
    }


    signinText() {
        return (
            <Text style={{
                textAlign: 'center',
                ...Fonts.grayColor17Medium
            }}>
                Se connecter
            </Text>
        )
    }

    appLogo() {
        return (
            <Image
                source={require('../../assets/images/login-icon.png')}
                style={styles.appLogoStyle}
                resizeMode="contain"
            />
        )
    }

    emailAddressTextField() {
        return (
            <TextInput
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
                placeholder="Adresse mail"
                selectionColor={Colors.primaryColor}
                placeholderTextColor={Colors.grayColor}
                style={styles.textFieldStyle}
            />
        )
    }
    passwordTextField() {
        return (
            <TextInput
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                secureTextEntry={true}
                placeholder="Mot de passe *"
                selectionColor={Colors.primaryColor}
                placeholderTextColor={Colors.grayColor}
                style={styles.textFieldStyle}
            />
        )
    }
}

const styles = StyleSheet.create({
    loginWithGoogleButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0
    },
    loginWithFacebookButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B5998',
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginBottom: Sizes.fixPadding * 2.5,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0
    },
    phoneNumberWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 4.0,
    },
    appLogoStyle: {
        width: 200.0,
        height: 150.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding * 4.0,
    },
    animatedView: {
        backgroundColor: Colors.blackColor,
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        justifyContent: "center",
        alignItems: "center",
    },

    textFieldStyle: {
        ...Fonts.blackColor17Medium,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 0.30,
        marginVertical: Sizes.fixPadding
    },

})

SigninScreen.navigationOptions = () => {
    return {
        header: () => null,
    }
}

export default withNavigation(SigninScreen);