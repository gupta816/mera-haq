import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CategoryScreen = ({ route }) => {
  const { title, content, hindiTitle } = route.params;
  const [speaking, setSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);

  const speak = (text, id) => {
    if (currentSpeakingId === id) {
      Speech.stop();
      setSpeaking(false);
      setCurrentSpeakingId(null);
      return;
    }

    setSpeaking(true);
    setCurrentSpeakingId(id);
    
    // Ensure we have clean text for TTS
    const cleanText = text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
    
    Speech.speak(text, {
      language: id.startsWith('en') ? 'en-IN' : 'hi-IN',
      onDone: () => {
        setSpeaking(false);
        setCurrentSpeakingId(null);
      },
      onError: (error) => {
        console.log('Error in speech:', error);
        setSpeaking(false);
        setCurrentSpeakingId(null);
      }
    });
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);
  
  const renderTTSIcons = (item, index) => {
    const isSpeakingEnglish = currentSpeakingId === `en-${index}`;
    const isSpeakingHindi = currentSpeakingId === `hi-${index}`;
    
    // Combine title and description for full content
    const englishText = `${item.title}. ${item.description || ''}`.trim();
    const hindiText = `${item.hindiTitle || ''} ${item.hindiDescription || ''}`.trim();
    
    return (
      <View style={styles.ttsContainer}>
        <TouchableOpacity 
          style={styles.ttsButton}
          onPress={(e) => {
            e.stopPropagation();
            speak(englishText, `en-${index}`);
          }}
          disabled={!englishText}
        >
          <Text style={styles.ttsText}>EN</Text>
          <MaterialCommunityIcons 
            name={isSpeakingEnglish ? 'volume-high' : 'volume-medium'} 
            size={16} 
            color={englishText ? "#FFD700" : "#666"}
          />
        </TouchableOpacity>
        
        {(item.hindiTitle || item.hindiDescription) && (
          <TouchableOpacity 
            style={[styles.ttsButton, styles.hindiButton]}
            onPress={(e) => {
              e.stopPropagation();
              speak(hindiText, `hi-${index}`);
            }}
            disabled={!hindiText}
          >
            <Text style={styles.ttsText}>हिं</Text>
            <MaterialCommunityIcons 
              name={isSpeakingHindi ? 'volume-high' : 'volume-medium'} 
              size={16} 
              color={hindiText ? "#FFD700" : "#666"}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {hindiTitle && <Text style={styles.hindiCategoryTitle}>{hindiTitle}</Text>}
      </View>
      
      {content.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitles}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.hindiTitle && <Text style={styles.itemHindiTitle}>{item.hindiTitle}</Text>}
            </View>
            {renderTTSIcons(item, index)}
          </View>
          <Text style={styles.itemDescription}>{item.description}</Text>
          {item.hindiDescription && <Text style={styles.itemHindiDescription}>{item.hindiDescription}</Text>}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#961806', // New theme background color
    paddingHorizontal: 15, // Add some horizontal padding
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 5, // Align with item padding
    alignItems: 'center', // Center titles
    marginBottom: 10, // Space below header
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    fontFamily: 'serif',
    marginRight: 10,
  },
  hindiCategoryTitle: {
    fontSize: 22,
    color: '#FFD700',
    textAlign: 'center',
    fontFamily: 'serif', // Consistent font
  },
  item: {
    backgroundColor: '#801405',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitles: {
    flex: 1,
  },
  ttsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  ttsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginLeft: 5,
    minWidth: 40,
    justifyContent: 'space-between',
    opacity: 1,
  },
  ttsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginLeft: 5,
    minWidth: 40,
    justifyContent: 'space-between',
  },
  hindiButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  ttsText: {
    color: '#FFD700',
    fontSize: 10,
    marginRight: 3,
    fontFamily: 'sans-serif-medium',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for item titles for contrast
    marginBottom: 8,
    fontFamily: 'sans-serif-medium', // Consistent font
    marginBottom: 5, // Space before Hindi title or description
  },
  itemDescription: {
    fontSize: 16,
    color: '#F5F5F5', // Light gray/off-white for description text
    lineHeight: 24,
    fontFamily: 'sans-serif', // Consistent font
    marginBottom: 5, // Space before Hindi description if no English description or after English description
  },
  itemHindiTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for item titles for contrast
    marginBottom: 8,
    fontFamily: 'sans-serif-medium', // Consistent font, consider a Hindi font if available
    marginTop: 4, // A little space after English title
  },
  itemHindiDescription: {
    fontSize: 15,
    color: '#F5F5F5', // Light gray/off-white for description text
    lineHeight: 22,
    fontFamily: 'sans-serif', // Consistent font, consider a Hindi font if available
    marginTop: 4, // A little space after English description
  },
});

export default CategoryScreen;
