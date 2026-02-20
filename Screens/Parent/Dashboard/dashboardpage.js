/**
 * Campus360 – Dashboardpage (Page Content Only)
 * No sidebar, no drawer, no navigation — rendered inside Parentmaindashboard
 */

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ─── Theme ────────────────────────────────────────────────────────────────────
const C = {
  bg: '#0b1829',
  sidebar: '#0f1f35',
  card: '#122238',
  cardBorder: '#1a3050',
  accent: '#1a4080',
  blue: '#2461d8',
  blueLight: '#5b9cf6',
  teal: '#0ecfb0',
  orange: '#f59e0b',
  red: '#ef4444',
  white: '#ffffff',
  sub: '#7a9cc4',
  muted: '#3d5a7a',
};

const BREAKPOINT = 768;

const ATTENDANCE = [
  { subject: 'Data Structures',      attended: 45, total: 50, pct: 90 },
  { subject: 'Operating Systems',    attended: 34, total: 40, pct: 85 },
  { subject: 'Discrete Mathematics', attended: 38, total: 40, pct: 95 },
  { subject: 'Database Management',  attended: 44, total: 50, pct: 88 },
  { subject: 'Computer Networks',    attended: 46, total: 50, pct: 92 },
];

function pctColor(p) {
  if (p >= 90) return C.teal;
  if (p >= 80) return C.blueLight;
  return C.orange;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, badge, badgeColor, label, value, sub, progress, progressColor }) {
  return (
    <View style={s.statCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={s.statIcon}><Text style={{ fontSize: 18 }}>{icon}</Text></View>
        {badge && <Text style={[s.badge, { color: badgeColor }]}>{badge}</Text>}
      </View>
      <Text style={s.statLabel}>{label}</Text>
      <Text style={s.statValue}>{value}</Text>
      {sub && <Text style={s.statSub}>{sub}</Text>}
      {progress !== undefined && (
        <View style={s.progBg}>
          <View style={[s.progFill, { width: `${progress}%`, backgroundColor: progressColor }]} />
        </View>
      )}
    </View>
  );
}

// ─── Desktop Layout ───────────────────────────────────────────────────────────
function DesktopContent({ setActiveKey }) {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      {/* Top bar */}
      <View style={s.topBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={s.pageTitle}>Student Overview</Text>
          <View style={s.enrollBadge}>
            <View style={s.enrollDot} />
            <Text style={s.enrollTxt}>Active Enrollment</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={s.searchBar}>
            <Text style={{ color: C.muted, fontSize: 13 }}>🔍   Search records...</Text>
          </View>
          <View style={s.topIcon}><Text>🌙</Text></View>
          <View style={s.topIcon}><Text>👤</Text></View>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.bodyDesktop} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={s.profileCard}>
          <View style={{ position: 'relative' }}>
  <View style={s.avatarWrap}>
    <Text style={{ fontSize: 44 }}>🧑‍💻</Text>
  </View>

 
</View>
          <View style={{ flex: 1, gap: 6 }}>
            <Text style={s.profileName}>Liam Anderson</Text>
            <Text style={s.profileSub}>📋  Computer Science | Year 2 | 242141005</Text>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
              {['Semester 4'].map(t => (
                <View key={t} style={s.chip}><Text style={s.chipTxt}>{t}</Text></View>
              ))}
            </View>
          </View>
          <View style={{ gap: 10, width: 220 }}>
            
            <TouchableOpacity style={s.btnWhite} activeOpacity={0.85}>
              <Text style={s.btnWhiteTxt}>💬  Contact Advisor</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={s.statRow}>
          <StatCard icon="📅" badge="▲ +2%" badgeColor={C.teal}     label="Total Attendance"  value="88%" progress={88} progressColor={C.blueLight} />
          <StatCard icon="📋"                                         label="Total Assignments" value="24"  sub="Semester-to-date count" />
          <StatCard icon="✅" badge="✔ Completed" badgeColor={C.teal}  label="Submitted"        value="21"  progress={87} progressColor={C.teal} />
          <StatCard icon="⏰" badge="Action Required" badgeColor={C.orange} label="Pending Tasks" value="3" />
        </View>

        {/* Bottom 2-col */}
        <View style={s.bottomRow}>
          <View style={[s.card, { flex: 3 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
              <View>
                <Text style={s.cardTitle}>Attendance Trends</Text>
                <Text style={s.cardSub}>Lecture / Practical</Text>
                <Text style={s.cardSub}>Weekly semester engagement levels</Text>
              </View>
              <Text style={s.cardSub}>Last 12 Weeks</Text>
            </View>
            <View style={s.divider} />
            {ATTENDANCE.map((row, i) => (
              <View key={i} style={[s.tableRow, i === ATTENDANCE.length - 1 && { borderBottomWidth: 0 }]}>
                <Text style={s.tableSubject}>{row.subject}</Text>
                <Text style={s.tableScore}>{row.attended}/{row.total}</Text>
                <Text style={[s.tablePct, { color: pctColor(row.pct) }]}>{row.pct}%</Text>
              </View>
            ))}
          </View>

          <View style={[s.card, { flex: 1.3, minWidth: 220 }]}>
            <Text style={s.cardTitle}>⏰  Next Lecture</Text>
            <Text style={[s.cardSub, { marginBottom: 14 }]}>Lecture / Practical</Text>
            <View style={s.lectureBox}>
              <Text style={s.urgentTxtLg}>UPCOMING IN 45 MIN</Text>
              <Text style={s.lectureNameLg}>Advanced{'\n'}Algorithms</Text>
              <View style={{ gap: 8, marginTop: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text>🕙</Text><Text style={s.lectureDetailTxt}>10:30 AM – 12:00 PM</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text>📍</Text>
                  <View style={s.hallBadge}><Text style={s.hallTxt}>Hall B-4</Text></View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text>👩‍🏫</Text><Text style={s.lectureDetailTxt}>Dr. Sarah Jenkins</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
  style={s.btnWhite}
  activeOpacity={0.85}
  onPress={() => setActiveKey('schedule')}
>
  <Text style={s.btnWhiteTxt}>View Full Schedule</Text>
</TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Mobile Layout ────────────────────────────────────────────────────────────
function MobileContent({ setActiveKey }) {
  return (
    <ScrollView contentContainerStyle={s.bodyMobile} showsVerticalScrollIndicator={false}>
      {/* Sub header */}
      <View style={s.mobileSubBar}>
        <Text style={s.mobileSubTitle}>Student Overview</Text>
        <View style={s.enrollBadgeSm}>
          <View style={s.enrollDot} />
          <Text style={s.enrollTxtSm}>Active Enrollment</Text>
        </View>
      </View>

      {/* Profile card */}
      <View style={s.mobileProfile}>
        <View style={s.mobileAvatar}>
          <Text style={{ fontSize: 32 }}>🧑‍💻</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.mobileName}>Liam Anderson</Text>
          <Text style={s.mobileSub}>Computer Science • Year 2</Text>
          <Text style={[s.mobileSub, { color: C.muted, fontSize: 11, marginTop: 1 }]}>242141005</Text>
          <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {['Sem 4'].map(t => (
              <View key={t} style={s.chipSm}><Text style={s.chipSmTxt}>{t}</Text></View>
            ))}
          </View>
        </View>
      </View>

      {/* Action buttons */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        
        <TouchableOpacity style={[s.btnWhite, { flex: 1 }]} activeOpacity={0.85}>
          <Text style={[s.btnWhiteTxt, { fontSize: 12 }]}>💬 Advisor</Text>
        </TouchableOpacity>
      </View>

      {/* 2×2 stat grid */}
      <View style={s.mobileStatGrid}>
        {[
          { icon: '📅', label: 'Attendance',  value: '88%', badge: '▲+2%',  bc: C.teal },
          { icon: '📋', label: 'Assignments', value: '24',  badge: 'Total',  bc: C.blueLight },
          { icon: '✅', label: 'Submitted',   value: '21',  badge: 'Done',   bc: C.teal },
          { icon: '⏰', label: 'Pending',     value: '3',   badge: 'Action', bc: C.orange },
        ].map((sc, i) => (
          <View key={i} style={s.mobileStatCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 20 }}>{sc.icon}</Text>
              <Text style={[s.badge, { color: sc.bc, fontSize: 10 }]}>{sc.badge}</Text>
            </View>
            <Text style={s.mobileStatValue}>{sc.value}</Text>
            <Text style={s.mobileStatLabel}>{sc.label}</Text>
          </View>
        ))}
      </View>

      {/* Next lecture */}
      <View style={s.mobileLectureCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Text style={s.cardTitle}>⏰  Next Lecture</Text>
          <View style={s.urgentBadge}><Text style={s.urgentBadgeTxt}>45 MIN</Text></View>
        </View>
        <Text style={s.mobileLectureName}>Advanced Algorithms</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          <Text style={s.lectureDetailTxt}>🕙 10:30 AM – 12:00 PM</Text>
          <Text style={s.lectureDetailTxt}>📍 Hall B-4</Text>
          <Text style={s.lectureDetailTxt}>👩‍🏫 Dr. Sarah Jenkins</Text>
        </View>
        <TouchableOpacity style={[s.btnWhite, { marginTop: 14 }]} activeOpacity={0.85}>
          <Text style={s.btnWhiteTxt}>View Full Schedule</Text>
        </TouchableOpacity>
      </View>

      {/* Attendance */}
      <View style={s.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
          <View>
            <Text style={s.cardTitle}>Attendance Trends</Text>
            <Text style={[s.cardSub, { marginTop: 2 }]}>Lecture / Practical</Text>
          </View>
          <Text style={s.cardSub}>Last 12 Weeks</Text>
        </View>
        {ATTENDANCE.map((row, i) => (
          <View key={i}>
            <View style={s.mobileAttRow}>
              <View style={{ flex: 1 }}>
                <Text style={s.attSubject}>{row.subject}</Text>
                <View style={s.attBarBg}>
                  <View style={[s.attBarFill, { width: `${row.pct}%`, backgroundColor: pctColor(row.pct) }]} />
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', marginLeft: 12, minWidth: 60 }}>
                <Text style={[s.tablePct, { color: pctColor(row.pct) }]}>{row.pct}%</Text>
                <Text style={s.cardSub}>{row.attended}/{row.total}</Text>
              </View>
            </View>
            {i < ATTENDANCE.length - 1 && <View style={s.divider} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function Dashboardpage({ setActiveKey }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= BREAKPOINT;

  // Renders inside Parentmaindashboard's content area — no SafeAreaView, no sidebar
  return (
    <View style={s.root}>
      {isDesktop
  ? <DesktopContent setActiveKey={setActiveKey} />
  : <MobileContent setActiveKey={setActiveKey} />
}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  // Desktop top bar
  topBar:       { height: 64, backgroundColor: C.sidebar, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: C.cardBorder },
  pageTitle:    { color: C.white, fontSize: 20, fontWeight: '800' },
  enrollBadge:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0e2a4a', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, gap: 6, borderWidth: 1, borderColor: C.blue },
  enrollBadgeSm:{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#0e2a4a', borderRadius: 14, paddingHorizontal: 9, paddingVertical: 3, gap: 5 },
  enrollDot:    { width: 7, height: 7, borderRadius: 4, backgroundColor: C.teal },
  enrollTxt:    { color: C.blueLight, fontSize: 12, fontWeight: '600' },
  enrollTxtSm:  { color: C.blueLight, fontSize: 11, fontWeight: '600' },
  searchBar:    { backgroundColor: C.card, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 8, minWidth: 200, borderWidth: 1, borderColor: C.cardBorder },
  topIcon:      { width: 38, height: 38, borderRadius: 19, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.cardBorder },

  // Desktop body
  bodyDesktop:  { padding: 22, gap: 18 },
  profileCard:  { backgroundColor: '#142d55', borderRadius: 18, padding: 24, flexDirection: 'row', alignItems: 'center', gap: 20, flexWrap: 'wrap' },
  avatarWrap:   { width: 86, height: 86, borderRadius: 43, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: C.blueLight },
  profileName:  { color: C.white, fontSize: 24, fontWeight: '900' },
  profileSub:   { color: C.sub, fontSize: 13, marginTop: 3 },
  chip:         { backgroundColor: '#1a3560', borderRadius: 20, paddingHorizontal: 13, paddingVertical: 5, borderWidth: 1, borderColor: C.cardBorder },
  chipTxt:      { color: C.sub, fontSize: 12, fontWeight: '500' },
  btnWhite:     { backgroundColor: C.white, borderRadius: 30, paddingVertical: 12, paddingHorizontal: 18, alignItems: 'center' },
  btnWhiteTxt:  { color: C.bg, fontWeight: '800', fontSize: 13 },
  statRow:      { flexDirection: 'row', gap: 14, flexWrap: 'wrap' },
  statCard:     { flex: 1, minWidth: 140, backgroundColor: C.card, borderRadius: 14, padding: 16, gap: 5, borderWidth: 1, borderColor: C.cardBorder },
  statIcon:     { width: 38, height: 38, borderRadius: 10, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  badge:        { fontSize: 11, fontWeight: '700' },
  statLabel:    { color: C.sub, fontSize: 12, marginTop: 8 },
  statValue:    { color: C.white, fontSize: 30, fontWeight: '900' },
  statSub:      { color: C.muted, fontSize: 11, fontStyle: 'italic' },
  progBg:       { height: 4, backgroundColor: C.cardBorder, borderRadius: 2, marginTop: 8 },
  progFill:     { height: 4, borderRadius: 2 },
  bottomRow:    { flexDirection: 'row', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' },
  card:         { backgroundColor: C.card, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.cardBorder, minWidth: 260 },
  cardTitle:    { color: C.white, fontSize: 16, fontWeight: '700' },
  cardSub:      { color: C.sub, fontSize: 12 },
  divider:      { height: 1, backgroundColor: C.cardBorder, marginVertical: 4 },
  tableRow:     { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: C.cardBorder },
  tableSubject: { flex: 1, color: C.white, fontSize: 14 },
  tableScore:   { color: C.sub, fontSize: 13, width: 58, textAlign: 'right' },
  tablePct:     { fontSize: 15, fontWeight: '800', width: 50, textAlign: 'right' },
  lectureBox:   { backgroundColor: C.accent, borderRadius: 13, padding: 16, gap: 8, marginBottom: 16 },
  urgentTxtLg:  { color: C.blueLight, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  lectureNameLg:{ color: C.white, fontSize: 20, fontWeight: '900', lineHeight: 26, marginTop: 4 },
  lectureDetailTxt: { color: C.sub, fontSize: 13 },
  hallBadge:    { backgroundColor: C.blue, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  hallTxt:      { color: C.white, fontSize: 12, fontWeight: '600' },

  // Mobile
  mobileSubBar:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.cardBorder, marginBottom: 4 },
  mobileSubTitle:    { color: C.white, fontSize: 15, fontWeight: '700' },
  bodyMobile:        { padding: 14, gap: 14 },
  mobileProfile:     { backgroundColor: '#142d55', borderRadius: 16, padding: 16, flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  mobileAvatar:      { width: 70, height: 70, borderRadius: 35, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.blueLight },
  mobileName:        { color: C.white, fontSize: 18, fontWeight: '800' },
  mobileSub:         { color: C.sub, fontSize: 12, marginTop: 2 },
  chipSm:            { backgroundColor: '#1a3560', borderRadius: 14, paddingHorizontal: 9, paddingVertical: 3, borderWidth: 1, borderColor: C.cardBorder },
  chipSmTxt:         { color: C.sub, fontSize: 11 },
  mobileStatGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  mobileStatCard:    { width: '47.5%', backgroundColor: C.card, borderRadius: 13, padding: 14, borderWidth: 1, borderColor: C.cardBorder, gap: 4 },
  mobileStatValue:   { color: C.white, fontSize: 26, fontWeight: '900', marginTop: 8 },
  mobileStatLabel:   { color: C.sub, fontSize: 12 },
  mobileLectureCard: { backgroundColor: C.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.cardBorder },
  mobileLectureName: { color: C.white, fontSize: 19, fontWeight: '900' },
  urgentBadge:       { backgroundColor: '#2c1810', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 4, borderWidth: 1, borderColor: C.orange },
  urgentBadgeTxt:    { color: C.orange, fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  mobileAttRow:      { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  attSubject:        { color: C.white, fontSize: 13, fontWeight: '500', marginBottom: 6 },
  attBarBg:          { height: 4, backgroundColor: C.cardBorder, borderRadius: 2 },
  attBarFill:        { height: 4, borderRadius: 2 },
});