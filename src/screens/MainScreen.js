import React from 'react';

import {Button, Text, TouchableOpacity, View} from 'react-native';

const MainScreen = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity>
        <Button
          title="Launch Camera"
          onPress={() => navigation.navigate('Camera')}
        />
      </TouchableOpacity>
    </View>
  );
};
export default MainScreen;
