import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ConfirmModalProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  visible,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'Cancel',
}: ConfirmModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonsRow}>
            <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelBtn]}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmBtn]}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
  },
  message: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    color: '#222',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: '#ddd',
  },
  confirmBtn: {
    backgroundColor: '#4a90e2',
  },
  cancelText: {
    textAlign: 'center',
    color: '#555',
    fontWeight: '600',
  },
  confirmText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
});
