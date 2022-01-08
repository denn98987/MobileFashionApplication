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
  Linking,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const Item = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const handleClick = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
};

const urlParse = urlText => {
  return urlText.split('/')[2];
};

const PhotoScreen = ({route, navigation}) => {
  const links =
    route.params.links.shops.length > 0
      ? route.params.links.shops.slice(0, 6)
      : route.params.links.links.slice(0, 6);
  const [loading, setLoading] = React.useState(false);
  const renderItem = ({item}) => <Item title={item.title} />;
  console.log('Params for PhotoScreen:', route.params);
  return (
    <ScrollView>
      <Image source={{uri: route.params.inputPhoto.uri}} />
      <ScrollView style={styles.linksContainer} horizontal={true}>
        {links.map((link, i) => {
          return (
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => handleClick(link.href)}
              key={i}>
              <Image
                source={{uri: link.icon}}
                style={styles.productIcon}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
              />
              <Text>{urlParse(link.href)}</Text>
              {loading && <ActivityIndicator color="green" size="large" />}
            </TouchableOpacity>
          );
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

const styles = StyleSheet.create({
  linkItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  linksContainer: {
    padding: 10,
  },
  productIcon: {
    width: 110,
    height: 140,
    margin: 7,
    borderRadius: 10,
  },
});

export default PhotoScreen;
