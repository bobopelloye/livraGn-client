import { View, Text,StyleSheet,Dimensions, } from 'react-native'
import React from 'react'
import Dialog from "react-native-dialog";
import { Colors, Sizes, Fonts } from "../constants/styles";
const { width } = Dimensions.get('screen');
import { Bounce } from 'react-native-animated-spinkit';

export default function loader({ isVisible }) {
  return (
    <Dialog.Container
                visible={isVisible}
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
  )
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