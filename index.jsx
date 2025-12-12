import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  Shield,
} from "lucide-react-native";
import { useLanguage } from "@/utils/language";

export default function HomePage() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();

  const upcomingServices = [
    {
      id: 1,
      nameKey: "iqamaRenewal",
      daysLeft: 15,
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      nameKey: "drivingLicense",
      daysLeft: 45,
      status: "monitored",
      priority: "medium",
    },
    {
      id: 3,
      nameKey: "passportRenewal",
      daysLeft: 120,
      status: "monitored",
      priority: "low",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      serviceKey: "vehicleRegistration",
      status: "completed",
      timeKey: "daysAgo",
      timeValue: "2",
    },
    {
      id: 2,
      serviceKey: "exitReentryVisa",
      status: "completed",
      timeKey: "weekAgo",
      timeValue: "1",
    },
  ];

  const getStatusColor = (priority) => {
    switch (priority) {
      case "high":
        return "#DC2626";
      case "medium":
        return "#F59E0B";
      case "low":
        return "#059669";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={20} color="#059669" />;
      case "pending":
        return <AlertCircle size={20} color="#F59E0B" />;
      default:
        return <Clock size={20} color="#6B7280" />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#059669",
          paddingTop: insets.top + 20,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#fff",
            marginBottom: 4,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("appName")}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#D1FAE5",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("appSubtitle")}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <View
          style={{ marginHorizontal: 20, marginTop: -20, marginBottom: 20 }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Shield size={24} color="#059669" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginLeft: isRTL ? 0 : 8,
                  marginRight: isRTL ? 8 : 0,
                  color: "#111827",
                }}
              >
                {t("activeMonitoring")}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 32, fontWeight: "700", color: "#059669" }}
                >
                  8
                </Text>
                <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
                  {t("services")}
                </Text>
              </View>
              <View style={{ width: 1, backgroundColor: "#E5E7EB" }} />
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 32, fontWeight: "700", color: "#F59E0B" }}
                >
                  3
                </Text>
                <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
                  {t("upcomingServices")}
                </Text>
              </View>
              <View style={{ width: 1, backgroundColor: "#E5E7EB" }} />
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 32, fontWeight: "700", color: "#DC2626" }}
                >
                  1
                </Text>
                <Text style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
                  عاجل
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Services */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("upcomingServices")}
          </Text>
          {upcomingServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderLeftWidth: isRTL ? 0 : 4,
                borderRightWidth: isRTL ? 4 : 0,
                borderLeftColor: isRTL
                  ? "transparent"
                  : getStatusColor(service.priority),
                borderRightColor: isRTL
                  ? getStatusColor(service.priority)
                  : "transparent",
              }}
            >
              <View
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: 4,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t(service.nameKey)}
                  </Text>
                  <View
                    style={{
                      flexDirection: isRTL ? "row-reverse" : "row",
                      alignItems: "center",
                      justifyContent: isRTL ? "flex-end" : "flex-start",
                    }}
                  >
                    <Clock size={14} color="#6B7280" />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#6B7280",
                        marginLeft: isRTL ? 0 : 4,
                        marginRight: isRTL ? 4 : 0,
                      }}
                    >
                      {service.daysLeft} {t("daysRemaining")}
                    </Text>
                  </View>
                </View>
                <ChevronRight
                  size={20}
                  color="#9CA3AF"
                  style={{ transform: isRTL ? [{ rotate: "180deg" }] : [] }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 12,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("recentActivity")}
          </Text>
          {recentActivity.map((activity) => (
            <View
              key={activity.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              {getStatusIcon(activity.status)}
              <View
                style={{
                  flex: 1,
                  marginLeft: isRTL ? 0 : 12,
                  marginRight: isRTL ? 12 : 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    color: "#111827",
                    marginBottom: 2,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(activity.serviceKey)}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: "#6B7280",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {activity.timeValue} {t(activity.timeKey)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
