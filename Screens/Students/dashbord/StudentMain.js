import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  StatusBar,
  ScrollView,
} from 'react-native';

const { width: SCREEN_W } = Dimensions.get('window');
const isTablet = SCREEN_W >= 768;
const SIDEBAR_W = 240;
const COLLAPSED_W = 0;

// ─── COLORS ──────────────────────────────────────────────────────────────────
const C = {
  bg:        '#0d1117',
  sidebar:   '#111827',
  surface:   '#161b27',
  surface2:  '#1c2233',
  border:    '#1f2a3c',
  accent:    '#2563eb',
  accentBg:  '#1e3a5f22',
  text:      '#e2e8f0',
  textSub:   '#8b9ab0',
  textMuted: '#4b5a72',
  green:     '#22c55e',
  overlay:   'rgba(0,0,0,0.55)',
};

// ─── NAV ITEMS ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'Dashboard',  icon: '⊞',  label: 'Dashboard' },
  { key: 'Timetable', icon: '📅',  label: 'Timetable' },
  { key: 'AIDoubts',  icon: '✦',   label: 'AI Doubts' },
  { key: 'Chat',      icon: '💬',  label: 'Chat' },
  { key: 'Profile',   icon: '👤',  label: 'Profile' },
];

// ─── ICON ────────────────────────────────────────────────────────────────────
const NavIcon = ({ icon, active }) => (
  <View style={[iconS.wrap, active && iconS.active]}>
    <Text style={iconS.text}>{icon}</Text>
  </View>
);
const iconS = StyleSheet.create({
  wrap:   { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: C.accent },
  text:   { fontSize: 17 },
});

