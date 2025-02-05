import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AnimatedFAB } from 'react-native-paper';

import withAuth from '@/components/withAuth';

import { Event, events } from '@/data/events';

function Index() {
  const router = useRouter();

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
        source={{ uri: item.image }}
        style={styles.eventImage}
        defaultSource={require('@/assets/images/events-bg.jpg')}
      />
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

  return (
    <View style={styles.container}>
      {events.length === 0 ? (
        <Text style={styles.noEvents}>No upcoming events.</Text>
      ) : (
        <FlatList
          data={events}
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
        />
      )}
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
    fontSize: 24,
    fontWeight: '700',
    color: '#324C80',
    marginTop: 0,
    marginBottom: 30,
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#324C80',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  eventImage: {
    height: 200,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#324C80',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  eventDescription: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 12,
    lineHeight: 24,
  },
  eventMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cfe2f3',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  eventDate: {
    fontSize: 14,
    color: '#334155',
    marginLeft: 6,
    marginRight: 16,
    fontWeight: '600',
  },
  eventLocation: {
    fontSize: 14,
    color: '#334155',
    marginLeft: 6,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  viewButton: {
    backgroundColor: '#324C80',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  noEvents: {
    fontSize: 18,
    color: '#334155',
    textAlign: 'center',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 70,
    backgroundColor: '#324C80',
  },
});
