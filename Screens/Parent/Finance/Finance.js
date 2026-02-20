import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isLaptop = SCREEN_WIDTH >= 768;

// ─── DATA ────────────────────────────────────────────────────────────────────
const yearlyData = [
  {
    year: 'Year 1 (2021-22)',
    tuition: '₹5,50,000',
    aid: '- ₹1,00,000',
    parent: '₹4,50,000',
    net: '₹0',
    status: 'Paid Full',
    statusType: 'paid',
  },
  {
    year: 'Year 2 (2022-23)',
    tuition: '₹5,80,000',
    aid: '- ₹1,80,000',
    parent: '₹4,80,000',
    net: '₹0',
    status: 'Paid Full',
    statusType: 'paid',
  },
  {
    year: 'Year 3 (2023-24)',
    tuition: '₹6,20,000',
    aid: '- ₹1,20,000',
    parent: '₹5,06,000',
    net: '₹0',
    status: 'Paid Full',
    statusType: 'paid',
  },
  {
    year: 'Year 4 (2024-25)',
    tuition: '₹6,50,000',
    aid: '- ₹1,20,000',
    parent: '₹1,30,000',
    net: '₹4,00,000',
    status: 'Pending',
    statusType: 'pending',
  },
];

const fundingSources = [
  { label: 'Personal Funds', percent: 65, color: '#F59E0B' },
  { label: 'Scholarships', percent: 20, color: '#10B981' },
  { label: 'Other', percent: 15, color: '#6366F1' },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const StatCard = ({ title, value, sub, showBar }) => (
  <View style={[styles.statCard, isLaptop && styles.statCardLaptop]}>
    <Text style={styles.statTitle}>{title}</Text>
    <Text style={styles.statValue}>{value}</Text>
    {sub && !showBar && <Text style={styles.statSub}>{sub}</Text>}
    {showBar && (
      <View style={styles.barWrap}>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: '75%' }]} />
        </View>
        <Text style={styles.barLabel}>75%</Text>
      </View>
    )}
  </View>
);

const StatusBadge = ({ type, label }) => (
  <View style={[styles.badge, type === 'paid' ? styles.badgePaid : styles.badgePending]}>
    <View style={[styles.badgeDot, type === 'paid' ? styles.dotPaid : styles.dotPending]} />
    <Text style={[styles.badgeText, type === 'paid' ? styles.badgeTextPaid : styles.badgeTextPending]}>
      {label}
    </Text>
  </View>
);

