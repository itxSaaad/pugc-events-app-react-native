import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';

import Loader from '@/components/Loader';
import withAuth from '@/components/withAuth';
import { Event } from '@/data/events';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteEvent, fetchEventById } from '@/store/asyncThunks/eventThunks';
import {
  cancelRSVP,
  fetchEventRSVPs,
  fetchUserRSVPs,
  rsvpToEvent,
} from '@/store/asyncThunks/rsvpThunks';

function EventDetails() {
  const [error, setError] = useState('');
  const [event, setEvent] = useState<Event | null>(null);

  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();

  const { user, loading: userLoading } = useAppSelector((state) => state.auth);
  const {
    events,
    error: eventError,
    loading,
  } = useAppSelector((state) => state.event);
  const {
    userRsvps,
    loading: rsvpLoading,
    error: rsvpError,
  } = useAppSelector((state) => state.rsvp);

  const id =
    typeof params.id === 'string'
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : '';

  useEffect(() => {
    if (events.length) {
      const event = events.find((event) => event.id === id);
      if (event) {
        setEvent(event);
      } else {
        setError('Event not found');
      }
    } else {
      dispatch(fetchEventById(id));
    }
  }, [events]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserRSVPs(id));
    }
  }, [user]);

  useEffect(() => {
    if (event) {
      dispatch(fetchEventRSVPs(event.id));
    }
  }, [event]);

  if (loading || userLoading || rsvpLoading) {
    return <Loader />;
  }

  if (error || eventError || !event) {
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
      {rsvpError && (
        <Text variant="bodyMedium" style={styles.errorText}>
          {rsvpError}
        </Text>
      )}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/events-bg.jpg')}
          style={styles.image}
        />
        <Text variant="headlineMedium" style={styles.title}>
          {event.title}
        </Text>
        <Chip
          icon="calendar"
          style={styles.dateChip}
          textStyle={{ color: '#fff' }}
        >
          {new Date(event.date).toLocaleDateString()}
        </Chip>
      </View>

      <View style={styles.content}>
        <Text variant="bodyLarge" style={styles.description}>
          {event.description}
        </Text>

        <View style={styles.infoSection}>
          <InfoItem icon="domain" label="Department" value={event.department} />
          <InfoItem icon="map-marker" label="Location" value={event.location} />
          <InfoItem icon="clock-outline" label="Time" value={event.time} />
        </View>
      </View>

      <View style={{ padding: 16 }}>
        {userRsvps.find((rsvp) => rsvp.eventId === event.id) ? (
          <Button
            mode="contained"
            icon="cancel"
            onPress={() =>
              dispatch(cancelRSVP(event.id)).then(() =>
                dispatch(fetchUserRSVPs(event.id))
              )
            }
            style={styles.rsvpButton}
            contentStyle={styles.buttonContent}
            textColor="white"
          >
            Cancel RSVP
          </Button>
        ) : (
          <Button
            mode="contained"
            icon="check"
            onPress={() =>
              dispatch(rsvpToEvent(event.id)).then(() =>
                dispatch(fetchUserRSVPs(event.id))
              )
            }
            style={styles.rsvpButton}
            contentStyle={styles.buttonContent}
            textColor="white"
          >
            RSVP
          </Button>
        )}
      </View>

      {user?.role === 'admin' && event && (
        <View style={styles.actions}>
          <Button
            mode="contained"
            icon="pencil"
            onPress={() => router.push(`/events/edit/${event.id}`)}
            style={styles.editButton}
            contentStyle={styles.buttonContent}
            textColor="white"
          >
            Edit Event
          </Button>
          <Button
            mode="contained"
            icon="delete"
            onPress={() =>
              dispatch(deleteEvent(event.id)).then(() => router.push('/events'))
            }
            style={styles.deleteButton}
            contentStyle={styles.buttonContent}
            textColor="white"
          >
            Delete Event
          </Button>
        </View>
      )}
    </ScrollView>
  );
}

export default withAuth(EventDetails);

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
}) => (
  <View style={styles.infoItem}>
    <MaterialCommunityIcons name={icon} size={24} color="#666" />
    <View style={styles.infoTextContainer}>
      <Text variant="labelMedium" style={styles.infoLabel}>
        {label}
      </Text>
      <Text variant="bodyLarge" style={styles.infoValue}>
        {value}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    height: 200,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
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
  dateChip: {
    backgroundColor: '#324C80',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  content: {
    padding: 16,
  },
  description: {
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoSection: {
    gap: 16,
  },
  infoItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  infoTextContainer: {
    marginLeft: 12,
  },
  infoLabel: {
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    color: '#1a1a1a',
  },
  actions: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rsvpButton: {
    backgroundColor: '#324C80',
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#324C80',
    borderRadius: 8,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
    borderRadius: 8,
    marginTop: 8,
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
    color: '#FF453A',
    textAlign: 'center',
    marginBottom: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 8,
  },
  errorButton: {
    backgroundColor: '#324C80',
    borderRadius: 8,
    marginTop: 8,
  },
});
