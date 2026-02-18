

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  white: '#ffffff',
  sub: '#7a9cc4',
};

const BREAKPOINT = 768;
// ✅ FIX: Single source of truth for drawer width
const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', emoji: '⊞' },
  { key: 'schedule',  label: 'Schedule',  emoji: '📅' },
  { key: 'analytics', label: 'Analytics', emoji: '📊' },
  { key: 'messages',  label: 'Messages',  emoji: '✉️' },
  { key: 'finance',   label: 'Finance',   emoji: '🗒️' },
];

// ─── Sidebar Content ──────────────────────────────────────────────────────────
function SidebarContent({ activeKey, onSelect, onClose, isDesktop, navigation }) {
  return (
    // ✅ FIX: flex: 1 so it fills parent (drawer) completely
    <View style={[styles.sidebar, isDesktop ? styles.sidebarDesktop : styles.sidebarMobile]}>
      {/* Logo row */}
      <View style={styles.logoRow}>
        <View style={styles.logoBadge}>
          <Text style={{ fontSize: 20 }}>🎓</Text>
        </View>
        <Text style={styles.logoText}>Campus360</Text>
        {!isDesktop && (
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={{ color: C.sub, fontSize: 20, fontWeight: '600' }}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Nav Items */}
      <View style={styles.navList}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => {
                if (item.key === 'dashboard') {
                  navigation.navigate('Dashboardpage');
                } else {
                  onSelect(item.key);
                }
                if (!isDesktop) onClose();
              }}
              activeOpacity={0.75}
            >
              <Text style={[styles.navEmoji, { opacity: isActive ? 1 : 0.5 }]}>{item.emoji}</Text>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
              {isActive && <View style={styles.navPip} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      <View style={styles.sidebarFooter}>
        <View style={styles.parentAvatar}>
          <Text style={{ fontSize: 18 }}>👤</Text>
        </View>
        <View>
          <Text style={styles.parentLabel}>Parent Access</Text>
          <Text style={styles.parentName}>Robert Anderson</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Hamburger Icon (3 lines) ─────────────────────────────────────────────────
function HamburgerIcon() {
  return (
    <View style={styles.hamburger}>
      <View style={styles.hamburgerLine} />
      <View style={styles.hamburgerLine} />
      <View style={styles.hamburgerLine} />
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Parentmaindashboard() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= BREAKPOINT;
  const [activeKey, setActiveKey] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigation = useNavigation();

  // ✅ FIX: Use DRAWER_WIDTH constant so slide value matches actual drawer width
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: drawerOpen ? 0 : -DRAWER_WIDTH,
        useNativeDriver: true,
        bounciness: 4,
      }),
      Animated.timing(overlayAnim, {
        toValue: drawerOpen ? 1 : 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start();
  }, [drawerOpen]);

  useEffect(() => {
    if (isDesktop && drawerOpen) setDrawerOpen(false);
  }, [isDesktop]);

  // ✅ AUTO OPEN DASHBOARD ON LOAD
  useEffect(() => {
    navigation.navigate('Dashboardpage');
  }, []);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <View style={styles.appShell}>

        {/* ── Desktop: persistent sidebar ── */}
        {isDesktop && (
          <SidebarContent
            activeKey={activeKey}
            onSelect={setActiveKey}
            onClose={() => {}}
            isDesktop
            navigation={navigation}
          />
        )}

        {/* ── Main Content ── */}
        <View style={styles.content}>

          {/* Mobile top bar with hamburger */}
          {!isDesktop && (
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.menuBtn}
                onPress={() => setDrawerOpen(true)}
                activeOpacity={0.7}
              >
                <HamburgerIcon />
              </TouchableOpacity>
              <Text style={styles.topBarTitle}>Campus360</Text>
              <View style={{ width: 40 }} />
            </View>
          )}

          {/* Page content */}
          <View style={styles.pageBody}>
            <Text style={styles.pageTitle}>Student Overview</Text>
            <View style={styles.activeChip}>
              <View style={styles.enrollDot} />
              <Text style={styles.activeChipText}>Active Enrollment</Text>
            </View>
            <Text style={styles.pageHint}>
              Current section: <Text style={{ color: C.blueLight }}>{activeKey}</Text>
            </Text>
          </View>
        </View>

        {/* ── Mobile: drawer + overlay ── */}
        {!isDesktop && (
          <>
            {/* ✅ FIX: Overlay sits above content but below drawer */}
            <Animated.View
              pointerEvents={drawerOpen ? 'auto' : 'none'}
              style={[styles.overlay, { opacity: overlayAnim }]}
            >
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                onPress={() => setDrawerOpen(false)}
                activeOpacity={1}
              />
            </Animated.View>

            {/* ✅ FIX: Drawer width matches DRAWER_WIDTH constant */}
            <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
              <SidebarContent
                activeKey={activeKey}
                onSelect={setActiveKey}
                onClose={() => setDrawerOpen(false)}
                isDesktop={false}
                navigation={navigation}
              />
            </Animated.View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  appShell: { flex: 1, flexDirection: 'row' },

  // ✅ FIX: Base sidebar style — shared between desktop and mobile
  sidebar: {
    backgroundColor: C.sidebar,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderRightWidth: 1,
    borderRightColor: C.cardBorder,
    // flex layout so footer stays at bottom
    flexDirection: 'column',
  },
  // ✅ Desktop sidebar: fixed width, full height
  sidebarDesktop: {
    width: 230,
    paddingTop: 40,
    height: '100%',
  },
  // ✅ Mobile sidebar: fills the drawer completely (flex: 1 + no fixed width)
  sidebarMobile: {
    flex: 1,
    paddingTop: 50, // a bit more padding for status bar area
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 10,
  },
  logoBadge: {
    width: 40, height: 40, borderRadius: 11,
    backgroundColor: C.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { color: C.white, fontSize: 18, fontWeight: '800', flex: 1 },

  navList: { flex: 1, gap: 4 },
  navItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: 10, gap: 10,
  },
  navItemActive: { backgroundColor: C.accent },
  navEmoji: { fontSize: 17 },
  navLabel: { color: C.sub, fontSize: 14, fontWeight: '500', flex: 1 },
  navLabelActive: { color: C.white, fontWeight: '700' },
  navPip: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.blueLight },

  sidebarFooter: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingTop: 20, borderTopWidth: 1, borderTopColor: C.cardBorder, marginTop: 20,
  },
  parentAvatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center',
  },
  parentLabel: { color: C.sub, fontSize: 11 },
  parentName: { color: C.white, fontSize: 13, fontWeight: '600' },

  // Main content
  content: { flex: 1, backgroundColor: C.bg },

  // Mobile top bar
  topBar: {
    height: 58,
    backgroundColor: C.sidebar,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.cardBorder,
  },
  topBarTitle: { color: C.white, fontSize: 17, fontWeight: '800' },
  menuBtn: { padding: 6, justifyContent: 'center', alignItems: 'center' },

  // Hamburger (3 lines)
  hamburger: { gap: 5 },
  hamburgerLine: {
    width: 24, height: 2.5,
    backgroundColor: C.blueLight,
    borderRadius: 2,
  },

  // Page body
  pageBody: { flex: 1, padding: 24, gap: 14 },
  pageTitle: { color: C.white, fontSize: 26, fontWeight: '700' },
  activeChip: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    alignSelf: 'flex-start',
    backgroundColor: '#0e2a4a',
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6,
    borderWidth: 1, borderColor: C.blue,
  },
  enrollDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.teal },
  activeChipText: { color: C.blueLight, fontSize: 12, fontWeight: '600' },
  pageHint: { color: C.sub, fontSize: 14 },

  // Overlay (sits above content, below drawer)
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 10,
  },

  // ✅ FIX: Drawer uses DRAWER_WIDTH constant (was mismatched with sidebar width of 230)
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,           // ✅ use bottom: 0 instead of height: '100%' — more reliable on mobile
    width: DRAWER_WIDTH,
    zIndex: 20,
    elevation: 20,
    backgroundColor: C.sidebar,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    // ✅ FIX: flexDirection column so SidebarContent (flex:1) fills it
    flexDirection: 'column',
  },
});