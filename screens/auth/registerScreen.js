import React, { Component } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

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
        fullName: '',
        password: '',
        email: '',
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
                        {this.passwordTextField()}
                        {this.emailAddressTextField()}
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
                onPress={() => this.props.navigation.push('Verification')}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    

    
    fullNameTextField() {
        return (
            <TextInput
                value={this.state.fullName}
                onChangeText={(text) => this.setState({ fullName: text })}
                placeholder="Nom complet *"
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
                placeholder="Adresse mail"
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