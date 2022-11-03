import React from "react";
import { Component } from "react";
import { SafeAreaView, BackHandler, View, StatusBar, StyleSheet, Dimensions, FlatList, ScrollView, TextInput, Text, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { TransitionPresets } from "react-navigation-stack";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import axios from 'axios'
import { AsyncStorage } from 'react-native';
import Loader from '../../components/loader'

const { width } = Dimensions.get('screen');

const paymentMethods = [
    {
        id: '1',
        image: '',
        number: '**** **** **** *316',
    },
    {
        id: '2',
        image: '',
        number: '**** **** **** *316',
    }
];

class ConfirmOrderScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        console.log('monted ', this.props.navigation.getParam('platSelected'))
        if (this.props.navigation.getParam('platSelected')) {
             console.log('monted :', this.props.navigation.getParam('platSelected', 'NO defined'))
        this.AddPanier(this.props.navigation.getParam('platSelected'), this.props.navigation.getParam('qty'))
        }
        else {
            this.showPanier()
        }
        
        console.log('monted ', this.props.navigation.getParam('platSelected'))
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    async showPanier () {
        const t = await AsyncStorage.getItem('token')
        let platInPanier = [];
        let quantity = [];
        let total = 0;

        axios.get('https://livragn.com/panier/',
        {
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `${t}`
          },      
         })      
      .then((response) => {
        console.log('data panier', response.data.results[0]['plats'].length)
        if (response.data.results[0]['plats'].length) {
            for (let i = 0; i < response.data.results[0]['plats'].length; i++) {
                const element = response.data.results[0]['plats'][i];
                 quantity.push(element.quantity)
                 this.setState({quantity})
                axios.get(`https://livragn.com/plat/${element.plat}`,
                {
                  headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `${t}`
                  },      
                 })      
              .then((resp) => {
                console.log('element', element.quantity)
                total += resp.data.price * element.quantity
                console.log('price total',total)
                platInPanier.push(resp.data)
                this.setState({total})

                console.log('panier arr',platInPanier)
                this.setState({panier: platInPanier})
              })
              .catch((error) => {
                console.log('error',error)
        
              })
            }
            
        }
      })
      .catch((error) => {
        console.log('error',error.response)

      })
    }

     async AddPanier(plat, qty) {
        const t = await AsyncStorage.getItem('token')
        let platInPanier = [];
        let quantity = [];
        let total = 0;

        axios.post('https://livragn.com/panier/add/',
        {
            "plats": [{
                "quantity": qty,
                "plat": this.props.navigation.getParam('platSelected').id
            }]
        },
        {
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `${t}`
          },      
         })      
      .then((response) => {
        // console.log('response panier success', response.data)
        // console.log('length panier', response.data.data.length)
        if (response.data.data.length) {
            for (let i = 0; i < response.data.data.length; i++) {
                const element = response.data.data[i];
                 quantity.push(element.quantity)
                 this.setState({quantity})
                axios.get(`https://livragn.com/plat/${element.plat_id}`,
                {
                  headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `${t}`
                  },      
                 })      
              .then((resp) => {
                console.log('element', element.quantity)
                total += resp.data.price * element.quantity
                console.log('price total',total)
                platInPanier.push(resp.data)
                this.setState({total})

                console.log('panier arr',platInPanier)
                this.setState({panier: platInPanier})
              })
              .catch((error) => {
                console.log('error',error.response)
        
              })
            }
            
        }
      })
      .catch((error) => {
        console.log('error',error.response)

      })
    }

    state = {
        voucherFocus: false,
        currentPaymentIndex: paymentMethods[0].id,
        showSuccessDialog: false,
        showErrorDialog: false,
        panier: [],
        quantity: [],
        total: 0,
        address: '',
        visible: false,
        addressIsValide: false
    }
    
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <Loader isVisible={this.state.visible}/>
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {/* {this.deliveryToInfo()} */}
                        {/* {this.deliveryTimeInfo()} */}
                        {
                            this.state.panier && this.state.panier.map((plat, index) => (
                                this.orderInfo(plat, this.state.quantity[index])
                            ))
                        }
                        {/* {this.addVoucherInfo()} */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={{ ...Fonts.primaryColor20MediumBold }}>
                                Total
                            </Text>
                            <Text style={{ ...Fonts.primaryColor20MediumBold }}>
                            { this.state.total } FG
                            </Text>
                        </View>
                        {this.noteInfo()}
                        {/* {this.paymentMethod()} */}
                        
                        {this.confirmButton()}
                    </ScrollView>
                    {this.successDialog()}
                    
                </View>
            </SafeAreaView>
        )
    }

    successDialog() {
        return (
            <Dialog.Container
                visible={this.state.showSuccessDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <View style={styles.successIconWrapStyle}>
                        <MaterialIcons name="done" size={35} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding + 5.0 }}>
                        Votre commande a été enregistrée!
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    errorDialog() {
        return (
            <Dialog.Container
                visible={this.state.showErrorDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <View style={styles.successIconWrapStyle}>
                        <MaterialIcons name="done" size={35} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding + 5.0 }}>
                        Votre commande a echoué!
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    async submitOrder () {
        this.setState({visible: true})
        const t = await AsyncStorage.getItem('token');
        if (this.state.address.length) {
             axios.post(`https://livragn.com/order/`,
                {
                    "address" : this.state.address
                },
                {
                  headers: {
                      'Content-Type': 'application/json',
                      "Authorization": `${t}`
                  },      
                 })      
              .then((resp) => {
                this.setState({ showSuccessDialog: true })
                this.setState({visible: false})
                console.log('success');
                this.props.navigation.push('BottomTabBar');
                this.setState({ showSuccessDialog: false })
              })
              .catch((error) => {
                this.setState({visible: false})
                console.log('error',error.response)
              })
        }
        else {
            this.setState({visible: false})
            this.setState({addressIsValide: true})
            console.log('error: addresse doit etre fourni')
        }
       
    }

    confirmButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.submitOrder()}
                style={styles.confirmButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Confirmer votre commande
                </Text>
            </TouchableOpacity>
        )
    }

    paymentMethod() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentPaymentIndex: item.id })}
                style={{
                    ...styles.paymentMethodWrapStyle,
                    borderColor: this.state.currentPaymentIndex == item.id ? Colors.primaryColor : Colors.grayColor,
                }}>
                <Image
                    source={item.image}
                    style={{ width: 50.0, height: 50.0, }}
                    resizeMode="contain"
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor19Medium }}>
                    {item.number}
                </Text>
                {
                    this.state.currentPaymentIndex == item.id
                        ?
                        <View style={styles.paymentMethodSelectorStyle}>
                            <MaterialIcons
                                name="done"
                                size={15}
                                color={Colors.whiteColor}
                            />
                        </View>
                        :
                        null
                }
            </TouchableOpacity>
        )
        return (
            <FlatList
                horizontal
                data={paymentMethods}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: Sizes.fixPadding }}
            />
        )
    }

    noteInfo() {
        return (
            <View>
                <View style={{
                    backgroundColor: Colors.bodyBackColor,
                    padding: Sizes.fixPadding,
                    marginTop: Sizes.fixPadding - 5.0,
                }}>
                </View>
                { this.state.addressIsValide ?<Text style={{ marginLeft: 15, color: 'red'}}>L'adresse est obligatoire</Text>: <Text></Text>}
                <TextInput
                    placeholder="Adresse de livraison *"
                    textAlignVertical = "top"
                    style={{ marginVertical: Sizes.fixPadding, paddingHorizontal: Sizes.fixPadding + 5.0, paddingVertical: Sizes.fixPadding + 5.0,...Fonts.blackColor15Regular, marginHorizontal: Sizes.fixPadding, backgroundColor: Colors.bodyBackColor }}
                    multiline={true}
                    numberOfLines={5}
                    value={this.state.address}
                    onChangeText={(val) => this.setState({address: val})}
                    placeholder="Adresse de livraison *"
                    placeholderTextColor={Colors.grayColor}
                    selectionColor={Colors.primaryColor}    
                />
               
            </View>
        )
    }

    addVoucherInfo() {
        return (
            <View>
                <View style={{
                    backgroundColor: Colors.bodyBackColor,
                    padding: Sizes.fixPadding,
                    marginTop: Sizes.fixPadding
                }}>
                    <Text style={{ ...Fonts.grayColor16Medium }}>
                        Add Voucher
                    </Text>
                </View>
                <View style={styles.addVoucherInfoWrapStyle}>
                    <View style={{ flex: 1, }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                            <MaterialIcons
                                name="local-attraction"
                                color={Colors.primaryColor}
                                size={24}
                            />
                            <TextInput
                                style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.primaryColor14Medium }}
                                placeholder="Add Voucher Code"
                                selectionColor={Colors.primaryColor}
                                placeholderTextColor={Colors.primaryColor}
                                onFocus={() => this.setState({ voucherFocus: true })}
                                onBlur={() => this.setState({ voucherFocus: false })}
                            />
                        </View>
                        <View style={{ backgroundColor: this.state.voucherFocus ? Colors.primaryColor : Colors.grayColor, height: 1.0, }} />
                    </View>
                    <View style={styles.applyButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor14Regular }}>
                            Apply
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    orderInfo(plat, qty) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding, marginTop: Sizes.fixPadding, }}>
                <View style={{ marginBottom: Sizes.fixPadding + 5.0, flexDirection: 'row', alignItems: 'center', }}>
                    <Image
                        source={{uri:plat.image}}
                        style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0 }}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding + 5.0 }}>
                        <Text style={{ ...Fonts.blackColor16Medium }}>
                           { plat.name}
                        </Text>
                        <Text style={{ ...Fonts.grayColor14Medium }}>
                            {plat.restaurant}
                        </Text>

                       
                    </View>

                    <Text style={{ ...Fonts.grayColor14Medium }}>
                    {/* <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>  this.DeleteToPanier()}
                            style={styles.addIconWrapStyle}
                        >
                            <MaterialIcons
                                name="delete"
                                size={17}
                                color={Colors.whiteColor}
                            />
                        </TouchableOpacity> */}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        Quantite :  { qty}
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                       { qty * plat.price } FG
                    </Text>
                </View>
                <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        Frais de livraison 
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                         0 FG
                    </Text>
                    
                </View>
                <View style={{ marginVertical: Sizes.fixPadding + 2.0, backgroundColor: Colors.grayColor, height: 0.50, }} />
               
            </View>
        )
    }

    deliveryTimeInfo() {
        return (
            <View style={styles.deliveryTimeWrapStyle}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Delivery Time
                </Text>
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor17Medium }}>
                    45 min
                </Text>
            </View>
        )
    }

    deliveryToInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding, }}>
                <View style={styles.deliveryToTitleWrapStyle}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Delivery to
                    </Text>
                    <Text style={{ ...Fonts.blueColor17Medium }}>
                        Add New Address
                    </Text>
                </View>
                <View style={styles.deliveryInfoWrapStyle}>
                    <Image
                        source={require('../../assets/images/restaurant_location.jpg')}
                        style={{ width: 120.0, height: 120.0, }}
                    />
                    <View style={{ marginVertical: Sizes.fixPadding, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name="location-on"
                                color={Colors.blackColor}
                                size={20}
                                onPress={() => this.props.navigation.pop()}
                                style={{ marginLeft: Sizes.fixPadding * 2.0 }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.blackColor16Medium }}>
                                76A England
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name="person"
                                color={Colors.blackColor}
                                size={20}
                                onPress={() => this.props.navigation.pop()}
                                style={{ marginLeft: Sizes.fixPadding * 2.0 }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.blackColor14Regular }}>
                                Beatrice Owen
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                name="phone"
                                color={Colors.blackColor}
                                size={20}
                                onPress={() => this.props.navigation.pop()}
                                style={{ marginLeft: Sizes.fixPadding * 2.0 }}
                            />
                            <Text style={{ marginLeft: Sizes.fixPadding - 2.0, ...Fonts.blackColor14Regular }}>
                                +1(454) 34211432
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    header() {
        return (
            <View style={{ marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding + 5.0 }}>
                <MaterialIcons
                    name="arrow-back"
                    color={Colors.blackColor}
                    size={24}
                    onPress={() => this.props.navigation.pop()}
                    style={{ marginLeft: Sizes.fixPadding * 2.0 }}
                />
                <View style={styles.confirmOrderTitleWithIdWrapStyle}>
                    <Text style={{ ...Fonts.blackColor22Medium }}>
                        Confirme commande
                    </Text>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.grayColor17Medium }}>
                            ID:
                        </Text>
                        <Text style={{ ...Fonts.blackColor17Medium }}>
                            43e2116
                        </Text>
                    </View> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    confirmButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 150,
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding,
        alignItems: 'center',
        paddingBottom: Sizes.fixPadding * 4.0,
    },
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.5,
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding + 5.0,
    },
    paymentMethodWrapStyle: {
        borderWidth: 1.0,
        marginTop: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        paddingLeft: Sizes.fixPadding,
        paddingRight: Sizes.fixPadding * 4.0,
        marginRight: Sizes.fixPadding * 2.0,
    },
    paymentMethodSelectorStyle: {
        position: 'absolute',
        right: 0.0,
        top: 0.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Sizes.fixPadding - 2.0,
        paddingBottom: Sizes.fixPadding,
        paddingRight: Sizes.fixPadding + 2.0,
        paddingLeft: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding,
        borderBottomLeftRadius: Sizes.fixPadding + 20.0,
    },
    addVoucherInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding + 5.0,
    },
    applyButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        marginLeft: Sizes.fixPadding + 5.0,
    },
    deliveryTimeWrapStyle: {
        backgroundColor: Colors.bodyBackColor,
        padding: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.fixPadding - 5.0,
    },
    deliveryToTitleWrapStyle: {
        marginBottom: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    deliveryInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: '#E0E0E0',
        borderWidth: 1.0,
        flexDirection: 'row',
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0
    },
    confirmOrderTitleWithIdWrapStyle: {
        marginTop: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addIconWrapStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 11.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },

})

ConfirmOrderScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(ConfirmOrderScreen);