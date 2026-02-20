/**
 * Campus360 – Student Analytics Overview
 * Desktop: full grid layout with sidebar-aware content
 * Mobile:  scrollable single-column cards
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  useWindowDimensions, StatusBar, Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


// ─── Theme ────────────────────────────────────────────────────────────────────
const C = {
  bg:          '#0b1829',
  sidebar:     '#0f1f35',
  card:        '#111e2e',
  cardBorder:  '#1a2f4a',
  accent:      '#1a4080',
  blue:        '#2461d8',
  blueLight:   '#5b9cf6',
  teal:        '#0ecfb0',
  orange:      '#f59e0b',
  red:         '#ef4444',
  white:       '#ffffff',
  sub:         '#7a9cc4',
  muted:       '#3d5a7a',
  good:        '#0ecfb0',
  cardDark:    '#0d1a2b',
};

const BREAKPOINT = 768;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SUBJECTS = [
  { name: 'Data Structures',  ratio: '45/50', pct: 90,  status: '90%',  color: C.teal },
  { name: 'Operating Systems',ratio: '42/48', pct: 87.5,status: '87.5%',color: C.blueLight },
  { name: 'Discrete Math',    ratio: '38/45', pct: 84,  status: '84%',  color: C.orange },
  { name: 'Database Mgmt',    ratio: '48/52', pct: 92,  status: '92%',  color: C.teal },
  { name: 'Computer Networks',ratio: '40/50', pct: 80,  status: '80%',  color: C.orange },
];

const SUBMISSIONS = [
  { name: 'Data Structures',  val: '4/5' },
  { name: 'Operating Systems',val: '3/4' },
  { name: 'Discrete Math',    val: '5/6' },
  { name: 'Database Systems', val: '2/3' },
];

const PENDING = [
  { name: 'Neural Networks',   count: 1 },
  { name: 'Data Structures',   count: 1 },
  { name: 'Operating Systems', count: 1 },
];

const DEADLINES = [
  { title: 'Neural Networks Project', tag: 'HIGH PRIORITY', tagColor: C.red,    tagBg: '#3b0f0f', date: 'Oct 24, 2023 • 11:59 PM' },
  { title: 'Data Structures Lab',     tag: 'MEDIUM',        tagColor: C.orange,  tagBg: '#2c1a06', date: 'Oct 27, 2023 • 05:00 PM' },
  { title: 'Ethics in AI Essay',      tag: 'OPTIONAL',      tagColor: C.sub,     tagBg: '#1a2f4a', date: 'Nov 02, 2023 • 09:00 AM' },
];

// ─── Small Helpers ─────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return <Text style={st.sectionLabel}>{children}</Text>;
}

function Tag({ label, color, bg }) {
  return (
    <View style={[st.tag, { backgroundColor: bg, borderColor: color }]}>
      <Text style={[st.tagTxt, { color }]}>{label}</Text>
    </View>
  );
}

// ─── Progress Ring (simple circle indicator) ──────────────────────────────────
function ProgressRing({ pct, label }) {
  const size = 72;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* SVG-like with View rings */}
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        borderWidth: stroke, borderColor: C.muted,
        position: 'absolute',
      }} />
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        borderWidth: stroke,
        borderColor: C.teal,
        borderRightColor: 'transparent',
        borderBottomColor: pct > 75 ? C.teal : 'transparent',
        position: 'absolute',
        transform: [{ rotate: '-90deg' }],
      }} />
      <View style={st.ringInner}>
        <Text style={st.ringLabel}>{label}</Text>
      </View>
    </View>
  );
}

// ─── Attendance Card ──────────────────────────────────────────────────────────
function AttendanceCard() {
  return (
    <View style={[st.card, { flex: 1, minWidth: 200 }]}>
      <Text style={st.cardMeta}>Total Attendance</Text>
      <Text style={st.bigNum}>88%</Text>
      <Text style={[st.cardMeta, { color: C.teal, marginTop: 2 }]}>↑ Above threshold</Text>
      <View style={{ alignItems: 'flex-end', marginTop: -60 }}>
        <ProgressRing pct={88} label="Good" />
      </View>
    </View>
  );
}

