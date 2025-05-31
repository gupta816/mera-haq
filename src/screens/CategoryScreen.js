import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CategoryScreen = ({ route }) => {
  // Destructure hindiTitle, which is now passed from HomeScreen
  const { title, content, hindiTitle } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{hindiTitle}</Text>
      </View>
      
      {content.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.hindiTitle && <Text style={styles.itemHindiTitle}>{item.hindiTitle}</Text>}
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
    fontSize: 28, // Larger title
    fontWeight: 'bold',
    color: '#FFD700', // Gold color from HomeScreen
    textAlign: 'center',
    fontFamily: 'serif', // Consistent font
    marginBottom: 5, // Space between English and Hindi titles
  },
  hindiCategoryTitle: {
    fontSize: 22,
    color: '#FFD700',
    textAlign: 'center',
    fontFamily: 'serif', // Consistent font
  },
  item: {
    backgroundColor: '#801405', // Darker shade for item cards
    padding: 15,
    borderRadius: 10, // Rounded corners for item cards
    marginBottom: 15, // Space between items
    borderColor: '#FFD700', // Gold border for items
    borderWidth: 1, // Subtle border
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
