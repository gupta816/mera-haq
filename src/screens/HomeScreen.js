import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES } from '../constants/legalRights';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you have this installed

const { width } = Dimensions.get('window');
const cardMargin = 10;
const cardWidth = (width - (cardMargin * 8)) / 2; // Corrected for container padding and card margins

const HomeScreen = () => {
  const navigation = useNavigation();
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);

  const speak = (text, id) => {
    // Stop any currently playing speech
    Speech.stop();
    
    // If clicking the same button that's currently speaking, just stop speaking
    if (currentSpeakingId === id) {
      setCurrentSpeakingId(null);
      return;
    }

    // Clean up the text for better TTS
    const cleanText = text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
    
    // Set the new speaking ID before starting speech
    setCurrentSpeakingId(id);
    
    Speech.speak(cleanText, {
      language: id.startsWith('en') ? 'en-IN' : 'hi-IN',
      onDone: () => setCurrentSpeakingId(null),
      onError: () => setCurrentSpeakingId(null)
    });
  };

  useEffect(() => {
    return () => Speech.stop();
  }, []);

  const renderTTSIcons = (item) => {
    const isSpeakingEnglish = currentSpeakingId === `en-${item.id}`;
    const isSpeakingHindi = currentSpeakingId === `hi-${item.id}`;
    
    const englishText = item.title;
    const hindiText = item.hindiTitle || '';
    
    return (
      <View style={styles.ttsContainer}>
        <TouchableOpacity 
          style={[
            styles.ttsButton, 
            !englishText && styles.disabledButton,
            (isSpeakingEnglish || isSpeakingHindi) && !isSpeakingEnglish && styles.inactiveButton
          ]}
          onPress={(e) => {
            e.stopPropagation();
            speak(englishText, `en-${item.id}`);
          }}
          disabled={!englishText || (currentSpeakingId && currentSpeakingId !== `en-${item.id}`)}
        >
          <Text style={[
            styles.ttsText,
            (isSpeakingEnglish || isSpeakingHindi) && !isSpeakingEnglish && styles.inactiveText
          ]}>EN</Text>
          <MaterialCommunityIcons 
            name={isSpeakingEnglish ? 'volume-high' : 'volume-medium'} 
            size={14} 
            color={
              !englishText ? "#666" : 
              isSpeakingEnglish ? "#FFD700" :
              (currentSpeakingId && currentSpeakingId !== `en-${item.id}`) ? "#999" : "#FFD700"
            }
          />
        </TouchableOpacity>
        
        {hindiText ? (
          <TouchableOpacity 
            style={[
              styles.ttsButton, 
              styles.hindiButton, 
              !hindiText && styles.disabledButton,
              (isSpeakingEnglish || isSpeakingHindi) && !isSpeakingHindi && styles.inactiveButton
            ]}
            onPress={(e) => {
              e.stopPropagation();
              speak(hindiText, `hi-${item.id}`);
            }}
            disabled={!hindiText || (currentSpeakingId && currentSpeakingId !== `hi-${item.id}`)}
          >
            <Text style={[
              styles.ttsText,
              (isSpeakingEnglish || isSpeakingHindi) && !isSpeakingHindi && styles.inactiveText
            ]}>हिं</Text>
            <MaterialCommunityIcons 
              name={isSpeakingHindi ? 'volume-high' : 'volume-medium'} 
              size={14} 
              color={
                !hindiText ? "#666" : 
                isSpeakingHindi ? "#FFD700" :
                (currentSpeakingId && currentSpeakingId !== `hi-${item.id}`) ? "#999" : "#FFD700"
              }
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  // Placeholder for the illustration. Replace with your actual image.
  const renderHeaderImage = () => {
    // If you have an image asset, e.g., require('../../assets/mera_haq_illustration.png')
    return <Image source={require('../../assets/mainlogo.png')} style={styles.headerImage} resizeMode="contain" />;
  };

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Mera Haq</Text>
          <Text style={styles.hindiTitle}>मेरा हक</Text>
        </View>

        {renderHeaderImage()}
        
        <View style={styles.sectionHeader}>
          <Text style={styles.selectCategoryTitle}>Select a Category</Text>
          <Text style={styles.selectCategoryHindiTitle}>एक श्रेणी चुनें</Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Category', { 
                title: item.title, 
                content: item.content, 
                hindiTitle: item.hindiTitle 
              })}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons 
                    name={item.iconName || 'help-circle-outline'} 
                    size={40} 
                    color="#FFD700" 
                  />
                </View>
                <Text style={styles.categoryTitleEnglish}>{item.title}</Text>
                {item.hindiTitle && (
                  <View style={styles.hindiContainer}>
                    <Text style={styles.categoryTitleHindi}>{item.hindiTitle}</Text>
                    {renderTTSIcons(item)}
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#961806',
    paddingBottom: 20,
    marginHorizontal: 0,
  },
  header: {
    paddingHorizontal: cardMargin * 2,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#961806',
  },
  sectionHeader: {
    paddingHorizontal: cardMargin * 2,
    marginTop: 10,
    marginBottom: 5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#961806',
  },
  scrollContent: {
    flexGrow: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
    textAlign: 'center',
    fontFamily: 'serif', // Example font, choose one that matches
  },
  hindiTitle: {
    fontSize: 28,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif', // Example font
  },
  headerImage: {
    width: '100%',
    height: 180, // Increased height for better visibility
    marginBottom: 20,
    alignSelf: 'center',
  },

  selectCategoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFD700',
    textAlign: 'center',
    fontFamily: 'sans-serif-medium', // Example font
  },
  selectCategoryHindiTitle: {
    fontSize: 18,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'sans-serif', // Example font
  },
  listContentContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: cardWidth,
    backgroundColor: '#801405', // Darker red to match theme
    borderRadius: 10,
    padding: 15,
    margin: cardMargin,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFD700', // Gold border
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  cardContent: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
  },
  ttsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
  },
  hindiContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  ttsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  hindiButton: {
    marginLeft: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  ttsText: {
    color: '#FFD700',
    fontSize: 10,
    marginRight: 2,
    fontFamily: 'sans-serif-medium',
  },
  inactiveButton: {
    opacity: 0.5,
  },
  inactiveText: {
    color: '#999',
  },
  categoryTitleEnglish: {
    fontSize: 16,
    color: '#FFD700', // Gold text
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  categoryTitleHindi: {
    fontSize: 14,
    color: '#FFFFFF', // White text
    textAlign: 'center',
    marginTop: 5,
  },
});

export default HomeScreen;
