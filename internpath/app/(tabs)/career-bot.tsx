import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { useThemeColor } from '../../hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';

// Mock initial messages for the AI bot
const INITIAL_MESSAGES = [
  {
    id: '1',
    text: 'Hello! I\'m your AI Career Guide. How can I help you today?',
    sender: 'bot',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    text: 'I can help you with career advice, internship preparation, or answer questions about specific roles.',
    sender: 'bot',
    timestamp: new Date().toISOString(),
  },
];

// Mock responses from the AI bot
const BOT_RESPONSES = {
  'career': 'Based on your profile, you might want to explore careers in web development, data analysis, or UX design. These fields have strong growth potential and match your skills.',
  'interview': 'For interview preparation, focus on: 1) Researching the company, 2) Practicing common questions, 3) Preparing examples of your work, and 4) Having questions ready to ask the interviewer.',
  'resume': 'To improve your resume, make sure to: 1) Highlight relevant skills, 2) Quantify your achievements, 3) Use action verbs, and 4) Tailor it for each application.',
  'skills': 'In-demand skills for 2023 include: JavaScript frameworks, data analysis, cloud computing, UI/UX design, and digital marketing. Consider which aligns with your interests.',
  'default': 'That\'s a great question! As you continue to use InternMate, I\'ll learn more about your preferences and provide more personalized guidance.'
};

export default function CareerBotScreen() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('english'); // 'english' or 'regional'
  
  const tintColor = useThemeColor({}, 'tint');
  const cardColor = useThemeColor({}, 'card');
  
  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    
    // Simulate bot response
    setTimeout(() => {
      let responseText = BOT_RESPONSES.default;
      
      // Simple keyword matching for demo purposes
      const lowercaseInput = inputText.toLowerCase();
      if (lowercaseInput.includes('career') || lowercaseInput.includes('job')) {
        responseText = BOT_RESPONSES.career;
      } else if (lowercaseInput.includes('interview')) {
        responseText = BOT_RESPONSES.interview;
      } else if (lowercaseInput.includes('resume') || lowercaseInput.includes('cv')) {
        responseText = BOT_RESPONSES.resume;
      } else if (lowercaseInput.includes('skill')) {
        responseText = BOT_RESPONSES.skills;
      }
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'regional' : 'english');
  };
  
  const renderMessage = ({ item }) => (
    <ThemedView 
      style={[
        styles.messageBubble, 
        item.sender === 'user' ? styles.userBubble : styles.botBubble,
        { backgroundColor: item.sender === 'user' ? tintColor : cardColor }
      ]}
    >
      {item.sender === 'bot' && (
        <Ionicons 
          name="chatbubble-ellipses" 
          size={20} 
          color={tintColor} 
          style={styles.botIcon} 
        />
      )}
      <ThemedText 
        style={[
          styles.messageText, 
          item.sender === 'user' && styles.userText
        ]}
      >
        {item.text}
      </ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>AI Career Guide</ThemedText>
        <TouchableOpacity 
          style={[styles.languageToggle, { borderColor: tintColor }]}
          onPress={toggleLanguage}
        >
          <ThemedText style={{ color: tintColor }}>
            {language === 'english' ? 'EN' : 'हिंदी'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        inverted={false}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Ask me anything about careers..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, { backgroundColor: tintColor }]}
          onPress={handleSend}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    marginBottom: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  languageToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  messagesList: {
    paddingBottom: 16,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBubble: {
    alignSelf: 'flex-end',
    marginLeft: '20%',
  },
  botBubble: {
    alignSelf: 'flex-start',
    marginRight: '20%',
  },
  botIcon: {
    marginRight: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});