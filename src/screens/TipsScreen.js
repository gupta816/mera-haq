import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Speech from 'expo-speech';
import { DAILY_TIPS } from '../constants/tips';

const { width } = Dimensions.get('window');
const cardWidth = width - 40; // 20px margin on each side

export default function TipsScreen() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);
  
  const currentTip = DAILY_TIPS[currentTipIndex];

  const speak = (language) => {
    // Determine which text to read based on language
    let textToRead = '';
    let speakId = '';
    
    if (language === 'en') {
      textToRead = `${currentTip.title}. ${currentTip.content}`;
      speakId = 'en-speak';
    } else if (language === 'hi' && currentTip.hindiTitle && currentTip.hindiContent) {
      textToRead = `${currentTip.hindiTitle}. ${currentTip.hindiContent}`;
      speakId = 'hi-speak';
    } else {
      return; // No content in requested language
    }
    
    if (currentSpeakingId === speakId) {
      Speech.stop();
      setCurrentSpeakingId(null);
      return;
    }

    const cleanText = textToRead.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
    setCurrentSpeakingId(speakId);
    
    Speech.speak(cleanText, {
      language: language === 'en' ? 'en-IN' : 'hi-IN',
      onDone: () => setCurrentSpeakingId(null),
      onError: () => setCurrentSpeakingId(null)
    });
  };

  useEffect(() => {
    return () => Speech.stop();
  }, []);

  const navigateTips = (direction) => {
    Speech.stop();
    setCurrentSpeakingId(null);
    
    if (direction === 'next') {
      setCurrentTipIndex((prev) => (prev + 1) % DAILY_TIPS.length);
    } else {
      setCurrentTipIndex((prev) => (prev - 1 + DAILY_TIPS.length) % DAILY_TIPS.length);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons 
            name={currentTip.icon} 
            size={40} 
            color="#FFD700" 
            style={styles.icon}
          />
          <Text style={styles.title}>Daily Legal Tip</Text>
          <Text style={styles.hindiTitle}>दैनिक कानूनी सुझाव</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>{currentTip.title}</Text>
            <Text style={styles.tipHindiTitle}>{currentTip.hindiTitle}</Text>

            <View style={styles.ttsContainer}>
              <TouchableOpacity 
                style={styles.ttsButton}
                onPress={() => speak('en')}
              >
                <Text style={styles.ttsText}>EN</Text>
                <MaterialCommunityIcons 
                  name={currentSpeakingId === 'en-speak' ? 'volume-high' : 'volume-medium'} 
                  size={16} 
                  color="#FFD700"
                />
              </TouchableOpacity>
              
              {currentTip.hindiTitle && (
                <TouchableOpacity 
                  style={styles.ttsButton}
                  onPress={() => speak('hi')}
                >
                  <Text style={styles.ttsText}>हिं</Text>
                  <MaterialCommunityIcons 
                    name={currentSpeakingId === 'hi-speak' ? 'volume-high' : 'volume-medium'} 
                    size={16} 
                    color="#FFD700"
                  />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.tipContent}>{currentTip.content}</Text>
            
            {currentTip.hindiContent && (
              <>
                <Text style={styles.tipHindiContent}>{currentTip.hindiContent}</Text>
                <View style={styles.ttsContainer}>
      
                </View>
              </>
            )}
          </View>
        </ScrollView>

        <View style={styles.navigation}>
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigateTips('prev')}
          >
            <MaterialCommunityIcons name="chevron-left" size={30} color="#FFD700" />
          </TouchableOpacity>
          
          <Text style={styles.pageIndicator}>
            {currentTipIndex + 1} / {DAILY_TIPS.length}
          </Text>
          
          <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigateTips('next')}
          >
            <MaterialCommunityIcons name="chevron-right" size={30} color="#FFD700" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#961806',
    padding: 20,
    paddingTop: 40,
  },
  card: {
    backgroundColor: '#801405',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
    paddingBottom: 15,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  hindiTitle: {
    color: '#FFD700',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  tipContainer: {
    paddingBottom: 10,
  },
  tipTitle: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tipHindiTitle: {
    color: '#FFD700',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  tipContent: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  tipHindiContent: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
  },
  ttsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  ttsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    minWidth: 50,
    justifyContent: 'center',
  },
  ttsText: {
    color: '#FFD700',
    marginRight: 5,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#FFD700',
    paddingTop: 15,
  },
  navButton: {
    padding: 10,
  },
  pageIndicator: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
