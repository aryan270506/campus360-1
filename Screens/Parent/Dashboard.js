
import React from 'react';
import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity, 
         ScrollView 
        } from 'react-native';

const ParentDashboard = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Panel */}
      <View style={styles.topPanel}>
        <Text style={styles.profile}>Sarah Maxwell (Primary Guardian)</Text>
      </View>

      {/* Metrics Section */}
      <View style={styles.metrics}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.metricTitle}>Total Attendance</Text>
          <Text style={styles.metricValue}>92%</Text>
          <Text style={styles.metricChange}>+2.4% from last month</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.metricTitle}>Classes Taken</Text>
          <Text style={styles.metricValue}>148</Text>
          <Text style={styles.metricChange}>Academic Year 2023-24</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.metricTitle}>Next Exam</Text>
          <Text style={styles.metricValue}>3 Days</Text>
          <Text style={styles.metricChange}>Mathematics CAT-2</Text>
        </TouchableOpacity>
      </View>

      {/* Attendance Trend Placeholder */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance Trend</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Export PDF</Text>
        </TouchableOpacity>
      </View>

      {/* Exam Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CAT Exam Results (Term 1)</Text>
        <TouchableOpacity style={styles.resultCard}>
          <Text style={styles.subject}>Mathematics</Text>
          <Text>Score: 88/100 | Percentile: 94th | Status: Passed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resultCard}>
          <Text style={styles.subject}>Physics</Text>
          <Text>Score: 76/100 | Percentile: 82nd | Status: Passed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  topPanel: { padding: 16, backgroundColor: '#4a90e2' },
  profile: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  metrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginVertical: 16 },
  card: { backgroundColor: '#fff', padding: 12, margin: 8, borderRadius: 8, width: '28%', elevation: 2 },
  metricTitle: { fontSize: 14, fontWeight: '600' },
  metricValue: { fontSize: 20, fontWeight: 'bold', marginVertical: 4 },
  metricChange: { fontSize: 12, color: 'gray' },
  section: { margin: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  button: { backgroundColor: '#4a90e2', padding: 8, borderRadius: 6, alignSelf: 'flex-start' },
  buttonText: { color: '#fff', fontWeight: '600' },
  resultCard: { backgroundColor: '#fff', padding: 12, marginVertical: 6, borderRadius: 8, elevation: 2 },
  subject: { fontWeight: 'bold', marginBottom: 4 }
});

export default ParentDashboard;

