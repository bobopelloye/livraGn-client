import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    BackHandler,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import Dialog from "react-native-dialog";
import { Bounce } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('screen');

class VerificationScreen extends Component {

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
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding }}
                >
                    {this.backArrow()}
                    {this.verificationInfo()}
                    {this.otpFields()}
                    {this.resendInfo()}
                    {this.submitButton()}
                </ScrollView>
                {this.loading()}
            </SafeAreaView >
        )
    }

    backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.blackColor}
                style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                onPress={() => this.props.navigation.pop()}
            />
        )
    }

    loading() {
        return (
            <Dialog.Container
                visible={this.state.isLoading}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ marginTop: Sizes.fixPadding + 5.0, backgroundColor: 'white', alignItems: 'center', }}>
                    <Bounce size={50} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor16Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Veuillez patienter...
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ isLoading: true })
                    setTimeout(() => {
                        this.setState({ isLoading: false })
                        this.props.navigation.navigate('BottomTabBar');
                    }, 2000);
                }}
                style={styles.submitButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Verifier
                </Text>
            </TouchableOpacity>
        )
    }

    resendInfo() {
        return (
            <View style={styles.resendInfoWrapStyle}>
                <Text style={{ ...Fonts.grayColor15Medium }}>
                    je ne pas reçu le code OTP !
                </Text>
                <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                    Renvoyer
                </Text>
            </View>
        )
    }

    otpFields() {
        return (
            <View style={styles.otpFieldsContentStyle}>
                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        value={this.state.firstDigit}
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding }}
                        onChangeText={(text) => {
                            this.setState({ firstDigit: text })
                            this.secondTextInput.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        value={this.state.secondDigit}
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding }}
                        ref={(input) => { this.secondTextInput = input; }}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            this.setState({ secondDigit: text })
                            this.thirdTextInput.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding }}
                        keyboardType="numeric"
                        value={this.state.thirdDigit}
                        ref={(input) => { this.thirdTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ thirdDigit: text })
                            this.forthTextInput.focus();
                        }}

                    />
                </View>

                <View style={styles.textFieldContentStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        style={{ ...Fonts.blackColor17Medium, paddingLeft: Sizes.fixPadding }}
                        keyboardType="numeric"
                        value={this.state.forthDigit}
                        ref={(input) => { this.forthTextInput = input; }}
                        onChangeText={(text) => {
                            this.setState({ forthDigit: text })
                            this.setState({ isLoading: true })
                            setTimeout(() => {
                                this.setState({ isLoading: false })
                                this.props.navigation.navigate('BottomTabBar');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    verificationInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 2.5,
                marginBottom: Sizes.fixPadding * 2.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                <Text style={{ paddingBottom: Sizes.fixPadding, ...Fonts.blackColor22Medium }}>
                    Verification
                </Text>
                <Text style={{
                    ...Fonts.grayColor15Medium,
                    lineHeight: 22.0,
                }}>
                    Entrez le code OTP que nous venons de vous envoyer par SMS.
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    otpFieldsContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldContentStyle: {
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButtonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding * 3.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingBottom: Sizes.fixPadding * 3.0,
    },
    resendInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.fixPadding * 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    }
})

VerificationScreen.navigationOptions = () => {
    return {
        header: () => null,
    }
}

export default withNavigation(VerificationScreen);