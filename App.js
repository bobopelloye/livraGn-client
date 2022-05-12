import React from "react";
import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import bottomTabBarScreen from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import addNewDeliveryAddressScreen from "./screens/addNewDeliveryAddress/addNewDeliveryAddressScreen";
import addressScreen from "./screens/address/addressScreen";
import registerScreen from "./screens/auth/registerScreen";
import signinScreen from "./screens/auth/signinScreen";
import verificationScreen from "./screens/auth/verificationScreen";
import confirmOrderScreen from "./screens/confirmOrder/confirmOrderScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import onboardingScreen from "./screens/onboarding/onboardingScreen";
import orderInformationScreen from "./screens/orderInformation/orderInformationScreen";
import paymentMethodsScreen from "./screens/paymentMethods/paymentMethodsScreen";
import ratingScreen from "./screens/rating/ratingScreen";
import restaurantDetailScreen from "./screens/restaurantDetail/restaurantDetailScreen";
import restaurantsListScreen from "./screens/restaurantsList/restaurantsListScreen";
import searchScreen from "./screens/search/searchScreen";
import splashScreen from "./screens/splashScreen";
import TrackOrderScreen from "./screens/trackOrder/trackOrderScreen";

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Splash: splashScreen,
  mainFlow: createStackNavigator({
    Onboarding: onboardingScreen,
    Signin: signinScreen,
    Register: registerScreen,
    Verification: verificationScreen,
    BottomTabBar: bottomTabBarScreen,
    Search: searchScreen,
    RestaurantsList: restaurantsListScreen,
    RestaurantDetail: restaurantDetailScreen,
    ConfirmOrder: confirmOrderScreen,
    TrackOrder: TrackOrderScreen,
    OrderInformation: orderInformationScreen,
    Rating: ratingScreen,
    EditProfile: editProfileScreen,
    PaymentMethods: paymentMethodsScreen,
    Address: addressScreen,
    Notifications: notificationsScreen,
    AddNewDeliveryAddress: addNewDeliveryAddressScreen,
  }),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};
