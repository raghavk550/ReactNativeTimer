import React, {useContext, useEffect, useState} from 'react';
import MyContext from './MyContext';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  Linking,
  Alert,
} from 'react-native';
import axios from 'axios';

const ContextTest = () => {
  const {myColor, setColor, toggleColor} = useContext(MyContext);
  const [apiData, setApiData] = useState([]);

  console.log(myColor);

  const changeColor = () => {
    setColor('gray');
    toggleColor();
  };

  useEffect(() => {
    const endpoint = 'https://api.freeapi.app/api/v1/public/randomusers';
    const params = {
      page: '1',
      limit: '10',
    };
    const fetchData = async () => {
      try {
        // const response = await fetch(`${endpoint}?${new URLSearchParams(params).toString()}`);
        // const res = await response.json();
        const res = await axios.get(
          `${endpoint}?${new URLSearchParams(params).toString()}`,
        );
        // console.log('res', res.data.data.data[0].name);
        // const dataModel = new DataModel(res.data.data.data, res.data.data.nextPage)
        // console.log(res.data.data.data[0])
        if (res.data.data.data) {
          // console.log(res.data.data.data)
          setApiData(res.data.data.data);
        }
      } catch (err) {
        console.log('ERR', err);
      }
    };
    fetchData();
  }, []);

  const Item = ({item}: {item: any}) => {
    // const numbers = [4, 9, 16, 25, 29];
    // let first = numbers.find(myFunction);

    // function myFunction(value: number, index: number, array: number[]) {
    //   return value > 18;
    // }
    // console.log(first);
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 20,
          height: 100,
          marginVertical: 10,
          borderRadius: 10,
          flex: 1,
          flexDirection: 'row',
        }}>
        <Image
          style={{
            borderRadius: 10,
            width: 80,
            height: 80,
            marginLeft: 5,
            alignSelf: 'center',
          }}
          source={{uri: item.picture.large}}></Image>
        <View style={{marginLeft: 10, flex: 0.95, marginVertical: 10}}>
          <Text>{item.name.first + ' ' + item.name.last}</Text>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              openMail(item.email);
            }}>
            <Text>{item.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              openPhone(item.phone);
            }}>
            <Text>{item.phone}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const openMail = async (mail: string) => {
    const url = `mailto:${mail}`;
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', `Unable to open url - ${url}`);
    }
  };

  const openPhone = async (phone: string) => {
    const url = `tel:${phone}`;
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', `Unable to open url - ${url}`);
    }
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <TouchableOpacity onPress={changeColor} disabled={true}>
        <Text>Change Color</Text>
      </TouchableOpacity>
      {apiData.length > 0 ? (
        <FlatList
          data={apiData}
          renderItem={({item}) => <Item item={item}></Item>}
          keyExtractor={({item}: {item: any}) => item.id}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No data</Text>
        </View>
      )}
    </View>
  );
};

export default ContextTest;

// class DataModel {
//   nextPage: boolean;
//   data: DataArrayModel[];
//   constructor(data: [DataArrayModel], nextPage: boolean) {
//     this.data = data.map(
//       dataModel =>
//         new DataArrayModel(dataModel.name, dataModel.email, dataModel.picture),
//     );
//     this.nextPage = nextPage;
//   }
// }

// class DataArrayModel {
//   email: String;
//   name: NameModel;
//   picture: PictureModel;
//   constructor(name: NameModel, email: String, picture: PictureModel) {
//     this.name = name;
//     this.email = email;
//     this.picture = picture;
//   }
// }

// class NameModel {
//   first: String;
//   last: String;
//   title: String;
//   constructor(first: String, last: String, title: String) {
//     this.first = first;
//     this.last = last;
//     this.title = title;
//   }
// }

// class PictureModel {
//   large: String;
//   medium: String;
//   constructor(large: String, medium: String) {
//     this.large = large;
//     this.medium = medium;
//   }
// }