// ─── STORAGE BAR ─────────────────────────────────────────────────────────────
const StorageBar = () => (
  <View style={stor.wrap}>
    <Text style={stor.label}>STORAGE</Text>
    <View style={stor.track}>
      <View style={stor.fill} />
    </View>
    <Text style={stor.sub}>6.5 GB of 10 GB used</Text>
  </View>
);
const stor = StyleSheet.create({
  wrap:  { backgroundColor: C.surface2, borderRadius: 10, padding: 14, marginHorizontal: 12, marginBottom: 12 },
  label: { color: C.textMuted, fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  track: { height: 5, backgroundColor: C.border, borderRadius: 3, overflow: 'hidden', marginBottom: 6 },
  fill:  { width: '65%', height: 5, backgroundColor: C.accent, borderRadius: 3 },
  sub:   { color: C.textSub, fontSize: 11 },
});

// ─── SIDEBAR CONTENT ─────────────────────────────────────────────────────────
const SidebarContent = ({ activeItem, onSelect }) => (
  <View style={sc.container}>
    {/* Logo */}
    <View style={sc.logoRow}>
      <View style={sc.logoIcon}>
        <Text style={sc.logoIconText}>⊕</Text>
      </View>
      <Text style={sc.logoText}>Campus<Text style={sc.logoAccent}>360</Text></Text>
    </View>

    <View style={sc.divider} />

    {/* Nav Items */}
    <ScrollView style={sc.nav} showsVerticalScrollIndicator={false}>
      {NAV_ITEMS.map((item) => {
        const active = activeItem === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[sc.navItem, active && sc.navItemActive]}
            onPress={() => onSelect(item.key)}
            activeOpacity={0.75}
          >
            <NavIcon icon={item.icon} active={active} />
            <Text style={[sc.navLabel, active && sc.navLabelActive]}>
              {item.label}
            </Text>
            {active && <View style={sc.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>

    {/* Storage */}
    <StorageBar />
  </View>
);

const sc = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.sidebar },

  logoRow:       { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20 },
  logoIcon:      { width: 38, height: 38, borderRadius: 10, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  logoIconText:  { color: '#fff', fontSize: 20, fontWeight: '900' },
  logoText:      { color: C.text, fontSize: 20, fontWeight: '800', letterSpacing: 0.2 },
  logoAccent:    { color: C.accent },

  divider: { height: 1, backgroundColor: C.border, marginHorizontal: 16, marginBottom: 10 },

  nav:           { flex: 1, paddingHorizontal: 10, paddingTop: 4 },
  navItem:       { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 12, marginBottom: 4 },
  navItemActive: { backgroundColor: '#1e3a5f33' },
  navLabel:      { color: C.textSub, fontSize: 15, fontWeight: '600', flex: 1 },
  navLabelActive:{ color: C.text },
  activeDot:     { width: 6, height: 6, borderRadius: 3, backgroundColor: C.accent },
});

// ─── MOBILE HAMBURGER TOPBAR ──────────────────────────────────────────────────
const TopBar = ({ onMenuPress }) => (
  <View style={tb.wrap}>
    <TouchableOpacity style={tb.menuBtn} onPress={onMenuPress} activeOpacity={0.7}>
      <View style={tb.line} />
      <View style={[tb.line, { width: 18 }]} />
      <View style={tb.line} />
    </TouchableOpacity>
    <View style={tb.logoRow}>
      <View style={tb.logoIcon}>
        <Text style={tb.logoIconText}>⊕</Text>
      </View>
      <Text style={tb.logoText}>Campus<Text style={tb.logoAccent}>360</Text></Text>
    </View>
    <View style={{ width: 40 }} />
  </View>
);
const tb = StyleSheet.create({
  wrap:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.sidebar, borderBottomWidth: 1, borderBottomColor: C.border },
  menuBtn:     { width: 40, height: 40, justifyContent: 'center', gap: 5, paddingHorizontal: 8 },
  line:        { height: 2, width: 22, backgroundColor: C.text, borderRadius: 2 },
  logoRow:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon:    { width: 30, height: 30, borderRadius: 8, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
  logoIconText:{ color: '#fff', fontSize: 16, fontWeight: '900' },
  logoText:    { color: C.text, fontSize: 17, fontWeight: '800' },
  logoAccent:  { color: C.accent },
});

// ─── DUMMY CONTENT (shows behind sidebar) ────────────────────────────────────
const DummyContent = ({ activeItem }) => (
  <View style={dc.wrap}>
    <Text style={dc.label}>📄  {activeItem}</Text>
    <Text style={dc.sub}>Main content area renders here</Text>
  </View>
);
const dc = StyleSheet.create({
  wrap:  { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.bg },
  label: { color: C.text, fontSize: 22, fontWeight: '800', marginBottom: 8 },
  sub:   { color: C.textSub, fontSize: 14 },
});

// ─── MAIN LAYOUT ─────────────────────────────────────────────────────────────
export default function SidebarLayout() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_W)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  const openSidebar = () => {
    setMobileOpen(true);
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 80, friction: 12 }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: -SIDEBAR_W, useNativeDriver: true, tension: 80, friction: 12 }),
      Animated.timing(fadeAnim,  { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start(() => setMobileOpen(false));
  };

  const handleSelect = (key) => {
    setActiveItem(key);
    if (!isTablet) closeSidebar();
  };

  // ── TABLET/LAPTOP: persistent sidebar ──
  if (isTablet) {
    return (
      <SafeAreaView style={layout.safe}>
        <StatusBar barStyle="light-content" backgroundColor={C.sidebar} />
        <View style={layout.row}>
          {/* Sidebar */}
          <View style={layout.sidebarTablet}>
            <SidebarContent activeItem={activeItem} onSelect={handleSelect} />
          </View>
          {/* Content */}
          <View style={layout.content}>
            <DummyContent activeItem={activeItem} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ── MOBILE: drawer overlay ──
  return (
    <SafeAreaView style={layout.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.sidebar} />

      {/* Top bar with hamburger */}
      <TopBar onMenuPress={openSidebar} />

      {/* Page content */}
      <View style={{ flex: 1 }}>
        <DummyContent activeItem={activeItem} />
      </View>

      {/* Overlay + Drawer */}
      {mobileOpen && (
        <>
          {/* Dimmed backdrop — tap to close */}
          <Animated.View
            style={[layout.overlay, { opacity: fadeAnim }]}
            pointerEvents="auto"
          >
            <TouchableOpacity
              style={StyleSheet.absoluteFill}
              onPress={closeSidebar}
              activeOpacity={1}
            />
          </Animated.View>

          {/* Drawer sliding in from left */}
          <Animated.View
            style={[layout.drawer, { transform: [{ translateX: slideAnim }] }]}
          >
            <SafeAreaView style={{ flex: 1 }}>
              {/* Close button inside drawer */}
              <TouchableOpacity style={layout.closeBtn} onPress={closeSidebar} activeOpacity={0.7}>
                <Text style={layout.closeBtnText}>✕</Text>
              </TouchableOpacity>
              <SidebarContent activeItem={activeItem} onSelect={handleSelect} />
            </SafeAreaView>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}

// ─── LAYOUT STYLES ───────────────────────────────────────────────────────────
const layout = StyleSheet.create({
  safe:          { flex: 1, backgroundColor: C.bg },
  row:           { flex: 1, flexDirection: 'row' },

  // Tablet persistent sidebar
  sidebarTablet: {
    width: SIDEBAR_W,
    borderRightWidth: 1,
    borderRightColor: C.border,
  },
  content: { flex: 1 },

  // Mobile overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.overlay,
    zIndex: 10,
  },

  // Mobile drawer
  drawer: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0,
    width: SIDEBAR_W,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 20,
  },

  // Close X button inside mobile drawer
  closeBtn: {
    position: 'absolute',
    top: 14, right: 14,
    zIndex: 30,
    width: 32, height: 32,
    borderRadius: 8,
    backgroundColor: C.surface2,
    alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { color: C.textSub, fontSize: 14, fontWeight: '700' },
});