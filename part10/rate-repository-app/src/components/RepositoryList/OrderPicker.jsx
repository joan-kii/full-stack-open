import React from 'react';
import { Picker } from '@react-native-picker/picker';

const optionsAscRating = {
  orderBy: 'RATING_AVERAGE',
  orderDirection: 'ASC'
};
const optionsDescRating = {
  orderBy: 'RATING_AVERAGE',
  orderDirection: 'DESC'
};

const OrderPicker = ({ selectedOrder, setSelectedOrder, optionsDefault }) => {
  return (
    <Picker 
      selectedValue={selectedOrder}
      onValueChange={(itemValue) =>
        setSelectedOrder(itemValue)
      }>
      <Picker.Item
        label="Latest repositories"
        value={optionsDefault} />
      <Picker.Item
        label="Highest rated repositories"
        value={optionsDescRating} />
      <Picker.Item
        label="Lowest rated repositories"
        value={optionsAscRating} />
    </Picker>
  );
};

export default OrderPicker;
