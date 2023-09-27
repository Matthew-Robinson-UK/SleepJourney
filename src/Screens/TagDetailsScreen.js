import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ndef } from 'react-native-nfc-manager';

function TagDetailsScreen({ route, navigation }) {
  const { tag } = route.params;

  const getUriFromTag = (tag) => {
    if (tag.ndefMessage && tag.ndefMessage.length > 0) {
      const ndefRecord = tag.ndefMessage[0];
      if (ndefRecord.tnf === Ndef.TNF_WELL_KNOWN && ndefRecord.type.every((b, i) => b === Ndef.RTD_BYTES_URI[i])) {
        return Ndef.uri.decodePayload(ndefRecord.payload);
      }
    }
    return null;
  }

  const uri = getUriFromTag(tag);
  const msg = uri ? uri.split('://')[1] : null;

  useEffect(() => {
    if (uri) {
      Linking.openURL(uri);
      navigation.navigate('Journey', { msg });
    }
  }, [uri, navigation, msg]);

  return (
    <View style={styles.wrapper}>
      {uri ? (
        <TouchableOpacity onPress={() => navigation.navigate('Journey', { msg })}>
          <Text style={styles.msg}>{msg}</Text>
        </TouchableOpacity>
      ) : (
        <Text>{JSON.stringify(tag, null, 2)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001F3F',
  },
  msg: {
    fontSize: 30,
  },
});

export default TagDetailsScreen;
