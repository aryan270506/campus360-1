import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const PAD = isTablet ? 32 : 14;

// On mobile, give the table a minimum width so all columns fit and user can scroll horizontally
// On tablet/laptop, let it stretch to full width naturally
const TABLE_MIN_WIDTH = 980;
const tableContentWidth = isTablet ? '100%' : TABLE_MIN_WIDTH;

// ─── DATA ────────────────────────────────────────────────────────────────────
const SUBJECTS = [
  {
    code: 'CS101', name: 'Advanced Mathematics',
    internal: 24, internalMax: 25, barColor: '#22c55e',
    cat1: '18/20', cat2: '17/20', fet: '40/60',
  },
  {
    code: 'CS102', name: 'Quantum Physics',
    internal: 20, internalMax: 25, barColor: '#3b82f6',
    cat1: '16/20', cat2: '15/20', fet: '38/60',
  },
  {
    code: 'CS103', name: 'Programming in Python',
    internal: 22, internalMax: 25, barColor: '#22c55e',
    cat1: '19/20', cat2: '19/20', fet: '45/60',
  },
  {
    code: 'CS104', name: 'Database Systems',
    internal: 18, internalMax: 25, barColor: '#f59e0b',
    cat1: '15/20', cat2: '14/20', fet: '35/60',
  },
  {
    code: 'CS105', name: 'Computer Networks',
    internal: 25, internalMax: 25, barColor: '#22c55e',
    cat1: '20/20', cat2: '20/20', fet: '48/60',
  },
];

// ─── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  bg:       '#0d1117',
  surface:  '#161b27',
  surface2: '#1c2233',
  border:   '#232b3e',
  accent:   '#2563eb',
  green:    '#22c55e',
  text:     '#e2e8f0',
  textSub:  '#8b9ab0',
  textMuted:'#4b5a72',
};

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────
const ProgressBar = ({ value, max, color }) => {
  const pct = Math.min(value / max, 1);
  const BAR_W = isTablet ? 90 : 64;
  return (
    <View style={[bar.track, { width: BAR_W }]}>
      <View style={[bar.fill, { width: BAR_W * pct, backgroundColor: color }]} />
    </View>
  );
};
const bar = StyleSheet.create({
  track: { height: 5, backgroundColor: '#232b3e', borderRadius: 3, overflow: 'hidden' },
  fill:  { height: 5, borderRadius: 3 },
});

