import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import CollectionCard from './ItemsCard';
import {CheckBox} from 'react-native-elements';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [items, setItems] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [catId, setCatId] = useState('');
  const [subCatId, setSubCatId] = useState('');
  const [catApply, setCatApply] = useState(true);
  const [subCatApply, setSubCatApply] = useState(true);

  const getData = async () => {
    let {data} = await axios.get('http://192.168.18.94:5000/categories');
    setCategories(data);
    let {data: subCat} = await axios.get(
      'http://192.168.18.94:5000/subcategories',
    );
    setSubCategories(subCat);
    let {data: apiItems} = await axios.get('http://192.168.18.94:5000/items');
    console.log(apiItems);
    setFiltered(apiItems);
    setItems(apiItems);
  };

  useEffect(() => {
    getData();
    setFiltered(items);
  }, []);
  useEffect(() => {
    if (filtered) {
      if (catApply) {
        let filter = items.filter(item => item.category == catId);
        setFiltered(filter);
      }
    }
  }, [catId]);

  useEffect(() => {
    if (!catApply) {
      setFiltered(items);
    } else {
      if (items) {
        let filter = items.filter(item => item.category == catId);
        setFiltered(filter);
      }
    }
  }, [catApply]);

  useEffect(() => {
    if (!subCatApply) {
      if (catApply) {
        let filter = items.filter(item => item.category == catId);
        setFiltered(filter);
      }
    } else {
      if (items) {
        if (catId && subCatId && catApply) {
          let filter = items.filter(item => item.subcategory == subCatId);
          setFiltered(filter);
        }
      }
    }
  }, [subCatApply]);

  useEffect(() => {
    if (subCatId) {
      if (subCatApply) {
        let filter = items.filter(item => item.subcategory == subCatId);
        setFiltered(filter);
      }
    }
  }, [subCatId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!items ? (
        <ActivityIndicator
          size="large"
          color="red"
          style={{flex: 1, justifyContent: 'center'}}
        />
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Picker
              style={{width: '85%', backgroundColor: 'white'}}
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) => {
                itemValue ? setCatId(itemValue._id) : null;
                setSelectedCategory(itemValue);
              }}>
              <Picker.Item label="--Select Category--" value={null} />
              {categories.map(category => (
                <Picker.Item
                  key={category._id}
                  label={category.category}
                  value={category}
                />
              ))}
            </Picker>

            <CheckBox
              onIconPress={() => setCatApply(!catApply)}
              checked={catApply}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <Picker
              style={{width: '85%', backgroundColor: 'white'}}
              selectedValue={selectedSubCategory}
              onValueChange={(itemValue, itemIndex) => {
                itemValue ? setSubCatId(itemValue._id) : null;
                setSelectedSubCategory(itemValue);
              }}>
              <Picker.Item label="--Select SubCategory--" value={null} />
              {subCategories.map(subcategory =>
                subcategory.category == catId ? (
                  <Picker.Item
                    key={subcategory._id}
                    label={subcategory.subCategory}
                    value={subcategory}
                  />
                ) : null,
              )}
            </Picker>
            <CheckBox
              onIconPress={() => setSubCatApply(!subCatApply)}
              checked={subCatApply}
            />
          </View>
          <CollectionCard navigation={navigation} data={filtered} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
