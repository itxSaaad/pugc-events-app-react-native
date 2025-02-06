import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import Loader from '@/components/Loader';
import withAuth from '@/components/withAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchEvents } from '@/store/asyncThunks/eventThunks';
import { Event } from '@/store/slices/eventSlice';

function Index() {
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useAppSelector((state) => state.auth);
  const { events, loading, error } = useAppSelector((state) => state.event);

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchEvents()).finally(() => setRefreshing(false));
  };

  const renderEventCard = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() =>
        router.push({
          pathname: '/events/[id]',
          params: { id: item.id },
        })
      }
    >
      <Image
        source={require('@/assets/images/events-bg.png')}
        style={styles.eventImage}
      />
      <View style={styles.rsvpCountContainer}>
        <Ionicons name="people" size={20} color="white" />
        <Text style={styles.rsvpCountText}>{item.rsvps?.length}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.eventMetadata}>
          <Ionicons name="calendar" size={16} color="#324C80" />
          <Text style={styles.eventDate}>{item.date}</Text>
          <Ionicons name="location" size={16} color="#324C80" />
          <Text style={styles.eventLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading || userLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {error || userError ? (
        <Text>{error?.message || userError}</Text>
      ) : events.length === 0 ? (
        <Text style={styles.noEvents}>No upcoming events.</Text>
      ) : (
        <FlatList
          data={events.slice(0, 3)}
          renderItem={renderEventCard}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => (
            <Text style={styles.heading}>Upcoming Events</Text>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={[styles.button, styles.viewButton]}
              onPress={() => router.push('/events')}
            >
              <Ionicons name="list" size={24} color="white" />
              <Text style={styles.buttonText}>View all Events</Text>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      {user?.role === 'admin' && (
        <AnimatedFAB
          style={styles.fab}
          color="white"
          label="Create Event"
          extended={true}
          animateFrom={'right'}
          icon="plus"
          iconMode={'static'}
          onPress={() => router.push('/events/create')}
        />
      )}
    </View>
  );
}

export default withAuth(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#324C80',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  listContainer: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#324C80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(50, 76, 128, 0.1)',
  },
  eventImage: {
    height: 220,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  rsvpCountContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(50, 76, 128, 0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  rsvpCountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  eventContent: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#324C80',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  eventDescription: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  eventMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(207, 226, 243, 0.5)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(50, 76, 128, 0.1)',
  },
  eventDate: {
    fontSize: 14,
    color: '#324C80',
    marginLeft: 8,
    marginRight: 16,
    fontWeight: '600',
  },
  eventLocation: {
    fontSize: 14,
    color: '#324C80',
    marginLeft: 8,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 16,
  },
  viewButton: {
    backgroundColor: '#324C80',
    shadowColor: '#324C80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  noEvents: {
    fontSize: 18,
    color: '#324C80',
    textAlign: 'center',
    marginTop: 40,
    fontWeight: '600',
    opacity: 0.8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 70,
    backgroundColor: '#324C80',
    borderRadius: 16,
    shadowColor: '#324C80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
