import React from 'react';
import {
  Button,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';

const Item = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const PhotoScreen = ({route, navigation}) => {
  const renderItem = ({item}) => <Item title={item.title} />;
  console.log('Params for PhotoScreen:', route.params);
  return (
    <ScrollView
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground
        source={{uri: route.params.inputPhoto.uri}}
        style={{
          flex: 1,
        }}
      />
      <ScrollView>
        {route.params.links.links.map((link, i) => {
          return <Text key={i}>{link}</Text>;
        })}
      </ScrollView>

      <TouchableOpacity>
        <Button
          title="Сделать новое фото"
          onPress={() => navigation.navigate('Camera')}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PhotoScreen;
