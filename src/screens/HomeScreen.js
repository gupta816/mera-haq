import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES } from '../constants/legalRights';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you have this installed

const { width } = Dimensions.get('window');
const cardMargin = 10;
const cardWidth = (width - (cardMargin * 8)) / 2; // Corrected for container padding and card margins

const HomeScreen = () => {
  const navigation = useNavigation();

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
              <MaterialCommunityIcons 
                name={item.iconName || 'help-circle-outline'} 
                size={40} 
                color="#FFD700" 
              />
              <Text style={styles.categoryTitleEnglish}>{item.title}</Text>
              <Text style={styles.categoryTitleHindi}>{item.hindiTitle}</Text>
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
    backgroundColor: '#801405',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryTitleEnglish: {
    fontSize: 16,
    color: '#FFFFFF', // White text for better contrast on card
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
