import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import { useThemeColor } from '../hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileSetupScreen() {
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [location, setLocation] = useState('');
  
  const [showEducationDropdown, setShowEducationDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  
  const educationOptions = [
    'High School',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Diploma'
  ];
  
  const locationOptions = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Remote'
  ];
  
  const skillOptions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js',
    'UI/UX Design', 'Data Analysis', 'Marketing', 'Content Writing',
    'Project Management', 'Communication', 'Leadership'
  ];
  
  const interestOptions = [
    'Technology', 'Design', 'Business', 'Healthcare',
    'Education', 'Finance', 'Marketing', 'Research',
    'Environment', 'Social Impact'
  ];
  
  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };
  
  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };
  
  const handleSave = () => {
    // In a real app, we would save the profile data
    router.replace('/(tabs)');
  };
  
  return (
    <ThemedView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText style={styles.title}>Complete Your Profile</ThemedText>
        <ThemedText style={styles.subtitle}>Help us find the perfect internships for you</ThemedText>
        
        {/* Education Dropdown */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Education</ThemedText>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowEducationDropdown(!showEducationDropdown)}
          >
            <ThemedText style={styles.dropdownText}>
              {education || 'Select your education level'}
            </ThemedText>
            <Ionicons 
              name={showEducationDropdown ? "chevron-up" : "chevron-down"} 
              size={24} 
              color={tintColor} 
            />
          </TouchableOpacity>
          
          {showEducationDropdown && (
            <ThemedView style={styles.dropdownMenu}>
              {educationOptions.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setEducation(option);
                    setShowEducationDropdown(false);
                  }}
                >
                  <ThemedText style={styles.dropdownItemText}>{option}</ThemedText>
                </TouchableOpacity>
              ))}
            </ThemedView>
          )}
        </ThemedView>
        
        {/* Skills Selection */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Skills</ThemedText>
          <ThemedView style={styles.tagsContainer}>
            {skillOptions.map((skill, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  skills.includes(skill) && { backgroundColor: tintColor }
                ]}
                onPress={() => toggleSkill(skill)}
              >
                <ThemedText 
                  style={[
                    styles.tagText,
                    skills.includes(skill) && { color: 'white' }
                  ]}
                >
                  {skill}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
        
        {/* Interests Selection */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Interests</ThemedText>
          <ThemedView style={styles.tagsContainer}>
            {interestOptions.map((interest, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  interests.includes(interest) && { backgroundColor: tintColor }
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <ThemedText 
                  style={[
                    styles.tagText,
                    interests.includes(interest) && { color: 'white' }
                  ]}
                >
                  {interest}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
        
        {/* Location Dropdown */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Location Preference</ThemedText>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <ThemedText style={styles.dropdownText}>
              {location || 'Select your preferred location'}
            </ThemedText>
            <Ionicons 
              name={showLocationDropdown ? "chevron-up" : "chevron-down"} 
              size={24} 
              color={tintColor} 
            />
          </TouchableOpacity>
          
          {showLocationDropdown && (
            <ThemedView style={styles.dropdownMenu}>
              {locationOptions.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setLocation(option);
                    setShowLocationDropdown(false);
                  }}
                >
                  <ThemedText style={styles.dropdownItemText}>{option}</ThemedText>
                </TouchableOpacity>
              ))}
            </ThemedView>
          )}
        </ThemedView>
        
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: tintColor }]}
          onPress={handleSave}
        >
          <ThemedText style={styles.saveButtonText}>Save Profile</ThemedText>
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
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  tagText: {
    fontSize: 14,
  },
  saveButton: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});