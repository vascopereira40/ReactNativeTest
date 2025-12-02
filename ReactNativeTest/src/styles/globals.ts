import { StyleSheet } from "react-native";

export const Colors = {
  background: "#ffffff",
  surface: "#f3f3f3",
  textPrimary: "#222",
  textSecondary: "#555",
  textMuted: "#777",
  border: "#e0e0e0",
  primary: "#000000",
  skeleton: "#e2e2e2",
  warningBackground: "#fff3cd",
  warningText: "#856404",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const Typography = {
  title: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.textPrimary,
  },
  body: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  small: {
    fontSize: 12,
    color: Colors.textMuted,
  },
};

export const GlobalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.xl,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.sm,
  },
  highlightContainer: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  highlightGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  highlightItem: {
    width: "48%", // forces 2 items per row (2 cols)
    marginBottom: Spacing.sm,
  },
  highlightCard: {
    flex: 1,
    margin: Spacing.xs,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.surface,
    elevation: 2,
  },
  cacheBanner: {
    backgroundColor: Colors.warningBackground,
    padding: Spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  cacheText: {
    color: Colors.warningText,
    fontSize: Typography.small.fontSize,
  },
  errorTitle: {
    ...Typography.subtitle,
    marginBottom: 8,
  },
  errorText: {
    ...Typography.body,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: Spacing.sm,
    backgroundColor: Colors.primary,
  },
  retryText: {
    color: "white",
    fontWeight: "600",
  },
  input: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingRight: Spacing.xl,
    backgroundColor: Colors.surface,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryRow: {
    paddingHorizontal: Spacing.xs,
    paddingRight: Spacing.lg,
    paddingVertical: Spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    marginBottom: Spacing.sm,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  brandsRow: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 30,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  listContent: {
    paddingBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    fontSize: 13,
    color: "#444",
    marginBottom: 2,
  },
});
