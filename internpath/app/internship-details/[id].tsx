import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { useThemeColor } from '../../hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';

// Mock data for internship details
const INTERNSHIPS = {
  '1': {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechSolutions Inc.',
    location: 'Bangalore',
    stipend: '₹15,000/month',
    duration: '3 months',
    matchPercentage: 92,
    logo: require('../../assets/images/icon.png'),
    description: 'We are looking for a passionate Frontend Developer Intern to join our dynamic team. You will work on real-world projects using React, HTML, CSS, and JavaScript to build responsive user interfaces.',
    responsibilities: [
      'Develop and maintain responsive web applications',
      'Collaborate with the design team to implement UI/UX designs',
      'Write clean, efficient, and reusable code',
      'Test and debug applications to optimize performance'
    ],
    requirements: [
      'Currently pursuing a degree in Computer Science or related field',
      'Basic knowledge of HTML, CSS, and JavaScript',
      'Familiarity with React or similar frameworks is a plus',
      'Strong problem-solving skills and attention to detail'
    ],
    matchReasons: [
      'Your React skills match our requirements',
      'Your location preference matches this opportunity',
      'Your educational background is relevant to this role'
    ]
  },
  '2': {
    id: '2',
    title: 'UI/UX Design Intern',
    company: 'CreativeMinds',
    location: 'Mumbai',
    stipend: '₹12,000/month',
    duration: '6 months',
    matchPercentage: 87,
    logo: require('../../assets/images/icon.png'),
    description: 'Join our creative team as a UI/UX Design Intern and help us create beautiful, intuitive user experiences. You will work closely with our design and development teams to create wireframes, prototypes, and visual designs.',
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with developers to implement designs',
      'Create visual assets for web and mobile applications'
    ],
    requirements: [
      'Currently pursuing a degree in Design, HCI, or related field',
      'Basic knowledge of design tools like Figma or Adobe XD',
      'Understanding of UI/UX principles',
      'Strong visual design skills and attention to detail'
    ],
    matchReasons: [
      'Your design skills match our requirements',
      'Your interest in UI/UX aligns with this role',
      'Your portfolio demonstrates relevant experience'
    ]
  },
  '3': {
    id: '3',
    title: 'Data Analysis Intern',
    company: 'DataInsights',
    location: 'Hyderabad',
    stipend: '₹18,000/month',
    duration: '4 months',
    matchPercentage: 85,
    logo: require('../../assets/images/icon.png'),
    description: 'We are seeking a detail-oriented Data Analysis Intern to join our analytics team. You will help collect, process, and analyze data to provide valuable insights for business decisions.',
    responsibilities: [
      'Collect and clean data from various sources',
      'Perform statistical analysis and create visualizations',
      'Assist in building predictive models',
      'Present findings to stakeholders'
    ],
    requirements: [
      'Currently pursuing a degree in Statistics, Mathematics, Computer Science, or related field',
      'Knowledge of data analysis tools like Python, R, or Excel',
      'Basic understanding of statistical methods',
      'Strong analytical and problem-solving skills'
    ],
    matchReasons: [
      'Your data analysis skills match our requirements',
      'Your educational background is highly relevant',
      'Your interest in data science aligns with this role'
    ]
  },
  '4': {
    id: '4',
    title: 'Marketing Intern',
    company: 'GrowthMarketing',
    location: 'Delhi',
    stipend: '₹10,000/month',
    duration: '3 months',
    matchPercentage: 78,
    logo: require('../../assets/images/icon.png'),
    description: 'Join our marketing team as an intern and gain hands-on experience in digital marketing strategies. You will assist in creating and implementing marketing campaigns across various channels.',
    responsibilities: [
      'Assist in creating content for social media and blogs',
      'Help manage email marketing campaigns',
      'Conduct market research and competitor analysis',
      'Track and analyze marketing metrics'
    ],
    requirements: [
      'Currently pursuing a degree in Marketing, Communications, or related field',
      'Basic knowledge of digital marketing concepts',
      'Familiarity with social media platforms',
      'Good communication and writing skills'
    ],
    matchReasons: [
      'Your marketing skills match our requirements',
      'Your communication skills are valuable for this role',
      'Your interest in digital marketing aligns with our needs'
    ]
  }
};

export default function InternshipDetailsScreen() {
  const { id } = useLocalSearchParams();
  const internship = INTERNSHIPS[id];
  
  const tintColor = useThemeColor({}, 'tint');
  const cardColor = useThemeColor({}, 'card');
  
  if (!internship) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Internship not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={tintColor} />
        </TouchableOpacity>
        
        <ThemedView style={styles.header}>
          <Image source={internship.logo} style={styles.companyLogo} />
          <ThemedView style={styles.headerInfo}>
            <ThemedText style={styles.jobTitle}>{internship.title}</ThemedText>
            <ThemedText style={styles.companyName}>{internship.company}</ThemedText>
            <ThemedView style={styles.matchBadge}>
              <ThemedText style={styles.matchText}>{internship.matchPercentage}% Match</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.infoContainer}>
          <ThemedView style={styles.infoRow}>
            <ThemedView style={styles.infoItem}>
              <Ionicons name="location" size={18} color={tintColor} />
              <ThemedText style={styles.infoText}>{internship.location}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoItem}>
              <Ionicons name="cash-outline" size={18} color={tintColor} />
              <ThemedText style={styles.infoText}>{internship.stipend}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoItem}>
              <Ionicons name="time-outline" size={18} color={tintColor} />
              <ThemedText style={styles.infoText}>{internship.duration}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={[styles.section, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.sectionTitle}>Description</ThemedText>
          <ThemedText style={styles.description}>{internship.description}</ThemedText>
        </ThemedView>
        
        <ThemedView style={[styles.section, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.sectionTitle}>Responsibilities</ThemedText>
          {internship.responsibilities.map((item, index) => (
            <ThemedView key={index} style={styles.bulletItem}>
              <ThemedText style={styles.bulletPoint}>•</ThemedText>
              <ThemedText style={styles.bulletText}>{item}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
        
        <ThemedView style={[styles.section, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.sectionTitle}>Requirements</ThemedText>
          {internship.requirements.map((item, index) => (
            <ThemedView key={index} style={styles.bulletItem}>
              <ThemedText style={styles.bulletPoint}>•</ThemedText>
              <ThemedText style={styles.bulletText}>{item}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
        
        <ThemedView style={[styles.section, { backgroundColor: cardColor }]}>
          <ThemedText style={styles.sectionTitle}>Why This Internship?</ThemedText>
          {internship.matchReasons.map((item, index) => (
            <ThemedView key={index} style={styles.bulletItem}>
              <Ionicons name="checkmark-circle" size={16} color={tintColor} />
              <ThemedText style={[styles.bulletText, { marginLeft: 8 }]}>{item}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
        
        <TouchableOpacity 
          style={[styles.applyButton, { backgroundColor: tintColor }]}
          onPress={() => alert('Application submitted!')}
        >
          <ThemedText style={styles.applyButtonText}>Apply Now</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 8,
  },
  matchBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  matchText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 12,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  applyButton: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});