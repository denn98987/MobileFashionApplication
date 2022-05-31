import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import postData from '../components/PostData';
import {Button} from 'react-native-paper';

const HistoryPhotoScreen = ({route, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground
        source={{uri: route.params.inputPhotoUri}}
        style={{
          flex: 1,
        }}
      />
      <TouchableOpacity>
        <Button
          title="Вернуться на главную"
          onPress={() => navigation.navigate('MainScreen')}
        />
        <Button
          style={styles.buttonStyle}
          icon="search"
          mode="outline"
          onPress={async () => {
            await postData(route.params.inputPhotoUri);
            navigation.navigate('MainScreen');
          }}>
          Начать поиск
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 30,
    marginVertical: 5,
  },
});

export default HistoryPhotoScreen;
