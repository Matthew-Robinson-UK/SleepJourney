import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {Ndef} from 'react-native-nfc-manager';

function TagDetailsScreen(props) {
  const {route} = props;
  const {tag} = route.params;
  let uri = null;

  if (tag.ndefMessage && tag.ndefMessage.length > 0) {
    const ndefRecord = tag.ndefMessage[0];
    if (ndefRecord.tnf === Ndef.TNF_WELL_KNOWN) {
      if (ndefRecord.type.every((b, i) => b === Ndef.RTD_BYTES_URI[i])) {
        uri = Ndef.uri.decodePayload(ndefRecord.payload);
      }
    }
  }
  let msg = uri.split('://')[1];


  return (
    <View style={styles.wrapper}>
      {uri ? (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(uri);
          }}>
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
  },
  msg: {
    fontSize: 30,
  },
});

export default TagDetailsScreen;