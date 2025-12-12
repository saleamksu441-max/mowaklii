import { Tabs } from "expo-router";
import { Home, Bell, FileText, Settings, Bot } from "lucide-react-native";
import { useLanguage } from "@/utils/language";

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
          paddingTop: 4,
        },
        tabBarActiveTintColor: "#059669",
        tabBarInactiveTintColor: "#6B7280",
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t("services"),
          tabBarIcon: ({ color }) => <FileText color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="ai-agent"
        options={{
          title: t("aiAgent"),
          tabBarIcon: ({ color }) => <Bot color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: t("alerts"),
          tabBarIcon: ({ color }) => <Bell color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="delegation-setup"
        options={{
          href: null, // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="delegation-intro"
        options={{
          href: null, // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="delegation-dashboard"
        options={{
          href: null, // Hide this tab from the tab bar
        }}
      />
    </Tabs>
  );
}
