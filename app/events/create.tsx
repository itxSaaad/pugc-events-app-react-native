import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button, Text, TextInput } from 'react-native-paper';

export default function CreateEvent() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleCreateEvent = () => {
    if (!title || !description || !department || !date || !time || !location) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    console.log('Event created with:', {
      title,
      description,
      department,
      date,
      time,
      location,
    });
    router.push('/events');
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDatePickerVisibility(false);
    setDate(selectedDate);
  };

  const handleConfirmTime = (selectedTime: Date) => {
    setTimePickerVisibility(false);
    setTime(selectedTime);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Create New Event
      </Text>

      {error ? (
        <Text variant="bodyMedium" style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      <TextInput
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        outlineColor="#324C80"
        activeOutlineColor="#324C80"
        textColor="#324C80"
        left={<TextInput.Icon icon="calendar-text" />}
      />

      <TextInput
        label="Description"
        mode="outlined"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        outlineColor="#324C80"
        activeOutlineColor="#324C80"
        textColor="#324C80"
        multiline
        numberOfLines={4}
        left={<TextInput.Icon icon="text" />}
      />

      <TextInput
        label="Department"
        mode="outlined"
        value={department}
        onChangeText={setDepartment}
        style={styles.input}
        outlineColor="#324C80"
        activeOutlineColor="#324C80"
        textColor="#324C80"
        left={<TextInput.Icon icon="office-building" />}
      />

      <Button
        mode="outlined"
        onPress={() => setDatePickerVisibility(true)}
        style={styles.dateTimeButton}
        textColor="#324C80"
        icon="calendar"
      >
        {date ? date.toLocaleDateString() : 'Select Date'}
      </Button>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <Button
        mode="outlined"
        onPress={() => setTimePickerVisibility(true)}
        style={styles.dateTimeButton}
        textColor="#324C80"
        icon="clock"
      >
        {time ? time.toLocaleTimeString() : 'Select Time'}
      </Button>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisibility(false)}
      />

      <TextInput
        label="Location"
        mode="outlined"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
        outlineColor="#324C80"
        activeOutlineColor="#324C80"
        textColor="#324C80"
        left={<TextInput.Icon icon="map-marker" />}
      />

      <Button
        mode="contained"
        style={styles.createButton}
        onPress={handleCreateEvent}
        contentStyle={styles.buttonContent}
        textColor="white"
        icon="calendar-plus"
      >
        Create Event
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  heading: {
    fontWeight: '700',
    color: '#324C80',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  dateTimeButton: {
    backgroundColor: 'white',
    borderColor: '#324C80',
    borderRadius: 8,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#324C80',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});
