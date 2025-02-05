import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button, Text, TextInput } from 'react-native-paper';

import Loader from '@/components/Loader';
import { Event, events } from '@/data/events';
export default function EditEvent() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : '';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEvent = (id: string) => {
      try {
        const event = events.find((event) => event.id === id) ?? null;
        setEvent(event);
        setTitle(event?.title ?? '');
        setDescription(event?.description ?? '');
        setDepartment(event?.department ?? '');
        setDate(event?.date ? new Date(event.date) : null);
        setTime(event?.time ? new Date(event.time) : null);
        setLocation(event?.location ?? '');
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  if (loading) return <Loader />;

  const handleUpdateEvent = async () => {
    if (!title || !description || !department || !date || !time || !location) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // Update event in the database
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

  if (error || !event) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="headlineLarge" style={styles.title}>
          Page not found
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          The page you're looking for doesn't exist.
        </Text>
        <Button
          mode="contained"
          style={styles.errorButton}
          textColor="white"
          buttonColor="#324C80"
          onPress={() => {
            router.push('/');
          }}
          icon="arrow-left"
        >
          Go back home
        </Button>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.heading}>
        Edit Event
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
        onConfirm={(selectedDate) => {
          setDatePickerVisibility(false);
          setDate(selectedDate);
        }}
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
        onConfirm={(selectedTime) => {
          setTimePickerVisibility(false);
          setTime(selectedTime);
        }}
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
        style={styles.updateButton}
        onPress={handleUpdateEvent}
        contentStyle={styles.buttonContent}
        textColor="white"
        icon="content-save"
      >
        Update Event
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
  title: {
    marginBottom: 8,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#324C80',
    opacity: 0.7,
    marginTop: 8,
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
  updateButton: {
    backgroundColor: '#324C80',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonContent: {
    paddingVertical: 6,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    margin: 16,
    borderRadius: 12,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorButton: {
    backgroundColor: '#324C80',
    borderRadius: 8,
    marginTop: 8,
  },
});
