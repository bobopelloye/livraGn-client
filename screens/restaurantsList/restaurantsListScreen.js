import React from "react";
import { Component } from "react";
import { BackHandler, SafeAreaView, View, StyleSheet, Dimensions, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { TransitionPresets } from "react-navigation-stack";
import CollapsingToolbar from "../../components/sliverAppBar";
import { Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const restaurantsList = [
    {
        id: '1',
        image: '',
        name: 'Bar 61 Restaurant',
        address: '76A England',
        rating: 4.5,
        distance: 0.5,
        isFavourite: false,
    },
    {
        id: '2',
        image: '',
        name: 'Core by Clare Smyth',
        address: '220 Opera Street',
        rating: 4.2,
        distance: 1.8,
        isFavourite: false,
    },
    {
        id: '3',
        image: '',
        name: 'Amrutha Lounge',
        address: '90B Silicon Velley',
        rating: 5.0,
        distance: 0.7,
        isFavourite: false,
    },
    {
        id: '4',
        image: '',
        name: 'The Barbary',
        address: '99C OBC Area',
        rating: 4.7,
        distance: 0.2,
        isFavourite: false,
    },
    {
        id: '5',
        image: '',
        name: 'The Palomar',
        address: '31A Om Colony',
        rating: 4.1,
        distance: 1.5,
        isFavourite: false,
    }
];

class RestaurantsListScreen extends Component {

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
        restaurants: restaurantsList,
        showSnackBar: false,
        isFavourite: false,
        search: '',
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <CollapsingToolbar
                    element={
                        <View style={styles.searchFieldAndExitTextWrapStyle}>
                            <View style={styles.searchFieldWrapStyle}>
                                <MaterialIcons name="search" size={25} color={Colors.whiteColor} />
                                <TextInput
                                    value="Juice"
                                    style={{ flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.lightPrimaryColor16Regular }}
                                    selectionColor={Colors.primaryColor}
                                    onChangeText={(text) => this.setState({ search: text })}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => this.props.navigation.pop()}
                                style={{ flex: 0.22, marginLeft: Sizes.fixPadding, }}
                            >
                                <Text style={{ ...Fonts.whiteColor17Regular }}>
                                    Exit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolbarMinHeight={0}
                    toolbarMaxHeight={95}
                    isImage={false}
                    childrenMinHeight={750}
                >
                    <View style={{ flex: 1, backgroundColor: Colors.primaryColor, }}>
                        <View style={styles.pageStyle}>
                            {this.restaurantsCount()}
                            {this.restaurants()}
                        </View>
                    </View>
                </CollapsingToolbar>
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.isFavourite ? 'Removed from Favourite' : 'Added to Favourite'}
                </Snackbar>
            </SafeAreaView>
        )
    }

    restaurantsCount() {
        return (
            <Text style={{
                ...Fonts.primaryColor16Medium,
                marginHorizontal: Sizes.fixPadding,
                marginVertical: Sizes.fixPadding * 2.0,
            }}>
                Approximatelt 134 results
            </Text>
        )
    }

    restaurants() {
        return (
            <>
                {this.state.restaurants.map((item) => (
                    <View key={`${item.id}`}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.props.navigation.push('RestaurantDetail', { item })}
                            style={styles.restaurantWrapStyle}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image
                                    source={item.image}
                                    style={styles.restaurantImageStyle}
                                />
                                <View style={{ width: width / 2.0, marginLeft: Sizes.fixPadding, height: 100.0, justifyContent: 'space-evenly' }}>
                                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16Medium }}>
                                        {item.name}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialIcons name="location-on" size={20} color={Colors.grayColor} />
                                        <Text numberOfLines={1} style={{ ...Fonts.grayColor14Medium }}>
                                            {item.address}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialIcons name="star" size={20} color={Colors.ratingColor} />
                                        <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.grayColor14Medium }}>
                                            {item.rating.toFixed(1)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginRight: Sizes.fixPadding, paddingVertical: Sizes.fixPadding, height: 100.0, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <MaterialIcons
                                    name={item.isFavourite ? "bookmark" : 'bookmark-outline'}
                                    size={22}
                                    color={Colors.grayColor}
                                    onPress={() => {
                                        this.handleRestaurantsUpdate({ id: item.id })
                                        this.setState({ isFavourite: item.isFavourite, showSnackBar: true })
                                    }}
                                />
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    {item.distance} km
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </>
        )
    }

    handleRestaurantsUpdate({ id }) {
        const newList = this.state.restaurants.map((restaurant) => {
            if (restaurant.id === id) {
                const updatedItem = { ...restaurant, isFavourite: !restaurant.isFavourite };
                return updatedItem;
            }
            return restaurant;
        });
        this.setState({ restaurants: newList })
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.bodyBackColor,
        flex: 1,
        paddingBottom: Sizes.fixPadding * 6.0,
    },
    searchFieldWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.darkPrimaryColor,
        marginHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        flex: 1,
    },
    searchFieldAndExitTextWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
        elevation: 0.0,
    },
    restaurantWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding
    },
    restaurantImageStyle: {
        width: 90.0,
        height: 100.0,
        borderTopLeftRadius: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding - 5.0,
    }
})

RestaurantsListScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(RestaurantsListScreen);