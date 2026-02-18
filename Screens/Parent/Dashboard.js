import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  SafeAreaView,
  Image,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

// ─── Icons (inline SVG-style via text for RN) ────────────────────────────────
const ICONS = {
  dashboard: '⊞',
  schedule: '📅',
  analytics: '📊',
  messages: '✉',
  finance: '🗒',
  logo: '🎓',
  close: '✕',
  menu: '⋯',
};

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard, active: true },
  { key: 'schedule', label: 'Schedule', icon: ICONS.schedule },
  { key: 'analytics', label: 'Analytics', icon: ICONS.analytics },
  { key: 'messages', label: 'Messages', icon: ICONS.messages },
  { key: 'finance', label: 'Finance', icon: ICONS.finance },
];

const BREAKPOINT = 768; // treat >= 768 as "laptop"

// ─── Sidebar Content ──────────────────────────────────────────────────────────
function SidebarContent({ activeKey, onSelect, onClose, isDesktop }) {
  return (
    <View style={styles.sidebar}>
      {/* Logo */}
      <View style={styles.logoRow}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoIcon}>{ICONS.logo}</Text>
        </View>
        <Text style={styles.logoText}>Campus360</Text>
        {!isDesktop && (
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>{ICONS.close}</Text>
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
                onSelect(item.key);
                if (!isDesktop) onClose();
              }}
              activeOpacity={0.75}
            >
              <Text style={[styles.navIcon, isActive && styles.navIconActive]}>
                {item.icon}
              </Text>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer – Parent Access */}
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Parentmaindashboard() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= BREAKPOINT;

  const [activeKey, setActiveKey] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(-260)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (drawerOpen) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 4,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -260,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [drawerOpen]);

  // Close drawer when switching to desktop
  useEffect(() => {
    if (isDesktop && drawerOpen) setDrawerOpen(false);
  }, [isDesktop]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1b2e" />

      <View style={styles.appShell}>
        {/* ── Desktop: persistent sidebar ── */}
        {isDesktop && (
          <SidebarContent
            activeKey={activeKey}
            onSelect={setActiveKey}
            onClose={() => {}}
            isDesktop
          />
        )}

        {/* ── Main Content ── */}
        <View style={styles.content}>
          {/* Top bar (mobile only) */}
          {!isDesktop && (
            <View style={styles.topBar}>
              <Text style={styles.topBarTitle}>Campus360</Text>
              <TouchableOpacity
                style={styles.menuBtn}
                onPress={() => setDrawerOpen(true)}
              >
                {/* Three-dot menu */}
                <View style={styles.dotRow}>
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Page placeholder */}
          <View style={styles.pageBody}>
            <Text style={styles.pageTitle}>Student Overview</Text>
            <View style={styles.activeChip}>
              <Text style={styles.activeChipText}>Active Enrollment</Text>
            </View>
            <Text style={styles.pageHint}>
              Current section: <Text style={{ color: '#4f8ef7' }}>{activeKey}</Text>
            </Text>
          </View>
        </View>

        {/* ── Mobile: drawer overlay ── */}
        {!isDesktop && (
          <>
            {/* Dim overlay */}
            <Animated.View
              style={[
                styles.overlay,
                { opacity: overlayAnim, pointerEvents: drawerOpen ? 'auto' : 'none' },
              ]}
            >
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                onPress={() => setDrawerOpen(false)}
                activeOpacity={1}
              />
            </Animated.View>

            {/* Sliding drawer */}
            <Animated.View
              style={[
                styles.drawer,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <SidebarContent
                activeKey={activeKey}
                onSelect={setActiveKey}
                onClose={() => setDrawerOpen(false)}
                isDesktop={false}
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
  root: {
    flex: 1,
    backgroundColor: '#0d1b2e',
  },
  appShell: {
    flex: 1,
    flexDirection: 'row',
  },

  // ── Sidebar ──────────────────────────────────────────
  sidebar: {
    width: 230,
    backgroundColor: '#111e33',
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
    gap: 10,
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: { fontSize: 20 },
  logoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    letterSpacing: 0.3,
  },
  closeBtn: {
    padding: 6,
  },
  closeBtnText: {
    color: '#8ba3c4',
    fontSize: 18,
    fontWeight: '600',
  },

  navList: { flex: 1, gap: 4 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 12,
  },
  navItemActive: {
    backgroundColor: '#1e4a8c',
  },
  navIcon: { fontSize: 18, color: '#8ba3c4' },
  navIconActive: { color: '#ffffff' },
  navLabel: { fontSize: 14, color: '#8ba3c4', fontWeight: '500' },
  navLabelActive: { color: '#ffffff', fontWeight: '600' },

  sidebarFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#1e3a5f',
    marginTop: 20,
  },
  parentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentLabel: { color: '#8ba3c4', fontSize: 11 },
  parentName: { color: '#fff', fontSize: 13, fontWeight: '600' },

  // ── Content ──────────────────────────────────────────
  content: {
    flex: 1,
    backgroundColor: '#0d1b2e',
  },

  // ── Top bar (mobile) ──────────────────────────────────
  topBar: {
    height: 60,
    backgroundColor: '#111e33',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e3a5f',
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  menuBtn: {
    padding: 8,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4f8ef7',
  },

  // ── Page body ─────────────────────────────────────────
  pageBody: {
    flex: 1,
    padding: 28,
    gap: 12,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  activeChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e4a8c',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  activeChipText: { color: '#7ab8ff', fontSize: 12, fontWeight: '600' },
  pageHint: {
    color: '#8ba3c4',
    fontSize: 14,
    marginTop: 8,
  },

  // ── Mobile drawer ─────────────────────────────────────
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 230,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 16,
  },
});

