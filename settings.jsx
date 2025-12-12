import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bell,
  Shield,
  CreditCard,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { useState } from "react";
import { useLanguage } from "@/utils/language";

export default function SettingsPage() {
  const insets = useSafeAreaInsets();
  const { t, isRTL, language, changeLanguage } = useLanguage();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const settingsSections = [
    {
      titleKey: "notifications",
      items: [
        {
          id: "push",
          labelKey: "pushNotifications",
          type: "toggle",
          value: pushNotifications,
          onChange: setPushNotifications,
        },
        {
          id: "email",
          labelKey: "emailAlerts",
          type: "toggle",
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
        {
          id: "sms",
          labelKey: "smsAlerts",
          type: "toggle",
          value: smsNotifications,
          onChange: setSmsNotifications,
        },
      ],
    },
    {
      titleKey: "account",
      items: [
        {
          id: "security",
          labelKey: "securityPrivacy",
          icon: Shield,
          type: "link",
        },
        {
          id: "payment",
          labelKey: "paymentMethods",
          icon: CreditCard,
          type: "link",
        },
        {
          id: "language",
          labelKey: "language",
          icon: Globe,
          type: "language-toggle",
          value: language === "ar" ? "العربية" : "English",
        },
      ],
    },
    {
      titleKey: "support",
      items: [
        { id: "help", labelKey: "helpCenter", icon: HelpCircle, type: "link" },
        { id: "about", labelKey: "aboutMawakkil", icon: Bell, type: "link" },
      ],
    },
  ];

  const handleLanguageToggle = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    changeLanguage(newLanguage);
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
          {t("settings")}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#6B7280",
            marginTop: 4,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("managePreferences")}
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
        {/* Profile Card */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#059669",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "700", color: "#fff" }}>
                {isRTL ? "أح" : "AH"}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: isRTL ? 0 : 16,
                marginRight: isRTL ? 16 : 0,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: 2,
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {isRTL ? "أحمد حسن" : "Ahmed Hassan"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t("userId")}: 1234567890
              </Text>
            </View>
            <ChevronRight
              size={20}
              color="#9CA3AF"
              style={{ transform: isRTL ? [{ rotate: "180deg" }] : [] }}
            />
          </View>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View
            key={sectionIndex}
            style={{ marginHorizontal: 20, marginBottom: 24 }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 12,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t(section.titleKey)}
            </Text>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {item.type === "toggle" ? (
                    <View
                      style={{
                        flexDirection: isRTL ? "row-reverse" : "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                      }}
                    >
                      <Text style={{ fontSize: 16, color: "#111827" }}>
                        {t(item.labelKey)}
                      </Text>
                      <Switch
                        value={item.value}
                        onValueChange={item.onChange}
                        trackColor={{ false: "#D1D5DB", true: "#6EE7B7" }}
                        thumbColor={item.value ? "#059669" : "#F3F4F6"}
                      />
                    </View>
                  ) : item.type === "language-toggle" ? (
                    <TouchableOpacity
                      onPress={handleLanguageToggle}
                      style={{
                        flexDirection: isRTL ? "row-reverse" : "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: isRTL ? "row-reverse" : "row",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        {item.icon && <item.icon size={20} color="#6B7280" />}
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#111827",
                            marginLeft: isRTL ? 0 : item.icon ? 12 : 0,
                            marginRight: isRTL ? (item.icon ? 12 : 0) : 0,
                          }}
                        >
                          {t(item.labelKey)}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: isRTL ? "row-reverse" : "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#9CA3AF",
                            marginRight: isRTL ? 0 : 8,
                            marginLeft: isRTL ? 8 : 0,
                          }}
                        >
                          {item.value}
                        </Text>
                        <ChevronRight
                          size={20}
                          color="#9CA3AF"
                          style={{
                            transform: isRTL ? [{ rotate: "180deg" }] : [],
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        flexDirection: isRTL ? "row-reverse" : "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 16,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: isRTL ? "row-reverse" : "row",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        {item.icon && <item.icon size={20} color="#6B7280" />}
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#111827",
                            marginLeft: isRTL ? 0 : item.icon ? 12 : 0,
                            marginRight: isRTL ? (item.icon ? 12 : 0) : 0,
                          }}
                        >
                          {t(item.labelKey)}
                        </Text>
                      </View>
                      <ChevronRight
                        size={20}
                        color="#9CA3AF"
                        style={{
                          transform: isRTL ? [{ rotate: "180deg" }] : [],
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  {itemIndex < section.items.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#F3F4F6",
                        marginLeft: isRTL ? 0 : 16,
                        marginRight: isRTL ? 16 : 0,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#DC2626",
            }}
          >
            <LogOut size={20} color="#DC2626" />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#DC2626",
                marginLeft: isRTL ? 0 : 8,
                marginRight: isRTL ? 8 : 0,
              }}
            >
              {t("signOut")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <Text
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#9CA3AF",
            marginBottom: 12,
          }}
        >
          {t("version")}
        </Text>
      </ScrollView>
    </View>
  );
}
