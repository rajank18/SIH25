import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { useThemeColor } from '../../hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';

// Mock data for internship recommendations
const INTERNSHIPS = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechSolutions Inc.',
    location: 'Bangalore',
    stipend: '₹15,000/month',
    matchPercentage: 92,
    logo: require('../../assets/images/icon.png'),
  },
  {
    id: '2',
    title: 'UI/UX Design Intern',
    company: 'CreativeMinds',
    location: 'Mumbai',
    stipend: '₹12,000/month',
    matchPercentage: 87,
    logo: require('../../assets/images/icon.png'),
  },
  {
    id: '3',
    title: 'Data Analysis Intern',
    company: 'DataInsights',
    location: 'Hyderabad',
    stipend: '₹18,000/month',
    matchPercentage: 85,
    logo: require('../../assets/images/icon.png'),
  },
  {
    id: '4',
    title: 'Marketing Intern',
    company: 'GrowthMarketing',
    location: 'Delhi',
    stipend: '₹10,000/month',
    matchPercentage: 78,
    logo: require('../../assets/images/icon.png'),
  },
];

export default function DashboardScreen() {
  const tintColor = useThemeColor({}, 'tint');
  const cardColor = useThemeColor({}, 'card');
  
  const renderInternshipCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColor }]}
      onPress={() => router.push(`/internship-details/${item.id}`)}
    >
      <ThemedView style={styles.cardHeader}>
        <Image source={item.logo} style={styles.companyLogo} />
        <ThemedView style={styles.matchBadge}>
          <ThemedText style={styles.matchText}>{item.matchPercentage}% Match</ThemedText>
        </ThemedView>
      </ThemedView>
      
      <ThemedText style={styles.jobTitle}>{item.title}</ThemedText>
      <ThemedText style={styles.companyName}>{item.company}</ThemedText>
      
      <ThemedView style={styles.cardFooter}>
        <ThemedView style={styles.infoItem}>
          <Ionicons name="location" size={16} color={tintColor} />
          <ThemedText style={styles.infoText}>{item.location}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.infoItem}>
          <Ionicons name="cash-outline" size={16} color={tintColor} />
          <ThemedText style={styles.infoText}>{item.stipend}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView>
          <ThemedText style={styles.greeting}>Hello, Student!</ThemedText>
          <ThemedText style={styles.subtitle}>Here are your top matches</ThemedText>
        </ThemedView>
        <TouchableOpacity onPress={() => router.push('/profile-setup')}>
          <Ionicons name="settings-outline" size={24} color={tintColor} />
        </TouchableOpacity>
      </ThemedView>
      
      <FlatList
        data={INTERNSHIPS}
        renderItem={renderInternshipCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  matchBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 4,
    fontSize: 14,
  },
});
