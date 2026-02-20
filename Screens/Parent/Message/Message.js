import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const MESSAGES = [
  {
    id: '1',
    sender: 'Sarah Miller',
    time: '10:42 AM',
    text: "Does anyone know the date for the graduation ceremony? I want to make sure I book the flights for my parents early.",
    isMe: false,
    avatar: 'https://i.pravatar.cc/40?img=47',
  },
  {
    id: '2',
    sender: 'John Doe',
    time: '10:45 AM',
    text: "I think it's June 15th, but let me double check the school calendar. There was some talk about moving it to the 16th due to the venue conflict.",
    isMe: false,
    avatar: 'https://i.pravatar.cc/40?img=12',
  },
  {
    id: '3',
    sender: 'Me',
    time: '10:48 AM',
    text: 'Confirmed! It is June 15th at 10:00 AM in the main auditorium. Just got the email from the principal\'s office. 🎓',
    isMe: true,
    avatar: 'https://i.pravatar.cc/40?img=33',
  },
  {
    id: '4',
    sender: 'Emily Chen',
    time: '10:50 AM',
    text: "Thanks for the info! Is anyone organizing a carpool for the rehearsals next week? I'm available to drive on Tuesday and Thursday.",
    isMe: false,
    avatar: 'https://i.pravatar.cc/40?img=25',
  },
];

const Avatar = ({ uri, size = 40 }) => (
  <View style={[styles.avatarContainer, { width: size, height: size, borderRadius: size / 2 }]}>
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      defaultSource={{ uri: 'https://i.pravatar.cc/40?img=1' }}
    />
  </View>
);

