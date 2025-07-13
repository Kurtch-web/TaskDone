import React, { useState } from 'react';
import { Button, FlatList, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { useTasks } from '../../context/TaskContext';
import { Task, Priority, TaskType, SubTask } from '../../types/Task';
import uuid from 'react-native-uuid';

const TaskForm = () => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('Low');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TaskType>('Single');
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [subtaskInput, setSubtaskInput] = useState('');

  const handleAddSubtask = () => {
    if (!subtaskInput.trim()) return;
    setSubtasks(prev => [
      ...prev,
      { id: uuid.v4().toString(), title: subtaskInput, completed: false },
    ]);
    setSubtaskInput('');
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: uuid.v4().toString(),
      title,
      description,
      dueDate,
      priority,
      category,
      type,
      completed: false,
      subtasks: type === 'Series' ? subtasks : undefined,
    };

    addTask(newTask);

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Low');
    setCategory('');
    setType('Single');
    setSubtasks([]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Label>Title</Label>
      <Input value={title} onChangeText={setTitle} placeholder="Task title" />

      <Label>Description</Label>
      <Input
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />

      <Label>Due Date</Label>
      <Input value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD" />

      <Label>Priority</Label>
      <PickerContainer>
        <Picker
          selectedValue={priority}
          onValueChange={(val: Priority) => setPriority(val)}
        >
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </PickerContainer>

      <Label>Category</Label>
      <Input value={category} onChangeText={setCategory} placeholder="Category" />

      <Label>Task Type</Label>
      <PickerContainer>
        <Picker selectedValue={type} onValueChange={(val: TaskType) => setType(val)}>
          <Picker.Item label="Single" value="Single" />
          <Picker.Item label="Series" value="Series" />
        </Picker>
      </PickerContainer>

      {type === 'Series' && (
        <>
          <Label>Add Subtasks</Label>
          <Row>
            <Input
              value={subtaskInput}
              onChangeText={setSubtaskInput}
              placeholder="Subtask name"
              style={{ flex: 1 }}
            />
            <AddButton title="+" onPress={handleAddSubtask} />
          </Row>
          <FlatList
            data={subtasks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <SubtaskItem>• {item.title}</SubtaskItem>}
          />
        </>
      )}

      <Button title="Add Task" onPress={handleSubmit} />
    </ScrollView>
  );
};

// Styled components (same as before)
const Label = styled.Text`
  margin-bottom: 4px;
  font-weight: bold;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 12px;
`;

const PickerContainer = styled.View`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const AddButton = styled.Button``;

const SubtaskItem = styled.Text`
  padding: 4px 0;
`;

export default TaskForm;
