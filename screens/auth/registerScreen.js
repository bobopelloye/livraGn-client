import React, { Component } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

class RegisterScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    state = {
        full_name: '',
        password: '',
        email: '',
        phone: '',
    }

    submit = () => {

        let data = JSON.stringify({
            full_name: this.state.full_name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
            });
            this.setState({redirect: true})

            console.log('value', data)
        if ( this.state.full_name.length && this.state.password.length && this.state.email.length && this.state.phone.length) {
            console.log('enter', data);
            
            axios.post('https://livragn.com/users/',
                    data,
                    {headers:{"Content-Type" : "application/json"}})
                    .then(response => {
                    console.log('success', response.data)
                    if (response.data) {
                        this.props.navigation.navigate('BottomTabBar');
                    }
                    })
                    .catch(error => console.log('error', error))
        }
        else {
            console.log('inputs empty')
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, }}>
                    {this.backArrow()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
                    >
                        {this.appLogo()}
                        {this.registerText()}
                        {this.fullNameTextField()}
                        {this.phoneTextField()}
                        {this.emailAddressTextField()}
                        {this.passwordTextField()}
                        {this.continueButton()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.submit()}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Creer votre compte
                </Text>
            </TouchableOpacity>
        )
    }

    

    
    fullNameTextField() {
        return (
            <TextInput
                value={this.state.full_name}
                onChangeText={(text) => this.setState({ full_name: text })}
                placeholder="Nom complet *"
                selectionColor={Colors.primaryColor}
                placeholderTextColor={Colors.grayColor}
                style={styles.textFieldStyle}
            />
        )
    }

    phoneTextField() {
        return (
            <TextInput
                value={this.state.phone}
                onChangeText={(text) => this.setState({ phone: text })}
                placeholder="Numero de telephone *"
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

    emailAddressTextField() {
        return (
            <TextInput
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
                placeholder="Adresse mail *"
                selectionColor={Colors.primaryColor}
                placeholderTextColor={Colors.grayColor}
                style={styles.textFieldStyle}
            />
        )
    }

    registerText() {
        return (
            <Text style={{ marginBottom: Sizes.fixPadding + 8.0, textAlign: 'center', ...Fonts.grayColor17Medium }}>
                Completer votre compte
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

    backArrow() {
        return (
            <MaterialIcons name="arrow-back" size={24} color="black"
                style={{ padding: Sizes.fixPadding * 2.0, }}
                onPress={() => this.props.navigation.pop()}
            />
        )
    }
}

const styles = StyleSheet.create({
    appLogoStyle: {
        width: 200.0,
        height: 150.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding * 2.5,
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
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding
    },

})

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null,
    }
}

export default withNavigation(RegisterScreen);