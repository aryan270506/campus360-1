import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function timetable() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const renderTimeColumn = () => (
    <View style={styles.timeColumn}>
      {times.map((time, index) => (
        <View key={index} style={styles.timeCell}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      ))}
    </View>
  );

  const renderDayColumn = (day) => (
    <View style={styles.dayColumn}>
      {times.map((_, index) => (
        <View key={index} style={styles.gridCell} />
      ))}

      {/* Sample Cards */}
      {day === "Mon" && (
        <View style={[styles.card, styles.indigoCard, { top: 80, height: 150 }]}>
          <Text style={styles.cardTitle}>Quantum Mechanics III</Text>
          <Text style={styles.cardSub}>Dr. Thorne | Lab 402B</Text>
        </View>
      )}

      {day === "Wed" && (
        <View style={[styles.card, styles.primaryCard, { top: 160, height: 150 }]}>
          <Text style={styles.cardTitleWhite}>AI & Ethics</Text>
          <Text style={styles.cardSubWhite}>Dr. Vane | Room 505</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Icon name="school" size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Campus360</Text>
          <Text style={styles.headerSub}>Smart University OS</Text>
        </View>
      </View>

      {/* Week Selector */}
      <View style={styles.weekBar}>
        <TouchableOpacity>
          <Icon name="chevron-left" size={22} color="#1e3b8a" />
        </TouchableOpacity>
        <Text style={styles.weekText}>
          Week 12: Oct 16 - Oct 20
        </Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={22} color="#1e3b8a" />
        </TouchableOpacity>
      </View>

      {/* Timetable */}
      <ScrollView horizontal>
        <View>
          {/* Day Headers */}
          <View style={styles.dayHeaderRow}>
            <View style={{ width: 70 }} />
            {days.map((day, index) => (
              <View key={index} style={styles.dayHeader}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Body */}
          <ScrollView style={{ height: 600 }}>
            <View style={{ flexDirection: "row" }}>
              {renderTimeColumn()}
              {days.map((day, index) => (
                <View key={index}>
                  {renderDayColumn(day)}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121620",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },

  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#1e3b8a",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  headerSub: {
    color: "#94a3b8",
    fontSize: 12,
  },

  weekBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e3b8a20",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 12,
  },

  weekText: {
    color: "#fff",
    fontWeight: "500",
  },

  dayHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#1e3b8a30",
  },

  dayHeader: {
    width: 120,
    padding: 10,
    alignItems: "center",
  },

  dayText: {
    color: "#fff",
    fontWeight: "600",
  },

  timeColumn: {
    width: 70,
  },

  timeCell: {
    height: 80,
    justifyContent: "flex-start",
    paddingTop: 5,
    alignItems: "center",
  },

  timeText: {
    color: "#94a3b8",
    fontSize: 12,
  },

  dayColumn: {
    width: 120,
    position: "relative",
  },

  gridCell: {
    height: 80,
    borderBottomWidth: 0.5,
    borderColor: "#1e3b8a30",
  },

  card: {
    position: "absolute",
    left: 5,
    right: 5,
    borderRadius: 10,
    padding: 10,
  },

  indigoCard: {
    backgroundColor: "#6366f120",
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },

  primaryCard: {
    backgroundColor: "#1e3b8a",
  },

  cardTitle: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#fff",
  },

  cardSub: {
    fontSize: 11,
    color: "#cbd5e1",
  },

  cardTitleWhite: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#fff",
  },

  cardSubWhite: {
    fontSize: 11,
    color: "#e2e8f0",
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#1e3b8a",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});