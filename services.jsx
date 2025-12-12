import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  CreditCard,
  FileText,
  Car,
  Plane,
  Users,
  Building2,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
} from "lucide-react-native";
import { useState } from "react";
import { useLanguage } from "@/utils/language";

export default function ServicesPage() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();

  const [services, setServices] = useState([
    {
      id: 1,
      nameKey: "iqamaRenewal",
      icon: "card",
      enabled: true,
      expiryDate: "2025-12-15",
      autoRenew: true,
    },
    {
      id: 2,
      nameKey: "drivingLicense",
      icon: "car",
      enabled: true,
      expiryDate: "2026-01-20",
      autoRenew: true,
    },
    {
      id: 3,
      nameKey: "passportRenewal",
      icon: "plane",
      enabled: true,
      expiryDate: "2026-04-10",
      autoRenew: false,
    },
    {
      id: 4,
      nameKey: "vehicleRegistration",
      icon: "car",
      enabled: true,
      expiryDate: "2025-11-30",
      autoRenew: true,
    },
    {
      id: 5,
      nameKey: "exitReentryVisa",
      icon: "plane",
      enabled: false,
      expiryDate: null,
      autoRenew: false,
    },
    {
      id: 6,
      nameKey: "familyDependent",
      icon: "users",
      enabled: true,
      expiryDate: "2026-03-15",
      autoRenew: false,
    },
    {
      id: 7,
      nameKey: "businessLicense",
      icon: "building",
      enabled: false,
      expiryDate: null,
      autoRenew: false,
    },
  ]);

  const getIcon = (iconName) => {
    const iconProps = { size: 24, color: "#059669" };
    switch (iconName) {
      case "card":
        return <CreditCard {...iconProps} />;
      case "car":
        return <Car {...iconProps} />;
      case "plane":
        return <Plane {...iconProps} />;
      case "users":
        return <Users {...iconProps} />;
      case "building":
        return <Building2 {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const toggleAutoRenew = (id) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, autoRenew: !service.autoRenew }
          : service,
      ),
    );
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
          {t("myServices")}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#6B7280",
            marginTop: 4,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("manageServices")}
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
        {/* Active Services */}
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
            {t("activeServices")}
          </Text>
          {services
            .filter((s) => s.enabled)
            .map((service) => (
              <View
                key={service.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                }}
              >
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: "#D1FAE5",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getIcon(service.icon)}
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
                        marginBottom: 2,
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      {t(service.nameKey)}
                    </Text>
                    {service.expiryDate && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: "#6B7280",
                          textAlign: isRTL ? "right" : "left",
                        }}
                      >
                        {t("expires")}: {service.expiryDate}
                      </Text>
                    )}
                  </View>
                  <ChevronRight
                    size={20}
                    color="#9CA3AF"
                    style={{ transform: isRTL ? [{ rotate: "180deg" }] : [] }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: "#F3F4F6",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    {t("autoRenewal")}
                  </Text>
                  <TouchableOpacity onPress={() => toggleAutoRenew(service.id)}>
                    {service.autoRenew ? (
                      <ToggleRight size={32} color="#059669" />
                    ) : (
                      <ToggleLeft size={32} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>

        {/* Available Services */}
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
            {t("availableServices")}
          </Text>
          {services
            .filter((s) => !s.enabled)
            .map((service) => (
              <TouchableOpacity
                key={service.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  opacity: 0.7,
                }}
              >
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                      backgroundColor: "#F3F4F6",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getIcon(service.icon)}
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
                        marginBottom: 2,
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      {t(service.nameKey)}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      {t("tapToEnable")}
                    </Text>
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
      </ScrollView>
    </View>
  );
}