const MessageBubble = ({ message }) => {
  const { sender, time, text, isMe, avatar } = message;
  const maxBubbleWidth = isTablet ? 520 : width * 0.72;

  if (isMe) {
    return (
      <View style={styles.myMessageRow}>
        <View style={styles.myMeta}>
          <Text style={styles.myTime}>{time}</Text>
          <Text style={styles.myName}>Me</Text>
        </View>
        <View style={[styles.myBubble, { maxWidth: maxBubbleWidth }]}>
          <Text style={styles.myBubbleText}>{text}</Text>
        </View>
        <Avatar uri={avatar} size={isTablet ? 44 : 38} />
      </View>
    );
  }

  return (
    <View style={styles.theirMessageRow}>
      <Avatar uri={avatar} size={isTablet ? 44 : 38} />
      <View style={styles.theirContent}>
        <View style={styles.theirHeader}>
          <Text style={styles.senderName}>{sender}</Text>
          <Text style={styles.messageTime}>{time}</Text>
        </View>
        <View style={[styles.theirBubble, { maxWidth: maxBubbleWidth }]}>
          <Text style={styles.theirBubbleText}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const TypingIndicator = () => (
  <View style={styles.typingRow}>
    <View style={styles.typingDots}>
      <View style={[styles.dot, styles.dot1]} />
      <View style={[styles.dot, styles.dot2]} />
      <View style={[styles.dot, styles.dot3]} />
    </View>

  </View>
);

export default function Message() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(MESSAGES);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: 'Me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputText.trim(),
      isMe: true,
      avatar: 'https://i.pravatar.cc/40?img=33',
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f1117" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.groupIconContainer}>
            <Text style={styles.groupIconText}>👨‍👩‍👧</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Class of 2027 Parents</Text>
            <View style={styles.headerSubRow}>
              
            </View>
          </View>
        </View>
        <View style={styles.headerActions}>
           
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Text style={styles.headerBtnText}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Message List */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          ListHeaderComponent={
            <View style={styles.dateBadgeContainer}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeText}>TODAY</Text>
              </View>
            </View>
          }
          ListFooterComponent={<TypingIndicator />}
          renderItem={({ item }) => <MessageBubble message={item} />}
          showsVerticalScrollIndicator={false}
        />

        {/* Footer: E2E encrypted */}
        <Text style={styles.encryptedLabel}>END-TO-END ENCRYPTED</Text>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.inputAction} activeOpacity={0.7}>
            <Text style={styles.inputActionText}>＋</Text>
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Message Class of 2027 Parents..."
            placeholderTextColor="#555870"
            value={inputText}
            onChangeText={setInputText}
            multiline
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.sendBtn, inputText.trim() ? styles.sendBtnActive : {}]}
            activeOpacity={0.8}
            onPress={sendMessage}
          >
            <Text style={styles.sendBtnIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const colors = {
  bg: '#0f1117',
  surface: '#181b23',
  border: '#23263a',
  accent: '#2563eb',
  accentLight: '#3b82f6',
  myBubble: '#2563eb',
  theirBubble: '#1e2130',
  textPrimary: '#e8eaf6',
  textSecondary: '#8b90a8',
  textMuted: '#555870',
  onlineGreen: '#22c55e',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isTablet ? 24 : 16,
    paddingVertical: isTablet ? 14 : 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  groupIconContainer: {
    width: isTablet ? 48 : 42,
    height: isTablet ? 48 : 42,
    borderRadius: isTablet ? 24 : 21,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupIconText: {
    fontSize: isTablet ? 22 : 18,
  },
  headerInfo: { flex: 1 },
  headerTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: isTablet ? 18 : 16,
    letterSpacing: 0.1,
  },
  headerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 5,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.onlineGreen,
  },
  headerSub: {
    color: colors.textSecondary,
    fontSize: isTablet ? 13 : 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 4,
  },
  headerBtn: {
    padding: 8,
    borderRadius: 8,
  },
  headerBtnText: {
    fontSize: isTablet ? 20 : 18,
    color: colors.textSecondary,
  },

  // Messages
  messageList: {
    paddingHorizontal: isTablet ? 48 : 12,
    paddingTop: 16,
    paddingBottom: 4,
  },
  dateBadgeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dateBadge: {
    backgroundColor: '#23263a',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
  },
  dateBadgeText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },

  // Their message
  theirMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 10,
  },
  avatarContainer: {
    overflow: 'hidden',
    backgroundColor: '#23263a',
  },
  theirContent: { flex: 1 },
  theirHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 6,
  },
  senderName: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: isTablet ? 14 : 13,
  },
  messageTime: {
    color: colors.textMuted,
    fontSize: 11,
  },
  theirBubble: {
    backgroundColor: colors.theirBubble,
    borderRadius: 14,
    borderTopLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  theirBubbleText: {
    color: colors.textPrimary,
    fontSize: isTablet ? 15 : 14,
    lineHeight: isTablet ? 22 : 20,
  },

  // My message
  myMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
    gap: 10,
  },
  myMeta: {
    alignItems: 'flex-end',
    gap: 2,
    marginBottom: 2,
  },
  myTime: {
    color: colors.textMuted,
    fontSize: 11,
  },
  myName: {
    color: colors.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },
  myBubble: {
    backgroundColor: colors.myBubble,
    borderRadius: 14,
    borderBottomRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  myBubbleText: {
    color: '#ffffff',
    fontSize: isTablet ? 15 : 14,
    lineHeight: isTablet ? 22 : 20,
  },

  // Typing indicator
  typingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 48 : 12,
    marginTop: 4,
    marginBottom: 8,
    gap: 8,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.textMuted,
    opacity: 0.8,
  },
  dot1: { opacity: 1 },
  dot2: { opacity: 0.65 },
  dot3: { opacity: 0.4 },
  typingText: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
  },

  // Encrypted label
  encryptedLabel: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 10,
    letterSpacing: 1,
    paddingVertical: 6,
  },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: isTablet ? 24 : 12,
    paddingVertical: 10,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 6,
  },
  inputAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  inputActionText: {
    fontSize: 22,
    color: colors.textSecondary,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: isTablet ? 15 : 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  sendBtnActive: {
    backgroundColor: colors.accent,
  },
  sendBtnIcon: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 2,
  },
});