/**
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'
import SendSMS from 'react-native-sms'
import {TELE2, TOPUP, SENT, QUEUED} from './libs/Consts'
import Images from './libs/Images'
let {surfSunset} = Images

export default class App extends React.Component<*> {
  render() {
    return <View style={styles.container}>
      <Image source={surfSunset} style={styles.ImageStyle} />
      <TouchableOpacity onPress={this.openTextWithInfo} style={styles.button}>
        <Text style={styles.text}>KEEP ON SURFING</Text>
      </TouchableOpacity>
    </View>
  }
  openTextWithInfo = () => {
    SendSMS.send({body: TOPUP, recipients: [TELE2],
      //trigger a "completed" response when using android
      successTypes: [SENT, QUEUED]
    }, (completed, cancelled, error) => {
      if (completed) {
        console.log('SMS Sent Completed')
      } else if (cancelled) {
        console.log('SMS Sent Cancelled')
      } else if (error) {
        console.log('Some error occured')
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  button: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 200 / 2,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  },
  ImageStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});