const TableRow = ({ item, index }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt, pressed && styles.tableRowPressed]}
    >
      {isLaptop ? (
        // Laptop: horizontal row
        <View style={styles.tableRowInner}>
          <Text style={[styles.cellText, { flex: 2 }]}>{item.year}</Text>
          <Text style={[styles.cellText, { flex: 1.5, textAlign: 'center' }]}>{item.tuition}</Text>
          <Text style={[styles.cellText, styles.aidText, { flex: 1.5, textAlign: 'center' }]}>{item.aid}</Text>
          <Text style={[styles.cellText, { flex: 1.5, textAlign: 'center' }]}>{item.parent}</Text>
          <Text
            style={[
              styles.cellText,
              { flex: 1.2, textAlign: 'center' },
              item.statusType === 'pending' && styles.pendingAmount,
            ]}
          >
            {item.net}
          </Text>
          <View style={{ flex: 1.2, alignItems: 'center' }}>
            <StatusBadge type={item.statusType} label={item.status} />
          </View>
        </View>
      ) : (
        // Mobile: stacked card-style
        <View style={styles.mobileRow}>
          <View style={styles.mobileRowHeader}>
            <Text style={styles.mobileRowYear}>{item.year}</Text>
            <StatusBadge type={item.statusType} label={item.status} />
          </View>
          <View style={styles.mobileRowGrid}>
            <View style={styles.mobileCell}>
              <Text style={styles.mobileCellLabel}>Tuition & Fees</Text>
              <Text style={styles.mobileCellValue}>{item.tuition}</Text>
            </View>
            <View style={styles.mobileCell}>
              <Text style={styles.mobileCellLabel}>Financial Aid</Text>
              <Text style={[styles.mobileCellValue, styles.aidText]}>{item.aid}</Text>
            </View>
            <View style={styles.mobileCell}>
              <Text style={styles.mobileCellLabel}>Parent Contribution</Text>
              <Text style={styles.mobileCellValue}>{item.parent}</Text>
            </View>
            <View style={styles.mobileCell}>
              <Text style={styles.mobileCellLabel}>Net Balance</Text>
              <Text
                style={[
                  styles.mobileCellValue,
                  item.statusType === 'pending' && styles.pendingAmount,
                ]}
              >
                {item.net}
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const DonutChart = () => {
  const size = isLaptop ? 120 : 90;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <View style={styles.donutWrapper}>
      <View style={[styles.donutPlaceholder, { width: size, height: size, borderRadius: size / 2 }]}>
        {/* Fake donut using border segments */}
        <View style={[styles.donutInner, { width: size - strokeWidth * 2, height: size - strokeWidth * 2, borderRadius: (size - strokeWidth * 2) / 2 }]}>
          <Text style={styles.donutCenter}>24L</Text>
          <Text style={styles.donutSub}>TOTAL</Text>
        </View>
      </View>
      <View style={styles.legendWrap}>
        {fundingSources.map((s) => (
          <View key={s.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: s.color }]} />
            <Text style={styles.legendText}>
              {s.label} <Text style={{ color: '#CBD5E1' }}>{s.percent}%</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const CostTrendBars = () => {
  const years = ['21-22', '22-23', '23-24', '24-25'];
  const tuitions = [5.5, 5.8, 6.2, 6.5];
  const scholarships = [1.0, 1.8, 1.2, 1.2];
  const maxVal = 7;
  const barH = isLaptop ? 100 : 80;

  return (
    <View style={styles.trendWrap}>
      {years.map((y, i) => (
        <View key={y} style={styles.trendGroup}>
          <View style={[styles.trendBars, { height: barH }]}>
            <View
              style={[
                styles.trendBar,
                {
                  height: (tuitions[i] / maxVal) * barH,
                  backgroundColor: '#6366F1',
                  marginRight: 2,
                },
              ]}
            />
            <View
              style={[
                styles.trendBar,
                {
                  height: (scholarships[i] / maxVal) * barH,
                  backgroundColor: '#10B981',
                },
              ]}
            />
          </View>
          <Text style={styles.trendLabel}>{y}</Text>
        </View>
      ))}
    </View>
  );
};

// ─── MAIN SCREEN ─────────────────────────────────────────────────────────────

export default function GraduationFinancialDashboard() {
  const [notifPressed, setNotifPressed] = useState(false);
  const [reportPressed, setReportPressed] = useState(false);
  const [payPressed, setPayPressed] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1117" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.container,
          isLaptop && styles.containerLaptop,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>4-Year Graduation Financial Overview</Text>
            <Text style={styles.headerSub}>B.Tech in Computer Science & Engineering (2021 - 2025)</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.notifBtn, notifPressed && styles.btnActiveLight]}
              activeOpacity={0.7}
              onPressIn={() => setNotifPressed(true)}
              onPressOut={() => setNotifPressed(false)}
            >
              <Text style={styles.notifIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.reportBtn, reportPressed && styles.reportBtnActive]}
              activeOpacity={0.7}
              onPressIn={() => setReportPressed(true)}
              onPressOut={() => setReportPressed(false)}
            >
              <Text style={styles.reportBtnText}>⬆ Full Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── STAT CARDS ── */}
        <View style={[styles.statsRow, isLaptop && styles.statsRowLaptop]}>
          <StatCard
            title="TOTAL 4-YEAR COST"
            value="₹24,00,000"
            sub="Includes tuition, campus fees & insurance"
          />
          <StatCard title="TOTAL PAID" value="₹18,00,000" showBar />
          <View style={[styles.statCard, styles.statCardBalance, isLaptop && styles.statCardLaptop]}>
            <Text style={styles.statTitle}>REMAINING BALANCE</Text>
            <Text style={styles.statValueBalance}>₹6,00,000</Text>
           
          </View>
        </View>

        {/* ── YEARLY BREAKDOWN ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Yearly Financial Breakdown</Text>
            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
              <Text style={styles.filterIcon}>⇅</Text>
            </TouchableOpacity>
          </View>

          {/* Table Header (laptop only) */}
          {isLaptop && (
            <View style={styles.tableHeader}>
              {['ACADEMIC YEAR', 'TUITION & FEES', 'FINANCIAL AID', 'PARENT CONTRIBUTION', 'NET BALANCE', 'STATUS'].map(
                (h, i) => (
                  <Text
                    key={h}
                    style={[
                      styles.tableHeaderText,
                      { flex: i === 0 ? 2 : i === 4 || i === 5 ? 1.2 : 1.5, textAlign: i === 0 ? 'left' : 'center' },
                    ]}
                  >
                    {h}
                  </Text>
                )
              )}
            </View>
          )}

          {yearlyData.map((item, i) => (
            <TableRow key={item.year} item={item} index={i} />
          ))}
        </View>

        {/* ── BOTTOM ROW ── */}
        <View style={[styles.bottomRow, isLaptop && styles.bottomRowLaptop]}>
          {/* Cost Trends */}
          <View style={[styles.bottomCard, isLaptop && styles.bottomCardLaptop]}>
            <Text style={styles.sectionTitle}>Cost Trends over 4 Years</Text>
            <Text style={styles.sectionSub}>Yearly Tuition vs Scholarship impact</Text>
            <CostTrendBars />
            <View style={styles.trendLegend}>
              <View style={styles.trendLegItem}>
                <View style={[styles.legendDot, { backgroundColor: '#6366F1' }]} />
                <Text style={styles.legendText}>Tuition</Text>
              </View>
              <View style={styles.trendLegItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>Scholarship</Text>
              </View>
            </View>
          </View>

          {/* Funding Sources */}
          <View style={[styles.bottomCard, isLaptop && styles.bottomCardLaptop]}>
            <Text style={styles.sectionTitle}>Funding Sources</Text>
            <Text style={styles.sectionSub}>Total distribution of funding</Text>
            <DonutChart />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  containerLaptop: {
    padding: 28,
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 10,
  },
  headerLeft: { flex: 1, minWidth: 180 },
  headerTitle: {
    fontSize: isLaptop ? 22 : 17,
    fontWeight: '700',
    color: '#F1F5F9',
    letterSpacing: 0.2,
  },
  headerSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notifBtn: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnActiveLight: { backgroundColor: '#334155' },
  notifIcon: { fontSize: 16 },
  reportBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  reportBtnActive: { backgroundColor: '#2563EB' },
  reportBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },

  // Stat Cards
  statsRow: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  statsRowLaptop: {
    flexDirection: 'row',
  },
  statCard: {
    backgroundColor: '#161B27',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1E293B',
    flex: 1,
  },
  statCardLaptop: { marginRight: 0 },
  statCardBalance: {},
  statTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  statValue: {
    fontSize: isLaptop ? 28 : 24,
    fontWeight: '800',
    color: '#F1F5F9',
  },
  statValueBalance: {
    fontSize: isLaptop ? 28 : 24,
    fontWeight: '800',
    color: '#F1F5F9',
    marginBottom: 14,
  },
  statSub: { fontSize: 11, color: '#475569', marginTop: 6 },
  barWrap: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 8 },
  barBg: { flex: 1, height: 6, backgroundColor: '#1E293B', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 4 },
  barLabel: { fontSize: 12, color: '#10B981', fontWeight: '700' },
  payBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  payBtnActive: { backgroundColor: '#2563EB' },
  payBtnText: { color: '#fff', fontWeight: '600', fontSize: 13 },

  // Section
  section: {
    backgroundColor: '#161B27',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    overflow: 'hidden',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#F1F5F9' },
  sectionSub: { fontSize: 11, color: '#475569', marginTop: 3, marginBottom: 12 },
  filterBtn: {
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 7,
  },
  filterIcon: { color: '#94A3B8', fontSize: 14 },

  // Table
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#475569',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#1A2233',
  },
  tableRowAlt: { backgroundColor: '#12172200' },
  tableRowPressed: { backgroundColor: '#1E293B' },
  tableRowInner: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cellText: { fontSize: 13, color: '#CBD5E1' },
  aidText: { color: '#F87171' },
  pendingAmount: { color: '#3B82F6' },

  // Mobile row
  mobileRow: { padding: 14 },
  mobileRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mobileRowYear: { fontSize: 13, fontWeight: '700', color: '#F1F5F9' },
  mobileRowGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mobileCell: { width: '47%' },
  mobileCellLabel: { fontSize: 10, color: '#475569', letterSpacing: 0.6, marginBottom: 3, textTransform: 'uppercase' },
  mobileCellValue: { fontSize: 13, color: '#CBD5E1', fontWeight: '500' },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  badgePaid: { backgroundColor: '#052e16' },
  badgePending: { backgroundColor: '#431407' },
  badgeDot: { width: 6, height: 6, borderRadius: 3 },
  dotPaid: { backgroundColor: '#10B981' },
  dotPending: { backgroundColor: '#F59E0B' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  badgeTextPaid: { color: '#10B981' },
  badgeTextPending: { color: '#F59E0B' },

  // Bottom row
  bottomRow: { gap: 16 },
  bottomRowLaptop: { flexDirection: 'row' },
  bottomCard: {
    backgroundColor: '#161B27',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    padding: 18,
    flex: 1,
  },
  bottomCardLaptop: {},

  // Trend chart
  trendWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginTop: 16,
    marginBottom: 12,
  },
  trendGroup: { alignItems: 'center', gap: 4 },
  trendBars: { flexDirection: 'row', alignItems: 'flex-end' },
  trendBar: { width: isLaptop ? 18 : 14, borderRadius: 3 },
  trendLabel: { fontSize: 10, color: '#475569' },
  trendLegend: { flexDirection: 'row', gap: 16 },
  trendLegItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },

  // Donut
  donutWrapper: {
    flexDirection: isLaptop ? 'row' : 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 20,
    flexWrap: 'wrap',
  },
  donutPlaceholder: {
    backgroundColor: 'transparent',
    borderWidth: 14,
    borderColor: '#F59E0B',
    borderTopColor: '#10B981',
    borderLeftColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutInner: {
    backgroundColor: '#161B27',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutCenter: { fontSize: 18, fontWeight: '800', color: '#F1F5F9' },
  donutSub: { fontSize: 9, color: '#475569', letterSpacing: 1 },
  legendWrap: { gap: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 12, color: '#94A3B8' },
});