// ─── PASS BADGE ──────────────────────────────────────────────────────────────
const PassBadge = () => (
  <View style={badge.wrap}>
    <Text style={badge.text}>PASS</Text>
  </View>
);
const badge = StyleSheet.create({
  wrap: { borderWidth: 1, borderColor: '#22c55e', borderRadius: 6, paddingHorizontal: 9, paddingVertical: 3 },
  text: { color: '#22c55e', fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
});

// ─── SUBJECT ROW ─────────────────────────────────────────────────────────────
const SubjectRow = ({ item, last }) => (
  <View style={[styles.row, last && styles.rowLast]}>
    <View style={styles.colSubject}>
      <Text style={styles.code}>{item.code}</Text>
      <Text style={styles.subName}>{item.name}</Text>
    </View>
    <View style={styles.colInternal}>
      <Text style={styles.cell}>{item.internal}/{item.internalMax}</Text>
      <ProgressBar value={item.internal} max={item.internalMax} color={item.barColor} />
    </View>
    <View style={styles.colSmall}>
      <Text style={styles.cell}>{item.cat1}</Text>
    </View>
    <View style={styles.colSmall}>
      <Text style={styles.cell}>{item.cat2}</Text>
    </View>
    <View style={styles.colSmall}>
      <Text style={styles.cell}>{item.fet}</Text>
    </View>
    <View style={styles.colStatus}>
      <PassBadge />
    </View>
  </View>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Examresult() {
  const [activeNav, setActiveNav] = useState('Courses');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.surface} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── BREADCRUMB ── */}
        <View style={styles.breadcrumb}>
          {['Home', 'Exam Results', 'CAT 1 Results'].map((crumb, i, arr) => (
            <View key={crumb} style={styles.breadcrumbItem}>
              {i < arr.length - 1 ? (
                <>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.breadLink}>{crumb}</Text>
                  </TouchableOpacity>
                  <Text style={styles.breadSep}> › </Text>
                </>
              ) : (
                <Text style={styles.breadCurrent}>{crumb}</Text>
              )}
            </View>
          ))}
        </View>

        {/* ── PROFILE CARD ── */}
        <View style={styles.profileCard}>
          {/* Blue left accent bar */}
          <View style={styles.leftBar} />

          {isTablet ? (
            // ── TABLET: single row layout ──
            <View style={styles.profileRowTablet}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileAvatarIcon}>🪪</Text>
              </View>
              <View style={styles.profileInfoTablet}>
                <Text style={styles.profileName}>John Doe</Text>
                <View style={styles.profileMetaTablet}>
                  <Text style={styles.metaItem}>📋 STU-242141005</Text>
                  <Text style={styles.metaItem}>🎓 B.Sc. Computer Science</Text>
                  <Text style={styles.metaItem}>📅 Autumn 2026</Text>
                </View>
              </View>
              <View style={styles.profileActionsTablet}>
                <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
                  <Text style={styles.downloadText}>⬇  Download Transcript</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
                  <Text style={styles.shareText}>⤴</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // ── MOBILE: stacked layout ──
            <View style={styles.profileMobileWrap}>
              {/* Row 1: Avatar + Name + Meta */}
              <View style={styles.profileTopRow}>
                <View style={styles.profileAvatar}>
                  <Text style={styles.profileAvatarIcon}>🪪</Text>
                </View>
                <View style={styles.profileInfoMobile}>
                  <Text style={styles.profileName}>John Doe</Text>
                  <Text style={styles.metaItem}>📋 STU-242141005</Text>
                  <Text style={styles.metaItem}>🎓 B.Sc. Computer Science</Text>
                  <Text style={styles.metaItem}>📅 Autumn 2026</Text>
                </View>
              </View>
              {/* Row 2: Buttons */}
              <View style={styles.profileActionsMobile}>
                <TouchableOpacity style={styles.downloadBtnMobile} activeOpacity={0.8}>
                  <Text style={styles.downloadText}>⬇  Download Transcript</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
                  <Text style={styles.shareText}>⤴</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* ── SECTION HEADER ── */}
        <View style={[styles.sectionHeader, { flexDirection: isTablet ? 'row' : 'column' }]}>
          <View>
            <Text style={styles.sectionTitle}>CAT Exam Results</Text>
            <Text style={styles.sectionSub}>Continuous Assessment Test </Text>
          </View>
          <View style={[styles.overallWrap, { alignItems: isTablet ? 'flex-end' : 'flex-start' }]}>
            <Text style={styles.overallLabel}>OVERALL PERFORMANCE</Text>
            <View style={styles.overallRow}>
              <Text style={styles.overallPct}>88.4%</Text>
              <View style={styles.excellentBadge}>
                <Text style={styles.excellentText}>EXCELLENT</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── STAT CARDS ── */}
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#1e3a5f' }]}>
              <Text style={styles.statIconText}>📈</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>CLASS RANK</Text>
              <View style={styles.rankRow}>
                <Text style={styles.statValue}>12th</Text>
                <Text style={styles.rankUp}> ↑ 2</Text>
              </View>
            </View>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#431407' }]}>
              <Text style={styles.statIconText}>📗</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>CREDITS EARNED</Text>
              <Text style={styles.statValue}>22 / 22</Text>
            </View>
          </View>
        </View>

        {/* ── RESULTS TABLE ── */}
        <View style={styles.table}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={!isTablet}
            scrollEnabled={!isTablet}
            bounces={false}
          >
           <View style={{ minWidth: 1229 }}>
              <View style={styles.tableHead}>
                <Text style={[styles.headText, styles.colSubject]}>SUBJECT CODE & NAME</Text>
                <Text style={[styles.headText, styles.colInternal]}>INTERNAL MARKS</Text>
                <Text style={[styles.headText, styles.colSmall]}>CAT 1</Text>
                <Text style={[styles.headText, styles.colSmall]}>CAT 2</Text>
                <Text style={[styles.headText, styles.colSmall]}>FET</Text>
                <Text style={[styles.headText, styles.colStatus]}>                    STATUS</Text>
              </View>
              {SUBJECTS.map((item, i) => (
                <SubjectRow key={item.code} item={item} last={i === SUBJECTS.length - 1} />
              ))}
            </View>
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: C.bg },
  scroll:        { flex: 1 },
  scrollContent: { paddingBottom: 40 },

  // Breadcrumb
  breadcrumb:     { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', paddingHorizontal: PAD, paddingVertical: 14 },
  breadcrumbItem: { flexDirection: 'row', alignItems: 'center' },
  breadLink:      { color: C.textSub, fontSize: 13 },
  breadSep:       { color: C.textMuted, fontSize: 13 },
  breadCurrent:   { color: C.text, fontSize: 13, fontWeight: '700' },

  // ── Profile Card Shell ──
  profileCard: {
    backgroundColor: C.surface,
    marginHorizontal: PAD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 20,
    paddingLeft: 24,           // extra room for the left accent bar
    marginBottom: 24,
    overflow: 'hidden',
  },
  leftBar: {
    position: 'absolute', left: 0, top: 0, bottom: 0,
    width: 4, backgroundColor: C.accent,
  },

  // ── Tablet profile ──
  profileRowTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileInfoTablet: {
    flex: 1,
  },
  profileMetaTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 4,
  },
  profileActionsTablet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // ── Mobile profile ──
  profileMobileWrap: {
    gap: 14,
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  profileInfoMobile: {
    flex: 1,
    gap: 3,
  },
  profileActionsMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  downloadBtnMobile: {
    flex: 1,                    // stretch to fill remaining width
    backgroundColor: C.accent,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  // ── Shared profile pieces ──
  profileAvatar: {
    width: 64, height: 64, borderRadius: 10,
    backgroundColor: C.surface2,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  profileAvatarIcon: { fontSize: 30 },
  profileName:   { color: C.text, fontSize: isTablet ? 24 : 20, fontWeight: '800', marginBottom: 4 },
  metaItem:      { color: C.textSub, fontSize: 13 },
  downloadBtn:   { backgroundColor: C.accent, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 8 },
  downloadText:  { color: '#fff', fontWeight: '700', fontSize: 13 },
  shareBtn:      { width: 38, height: 38, borderRadius: 8, backgroundColor: C.surface2, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  shareText:     { color: C.text, fontSize: 17 },

  // Section Header
  sectionHeader: { justifyContent: 'space-between', paddingHorizontal: PAD, marginBottom: 14, gap: isTablet ? 0 : 10 },
  sectionTitle:  { color: C.text, fontSize: isTablet ? 20 : 17, fontWeight: '800' },
  sectionSub:    { color: C.textSub, fontSize: 12, marginTop: 3 },
  overallWrap:   {},
  overallLabel:  { color: C.textSub, fontSize: 11, letterSpacing: 0.8, marginBottom: 3 },
  overallRow:    { flexDirection: 'row', alignItems: 'center', gap: 10 },
  overallPct:    { color: C.accent, fontSize: isTablet ? 34 : 28, fontWeight: '900' },
  excellentBadge:{ backgroundColor: '#052e16', borderWidth: 1, borderColor: C.green, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  excellentText: { color: C.green, fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },

  // Stat Cards
  statRow:  { flexDirection: 'row', gap: 12, paddingHorizontal: PAD, marginBottom: 18 },
  statCard: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 10, borderWidth: 1, borderColor: C.border, padding: 14 },
  statIcon: { width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  statIconText: { fontSize: 20 },
  statLabel:{ color: C.textSub, fontSize: 11, letterSpacing: 0.7, marginBottom: 3 },
  statValue:{ color: C.text, fontSize: isTablet ? 22 : 18, fontWeight: '800' },
  rankRow:  { flexDirection: 'row', alignItems: 'center' },
  rankUp:   { color: C.green, fontSize: 13, fontWeight: '700' },

  // Table
  table:    { marginHorizontal: PAD, backgroundColor: C.surface, borderRadius: 10, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginBottom: 24 },
  tableHead:{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 11, backgroundColor: C.surface2, borderBottomWidth: 1, borderBottomColor: C.border },
  headText: { color: C.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 0.7, textTransform: 'uppercase',  },

  row:      { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: C.border },
  rowLast:  { borderBottomWidth: 0 },

  colSubject:  { flex: isTablet ? 2.4 : 2.0 },
  colInternal: { flex: isTablet ? 2.2 : 1.9, flexDirection: 'row', alignItems: 'center', gap: 7 },
  colSmall:    { flex: isTablet ? 1.1 : 1.0 },
  colStatus:   { flex: isTablet ? 0.9 : 0.85, alignItems: 'flex-end' },

  code:    { color: C.text, fontWeight: '700', fontSize: isTablet ? 14 : 13 },
  subName: { color: C.textSub, fontSize: isTablet ? 12 : 11, marginTop: 2 },
  cell:    { color: C.text, fontWeight: '600', fontSize: isTablet ? 14 : 13 },

  // Footer
  footer:      { justifyContent: 'space-between', alignItems: isTablet ? 'center' : 'flex-start', paddingHorizontal: PAD, paddingTop: 14, gap: 8, borderTopWidth: 1, borderTopColor: C.border },
  footerLeft:  { color: C.textMuted, fontSize: 12 },
  footerLinks: { flexDirection: 'row', gap: 16 },
  footerLink:  { color: C.textSub, fontSize: 12 },
});