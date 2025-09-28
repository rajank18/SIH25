import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { useThemeColor } from '../../hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';

export default function ResumeCheckerScreen() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [score, setScore] = useState(78);
  
  const tintColor = useThemeColor({}, 'tint');
  const cardColor = useThemeColor({}, 'card');
  
  const handleUpload = () => {
    // In a real app, this would open a file picker
    setResumeUploaded(true);
  };
  
  const handleReupload = () => {
    // Reset and allow new upload
    setResumeUploaded(false);
    setScore(0);
  };
  
  // Mock missing skills based on the resume
  const missingSkills = [
    'JavaScript frameworks (React)',
    'Cloud computing experience',
    'Project management tools',
    'Team collaboration examples'
  ];
  
  // Mock strengths in the resume
  const strengths = [
    'Education details well formatted',
    'Technical skills clearly listed',
    'Contact information complete',
    'Work experience with quantifiable results'
  ];
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Resume ATS Score</ThemedText>
      <ThemedText style={styles.subtitle}>
        Upload your resume to check how it performs with Applicant Tracking Systems
      </ThemedText>
      
      {!resumeUploaded ? (
        <TouchableOpacity 
          style={styles.uploadContainer}
          onPress={handleUpload}
        >
          <ThemedView style={styles.uploadIconContainer}>
            <Ionicons name="cloud-upload-outline" size={60} color={tintColor} />
          </ThemedView>
          <ThemedText style={styles.uploadText}>Tap to upload your resume</ThemedText>
          <ThemedText style={styles.uploadSubtext}>PDF, DOCX formats supported</ThemedText>
        </TouchableOpacity>
      ) : (
        <>
          <ThemedView style={[styles.scoreContainer, { backgroundColor: cardColor }]}>
            <ThemedView style={styles.scoreCircle}>
              <ThemedText style={styles.scoreNumber}>{score}</ThemedText>
              <ThemedText style={styles.scoreLabel}>/100</ThemedText>
            </ThemedView>
            
            <ThemedText style={styles.scoreMessage}>
              {score >= 80 ? 'Great resume!' : 'Your resume needs some improvements'}
            </ThemedText>
            
            <TouchableOpacity 
              style={[styles.reuploadButton, { borderColor: tintColor }]}
              onPress={handleReupload}
            >
              <ThemedText style={{ color: tintColor }}>Upload Another Resume</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          
          <ThemedView style={[styles.section, { backgroundColor: cardColor }]}>
            <ThemedView style={styles.sectionHeader}>
              <Ionicons name="alert-circle" size={20} color="#F57C00" />
              <ThemedText style={[styles.sectionTitle, { color: '#F57C00' }]}>
                Missing Skills
              </ThemedText>
            </ThemedView>
            
            {missingSkills.map((skill, index) => (
              <ThemedView key={index} style={styles.bulletItem}>
                <ThemedText style={styles.bulletPoint}>•</ThemedText>
                <ThemedText style={styles.bulletText}>{skill}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
          
          <ThemedView style={[styles.section, { backgroundColor: cardColor }]}>
            <ThemedView style={styles.sectionHeader}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <ThemedText style={[styles.sectionTitle, { color: '#4CAF50' }]}>
                Resume Strengths
              </ThemedText>
            </ThemedView>
            
            {strengths.map((strength, index) => (
              <ThemedView key={index} style={styles.bulletItem}>
                <ThemedText style={styles.bulletPoint}>•</ThemedText>
                <ThemedText style={styles.bulletText}>{strength}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
          
          <TouchableOpacity 
            style={[styles.improveButton, { backgroundColor: tintColor }]}
            onPress={() => {}}
          >
            <ThemedText style={styles.improveButtonText}>Get Improvement Tips</ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 24,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 20,
  },
  uploadIconContainer: {
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    opacity: 0.6,
  },
  scoreContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 16,
    opacity: 0.7,
  },
  scoreMessage: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  reuploadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
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
  improveButton: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  improveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});