// components/ConfirmModal.tsx
import { Modal, View, Text, Pressable } from "react-native";

interface Props {
  visible: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  title = "Confirmar acción",
  message = "¿Estás seguro?",
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 items-center justify-center px-6">
        <View className="bg-neutral-900 p-6 rounded-xl w-full">
          <Text className="text-white text-xl font-bold mb-2">
            {title}
          </Text>

          <Text className="text-neutral-300 mb-6">{message}</Text>

          <View className="flex-row justify-between">
            <Pressable
              onPress={onCancel}
              className="bg-neutral-700 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
