import * as React from 'react';
import {ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {habitList} from '../../habitData';

function habitListScreen(props) {
  const {navigation} = props;

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      {habitList.map(h => {
        return (
          <List.Item
            key={h.name}
            title={h.name}
            left={() => <images name={h.name} />}
            onPress={() => {
              navigation.navigate('Journey', {habit: h, allowCreate: true});
            }}
          />
        );
      })}
    </ScrollView>
  );
}

export default habitListScreen;