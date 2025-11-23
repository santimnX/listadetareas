// components/TextInputField.tsx
import { View, Text, TextInput } from "react-native";

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  error?: string;
  multiline?: boolean;
}

export default function TextInputField({
  label,
  value,
  placeholder,
  onChangeText,
  error,
  multiline = false,
}: Props) {
  return (
    <View className="mb-4">
      <Text className="text-white mb-1 font-semibold">{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        multiline={multiline}
        className={`bg-neutral-900 text-white p-3 rounded-xl border ${
          error ? "border-red-500" : "border-neutral-700"
        }`}
      />

      {error && (
        <Text className="text-red-500 mt-1 text-sm">{error}</Text>
      )}
    </View>
  );
}
