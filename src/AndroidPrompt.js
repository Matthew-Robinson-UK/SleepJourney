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
        setVisible: _setVisible,
        setHintText,
      };
    }
  }, [ref]);

  React.useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        setHintText('');
      });
    }
  }, [_visible, animValue]);

  const backdropAnimStyle = {
    opacity: animValue,
  };

  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
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
          <Text style={styles.hint}>{hintText || 'Scan to start'}</Text>

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
      backgroundColor: '#5E4B8B',
      borderWidth: 1,
      borderRadius: 65,
      borderColor: '#F5F5F5',
      paddingVertical: 60,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    hint: {
      bottom: 10,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#F5F5F5',
    },
    btn: {
      borderWidth: 1,
      backgroundColor: '#FFD180',
      borderColor: '#F5F5F5',
      borderRadius: 10,
      padding: 15,
      marginTop: 10,
    },
  });
  

export default React.forwardRef(AndroidPrompt);