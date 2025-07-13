import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTasks } from '../../context/TaskContext';
import TaskCard from '../ui/TaskCard';
import ConfirmModal from '../ui/ConfirmModal';

const TaskListScreen = () => {
  const { tasks, deleteTask } = useTasks();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const enterSelectionMode = (id: string) => {
    setSelectionMode(true);
    setSelectedIds([id]);
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds([]);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      else return [...prev, id];
    });
  };

  const confirmDelete = () => {
    selectedIds.forEach(id => deleteTask(id));
    setSelectedIds([]);
    setSelectionMode(false);
    setShowDeleteModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {selectionMode && (
        <View style={styles.selectionHeader}>
          <Text style={styles.selectionText}>{selectedIds.length} selected</Text>
          <TouchableOpacity onPress={exitSelectionMode} style={styles.cancelBtn}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowDeleteModal(true)}
            style={[styles.deleteBtn, { opacity: selectedIds.length === 0 ? 0.5 : 1 }]}
            disabled={selectedIds.length === 0}
          >
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            selectionMode={selectionMode}
            isSelected={selectedIds.includes(item.id)}
            onSelectToggle={toggleSelect}
            enterSelectionMode={enterSelectionMode}
          />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <ConfirmModal
        visible={showDeleteModal}
        message={`Delete ${selectedIds.length} task(s)? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-between',
  },
  selectionText: {
    fontWeight: '700',
    fontSize: 16,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cancelBtnText: {
    color: '#4a90e2',
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: '#e63946',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteBtnText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default TaskListScreen;
