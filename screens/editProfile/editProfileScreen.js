import React, { useState } from "react";
import { Text, View, StatusBar, Image, TouchableOpacity, BackHandler, TextInput, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { Dimensions } from "react-native";
import { BottomSheet } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';
import { Component } from "react";
import { withNavigation } from "react-navigation";
import axios from 'axios'

import { AsyncStorage } from 'react-native';

const { width } = Dimensions.get("screen");

class EditProfileScreen extends Component {

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

    render() {
        return (
            <EditProfile navigation={this.props.navigation} />
        )
    }
}

const EditProfile = ({ navigation }) => {

     React.useEffect(() => {
        getUser();
        console.log('user current', navigation.getParam('userCurrent'))
    }, []);

    const [currentUser, setCurrentUser] = useState({});
    const [fullNameDialog, setFullnameDialog] = useState(false);
    const [fullName, setFullName] = useState(currentUser?currentUser.fullName: "");
    const [changeText, setChangeText] = useState(fullName);

    const [passwordDialog, setPasswordDialog] = useState(false);
    const [password, setPassword] = useState(currentUser.password);
    const [changePassword, setChangePassword] = useState(password);

    const [phoneDialog, setPhoneDialog] = useState(false);
    const [phone, setPhone] = useState(currentUser.phone);
    const [changePhone, setChangePhone] = useState(phone);

    const [emialDialog, setEmailDialog] = useState(false);
    const [email, setEmail] = useState(currentUser?currentUser.email: "");
    const [changeEmail, setChangeEmail] = useState(email);

    const [isBottomSheet, setIsBottomSheet] = useState(false);

   

    const getUser = async () => {
        const t = await AsyncStorage.getItem('token')
        axios.get('https://livragn.com/profile', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": t
            },      
        })      
        .then((response) => {
          console.log('current user',response.data)
          setCurrentUser(response.data)
        })
        .catch((error) => {
          console.log('error',error.response)
        })
    }

    const SaveProfile = () => {
        console.log('full name', fullName);
        console.log('email', email)
        console.log('phone', phone)

        navigation.pop()
    }

    function backArrowAndSave() {
        return (
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons name="arrow-back-outline" size={24} color="black"
                    onPress={SaveProfile}
                />

                <TouchableOpacity activeOpacity={0.9} onPress={() => SaveProfile()}>
                    <Text style={{ ...Fonts.blueColor17Medium }}>
                        Enregistrer
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function profilePhoto() {
        return (
            <View style={styles.profilePhotoWrapStyle}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{ uri: navigation.getParam('userCurrent').avatar }}
                        style={styles.profilePhotoStyle}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setIsBottomSheet(true)}
                        style={styles.addPhotoContainerStyle}>
                        <Ionicons name="ios-add" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const  updateProfil = async (name, value) => {
        const t = await AsyncStorage.getItem('token')
        const nameValue = {}
        nameValue[name] = value;
        nameValue['password'] = navigation.getParam('userCurrent').password;
        nameValue['email'] = navigation.getParam('userCurrent').email;
        console.log('value', nameValue)
        axios.put(`https://livragn.com/users/${navigation.getParam('userCurrent').id}`,
         {
            "full_name":nameValue[name],
            "password":nameValue['password'],
            "email":nameValue['email'],
         },
        {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": t
            },      
        })      
        .then((response) => {
          console.log('current user',response.data)
          setCurrentUser(response.data)
          setFullnameDialog(false)
        })
        .catch((error) => {
          console.log('error',error.response)
        })
    }

    function formData({ title, value }) {
        return (
            <View style={styles.formDataContainerStyle}>
                <View style={{ width: width / 3.0, }}>
                    <Text style={{ ...Fonts.grayColor16Medium }}>{title}</Text>
                </View>
                <View style={{
                    flexDirection: "row", justifyContent: 'space-between', width: width / 1.85
                }}>
                    <Text style={{ ...Fonts.blackColor17Medium, }}>{value}</Text>
                    <Feather name="chevron-right" size={24} color={Colors.grayColor} />
                </View>
            </View>
        )
    }

    function editFullNameDialog() {
        return (
            <Dialog.Container visible={fullNameDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor18Medium, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Changer le nom complet
                    </Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={changeText}
                            onChangeText={(value) => setChangeText(value)}
                            style={{ ...Fonts.blackColor16Medium, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0
                    }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setFullnameDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16Medium }}>annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} 
                        onPress={() => {
                            updateProfil('full_name', changeText)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Medium }}>ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function editPasswordDialog() {
        return (
            <Dialog.Container visible={passwordDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor18Medium, paddingBottom: Sizes.fixPadding * 3.0, }}>
                        Changer le mot de passe
                    </Text>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%',
                    }}>
                        <TextInput
                            style={{ ...Fonts.blackColor16Medium, paddingBottom: Sizes.fixPadding }}
                            placeholder='Ancien mot de passe'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%', marginTop: Sizes.fixPadding, }}>
                        <TextInput
                            onChangeText={(value) => setChangePassword(value)}
                            style={{ ...Fonts.blackColor16Medium, paddingBottom: Sizes.fixPadding }}
                            placeholder='Nouveau mot de passe'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '100%',
                        marginTop: Sizes.fixPadding,
                    }}>
                        <TextInput
                            style={{ ...Fonts.blackColor16Medium, paddingBottom: Sizes.fixPadding }}
                            placeholder='Confirme nouveau mot de passe'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setPasswordDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                setPasswordDialog(false)
                                setPassword(changePassword);
                            }}
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Medium }}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function editPhoneDialog() {
        return (
            <Dialog.Container visible={phoneDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor18Medium, paddingBottom: Sizes.fixPadding * 3.0, }}>Changer le numero de telephone</Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={changePhone}
                            onChangeText={(value) => setChangePhone(value)}
                            style={{ ...Fonts.blackColor16Medium, paddingBottom: Sizes.fixPadding }}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20.0 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setPhoneDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16Medium }}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setPhoneDialog(false)
                            setPhone(changePhone)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Medium }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function editEmailDialog() {
        return (
            <Dialog.Container visible={emialDialog}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor18Medium, paddingBottom: Sizes.fixPadding * 3.0, }}>Changer Email</Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1.0, width: '100%' }}>
                        <TextInput
                            value={changeEmail}
                            onChangeText={(value) => setChangeEmail(value)}
                            style={{ ...Fonts.blackColor16Medium, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setEmailDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16Medium }}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setEmailDialog(false)
                            setEmail(changeEmail)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Medium }}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function showBottomSheet() {
        return (
            <BottomSheet
                isVisible={isBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setIsBottomSheet(false)}
                    style={styles.bottomSheetStyle}
                >

                    <Text style={{ ...Fonts.blackColor19Medium, textAlign: 'center', marginBottom: Sizes.fixPadding * 2.0 }}>
                        changer la photo
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-camera" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                            Uploader la photo
                        </Text>
                    </View>

                </TouchableOpacity>
            </BottomSheet>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrowAndSave()}
                {profilePhoto()}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setFullnameDialog(true)
                        setChangeText(fullName);
                    }}
                >
                    {formData({ title: 'Nom complet', value: navigation.getParam('userCurrent').full_name })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setPasswordDialog(true)
                        setChangePassword(password);
                    }}
                >
                    {formData({ title: 'Mot de passe', value: '******' })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setChangePhone(phone);
                        setPhoneDialog(true);
                    }}
                >
                    {formData({ title: 'Telephone', value: navigation.getParam('userCurrent').phone })}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setChangeEmail(email);
                        setEmailDialog(true)
                    }}
                >
                    {formData({ title: 'Email', value: navigation.getParam('userCurrent').email })}
                </TouchableOpacity>
                {editFullNameDialog()}
                {editPasswordDialog()}
                {editPhoneDialog()}
                {editEmailDialog()}
                {showBottomSheet()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backArrowAndSaveContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding,
        marginTop: Sizes.fixPadding + 5.0
    },
    addPhotoContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1.0,
        backgroundColor: '#FF9800',
        height: 25.0, width: 25.0,
        borderRadius: Sizes.fixPadding + 2.0,
        position: 'absolute',
        bottom: 5.0,
        right: 5.0,
    },
    profilePhotoWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50.0,
        marginBottom: Sizes.fixPadding * 3.0
    },
    formDataContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: Sizes.fixPadding - 5.0,
        height: 65.0,
        borderColor: '#F6F6F6',
        elevation: 1,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        borderWidth: 1.0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    okButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    },
    profilePhotoStyle: {
        height: 100.0,
        width: 100.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
    }
})

EditProfileScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(EditProfileScreen);