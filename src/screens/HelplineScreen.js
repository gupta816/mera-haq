import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HelplineScreen = () => {
  const helplines = [
    {
      id: '1',
      title: 'Women Helpline (All India)',
      hindiTitle: 'महिला हेल्पलाइन (पूरे भारत में)',
      number: '1091',
      description: '24/7 helpline for women in distress',
      hindiDescription: 'महिलाओं के लिए 24/7 आपातकालीन हेल्पलाइन',
      icon: 'phone-classic',
    },
    {
      id: '2',
      title: 'Police Helpline',
      hindiTitle: 'पुलिस हेल्पलाइन',
      number: '100',
      description: 'Emergency police assistance',
      hindiDescription: 'आपातकालीन पुलिस सहायता',
      icon: 'police-badge',
    },
    {
      id: '3',
      title: 'Child Helpline',
      hindiTitle: 'चाइल्ड हेल्पलाइन',
      number: '1098',
      description: '24-hour helpline for children in distress',
      hindiDescription: 'संकटग्रस्त बच्चों के लिए 24 घंटे की हेल्पलाइन',
      icon: 'baby-face',
    },
    {
      id: '4',
      title: 'National Commission for Women',
      hindiTitle: 'राष्ट्रीय महिला आयोग',
      number: '7827170170',
      email: 'complaintcell-ncw@nic.in',
      description: 'For complaints related to women rights violations',
      hindiDescription: 'महिला अधिकारों के उल्लंघन से संबंधित शिकायतों के लिए',
      icon: 'account-tie-voice',
    },
    {
      id: '5',
      title: 'Domestic Violence Helpline',
      hindiTitle: 'घरेलू हिंसा हेल्पलाइन',
      number: '181',
      description: 'For reporting domestic violence cases',
      hindiDescription: 'घरेलू हिंसा की घटनाओं की रिपोर्ट करने के लिए',
      icon: 'home-alert',
    },
  ];

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Emergency Helplines</Text>
          <Text style={styles.hindiTitle}>आपातकालीन हेल्पलाइन</Text>
        </View>
        
        {helplines.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#FFD700" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardTitleHindi}>{item.hindiTitle}</Text>
              </View>
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.contactRow}>
                <TouchableOpacity 
                  style={styles.contactButton} 
                  onPress={() => handleCall(item.number)}
                >
                  <MaterialCommunityIcons name="phone" size={18} color="#961806" />
                  <Text style={styles.contactText}>{item.number}</Text>
                </TouchableOpacity>
                
                {item.email && (
                  <TouchableOpacity 
                    style={[styles.contactButton, styles.emailButton]} 
                    onPress={() => handleEmail(item.email)}
                  >
                    <MaterialCommunityIcons name="email" size={18} color="#FFD700" />
                    <Text style={[styles.contactText, styles.emailText]}>Email</Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.hindiDescription}>{item.hindiDescription}</Text>
            </View>
          </View>
        ))}
        
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>Note / नोट:</Text>
          <Text style={styles.noteText}>
            In case of emergency, please call the respective helpline number immediately.
            All services are free of cost.
          </Text>
          <Text style={styles.noteTextHindi}>
            आपात स्थिति में, कृपया तुरंत संबंधित हेल्पलाइन नंबर पर कॉल करें।
            सभी सेवाएं निःशुल्क हैं।
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#961806',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#961806',
    padding: 15,
    paddingTop: 20,
    marginTop: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  hindiTitle: {
    fontSize: 22,
    color: '#FFD700',
    marginBottom: 15,
    fontFamily: 'sans-serif',
  },
  card: {
    backgroundColor: '#801405',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#6b0f00',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#FFD700',
  },
  cardContent: {
    padding: 15,
    flex: 1,
    width: '100%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
    marginLeft: 10,
    fontFamily: 'sans-serif-medium',
    flexShrink: 1,
  },
  cardTitleHindi: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 10,
    opacity: 0.9,
    fontFamily: 'sans-serif',
    flexShrink: 1,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  contactButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  emailButton: {
    backgroundColor: '#961806',
    borderColor: '#FFD700',
  },
  contactText: {
    color: '#961806',
    marginLeft: 5,
    fontWeight: '600',
  },
  emailText: {
    color: '#FFD700',
  },
  description: {
    fontSize: 14,
    color: '#FFD700',
    marginBottom: 5,
    lineHeight: 20,
    fontFamily: 'sans-serif',
    width: '100%',
  },
  hindiDescription: {
    fontSize: 13,
    color: '#FFD700',
    opacity: 0.9,
    lineHeight: 20,
    fontFamily: 'sans-serif',
    width: '100%',
  },
  noteContainer: {
    backgroundColor: '#6b0f00',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFD700',
    fontSize: 15,
  },
  noteText: {
    fontSize: 13,
    color: '#FFD700',
    marginBottom: 5,
    lineHeight: 20,
    fontFamily: 'sans-serif',
  },
  noteTextHindi: {
    fontSize: 13,
    color: '#FFD700',
    opacity: 0.9,
    lineHeight: 20,
    fontFamily: 'sans-serif',
  },
});

export default HelplineScreen;
