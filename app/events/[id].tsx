import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Loader from '@/components/Loader';
import withAuth from '@/components/withAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProfile } from '@/store/asyncThunks/authThunks';
import {
  deleteEvent,
  fetchEventById,
  fetchEvents,
} from '@/store/asyncThunks/eventThunks';
import {
  cancelRSVP,
  fetchUserRSVPs,
  rsvpToEvent,
} from '@/store/asyncThunks/rsvpThunks';

function EventDetails() {
  const [isRSVP, setIsRSVP] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { eventDetails, loading, error } = useAppSelector(
    (state) => state.event
  );
  const {
    loading: rsvpLoading,
    error: rsvpError,
    userRsvps,
  } = useAppSelector((state) => state.rsvp);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id))
        .unwrap()
        .then(() => {
          dispatch(fetchUserRSVPs());
        });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (userRsvps && eventDetails) {
      setIsRSVP(userRsvps.some((rsvp) => rsvp.event_id === eventDetails.id));
    }
  }, [userRsvps, eventDetails, setIsRSVP]);

  if (loading || rsvpLoading) {
    return <Loader />;
  }

  if (error) {
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
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {user?.role === 'admin' && eventDetails && (
        <View style={styles.actions}>
          <Button
            mode="contained"
            icon="pencil"
            onPress={() => router.push(`/events/edit/${eventDetails.id}`)}
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
              dispatch(deleteEvent(eventDetails.id)).then(() =>
                router.push('/events')
              )
            }
            style={styles.deleteButton}
            contentStyle={styles.buttonContent}
            textColor="white"
          >
            Delete Event
          </Button>
        </View>
      )}

      {(error || rsvpError) && (
        <Text style={styles.errorText}>{error || rsvpError}</Text>
      )}

      {eventDetails && (
        <>
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/events-bg.png')}
              style={styles.image}
            />
            <Text variant="headlineMedium" style={styles.title}>
              {eventDetails.title}
            </Text>
            <View style={styles.chipContainer}>
              <View style={styles.dateChip}>
                <Ionicons name="calendar" size={16} color="#324C80" />
                <Text style={styles.dateChipText}>
                  {new Date(eventDetails.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.dateChip}>
                <Ionicons name="people" size={16} color="#324C80" />
                <Text style={styles.dateChipText}>
                  {eventDetails.rsvps.length} Attendees
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text variant="bodyLarge" style={styles.description}>
              {eventDetails.description}
            </Text>

            <View style={styles.infoSection}>
              <InfoItem
                icon="business"
                label="Department"
                value={eventDetails.department}
              />
              <InfoItem
                icon="location"
                label="Location"
                value={eventDetails.location}
              />
              <InfoItem icon="time" label="Time" value={eventDetails.time} />
            </View>
          </View>

          <Button
            mode="contained"
            icon={isRSVP ? 'calendar-remove' : 'calendar-check'}
            onPress={() => {
              if (isRSVP) {
                dispatch(cancelRSVP(eventDetails.id)).then(() =>
                  dispatch(fetchEventById(eventDetails.id)).then(() =>
                    dispatch(fetchUserRSVPs()).then(() =>
                      dispatch(fetchEvents()).then(() =>
                        dispatch(fetchProfile())
                      )
                    )
                  )
                );
              } else {
                dispatch(rsvpToEvent(eventDetails.id)).then(() =>
                  dispatch(fetchEventById(eventDetails.id)).then(() =>
                    dispatch(fetchUserRSVPs()).then(() =>
                      dispatch(fetchEvents()).then(() =>
                        dispatch(fetchProfile())
                      )
                    )
                  )
                );
              }
            }}
            style={styles.rsvpButton}
            contentStyle={styles.buttonContent}
            textColor="white"
          >
            {isRSVP ? 'Cancel RSVP' : 'RSVP'}
          </Button>
        </>
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
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.infoItem}>
    <Ionicons
      name={icon as keyof typeof Ionicons.glyphMap}
      size={24}
      color="#324C80"
    />
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
    padding: 22,
  },
  header: {
    marginBottom: 16,
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
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 8,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(207, 226, 243, 0.5)',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(50, 76, 128, 0.1)',
  },
  dateChipText: {
    marginLeft: 8,
    color: '#324C80',
  },
  description: {
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(207, 226, 243, 0.5)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(50, 76, 128, 0.1)',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
