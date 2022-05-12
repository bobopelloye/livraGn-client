import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity, Image,
    Dimensions,
    BackHandler,
    SafeAreaView,
    StatusBar,
    Animated,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Onboarding from 'react-native-onboarding-swiper';
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { NavigationEvents } from 'react-navigation';

const { width, height } = Dimensions.get('screen');

class OnBoardingScreen extends Component {

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
        pageIndex: 0,
        backClickCount: 0
    }

    Square = ({ isLight, selected }) => {
        let backgroundColor;
        let width;
        let height;
        let borderRadius;
        if (isLight) {
            backgroundColor = selected ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)';
            width = selected ? 12 : 7;
            height = selected ? 12 : 7;
            borderRadius = selected ? 6 : 3.5;
        } else {
            backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        }
        return (
            <View
                style={{
                    width,
                    height,
                    borderRadius,
                    marginHorizontal: 2,
                    backgroundColor: this.state.pageIndex == 2 ? 'transparent' : backgroundColor,
                }}
            />
        );
    };

    Done = () => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => { this.props.navigation.push('Signin') }}
            style={{ position: 'absolute', left: -80.0, top: -10.0 }}>
            <Text style={{
                ...Fonts.whiteColor16Medium
            }}>
                COMMENCEZ MAINTENANT
            </Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <Onboarding
                    pages={[
                        {
                            backgroundColor: Colors.whiteColor,
                            image: <Image
                                source={require('../../assets/images/onboarding/1.jpg')}
                                resizeMode="contain"
                                style={{
                                    width: '100%',
                                    height: 250.0,
                                }}
                            />,
                            title:
                                <View style={styles.titleContainerStyle}>
                                    <Text style={{
                                        textAlign: 'center',
                                        ...Fonts.blackColor22Medium,
                                    }}>
                                        {`Recherchez votre plat préféré \n près de chez vous`}
                                    </Text>
                                </View>,
                            subtitle:
                                <View style={styles.subTitleContainerStyle}>
                                    <Text style={{ ...Fonts.grayColor15Medium, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                        {`Découvrez les plats de plus de \n 15 restaurants.`}
                                    </Text>
                                </View>
                        },
                        {
                            backgroundColor: Colors.whiteColor,
                            image: <Image
                                source={require('../../assets/images/onboarding/2.jpg')}
                                resizeMode="contain"
                                style={{ width: '100%', height: 250.0 }} />,

                            title: <View style={styles.titleContainerStyle}>
                                <Text style={{
                                    textAlign: 'center',
                                    ...Fonts.blackColor22Medium,
                                }}>
                                    {`Livraison rapide \n chez vous`}
                                </Text>
                            </View>,
                            subtitle: <View style={styles.subTitleContainerStyle}>
                                <Text style={{ ...Fonts.grayColor15Medium, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                    {`Livraison rapide à votre domicile, \n bureau et où que vous soyez.`}
                                </Text>
                            </View>
                        },
                        {
                            backgroundColor: Colors.primaryColor,
                            image: <Image
                                source={require('../../assets/images/onboarding/3.jpg')}
                                resizeMode="contain"
                                style={{ width: '100%', height: 250.0 }}
                            />,
                            title: <View style={styles.titleContainerStyle}>
                                <Text style={{
                                    textAlign: 'center',
                                    ...Fonts.blackColor22Medium,
                                }}>
                                    {`Livraison sécurisée à \nvotre domicile`}
                                </Text>
                            </View>,
                            subtitle: <View style={styles.subTitleContainerStyle}>
                                <Text style={{ ...Fonts.grayColor15Medium, textAlign: 'center', marginHorizontal: Sizes.fixPadding * 4.0 }}>
                                    {`Commande, livraison et plats à emporter sans contact.`}
                                </Text>
                            </View>
                        },
                    ]
                    }
                    DotComponent={this.Square}
                    DoneButtonComponent={this.Done}
                    containerStyles={{ backgroundColor: Colors.whiteColor }}
                    skipToPage={2}
                    skipLabel={
                        <Text style={{ ...Fonts.primaryColor16Medium }}>
                            Passer
                        </Text >}
                    nextLabel={
                        <Text style={{ ...Fonts.primaryColor16Medium }}>
                            Suivant
                        </Text >
                    }
                    bottomBarColor={this.state.pageIndex == 2 ? Colors.primaryColor : '#FAFAFA'}
                    pageIndexCallback={this.getPageIndex}
                />
                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor16Regular }}>
                        Appuyez à nouveau sur Retour pour quitter.
                    </Text>
                </Animated.View>
            </SafeAreaView>

        )
    }

    getPageIndex = (pageIndex) => {
        this.setState({
            pageIndex,
        });
    }
}

const styles = StyleSheet.create({
    titleContainerStyle: {
        width: '100%',
        alignItems: 'center',
        top: width / 2.8,
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        position: 'absolute',
    },
    subTitleContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bottom: width / 1.7,
        position: 'absolute',
        flex: 1,
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
});

OnBoardingScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(OnBoardingScreen);