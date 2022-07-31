import React, { useState } from "react";
import { Component } from "react";
import { BackHandler, SafeAreaView, View, useWindowDimensions, StyleSheet, Text, } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import CollapsingToolbar from "../../components/sliverAppBar";
import { Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { TabView, TabBar } from 'react-native-tab-view';
import Products from "../products/productsScreen";
import Review from "../review/reviewScreen";
import Information from "../information/informationScreen";

class RestaurantDetailScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        console.log(' params', this.props.navigation.getParam('item').plats)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };


    state = {
        isFavourite: false,
        showSnackBar: false,
    }

    render() {
        const item  = this.props.navigation.getParam('item');
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons
                            name="arrow-back"
                            size={25}
                            color={Colors.whiteColor}
                            style={{
                                marginTop: Sizes.fixPadding + 5.0,
                                marginLeft: Sizes.fixPadding * 2.0
                            }}
                            onPress={() => this.props.navigation.pop()}
                        />
                    }
                    rightItem={
                        <MaterialIcons
                            name={this.state.isFavourite ? "bookmark" : "bookmark-outline"}
                            size={25}
                            color={Colors.whiteColor}
                            style={{ marginTop: Sizes.fixPadding + 5.0, }}
                            onPress={() => this.setState({
                                isFavourite: !this.state.isFavourite,
                                showSnackBar: true
                            })}
                        />
                    }
                    element={
                        <View>
                            <Text style={{ ...Fonts.whiteColor22Medium }}>
                                { item.name} 
                            </Text>
                            <View style={{ marginTop: Sizes.fixPadding - 2.0, flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons
                                    name="location-on"
                                    size={20}
                                    color={Colors.whiteColor}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor14Regular }}>
                                    { item.address}
                                </Text>
                            </View>
                            <View style={{ marginTop: Sizes.fixPadding - 2.0, flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons
                                    name="star"
                                    size={20}
                                    color={Colors.ratingColor}
                                />
                                <Text style={{ marginLeft: Sizes.fixPadding - 8.0, ...Fonts.whiteColor14Regular }}>
                                    4.5
                                </Text>
                            </View>
                        </View>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolbarMinHeight={50}
                    toolbarMaxHeight={200}
                    isImageBlur={true}
                    src={{ uri: item.image}}
                    childrenMinHeight={720}
                >
                    <View style={{ flex: 1, backgroundColor: Colors.primaryColor, }}>
                        <TabBarView props={{ props: this.props.navigation.getParam('item').plats, navigation: this.props}} />
                    </View>
                </CollapsingToolbar>
                <Snackbar
                    style={styles.snackBarStyle}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {!this.state.isFavourite ? 'Removed from Favourite' : 'Added to Favourite'}
                </Snackbar>
            </SafeAreaView>
        )
    }
}

const TabBarView = ({ props }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Products' },
        { key: 'second', title: 'Review' },
        { key: 'third', title: 'Information' },
    ]);

    const layout = useWindowDimensions();


    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <Products props={props} />;
            case 'second':
                return <Review />;
            case 'third':
                return <Information />;
        }
    };

    return (
        <Products props={props} />
    )
}

const styles = StyleSheet.create({
    pageStyle: {
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.bodyBackColor,
        flex: 1,
        paddingBottom: Sizes.fixPadding * 6.0,
    },
    snackBarStyle: {
        elevation: 0.0,
        backgroundColor: '#333333',
        position: 'absolute',
        left: -10.0,
        right: -10.0,
        bottom: -10.0,
    }
})

RestaurantDetailScreen.navigationOptions = () => {
    return {
        header: () => null,
    }
}

export default withNavigation(RestaurantDetailScreen);