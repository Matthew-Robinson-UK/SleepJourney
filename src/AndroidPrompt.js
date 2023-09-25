import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';
import { Button } from 'react-native-paper';

function AndroidPrompt(props, ref) {
  const [_visible, _setVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hintText, setHintText] = React.useState('');
  const animValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (ref) {
      ref.current = {
        setVisible: _setVisible, // client codes can only access _visible
        setHintText,
      };
    }
  }, [ref]);

  React.useEffect(() => {
    if (_visible) {
      setVisible(true); // set to visible first, then do transition
      Animated.timing(animValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, { // do transition first, then set to invisible
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        setHintText('');
      });
    }
  }, [_visible, animValue]); // detect _visible change, use it to drive our animation

  const backdropAnimStyle = {
    opacity: animValue,
  };

  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({ // for the slide-up effect
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
    ],
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.content}>
        <Animated.View
          style={[styles.backdrop, StyleSheet.absoluteFill, backdropAnimStyle]}
        />

        <Animated.View style={[styles.prompt, promptAnimStyle]}>
          <Text style={styles.hint}>{hintText || 'Scan Your Tag'}</Text>

          <TouchableOpacity
            onPress={() => {
              _setVisible(false);
            }}>
             <Button mode="contained" style={[styles.btn, styles.MainButtonStyle]}>
             <Text type="mainButton">CANCEL</Text>
            </Button> 
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
    },
    backdrop: {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    prompt: {
      position: 'absolute',
      bottom: 0,
      left: 20,
      width: Dimensions.get('window').width - 2 * 20,
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 60,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    hint: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    btn: {
      borderWidth: 1,
      backgroundColor: '#FFA500',
      borderColor: 'black',
      borderRadius: 8,
      padding: 15,
      color: 'black',
    },
  });
  

export default React.forwardRef(AndroidPrompt);