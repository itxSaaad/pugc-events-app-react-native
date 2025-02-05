import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button, Text, TextInput } from 'react-native-paper';

import Loader from '@/components/Loader';
import withAuth from '@/components/withAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { createEvent } from '@/store/asyncThunks/eventThunks';

function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error: eventError } = useAppSelector((state) => state.event);

  const handleCreateEvent = () => {
    setError('');
    const errors = [];

    if (!title) {
      errors.push('Title is required');
    } else if (typeof title !== 'string' || title.length > 255) {
      errors.push('Title must be text and not exceed 255 characters');
    }

    if (!description) {
      errors.push('Description is required');
    } else if (typeof description !== 'string') {
      errors.push('Description must be text');
    }

    if (!department) {
      errors.push('Department is required');
    } else if (typeof department !== 'string') {
      errors.push('Department must be text');
    }

    if (!date) {
      errors.push('Date is required');
    } else if (!(date instanceof Date) || isNaN(date.getTime())) {
      errors.push('Invalid date format');
    }

    if (!time) {
      errors.push('Time is required');
    } else if (!(time instanceof Date) || isNaN(time.getTime())) {
      errors.push('Invalid time format');
    }

    if (!location) {
      errors.push('Location is required');
    } else if (typeof location !== 'string') {
      errors.push('Location must be text');
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    const formattedTime = (time || new Date()).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    const formattedDate = (date || new Date()).toISOString().split('T')[0];

    dispatch(
      createEvent({
        title,
        description,
        department,
        date: formattedDate,
        time: formattedTime,
        location,
      })
    )
      .then(() => {
        router.push('/events');
      })
      .catch((error) => setError(error.message));
  };

  const handleConfirmDate = (selectedDate: Date) => {
    setDatePickerVisibility(false);
    setDate(selectedDate);
  };

  const handleConfirmTime = (selectedTime: Date) => {
    setTimePickerVisibility(false);
    setTime(selectedTime);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Create New Event
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {eventError && <Text style={styles.errorText}>{eventError}</Text>}

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

export default withAuth(CreateEvent);

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
