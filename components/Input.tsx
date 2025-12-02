// components/Input.tsx
import React from 'react';
import { View, TextInput, Text } from 'react-native';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function Input({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  multiline = false,
  numberOfLines = 1,
}: InputProps) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-700 mb-2">
        {label}
      </Text>
      
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        className={`border rounded-lg px-4 py-3 text-base ${
          error 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 bg-white'
        }`}
      />
      
      {error && (
        <Text className="text-red-500 text-xs mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}