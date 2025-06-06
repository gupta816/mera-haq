import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DAILY_TIPS } from '../constants/tips';

const { width } = Dimensions.get('window');
const cardWidth = width - 40; // 20px margin on each side

// 24 hours in milliseconds
const TIPS_UPDATE_INTERVAL = 24 * 60 * 60 * 1000;

// Function to get random tips
const getRandomTips = (tips, count) => {
  const shuffled = [...tips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, tips.length));
};

export default function TipsScreen() {
  const [tips, setTips] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);
  
  // Load saved tips or generate new ones
  const loadTips = async (forceRefresh = false) => {
    try {
      setRefreshing(true);
      const now = new Date().getTime();
      const savedData = await AsyncStorage.getItem('dailyTipsData');
      
      if (savedData && !forceRefresh) {
        const { tips: savedTips, timestamp } = JSON.parse(savedData);
        const timeSinceLastUpdate = now - timestamp;
        
        // If less than 24 hours have passed, use saved tips
        if (timeSinceLastUpdate < TIPS_UPDATE_INTERVAL) {
          setTips(savedTips);
          setLastUpdated(new Date(timestamp));
          setRefreshing(false);
          return;
        }
      }
      
      // Either force refresh or it's been more than 24 hours
      const newTips = getRandomTips(DAILY_TIPS, 5);
      const dataToSave = {
        tips: newTips,
        timestamp: now
      };
      
      await AsyncStorage.setItem('dailyTipsData', JSON.stringify(dataToSave));
      setTips(newTips);
      setLastUpdated(new Date(now));
    } catch (error) {
      console.error('Error loading tips:', error);
      // Fallback to random tips if there's an error
      setTips(getRandomTips(DAILY_TIPS, 5));
    } finally {
      setRefreshing(false);
    }
  };
  
  // Load tips on component mount
  useEffect(() => {
    loadTips();
  }, []);
  
  // Handle pull to refresh
  const onRefresh = () => {
    loadTips(true);
  };
  
  // Format last updated time
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    return `Last updated: ${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  const speak = (tip, language) => {
    // Determine which text to read based on language
    let textToRead = '';
    let speakId = '';
    
    if (language === 'en') {
      textToRead = `${tip.title}. ${tip.content}`;
      speakId = `en-${tip.id}`;
    } else if (language === 'hi' && tip.hindiTitle && tip.hindiContent) {
      textToRead = `${tip.hindiTitle}. ${tip.hindiContent}`;
      speakId = `hi-${tip.id}`;
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

  if (tips.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading tips...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <MaterialCommunityIcons 
            name="lightbulb-on-outline" 
            size={40} 
            color="#FFD700" 
            style={styles.icon}
          />
          <Text style={styles.title}>Daily Legal Tips</Text>
          <Text style={styles.hindiTitle}>दैनिक कानूनी सुझाव</Text>
          {lastUpdated && (
            <Text style={styles.lastUpdated}>
              {formatLastUpdated()}
            </Text>
          )}
        </View>

        <ScrollView 
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FFD700']}
              tintColor="#FFD700"
            />
          }
        >
          {tips.map((tip, index) => (
            <View key={`${tip.id}-${index}`} style={styles.tipContainer}>
              <View style={styles.tipHeader}>
                <MaterialCommunityIcons 
                  name={tip.icon} 
                  size={24} 
                  color="#FFD700"
                  style={styles.tipIcon}
                />
                <Text style={styles.tipTitle}>{tip.title}</Text>
              </View>
              
              {tip.hindiTitle && (
                <Text style={styles.tipHindiTitle}>{tip.hindiTitle}</Text>
              )}

              <View style={styles.ttsContainer}>
                <TouchableOpacity 
                  style={styles.ttsButton}
                  onPress={() => speak(tip, 'en')}
                >
                  <Text style={styles.ttsText}>EN</Text>
                  <MaterialCommunityIcons 
                    name={currentSpeakingId === `en-${tip.id}` ? 'volume-high' : 'volume-medium'} 
                    size={16} 
                    color="#FFD700"
                  />
                </TouchableOpacity>
                
                {tip.hindiTitle && (
                  <TouchableOpacity 
                    style={[styles.ttsButton, styles.hindiButton]}
                    onPress={() => speak(tip, 'hi')}
                  >
                    <Text style={styles.ttsText}>हिं</Text>
                    <MaterialCommunityIcons 
                      name={currentSpeakingId === `hi-${tip.id}` ? 'volume-high' : 'volume-medium'} 
                      size={16} 
                      color="#FFD700"
                    />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.tipContent}>{tip.content}</Text>
              
              {tip.hindiContent && (
                <Text style={styles.tipHindiContent}>{tip.hindiContent}</Text>
              )}
              
              {index < tips.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </ScrollView>
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
  divider: {
    height: 1,
    backgroundColor: '#FFD700',
    marginVertical: 10,
  },
  lastUpdated: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  loadingText: {
    color: '#FFD700',
    fontSize: 18,
    textAlign: 'center',
  },
  tipIcon: {
    marginRight: 10,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  hindiButton: {
    marginLeft: 10,
  },
});
