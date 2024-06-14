import { useState, useEffect } from "react"
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const App = () => {
  let countDownTimer = 0;
  const [counter, setCounter] = useState(0)
  const [inputText, setInputText] = useState("")
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  useEffect(() => {
    return () => clearInterval(timer);
  }, [countDownTimer]);

  const getReturnValues = (countDown: number) => {
    // calculate time left
    let days = Math.floor(countDown / (3600 * 24));
    let hours = Math.floor((countDown % (3600 * 24)) / 3600);
    let minutes = Math.floor((countDown % 3600) / 60);
    let seconds = countDown % 60;
    return [formatTime(days), formatTime(hours), formatTime(minutes), formatTime(seconds)];
  };

  function formatTime(units: number) {
    return units < 10 ? '0' + units : units
  }

  function startTimer() {
    stopTimer()
    countDownTimer = counter == 0 ? parseFloat(inputText) : counter
    if (!isNaN(countDownTimer)) {
      if (countDownTimer == 0) {
        Alert.alert('Alert', 'Input should be greater than 0')
      }
      else {
        const timer = setInterval(() => {
          if (countDownTimer == 0) {
            clearInterval(timer)
            Alert.alert('Congo', 'Countdown Complete', [{
              text: "OK",
              onPress: () => resetTimer()
            }], { cancelable: false })
          }
          else {
            countDownTimer = countDownTimer - 1
            setCounter(countDownTimer);
          }

        }, 1000);
        setTimer(timer)
      }
    }
    else {
      Alert.alert('Alert', 'Wrong Input')
    }
  }

  function stopTimer() {
    clearInterval(timer)
    console.log(counter)
  }

  function resetTimer() {
    countDownTimer = 0
    setCounter(countDownTimer)
    setInputText('')
    clearInterval(timer)
  }

  return (
    <View style={styles.viewStyle}>
      <Text>Enter your text:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '50%', marginTop: 5 }}
        onChangeText={(text) => {
          countDownTimer = parseFloat(text)
          setInputText(text)
        }}
        maxLength={10}
        keyboardType='number-pad'
        value={inputText}
      />
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.textStyle]}>
          {`${getReturnValues(counter)[0]}:${getReturnValues(counter)[1]}:${getReturnValues(counter)[2]}:${getReturnValues(counter)[3]}`}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
        <TouchableOpacity onPress={() => {
          Keyboard.dismiss();
          startTimer();
        }} style={[styles.buttonStyle, { backgroundColor: 'green' }]}>
          <Text style={styles.buttonTextStyle}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          Keyboard.dismiss();
          stopTimer();
        }} style={[styles.buttonStyle, { backgroundColor: 'red' }]}>
          <Text style={styles.buttonTextStyle}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          Keyboard.dismiss();
          resetTimer();
        }} style={[styles.buttonStyle, { backgroundColor: 'orange' }]}>
          <Text style={styles.buttonTextStyle}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    fontWeight: 400,
  },
  viewStyle: {
    backgroundColor: 'white',
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    marginTop: 8,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
})