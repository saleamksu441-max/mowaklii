import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  Bot,
  CreditCard,
  RefreshCw,
  FileText,
  Shield,
  Bell,
  Activity,
  Settings,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  Plus,
  ChevronRight,
  Zap,
  Eye,
  BarChart3,
} from "lucide-react-native";
import { useState, useEffect } from "react";
import { useLanguage } from "@/utils/language";

export default function AIAgentPage() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();

  const [agentStatus, setAgentStatus] = useState("inactive");
  const [loading, setLoading] = useState(true);
  const [recentActions, setRecentActions] = useState([]);
  const [delegations, setDelegations] = useState([]);
  const [settings, setSettings] = useState({
    autoPayment: false,
    autoRenewal: false,
    documentTracking: true,
    absherIntegration: true,
    smartNotifications: true,
    priorityHandling: true,
    payImmediately: false,
    notifyBeforeAction: true,
    workingHours: true,
    weekendsEnabled: false,
  });

  const [paymentLimits, setPaymentLimits] = useState({
    dailyLimit: "1000",
    monthlyLimit: "5000",
    requireApproval: "500",
  });

  useEffect(() => {
    loadAgentData();
    fetchDelegations();
  }, []);

  const loadAgentData = async () => {
    try {
      setLoading(true);

      // Fetch agent status and settings
      const statusResponse = await fetch("/api/ai-agent/status");
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        setAgentStatus(statusData.status);
        if (statusData.settings) {
          setSettings({ ...settings, ...statusData.settings });
        }
        if (statusData.payment_limits) {
          setPaymentLimits({ ...paymentLimits, ...statusData.payment_limits });
        }
      }

      // Fetch recent actions
      const actionsResponse = await fetch("/api/ai-agent/actions?limit=8");
      if (actionsResponse.ok) {
        const actionsData = await actionsResponse.json();
        const formattedActions = actionsData.actions.map((action) => ({
          id: action.id,
          action: `action${action.action_type.charAt(0).toUpperCase() + action.action_type.slice(1)}`,
          service: action.service_type.replace("_", ""),
          amount: action.amount?.toString(),
          status: action.status,
          time: Math.floor(
            (new Date() - new Date(action.created_at)) / (1000 * 60 * 60),
          ).toString(),
        }));
        setRecentActions(formattedActions);
      }
    } catch (error) {
      console.error("Error loading agent data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDelegations = async () => {
    try {
      const response = await fetch("/api/delegations");
      if (response.ok) {
        const data = await response.json();
        setDelegations(data.delegations || []);
      }
    } catch (error) {
      console.error("Error fetching delegations:", error);
    }
  };

  const handleDelegationAction = async (delegationId, action) => {
    try {
      const response = await fetch("/api/delegations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delegationId, action }),
      });

      if (response.ok) {
        fetchDelegations(); // Refresh the list
        Alert.alert("نجح", "تم تنفيذ العملية بنجاح");
      }
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء تنفيذ العملية");
    }
  };

  const updateAgentStatus = async (newStatus, newSettings = null) => {
    try {
      const response = await fetch("/api/ai-agent/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          settings: newSettings || settings,
        }),
      });

      if (response.ok) {
        setAgentStatus(newStatus);
        if (newSettings) {
          setSettings(newSettings);
        }
      }
    } catch (error) {
      console.error("Error updating agent status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#059669";
      case "paused":
        return "#F59E0B";
      case "revoked":
        return "#DC2626";
      case "inactive":
        return "#DC2626";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle size={16} color="#059669" />;
      case "paused":
        return <Clock size={16} color="#F59E0B" />;
      case "revoked":
        return <AlertCircle size={16} color="#DC2626" />;
      case "completed":
        return <CheckCircle size={16} color="#059669" />;
      case "processing":
        return <Clock size={16} color="#F59E0B" />;
      case "failed":
        return <AlertCircle size={16} color="#DC2626" />;
      default:
        return <Clock size={16} color="#6B7280" />;
    }
  };

  const getAutomationLevelInfo = (level) => {
    switch (level) {
      case "full_automation":
        return {
          icon: <Zap size={16} color="#059669" />,
          color: "#059669",
          text: t("fullAutomation"),
        };
      case "requires_approval":
        return {
          icon: <Shield size={16} color="#F59E0B" />,
          color: "#F59E0B",
          text: t("requiresApproval"),
        };
      case "monitoring_only":
        return {
          icon: <Eye size={16} color="#6B7280" />,
          color: "#6B7280",
          text: t("monitoringOnly"),
        };
      default:
        return {
          icon: <Eye size={16} color="#6B7280" />,
          color: "#6B7280",
          text: "غير محدد",
        };
    }
  };

  const capabilities = [
    { key: "autoPayment", icon: "payment" },
    { key: "autoRenewal", icon: "refresh" },
    { key: "documentTracking", icon: "document" },
    { key: "absherIntegration", icon: "shield" },
    { key: "smartNotifications", icon: "bell" },
    { key: "priorityHandling", icon: "activity" },
  ];

  const getCapabilityIcon = (iconName) => {
    const iconProps = { size: 20, color: "#059669" };
    switch (iconName) {
      case "payment":
        return <DollarSign {...iconProps} />;
      case "refresh":
        return <RefreshCw {...iconProps} />;
      case "document":
        return <FileText {...iconProps} />;
      case "shield":
        return <Shield {...iconProps} />;
      case "bell":
        return <Bell {...iconProps} />;
      case "activity":
        return <Activity {...iconProps} />;
      default:
        return <Bot {...iconProps} />;
    }
  };

  const toggleAgentStatus = () => {
    let newStatus;
    if (agentStatus === "active") {
      newStatus = "paused";
    } else if (agentStatus === "paused") {
      newStatus = "active";
    } else {
      newStatus = "active";
    }
    updateAgentStatus(newStatus);
  };

  const toggleSetting = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    updateAgentStatus(agentStatus, newSettings);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F9FAFB",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#059669" />
        <Text style={{ marginTop: 16, fontSize: 16, color: "#6B7280" }}>
          {t("loading")}...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#1F2937",
          paddingTop: insets.top + 20,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Bot size={28} color="#fff" />
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#fff",
              marginLeft: isRTL ? 0 : 12,
              marginRight: isRTL ? 12 : 0,
            }}
          >
            {t("aiAgentTitle")}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: "#D1D5DB",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("aiAgentSubtitle")}
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Agent Status Card */}
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
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#111827",
                }}
              >
                {t("agentStatus")}
              </Text>
              <View
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: getStatusColor(agentStatus),
                    marginRight: isRTL ? 0 : 8,
                    marginLeft: isRTL ? 8 : 0,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: getStatusColor(agentStatus),
                    fontWeight: "600",
                  }}
                >
                  {t(
                    `agent${agentStatus.charAt(0).toUpperCase() + agentStatus.slice(1)}`,
                  )}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={toggleAgentStatus}
              style={{
                backgroundColor:
                  agentStatus === "active" ? "#FEF3C7" : "#D1FAE5",
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {agentStatus === "active" ? (
                <Pause size={20} color="#F59E0B" />
              ) : (
                <Play size={20} color="#059669" />
              )}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: agentStatus === "active" ? "#F59E0B" : "#059669",
                  marginLeft: isRTL ? 0 : 8,
                  marginRight: isRTL ? 8 : 0,
                }}
              >
                {agentStatus === "active" ? t("pauseAgent") : t("resumeAgent")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delegation Setup Button */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/delegation-intro")}
            style={{
              backgroundColor: "#059669",
              borderRadius: 12,
              padding: 16,
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <Plus size={20} color="#fff" />
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
                marginLeft: isRTL ? 0 : 8,
                marginRight: isRTL ? 8 : 0,
              }}
            >
              بدء إعداد وكالة جديدة
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/delegation-dashboard")}
            style={{
              backgroundColor: "#3B82F6",
              borderRadius: 12,
              padding: 16,
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart3 size={20} color="#fff" />
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
                marginLeft: isRTL ? 0 : 8,
                marginRight: isRTL ? 8 : 0,
              }}
            >
              لوحة التحكم والإحصائيات
            </Text>
          </TouchableOpacity>
        </View>

        {/* Active Delegations */}
        {delegations.length > 0 && (
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
              الوكالات النشطة
            </Text>

            {delegations.slice(0, 2).map((delegation) => (
              <View
                key={delegation.id}
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#111827",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {delegation.delegation_name || "وكالة موكِّل"}
                  </Text>
                  <View
                    style={{
                      flexDirection: isRTL ? "row-reverse" : "row",
                      alignItems: "center",
                    }}
                  >
                    {getStatusIcon(delegation.status)}
                    <Text
                      style={{
                        fontSize: 14,
                        color: getStatusColor(delegation.status),
                        marginLeft: isRTL ? 0 : 4,
                        marginRight: isRTL ? 4 : 0,
                        fontWeight: "500",
                      }}
                    >
                      {delegation.status === "active"
                        ? t("agentActive")
                        : delegation.status === "paused"
                          ? t("agentPaused")
                          : delegation.status === "revoked"
                            ? "مُلغية"
                            : "غير محدد"}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: "#6B7280",
                    marginBottom: 8,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {delegation.entity_permissions?.length || 0} جهة مفوضة
                </Text>

                {/* Quick Actions */}
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    gap: 8,
                    marginTop: 8,
                  }}
                >
                  {delegation.status === "active" && (
                    <TouchableOpacity
                      onPress={() =>
                        handleDelegationAction(delegation.id, "pause")
                      }
                      style={{
                        backgroundColor: "#F59E0B",
                        borderRadius: 8,
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                      >
                        إيقاف مؤقت
                      </Text>
                    </TouchableOpacity>
                  )}

                  {delegation.status === "paused" && (
                    <TouchableOpacity
                      onPress={() =>
                        handleDelegationAction(delegation.id, "resume")
                      }
                      style={{
                        backgroundColor: "#059669",
                        borderRadius: 8,
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                      >
                        استئناف
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#F3F4F6",
                      borderRadius: 8,
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "#6B7280",
                        fontSize: 12,
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      التفاصيل
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {delegations.length > 2 && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 8,
                  padding: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#E5E7EB",
                  borderStyle: "dashed",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    textAlign: "center",
                  }}
                >
                  عرض جميع الوكالات ({delegations.length})
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* AI Capabilities */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 16,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("capabilities")}
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
            }}
          >
            {capabilities.map((capability, index) => (
              <View key={capability.key}>
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: isRTL ? "row-reverse" : "row",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: "#D1FAE5",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getCapabilityIcon(capability.icon)}
                    </View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "#111827",
                        marginLeft: isRTL ? 0 : 12,
                        marginRight: isRTL ? 12 : 0,
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      {t(capability.key)}
                    </Text>
                  </View>
                  <Switch
                    value={settings[capability.key]}
                    onValueChange={() => toggleSetting(capability.key)}
                    trackColor={{ false: "#F3F4F6", true: "#D1FAE5" }}
                    thumbColor={
                      settings[capability.key] ? "#059669" : "#D1D5DB"
                    }
                  />
                </View>
                {index < capabilities.length - 1 && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#F3F4F6",
                      marginVertical: 4,
                    }}
                  />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Recent AI Activity */}
        <View style={{ marginHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: "#111827",
              marginBottom: 16,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("aiActivity")}
          </Text>
          {recentActions.length === 0 ? (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: "#6B7280" }}>
                {t("noActivityYet")}
              </Text>
            </View>
          ) : (
            recentActions.slice(0, 5).map((action) => (
              <View
                key={action.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  flexDirection: isRTL ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                {getStatusIcon(action.status)}
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
                    {t(action.action)} {t(action.service)}
                    {action.amount && ` (${action.amount} ${t("sar")})`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {action.time} {t("hoursAgo")}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    backgroundColor:
                      action.status === "completed"
                        ? "#D1FAE5"
                        : action.status === "processing"
                          ? "#FEF3C7"
                          : "#FEE2E2",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      color:
                        action.status === "completed"
                          ? "#059669"
                          : action.status === "processing"
                            ? "#F59E0B"
                            : "#DC2626",
                    }}
                  >
                    {t(action.status)}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
