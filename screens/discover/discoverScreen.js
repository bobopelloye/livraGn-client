import React from "react";
import { Component } from "react";
import { SafeAreaView, View, Dimensions, StatusBar, StyleSheet, TouchableOpacity, FlatList, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import CollapsingToolbar from "../../components/sliverAppBar";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { BottomSheet } from "react-native-elements";
import { AsyncStorage } from 'react-native';
import axios from 'axios'



const offerBannersList = [
    // {
    //     id: '1',
    //     image: require('../../assets/images/slider/slider_1.png'),
    // },
    // {
    //     id: '2',
    //     image: require('../../assets/images/slider/slider_2.png'),
    // },
    // {
    //     id: '3',
    //     image: require('../../assets/images/slider/slider_3.png'),
    // },
    // {
    //     id: '4',
    //     image: require('../../assets/images/slider/slider_4.png'),
    // },
    // {
    //     id: '5',
    //     image: require('../../assets/images/slider/slider_5.png'),
    // },
    // {
    //     id: '6',
    //     image: require('../../assets/images/slider/slider_6.png'),
    // },
    {
        address: "Lambagny",
        description: null,
        email: "rkpogomou@gmail.com",
        id: '3',
        image: "https://livragn.com/media/restaurant_images/hc_jXTLpOH.jpg",
        name: "HERROS && COFFEE",
        phone: "0623803441",
    }
];

// const categoriesList = [
//     {
//         id: '1',
//         image: require('../../assets/images/category/all.png'),
//         type: 'All',
//     },
//     {
//         id: '2',
//         image: require('../../assets/images/category/coffee.png'),
//         type: 'Coffee',
//     },
//     {
//         id: '3',
//         image: require('../../assets/images/category/drink.png'),
//         type: 'Drink',
//     },
//     {
//         id: '4',
//         image: require('../../assets/images/category/fastfood.png'),
//         type: 'FastFood',
//     },
//     {
//         id: '5',
//         image: require('../../assets/images/category/pizza.png'),
//         type: 'Pizza',
//     },
//     {
//         id: '6',
//         image: require('../../assets/images/category/snacks.png'),
//         type: 'Snacks',
//     }
// ];



const hotSalesList = [
    {
        id: '1',
        image: '',
        foodName: 'Margherita Pizza',
        foodCategory: 'Delicious Pizza',
        amount: 5.0,
        isFavourite: false,
    },
    {
        id: '2',
        image: '',
        foodName: 'Thin Crust Pizza',
        foodCategory: 'Delicious Pizza',
        amount: 12.0,
        isFavourite: false,
    },
    {
        id: '3',
        image: '',
        foodName: 'Veg Burger',
        foodCategory: 'Fast Food',
        amount: 4.0,
        isFavourite: false,
    },
    {
        id: '4',
        image: '',
        foodName: 'Fried Noodles',
        foodCategory: 'Chinese',
        amount: 11.0,
        isFavourite: false,
    },
    {
        id: '5',
        image: '',
        foodName: 'Hakka Noodles',
        foodCategory: 'Chinese',
        amount: 7.0,
        isFavourite: false,
    },
    {
        id: '6',
        image: '',
        foodName: 'Dry Manchuriyan',
        foodCategory: 'Chinese',
        amount: 9.9,
        isFavourite: false,
    }
];

const addressesList = [
    {
        id: '1',
        address: 'Nongo, conakry, GN'
    },
    {
        id: '2',
        address: 'cosa, conakry, GN.'
    }
];

const { width } = Dimensions.get('screen');

const intialAmount = 2.5;

class DiscoverScreen extends Component {
    componentDidMount() {
        this.getAllRestaurant();
        this.getAllPlat();
        this.getstoreData();
    }
    state = {
        // favouriteRestaurents: favouriteRestaurantsList,
        hotSales: hotSalesList,
        showSnackBar: false,
        isFavourite: false,
        showBottomSheet: false,
        showAddressSheet: false,
        currentAddress: addressesList[0].address,
        hotSales: hotSalesList,
        sizeIndex: null,
        qty: 1,
        options: optionsList,
        showCustomizeBottomSheet: false,
        restaurant: offerBannersList,
        plats:  [],
        platSelected : {
            "description": "",
            "id": null,
            "image": "",
            "name": "",
            "price": null,
            "remise_prix": 0,
            "restaurant": null
        }
    }

    getAllRestaurant =  () => {

        axios.get('https://livragn.com/restaurant', {
          headers: {
              'Content-Type': 'application/json',
          },      
      })      
      .then((response) => {
        console.log('response resto',response.data.results)
        this.setState({ restaurant: response.data.results})
      })
      .catch((error) => {
        console.log('error',error.response)

      })
    }

    getstoreData = async () => {
        console.log('rended')
        try {
            const t = await AsyncStorage.getItem('token')
            console.log('token here', t);
        } catch (e) {
            console.log('error get data', e)
        }
    }

    getAllPlat =  () => {

        axios.get('https://livragn.com/plat', {
          headers: {
              'Content-Type': 'application/json',
          },      
      })      
      .then((response) => {
        console.log('PLATS',response.data)
        this.setState({ plats: response.data.results})
      })
      .catch((error) => {
        console.log('error',error.response)

      })
    }


    

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <CollapsingToolbar
                    leftItem={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showAddressSheet: false })}
                            style={{ marginLeft: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.darkPrimaryColor15Medium }}>
                                LIVRA GN
                            </Text>
                            <View style={{ marginTop: Sizes.fixPadding - 8.0, flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name='location-on' size={17} color={Colors.whiteColor} />
                                <Text numberOfLines={1} style={{ maxWidth: width / 1.7, ...Fonts.whiteColor14Medium }}>
                                    {this.state.currentAddress}
                                </Text>
                                {/* <MaterialIcons name="arrow-drop-down" size={20} color={Colors.whiteColor} /> */}
                            </View>
                        </TouchableOpacity>
                    }
                    rightItem={
                        <MaterialIcons
                            name="shopping-cart"
                            size={25}
                            color={Colors.whiteColor}
                            style={{ marginTop: Sizes.fixPadding + 5.0, }}
                            onPress={() => this.props.navigation.push('ConfirmOrder')}
                        />
                    }
                    element={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            // bonPress={() => this.props.navigation.push('Search')}
                            style={styles.searchInfoWrapStyle}>
                            <MaterialIcons name="search" size={22} color={Colors.whiteColor} />
                            <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.lightPrimaryColor16Regular }}>
                             Voulez-vous trouver quelque chose?
                            </Text>
                        </TouchableOpacity>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolbarMinHeight={60}
                    toolbarMaxHeight={170}
                    isImage={false}
                >
                    <View style={{ flex: 1, backgroundColor: Colors.primaryColor, }}>
                        <View style={styles.pageStyle}>
                             {this.favouriteRestaurantsInfo()}
                             {/* {this.productsOrderedInfo()} */}
                             {this.hotSales()}
                             {/* { this.categoriesInfo()} */}
                        </View>
                    </View>
                </CollapsingToolbar>
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.isFavourite ? 'supp favorie' : 'ajouter favorie'}
                </Snackbar>
                {this.selectAddressSheet()}
            </SafeAreaView >
        )
    }

    hotSales() {
        return (
            <>
                {this.hotSaleInfo()}
                {this.custmizeBottomSheet()}
            </>
        )
    }

    custmizeBottomSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showCustomizeBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        borderTopRightRadius: Sizes.fixPadding * 2.0,
                        borderTopLeftRadius: Sizes.fixPadding * 2.0,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.setState({ showCustomizeBottomSheet: false })}
                    >
                        <View style={styles.bottomSheetOpenCloseDividerStyle} />
                        {/* {this.addNewItemTitle()} */}
                        {this.CustmizeItemInfo()}
                    </TouchableOpacity>
                        {this.addToCartAndItemsInfo()}
                     </TouchableOpacity>
            </BottomSheet>
        )
    }

    addToCartAndItemsInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.setState({ showCustomizeBottomSheet: false })
                    this.props.navigation.push('ConfirmOrder', { platSelected : this.state.platSelected, qty: this.state.qty})
                }}
                style={styles.addToCartAndItemsInfoWrapStyle}>
                <View>
                    <Text style={{ ...Fonts.darkPrimaryColor16Medium }}>
                        {this.state.qty} total
                    </Text>
                    <Text style={{ ...Fonts.whiteColor15Regular }}>
                        { this.state.platSelected ? (this.state.platSelected.price * this.state.qty).toFixed(1) + " FG" : 0}
                    </Text>
                </View>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Ajouter au panier
                </Text>
            </TouchableOpacity>
        )
    }

    updateOptions({ id }) {
        const newList = this.state.options.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, isSelected: !item.isSelected };
                return updatedItem;
            }
            return item;
        });
        this.setState({ options: newList });
    }

    optionsInfo() {
        return (
            <View style={{ paddingTop: Sizes.fixPadding }}>
                {this.state.options.map((item) => (
                    <View key={`${item.id}`}>
                        <View style={styles.optionWrapStyle}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.updateOptions({ id: item.id })}
                                style={{
                                    ...styles.radioButtonStyle,
                                    backgroundColor: item.isSelected ? Colors.primaryColor : Colors.whiteColor,
                                }}
                            >
                                {
                                    item.isSelected ?
                                        <MaterialIcons
                                            name="done"
                                            size={18}
                                            color={Colors.whiteColor}
                                        />
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                                {item.option}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    optionsTitle() {
        return (
            <View style={{ backgroundColor: Colors.bodyBackColor, padding: Sizes.fixPadding, }}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Options
                </Text>
            </View>
        )
    }

    sizesInfo() {
        return (
            <View style={{
                backgroundColor: Colors.whiteColor,
                paddingHorizontal: Sizes.fixPadding,
                paddingTop: Sizes.fixPadding
            }}>
                {this.sizes({ size: 'S', contain: '500 ml', price: 0, index: 1, })}
                {this.sizes({ size: 'M', contain: '750 ml', price: 0.5, index: 2 })}
                {this.sizes({ size: 'L', contain: '1100 ml', price: 1.2, index: 3 })}
            </View>
        )
    }

    sizes({ size, contain, price, index }) {
        return (
            <View style={styles.sizesWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.setState({ sizeIndex: index })}
                        style={{
                            ...styles.radioButtonStyle,
                            backgroundColor: this.state.sizeIndex == index ? Colors.primaryColor : Colors.whiteColor,
                        }}
                    >
                        {
                            this.state.sizeIndex == index ?
                                <MaterialIcons
                                    name="done"
                                    size={18}
                                    color={Colors.whiteColor}
                                />
                                :
                                null
                        }
                    </TouchableOpacity>
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                        Sizes {size}
                    </Text>
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.grayColor14Medium }}>
                        ({contain})
                    </Text>
                </View>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    ${price}
                </Text>
            </View>
        )
    }

    addNewItemTitle() {
        return (
            <Text style={{
                marginHorizontal: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding + 5.0,
                ...Fonts.blackColor19Medium
            }}>
                Ajouter au panier
            </Text>
        )
    }

    sizeTitle() {
        return (
            <View style={styles.sizeTitleStyle}>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Size
                </Text>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Price
                </Text>
            </View>
        )
    }

    CustmizeItemInfo() {
        return (
            <View style={styles.custmizeItemInfoWrapStyle}>
                <Image
                    source={{uri: this.state.platSelected? this.state.platSelected.image : ''}}
                    style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding - 5.0 }}
                />
                <View style={{
                    flex: 1,
                    marginVertical: Sizes.fixPadding - 7.0,
                    justifyContent: 'space-between',
                    marginLeft: Sizes.fixPadding
                }}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        { this.state.platSelected.name}
                    </Text>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'row', justifyContent: "space-between" }}>
                        <Text style={{ ...Fonts.primaryColor20MediumBold }}>
                            { this.state.platSelected? (this.state.platSelected.price * this.state.qty).toFixed(1) + " FG" : 0}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => { this.state.qty > 1 ? this.setState({ qty: this.state.qty - 1 }) : null }}
                                style={{ backgroundColor: this.state.qty > 1 ? Colors.primaryColor : '#E0E0E0', ...styles.qtyAddRemoveButtonStyle }}>
                                <MaterialIcons
                                    name="remove"
                                    color={this.state.qty > 1 ? Colors.whiteColor : Colors.blackColor}
                                    size={18}
                                />
                            </TouchableOpacity>
                            <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                                {this.state.qty}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.setState({ qty: this.state.qty + 1 })}
                                style={{ backgroundColor: Colors.primaryColor, ...styles.qtyAddRemoveButtonStyle }}>
                                <MaterialIcons
                                    name="add"
                                    color={Colors.whiteColor}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        )
    }

    handleHotSalesUpdate({ id }) {
        const newList = this.state.hotSales.map((property) => {
            if (property.id === id) {
                const updatedItem = { ...property, isFavourite: !property.isFavourite };
                return updatedItem;
            }
            return property;
        });
        this.setState({ hotSales: newList });
    }

    addToPanier(plat) {
        console.log('item plat', plat)
        this.setState({ platSelected: plat })
        this.setState({qty: 1})
        this.setState({ showCustomizeBottomSheet: true })
    }

    hotSaleInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.hotSalesInfoWrapStyle}>
                <Image
                    source={{uri:item.image}}
                    style={styles.hotSaleImageStyle}
                />
                <View style={{
                    paddingHorizontal: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding,
                    paddingTop: Sizes.fixPadding - 5.0
                }}>
                    <Text style={{ ...Fonts.blackColor15Medium }}>
                        {/* {item.restaurant} */}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        {item.name}
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding - 7.0, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...Fonts.primaryColor20MediumBold }}>
                            {item.price.toFixed(1)} FG
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>  this.addToPanier(item)}
                            style={styles.addIconWrapStyle}
                        >
                            <MaterialIcons
                                name="add"
                                size={17}
                                color={Colors.whiteColor}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
        return (
            <View>
                <View style={{ marginHorizontal: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        liste des plats
                    </Text>
                    <Text style={{ ...Fonts.primaryColor16Medium }}>
                        Voir tout les plats
                    </Text>
                </View>
                <FlatList
                    horizontal
                    data={this.state.plats}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 3.0,
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    selectAddressSheet() {
        return (
            <BottomSheet
                isVisible={this.state.showAddressSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <View style={{ backgroundColor: 'white', paddingTop: Sizes.fixPadding + 5.0 }}>
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor19Medium }}>
                        SELECT ADDRESS
                    </Text>
                    <View style={{ backgroundColor: Colors.grayColor, height: 0.30, marginHorizontal: Sizes.fixPadding, marginVertical: Sizes.fixPadding + 5.0 }} />
                    {this.addresses()}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            this.setState({ showAddressSheet: false })
                            this.props.navigation.push('AddNewDeliveryAddress')
                        }}
                        style={{
                            marginTop: Sizes.fixPadding - 5.0,
                            marginHorizontal: Sizes.fixPadding + 3.0,
                            marginBottom: Sizes.fixPadding + 5.0,
                            flexDirection: 'row', alignItems: 'center',
                        }}>
                        <MaterialIcons
                            name="add"
                            color='#2196F3'
                            size={22}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blueColor15Medium }}>
                            Nouvelle addresse
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        )
    }

    addresses() {
        return (
            <>
                {
                    addressesList.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={styles.addressWrapStyle}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => this.setState({ currentAddress: item.address, showAddressSheet: false })}
                                    style={{
                                        ...styles.radioButtonStyle,
                                        backgroundColor: this.state.currentAddress == item.address ? Colors.primaryColor : Colors.whiteColor,
                                    }}
                                >
                                    {
                                        this.state.currentAddress == item.address ?
                                            <MaterialIcons
                                                name="done"
                                                size={18}
                                                color={Colors.whiteColor}
                                            />
                                            :
                                            null
                                    }
                                </TouchableOpacity>
                                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Medium }}>
                                    {item.address}
                                </Text>
                            </View>
                        </View>
                    ))
                }
            </>
        )
    }

    handleFavouriteRestaurentsUpdate({ id }) {
        const newList = this.state.favouriteRestaurents.map((property) => {
            if (property.id === id) {
                const updatedItem = { ...property, isFavourite: !property.isFavourite };
                return updatedItem;
            }
            return property;
        });
        this.setState({ favouriteRestaurents: newList })
    }

    favouriteRestaurantsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('RestaurantDetail', { item, props:this.props })}
                style={styles.favouriteRestaurentsInfoWrapStyle}>
                <Image
                    source={{uri:item.image}}
                    style={styles.favouriteRestaurentImageStyle}
                />

                <MaterialIcons
                    name={item.isFavourite ? "bookmark" : "bookmark-outline"}
                    size={22}
                    color={Colors.whiteColor}
                    style={{ position: 'absolute', right: 10.0, top: 10.0, }}
                    onPress={() => {
                        this.handleFavouriteRestaurentsUpdate({ id: item.id })
                        this.setState({ isFavourite: item.isFavourite, showSnackBar: true })
                    }}
                />

                <View style={{
                    paddingHorizontal: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding,
                    paddingTop: Sizes.fixPadding - 5.0
                }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor15Medium }}>
                        {item.name}
                    </Text>
                    <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        {item.address}
                    </Text>
                    <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding - 4.0, ...Fonts.grayColor14Medium }}>
                        {item.phone}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <View>
                <View style={{ marginHorizontal: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        Restaurants 
                    </Text>
                    <Text style={{ ...Fonts.primaryColor16Medium }}>
                        voir plus
                    </Text>
                </View>
                <FlatList
                    horizontal
                    data={this.state.restaurant}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 3.0,
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    handleProductOrderedUpdate({ id }) {
        const newList = this.state.productsOrdereds.map((property) => {
            if (property.id === id) {
                const updatedItem = { ...property, isFavourite: !property.isFavourite };
                return updatedItem;
            }
            return property;
        });
        this.setState({ productsOrdereds: newList })
    }

    productsOrderedInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.productsOrderedInfoWrapStyle}>
                <Image
                    source={{uri:item.image}}
                    style={styles.productsOrderedImageStyle}
                />
                <MaterialIcons
                    name={item.isFavourite ? "bookmark" : "bookmark-outline"}
                    size={22}
                    color={Colors.whiteColor}
                    style={{ position: 'absolute', right: 10.0, top: 10.0, }}
                    onPress={() => {
                        this.handleProductOrderedUpdate({ id: item.id })
                        this.setState({ isFavourite: item.isFavourite, showSnackBar: true })
                    }}
                />

                <View style={{
                    paddingHorizontal: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding,
                    paddingTop: Sizes.fixPadding - 5.0
                }}>
                    <Text style={{ ...Fonts.blackColor15Medium }}>
                        {item.name}
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 7.0, ...Fonts.grayColor14Medium }}>
                        {item.price} GNF
                    </Text>
                </View>
            </View>
        )
        return (
            <View>
                <View style={{ marginHorizontal: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        liste des plats
                    </Text>
                    <Text style={{ ...Fonts.primaryColor16Medium }}>
                        voir plus de plats
                    </Text>
                </View>
                <FlatList
                    horizontal
                    data={this.state.plats}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 3.0,
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    // categoriesInfo() {
    //     const renderItem = ({ item }) => (
    //         <View style={{ alignItems: 'center', marginRight: Sizes.fixPadding * 2.0, }}>
    //             <View style={styles.categoryImageWrapStyle}>
    //                 <Image
    //                     source={item.image}
    //                     style={{ width: 40.0, height: 40.0, }}
    //                     resizeMode="contain"
    //                 />
    //             </View>
    //             <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor15Medium }}>
    //                 {item.type}
    //             </Text>
    //         </View>
    //     )
    //     return (
    //         <View>
    //             <Text style={{ ...Fonts.blackColor19Medium, marginHorizontal: Sizes.fixPadding, }}>
    //                 Categories
    //             </Text>
    //             <FlatList
    //                 horizontal
    //                 data={categoriesList}
    //                 keyExtractor={(item) => `${item.id}`}
    //                 renderItem={renderItem}
    //                 showsHorizontalScrollIndicator={false}
    //                 contentContainerStyle={{
    //                     paddingLeft: Sizes.fixPadding + 5.0,
    //                     paddingBottom: Sizes.fixPadding * 3.0,
    //                     paddingTop: Sizes.fixPadding,
    //                 }}
    //             />
    //         </View>
    //     )
    // }

    offerBanners() {
        const renderItem = ({ item }) => (
            <View>
                <Image
                source={{uri:item.image}}
                style={styles.offerBannersImageStyle}
            />
            <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor15Medium }}>
                    {item.name}
                </Text>
            </View>
            
        )
        return (
            <View>
                <FlatList
                    horizontal
                    data={this.state.restaurant}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: Sizes.fixPadding * 2.0,
                        paddingLeft: Sizes.fixPadding
                    }}
                />
            </View>
        )
    }
}

