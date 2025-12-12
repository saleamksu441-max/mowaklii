import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AlertCircle, CheckCircle, Info, Clock } from "lucide-react-native";
import { useLanguage } from "@/utils/language";

export default function NotificationsPage() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();

  const notifications = [
    {
      id: 1,
      type: "urgent",
      titleKey: "iqamaRenewalDue",
      messageKey: "iqamaRenewalMessage",
      timeKey: "hoursAgo",
      timeValue: "2",
      read: false,
    },
    {
      id: 2,
      type: "success",
      titleKey: "vehicleRegistrationCompleted",
      messageKey: "vehicleRegistrationMessage",
      timeKey: "daysAgo",
      timeValue: "2",
      read: false,
    },
    {
      id: 3,
      type: "info",
      titleKey: "drivingLicenseCheck",
      messageKey: "drivingLicenseMessage",
      timeKey: "weekAgo",
      timeValue: "1",
      read: true,
    },
    {
      id: 4,
      type: "warning",
      titleKey: "paymentRequired",
      messageKey: "paymentRequiredMessage",
      timeKey: "weekAgo",
      timeValue: "1",
      read: true,
    },
    {
      id: 5,
      type: "success",
      titleKey: "exitReentryVisaApproved",
      messageKey: "exitReentryVisaMessage",
      timeKey: "weeksAgo",
      timeValue: "2",
      read: true,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "urgent":
        return <AlertCircle size={24} color="#DC2626" />;
      case "success":
        return <CheckCircle size={24} color="#059669" />;
      case "warning":
        return <Clock size={24} color="#F59E0B" />;
      default:
        return <Info size={24} color="#3B82F6" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "urgent":
        return "#FEE2E2";
      case "success":
        return "#D1FAE5";
      case "warning":
        return "#FEF3C7";
      default:
        return "#DBEAFE";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: insets.top + 20,
          paddingBottom: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#111827",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("notifications")}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#6B7280",
            marginTop: 4,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("stayUpdated")}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Unread Notifications */}
        {notifications.filter((n) => !n.read).length > 0 && (
          <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 12,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("new")}
            </Text>
            {notifications
              .filter((n) => !n.read)
              .map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    borderLeftWidth: isRTL ? 0 : 4,
                    borderRightWidth: isRTL ? 4 : 0,
                    borderLeftColor: isRTL
                      ? "transparent"
                      : notification.type === "urgent"
                        ? "#DC2626"
                        : "#059669",
                    borderRightColor: isRTL
                      ? notification.type === "urgent"
                        ? "#DC2626"
                        : "#059669"
                      : "transparent",
                  }}
                >
                  <View
                    style={{
                      flexDirection: isRTL ? "row-reverse" : "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: getNotificationColor(
                          notification.type,
                        ),
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: isRTL ? 0 : 12,
                        marginRight: isRTL ? 12 : 0,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#111827",
                          marginBottom: 4,
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {t(notification.titleKey)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#4B5563",
                          marginBottom: 6,
                          lineHeight: 20,
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {t(notification.messageKey)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#9CA3AF",
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {notification.timeValue} {t(notification.timeKey)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* Read Notifications */}
        {notifications.filter((n) => n.read).length > 0 && (
          <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 12,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("earlier")}
            </Text>
            {notifications
              .filter((n) => n.read)
              .map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    opacity: 0.7,
                  }}
                >
                  <View
                    style={{
                      flexDirection: isRTL ? "row-reverse" : "row",
                      alignItems: "flex-start",
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: getNotificationColor(
                          notification.type,
                        ),
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: isRTL ? 0 : 12,
                        marginRight: isRTL ? 12 : 0,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#111827",
                          marginBottom: 4,
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {t(notification.titleKey)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#4B5563",
                          marginBottom: 6,
                          lineHeight: 20,
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {t(notification.messageKey)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#9CA3AF",
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {notification.timeValue} {t(notification.timeKey)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
