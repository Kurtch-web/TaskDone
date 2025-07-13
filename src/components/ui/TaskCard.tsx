import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Task } from '../../types/Task';
import { useTasks } from '../../context/TaskContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  task: Task;
  selectionMode: boolean;
  isSelected: boolean;
  onSelectToggle: (id: string) => void;
  enterSelectionMode: (id: string) => void;
}

const LONG_PRESS_DURATION = 2000; // 2 seconds

const TaskCard = ({
  task,
  selectionMode,
  isSelected,
  onSelectToggle,
  enterSelectionMode,
}: Props) => {
  const { toggleComplete } = useTasks();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  // Date logic for badges
  const dueDate = new Date(task.dueDate);
  const now = new Date();
  const timeDiff = dueDate.getTime() - now.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  let badgeText = '';
  let badgeColor = '';

  if (task.completed) {
    badgeText = 'Completed';
    badgeColor = '#2ecc71'; // green
  } else if (daysDiff < 0) {
    badgeText = 'Overdue';
    badgeColor = '#e74c3c'; // red
  } else if (daysDiff <= 2) {
    badgeText = 'Due Soon';
    badgeColor = '#e67e22'; // orange
  }

  // Handlers
  const onLongPress = () => {
    if (!selectionMode) {
      enterSelectionMode(task.id);
    }
  };

  const onPressTitle = () => {
    if (selectionMode) {
      onSelectToggle(task.id);
    } else {
      toggleComplete(task.id);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={onPressTitle}
        onLongPress={onLongPress}
        delayLongPress={LONG_PRESS_DURATION}
        style={styles.titleRow}
      >
        {selectionMode && (
          <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </View>
        )}
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
        {badgeText ? (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleExpand}>
        <Text style={styles.toggle}>{expanded ? 'Hide Details ▲' : 'Show Details ▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.details}>
          <Detail label="Description" value={task.description || 'None'} />
          <Detail label="Due Date" value={dueDate.toLocaleString()} />
          <Detail label="Category" value={task.category || 'None'} />
          <Detail label="Priority" value={task.priority} />
          <Detail label="Type" value={task.type} />

          {task.type === 'Series' && task.subtasks && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.detailLabel}>Subtasks:</Text>
              {task.subtasks.map((sub) => (
                <Text key={sub.id} style={styles.subtask}>
                  • {sub.title} {sub.completed ? '✅' : ''}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  toggle: {
    marginTop: 10,
    color: '#4a90e2',
    fontWeight: '500',
  },
  details: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
    width: 100,
  },
  detailValue: {
    color: '#444',
    flex: 1,
  },
  subtask: {
    marginLeft: 16,
    marginTop: 4,
    fontSize: 15,
    color: '#333',
  },
});