const optionsList = [
    {
        id: '1',
        option: 'Add Lemon',
        isSelected: false,
    },
    {
        id: '2',
        option: 'Add Ice',
        isSelected: false,
    },
];

const styles = StyleSheet.create({
    pageStyle: {
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.bodyBackColor,
        flex: 1,
        paddingBottom: Sizes.fixPadding * 7.0,
    },
    offerBannersImageStyle: {
        width: 170.0,
        height: 160.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
    },
    categoryImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60.0,
        height: 60.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 57.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    searchInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.darkPrimaryColor,
        flex: 1,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    },
    productsOrderedInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 130.0,
        marginRight: Sizes.fixPadding + 2.0
    },
    productsOrderedImageStyle: {
        width: 130.0,
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0
    },
    favouriteRestaurentsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 130.0,
        marginRight: Sizes.fixPadding + 2.0
    },
    favouriteRestaurentImageStyle: {
        width: 130.0,
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0
    },
    hotSalesInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        width: 130.0,
        marginRight: Sizes.fixPadding + 2.0
    },
    hotSaleImageStyle: {
        width: 130.0,
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderTopRightRadius: Sizes.fixPadding - 5.0
    },
    addIconWrapStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 11.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },
    addToCartAndItemsInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 27.0,
        height: 27.0,
        borderRadius: 13.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
    },
    optionWrapStyle: {
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sizesWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding
    },
    sizeTitleStyle: {
        backgroundColor: Colors.bodyBackColor,
        padding: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    custmizeItemInfoWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: Sizes.fixPadding
    },
    qtyAddRemoveButtonStyle: {
        width: 27.0,
        height: 27.0,
        borderRadius: 13.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomSheetOpenCloseDividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 4.0,
        borderRadius: Sizes.fixPadding,
        width: 40.0,
        alignSelf: 'center',
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0
    },
    addressWrapStyle: {
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center'
    },
})

DiscoverScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(DiscoverScreen);