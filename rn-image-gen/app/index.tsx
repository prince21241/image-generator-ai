import React, { useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const placeholderImage = require("../assets/images/react-logo.png");

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [selectedRatio, setSelectedRatio] = useState("1:1");
  const { width, height } = useWindowDimensions();
  const horizontalPadding = 16 * 2; // container padding
  const maxPreview = 320; // hard cap so it's not huge on tablets
  const previewSize = Math.min(width - horizontalPadding, height * 0.35, maxPreview);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.headerTopRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>BETA</Text>
              </View>
            </View>
            <Text style={styles.title}>Image AI Generator</Text>
            <Text style={styles.subtitle}>Turn your ideas into visuals in seconds.</Text>
          </View>

          <View style={styles.previewWrapper}>
            <View style={[
                styles.previewContainer,
                { width: previewSize, height: previewSize, alignSelf: "center" },
              ]}
            >
              <Image
                source={placeholderImage}
                style={styles.previewImage}
                contentFit="cover"
                transition={100}
              />
            </View>
          </View>

          <View style={styles.chipsRow}>
            {(["1:1", "4:5", "16:9"]).map((ratio) => (
              <Pressable
                key={ratio}
                onPress={() => setSelectedRatio(ratio)}
                style={[styles.chip, selectedRatio === ratio && styles.chipSelected]}
                accessibilityRole="button"
                accessibilityLabel={`Select aspect ratio ${ratio}`}
              >
                <Text style={[styles.chipText, selectedRatio === ratio && styles.chipTextSelected]}>
                  {ratio}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Describe your image</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="sparkles-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="A serene sunset over mountains in watercolor style"
                placeholderTextColor="#9CA3AF"
                multiline
                value={prompt}
                onChangeText={setPrompt}
                returnKeyType="done"
                blurOnSubmit
              />
            </View>

            <Pressable style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => { /* no-op for now */ }}
              accessibilityRole="button"
              accessibilityLabel="Generate image from prompt"
            >
              <Ionicons name="flash" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.buttonText}>Generate</Text>
            </Pressable>
            <Text style={styles.helper}>No credits required in development.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0F17",
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 20,
  },
  header: {
    gap: 8,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#0F172A",
    borderColor: "#1F2937",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: "#93C5FD",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  title: {
    color: "#F9FAFB",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  subtitle: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  previewWrapper: {
    width: "100%",
  },
  previewContainer: {
    backgroundColor: "#111827",
    borderColor: "#1F2937",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#0F172A",
    borderColor: "#1F2937",
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: "#111827",
    borderColor: "#2563EB",
  },
  chipText: {
    color: "#9CA3AF",
    fontWeight: "600",
    fontSize: 12,
  },
  chipTextSelected: {
    color: "#BFDBFE",
  },
  form: {
    gap: 12,
  },
  label: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "600",
  },
  inputWrapper: {
    position: "relative",
    backgroundColor: "#0F172A",
    borderColor: "#1F2937",
    borderWidth: 1,
    borderRadius: 12,
  },
  input: {
    paddingLeft: 38,
    paddingRight: 14,
    paddingVertical: 12,
    color: "#F9FAFB",
    minHeight: 56,
  },
  inputIcon: {
    position: "absolute",
    top: 14,
    left: 12,
  },
  button: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    shadowColor: "#1D4ED8",
    shadowOpacity: 0.3,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: "#1D4ED8",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  helper: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  },
});
