import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ value, handleChangeText, ...props }) => {
  return (
    <View className="w-full h-14 px-4 space-x-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
      <TextInput
        className="text-base mt-0.5 flex-1 text-white font-pregular"
        value={value}
        placeholder="Search for video Topics"
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        {...props}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