// ─── Submissions Card ─────────────────────────────────────────────────────────
function SubmissionsCard() {
  return (
    <View style={[st.card, { flex: 1.4 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View>
          <Text style={st.cardMeta}>Submissions</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
            <Text style={st.bigNum}>21</Text>
            <Text style={[st.cardMeta, { fontSize: 16 }]}>/24</Text>
          </View>
          <Text style={[st.cardMeta, { color: C.teal, marginTop: 2 }]}>Semester progress: 87%</Text>
        </View>
        <View style={st.iconCircle}>
          <Text style={{ fontSize: 22 }}>📋</Text>
        </View>
      </View>
      <View style={{ marginTop: 14, gap: 8 }}>
        {SUBMISSIONS.map((s, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={st.rowTxt}>{s.name}</Text>
            <Text style={[st.rowTxt, { color: C.white }]}>{s.val}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Pending Card ─────────────────────────────────────────────────────────────
function PendingCard() {
  return (
    <View style={[st.card, { flex: 1.2 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View>
          <Text style={st.cardMeta}>Pending Tasks</Text>
          <Text style={st.bigNum}>03</Text>
          <Text style={[st.cardMeta, { color: C.orange, marginTop: 2 }]}>Action Required</Text>
        </View>
        <View style={[st.iconCircle, { backgroundColor: '#2c1a06' }]}>
          <Text style={{ fontSize: 22 }}>⏰</Text>
        </View>
      </View>
      <View style={{ marginTop: 14, gap: 8 }}>
        {PENDING.map((p, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={st.rowTxt}>{p.name}</Text>
            <View style={[st.tag, { backgroundColor: '#3b0f0f', borderColor: C.red, paddingHorizontal: 8, paddingVertical: 2 }]}>
              <Text style={[st.tagTxt, { color: C.red }]}>{p.count}</Text>
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity activeOpacity={0.7} style={{ marginTop: 14 }}>
        <Text style={[st.cardMeta, { color: C.blueLight, textAlign: 'right' }]}></Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Subject Attendance Table ─────────────────────────────────────────────────
function SubjectTable({ isDesktop }) {

  const [showDropdown, setShowDropdown] = useState(false);
const [selectedType, setSelectedType] = useState("Theory");
  return (
    <View style={[st.card, { flex: isDesktop ? 3 : undefined }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={st.cardTitle}>Subject Wise Attendance</Text>
        <View style={{ position: "relative" }}>
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => setShowDropdown(!showDropdown)}
    style={st.dropdownBtn}
  >
    <Text style={st.dropdownText}>
      {selectedType} ▾
    </Text>
  </TouchableOpacity>

  {showDropdown && (
    <View style={st.dropdownMenu}>
      <TouchableOpacity
        onPress={() => {
          setSelectedType("Theory");
          setShowDropdown(false);
        }}
        style={st.dropdownItem}
      >
        <Text style={st.dropdownItemText}>Theory</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelectedType("Labs");
          setShowDropdown(false);
        }}
        style={st.dropdownItem}
      >
        <Text style={st.dropdownItemText}>Labs</Text>
      </TouchableOpacity>
    </View>
  )}
</View>
      </View>
    
    
      {/* Header */}
<View style={st.tableHeader}>
  <Text style={[st.tableHeaderTxt, { flex: 2 }]}>SUBJECT</Text>

  <TouchableOpacity
    activeOpacity={0.8}
  style={[st.lectureBtn, { flex: 1 }]}
    onPress={() => {
      console.log("Lecture/Practical clicked");
    }}
  >
    <Text style={st.lectureBtnText}>
      LECTURE / PRACTICAL
    </Text>
  </TouchableOpacity>

  <Text style={st.tableHeaderTxt}>STATUS</Text>
  <Text style={st.tableHeaderTxt}>PROGRESS</Text>
</View>

      {SUBJECTS.map((row, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          style={[st.tableRow, i === SUBJECTS.length - 1 && { borderBottomWidth: 0 }]}
        >
          <Text style={[st.rowTxt, { flex: 2, color: C.white }]}>{row.name}</Text>
          <Text style={[st.rowTxt, { flex: 1, textAlign: 'center' }]}>{row.ratio}</Text>
          <Text style={[st.rowTxt, { flex: 1, textAlign: 'center', color: row.color, fontWeight: '700' }]}>{row.status}</Text>
          <View style={[st.progBg, { flex: 1.2, marginLeft: 8 }]}>
            <View style={[st.progFill, { width: `${row.pct}%`, backgroundColor: row.color }]} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── Deadlines Card ──────────────────────────────────────────────────────────
function DeadlinesCard({ isDesktop }) {
  return (
    <View style={[st.card, { flex: isDesktop ? 1.3 : undefined }]}>
      <Text style={[st.cardTitle, { marginBottom: 16 }]}>Upcoming Deadlines</Text>

      {DEADLINES.map((d, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.75}
          style={[st.deadlineItem, i === DEADLINES.length - 1 && { marginBottom: 0 }]}
        >
          <View style={[st.deadlineAccent, { backgroundColor: d.tagColor }]} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
              <Text style={st.deadlineTitle}>{d.title}</Text>
              <Tag label={d.tag} color={d.tagColor} bg={d.tagBg} />
            </View>
            <Text style={[st.cardMeta, { marginTop: 6 }]}>📅 {d.date}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity activeOpacity={0.85} style={st.calBtn}>
        <Text style={st.calBtnTxt}>Go to Calendar</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Top Bar ─────────────────────────────────────────────────────────────────
function TopBar({ isDesktop, onMenuOpen }) {
  return (
    <View style={[st.topBar, !isDesktop && st.topBarMobile]}>
   
    
      <Text style={[st.topBarTitle, !isDesktop && { fontSize: 16 }]}>
        {isDesktop ? 'Student Analytics Overview' : 'Analytics'}
      </Text>
      {isDesktop && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={st.searchBar}>
            <Text style={{ color: C.muted, fontSize: 13 }}>🔍  Search analytics...</Text>
          </View>
          <TouchableOpacity style={st.topIcon} activeOpacity={0.7}><Text>🔔</Text></TouchableOpacity>
          <TouchableOpacity style={st.topIcon} activeOpacity={0.7}><Text>💬</Text></TouchableOpacity>
        </View>
      )}
      {!isDesktop && (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={st.topIconSm} activeOpacity={0.7}><Text style={{ fontSize: 16 }}>🔔</Text></TouchableOpacity>
          <TouchableOpacity style={st.topIconSm} activeOpacity={0.7}><Text style={{ fontSize: 16 }}>💬</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ─── Desktop Layout ───────────────────────────────────────────────────────────
function DesktopLayout() {
  return (
    <ScrollView contentContainerStyle={st.bodyDesktop} showsVerticalScrollIndicator={false}>
      {/* Top 3 stat cards */}
      <View style={st.row}>
        <AttendanceCard />
        <SubmissionsCard />
        <PendingCard />
      </View>
      {/* Bottom 2-col */}
      <View style={[st.row, { alignItems: 'flex-start' }]}>
        <SubjectTable isDesktop />
        <DeadlinesCard isDesktop />
      </View>
    </ScrollView>
  );
}

// ─── Mobile Layout ────────────────────────────────────────────────────────────
function MobileLayout() {
  return (
    <ScrollView contentContainerStyle={st.bodyMobile} showsVerticalScrollIndicator={false}>
      {/* Stat cards stacked */}
      <View style={st.mobileStatRow}>
        {/* Attendance mini */}
        <View style={[st.card, { flex: 1 }]}>
          <Text style={st.cardMeta}>Total Attendance</Text>
          <Text style={[st.bigNum, { fontSize: 32 }]}>88%</Text>
          <Text style={[st.cardMeta, { color: C.teal }]}>↑ Above threshold</Text>
          <View style={[st.tag, { marginTop: 10, backgroundColor: '#0a2e28', borderColor: C.teal, alignSelf: 'flex-start' }]}>
            <Text style={[st.tagTxt, { color: C.teal }]}>Good</Text>
          </View>
        </View>
        {/* Pending mini */}
        <View style={[st.card, { flex: 1 }]}>
          <Text style={st.cardMeta}>Pending Tasks</Text>
          <Text style={[st.bigNum, { fontSize: 32 }]}>03</Text>
          <Text style={[st.cardMeta, { color: C.orange }]}>Action Required</Text>
          <View style={[st.tag, { marginTop: 10, backgroundColor: '#2c1a06', borderColor: C.orange, alignSelf: 'flex-start' }]}>
            <Text style={[st.tagTxt, { color: C.orange }]}>⏰ Now</Text>
          </View>
        </View>
      </View>

      <SubmissionsCard />
      <PendingCard />
      <SubjectTable isDesktop={false} />
      <DeadlinesCard isDesktop={false} />
    </ScrollView>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Analytics() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= BREAKPOINT;

  return (
    <SafeAreaView style={st.root} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <TopBar isDesktop={isDesktop} onMenuOpen={() => {}} />
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const st = StyleSheet.create({
  root:  { flex: 1, backgroundColor: C.bg },

  // Top Bar
  topBar: {
    height: 64,
    backgroundColor: C.sidebar,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
  },
  topBarMobile: { height: 56, paddingHorizontal: 16 },
  topBarTitle:  { color: C.white, fontSize: 20, fontWeight: '800' },
  searchBar:    { backgroundColor: C.card, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 8, minWidth: 220, borderWidth: 1, borderColor: C.cardBorder },
  topIcon:      { width: 38, height: 38, borderRadius: 19, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.cardBorder },
  topIconSm:    { width: 34, height: 34, borderRadius: 17, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center' },

  // Hamburger
  hamburgerBtn: { padding: 4, marginRight: 12 },
  hamburger:    { gap: 4 },
  hLine:        { width: 22, height: 2, backgroundColor: C.blueLight, borderRadius: 2 },

  // Layouts
  bodyDesktop: { padding: 20, gap: 16 },
  bodyMobile:  { padding: 14, gap: 14 },
  row:         { flexDirection: 'row', gap: 14, flexWrap: 'wrap' },
  mobileStatRow: { flexDirection: 'row', gap: 12 },

  // Card
  card: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  cardTitle: { color: C.white, fontSize: 16, fontWeight: '700' },
  cardMeta:  { color: C.sub, fontSize: 12 },
  bigNum:    { color: C.white, fontSize: 38, fontWeight: '900', lineHeight: 46, marginTop: 4 },

  // Icon circle
  iconCircle: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: '#1a2f4a',
    alignItems: 'center', justifyContent: 'center',
  },

  // Progress Ring
  ringInner:  { alignItems: 'center', justifyContent: 'center' },
  ringLabel:  { color: C.teal, fontSize: 11, fontWeight: '800' },

  // Tag
  tag:    { borderRadius: 6, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3 },
  tagTxt: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },

  // Table
  tableHeader:    { flexDirection: 'row', paddingBottom: 8 },
  tableHeaderTxt: { flex: 1, color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },
  divider:        { height: 1, backgroundColor: C.cardBorder, marginBottom: 4 },
  tableRow:       { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.cardBorder },
  rowTxt:         { flex: 1, color: C.sub, fontSize: 13 },

  // Progress bar
  progBg:   { height: 4, backgroundColor: C.muted, borderRadius: 2 },
  progFill: { height: 4, borderRadius: 2 },

  // Deadlines
  deadlineItem: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    backgroundColor: C.cardDark,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  deadlineAccent: { width: 3, borderRadius: 2, minHeight: 40 },
  deadlineTitle:  { color: C.white, fontSize: 13, fontWeight: '700', flex: 1 },

  // Calendar btn
  calBtn:    { marginTop: 6, backgroundColor: C.cardBorder, borderRadius: 30, paddingVertical: 13, alignItems: 'center' },
  calBtnTxt: { color: C.white, fontWeight: '700', fontSize: 14 },

  // Section label
  sectionLabel: { color: C.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1 },
});