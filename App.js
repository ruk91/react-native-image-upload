import React from 'react';
import {View, Button} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

const App = () => {
  const upload = async () => {
    const images = await launchImageLibrary(options);
    console.log(images.assets[0]);

    const formData = new FormData();
    formData.append('file', {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });
    let res = await fetch('url goes here!!!', {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data ',
      },
    });
    let responseJson = await res.json();
    console.log('responseJson: ', responseJson);
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Upload" onPress={upload} />
    </View>
  );
};

export default App;
