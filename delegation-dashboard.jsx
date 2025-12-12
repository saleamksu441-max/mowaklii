import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Shield,
  CheckCircle2,
  Clock,
  Zap,
  Eye,
  Settings,
  FileText,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Pause,
  Play,
  X,
  MoreVertical,
  Users,
  Activity,
  DollarSign,
} from "lucide-react-native";
import { useLanguage } from "@/utils/language";

export default function DelegationDashboard() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();
  const [delegations, setDelegations] = useState([]);
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const automationLevelIcons = {
    full_automation: <Zap size={20} color="#059669" />,
    requires_approval: <Shield size={20} color="#F59E0B" />,
    monitoring_only: <Eye size={20} color="#6B7280" />,
  };

  const automationLevelColors = {
    full_automation: "#059669",
    requires_approval: "#F59E0B",
    monitoring_only: "#6B7280",
  };

  const statusColors = {
    active: "#059669",
    paused: "#F59E0B",
    inactive: "#6B7280",
    expired: "#EF4444",
  };

  const entities = [
    { id: "postal", nameKey: "entityPostal", icon: "📮" },
    { id: "civil_affairs", nameKey: "entityCivilAffairs", icon: "🆔" },
    { id: "passports", nameKey: "entityPassports", icon: "✈️" },
    { id: "traffic", nameKey: "entityTraffic", icon: "🚗" },
    { id: "security", nameKey: "entityPublicSecurity", icon: "🛡️" },
    { id: "public_services", nameKey: "entityPublicServices", icon: "🏛️" },
    { id: "martyrs_families", nameKey: "entityMartyrsFamilies", icon: "❤️" },
    { id: "prisons", nameKey: "entityPrisons", icon: "⚖️" },
    { id: "prosecution", nameKey: "entityProsecution", icon: "📋" },
    { id: "emirates", nameKey: "entityEmirates", icon: "🏰" },
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch delegations
      const delegationsResponse = await fetch("/api/delegations");
      if (delegationsResponse.ok) {
        const delegationsData = await delegationsResponse.json();
        setDelegations(delegationsData.delegations || []);
      }

      // Mock stats data
      setStats({
        activeDelegations: 2,
        entitiesManaged: 8,
        monthlyActions: 24,
        timeSaved: 12,
        autoPayments: 1850,
        renewalsCompleted: 6,
      });

      // Mock recent activity
      setRecentActivity([
        {
          id: 1,
          type: "renewal",
          entity: "traffic",
          description: "تجديد رخصة القيادة تلقائياً",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: "completed",
          amount: null,
        },
        {
          id: 2,
          type: "payment",
          entity: "passports",
          description: "دفع رسوم تجديد جواز السفر",
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          status: "completed",
          amount: 300,
        },
        {
          id: 3,
          type: "notification",
          entity: "civil_affairs",
          description: "تنبيه: بطاقة الهوية تنتهي خلال 30 يوم",
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          status: "pending",
          amount: null,
        },
        {
          id: 4,
          type: "delivery",
          entity: "postal",
          description: "طلب توصيل الوثائق الجديدة",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          status: "completed",
          amount: 15,
        },
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const handleDelegationAction = (delegationId, action) => {
    Alert.alert(
      action === "pause"
        ? "إيقاف مؤقت"
        : action === "resume"
          ? "استئناف"
          : "إلغاء",
      `هل تريد ${action === "pause" ? "إيقاف" : action === "resume" ? "استئناف" : "إلغاء"} هذه الوكالة؟`,
      [
        { text: "إلغاء", style: "cancel" },
        {
          text: "تأكيد",
          onPress: async () => {
            try {
              const response = await fetch(`/api/delegations`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ delegationId, action }),
              });

              if (response.ok) {
                loadDashboardData();
              }
            } catch (error) {
              Alert.alert("خطأ", "حدث خطأ أثناء تنفيذ العملية");
            }
          },
        },
      ],
    );
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;

    if (diff < 60 * 60 * 1000) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `منذ ${minutes} دقيقة`;
    } else if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `منذ ${hours} ساعة`;
    } else {
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `منذ ${days} يوم`;
    }
  };

  const getEntityIcon = (entityId) => {
    const entity = entities.find((e) => e.id === entityId);
    return entity?.icon || "🏛️";
  };

  const getEntityName = (entityId) => {
    const entity = entities.find((e) => e.id === entityId);
    return entity ? t(entity.nameKey) : entityId;
  };

  const renderStatCard = (title, value, subtitle, icon, color) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        flex: 1,
        marginHorizontal: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
      }}
    >
      <View
        style={{
          flexDirection: isRTL ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: `${color}15`,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#111827",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#111827",
          marginBottom: 2,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: "#6B7280",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {subtitle}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F8FAFC",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="dark" />
        <Text style={{ fontSize: 16, color: "#6B7280" }}>
          {t("loading")}...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
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
          لوحة التحكم
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#D1FAE5",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          إدارة الوكالات والمعاملات
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Overview */}
        <View style={{ paddingHorizontal: 14, marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 12,
            }}
          >
            {renderStatCard(
              "الوكالات النشطة",
              stats.activeDelegations,
              "من أصل 2 وكالة",
              <Shield size={20} color="#059669" />,
              "#059669",
            )}
            {renderStatCard(
              "الجهات المُدارة",
              stats.entitiesManaged,
              "من أصل 10 جهات",
              <Users size={20} color="#3B82F6" />,
              "#3B82F6",
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 12,
            }}
          >
            {renderStatCard(
              "العمليات الشهرية",
              stats.monthlyActions,
              "هذا الشهر",
              <Activity size={20} color="#8B5CF6" />,
              "#8B5CF6",
            )}
            {renderStatCard(
              "الوقت الموفر",
              `${stats.timeSaved} ساعة`,
              "هذا الشهر",
              <Clock size={20} color="#F59E0B" />,
              "#F59E0B",
            )}
          </View>
        </View>

        {/* Active Delegations */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 16,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            الوكالات المفعلة ({delegations.length})
          </Text>

          {delegations.length === 0 ? (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 24,
                alignItems: "center",
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: "#E5E7EB",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#6B7280",
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                لم يتم إنشاء أي وكالات بعد
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#059669",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  إنشاء وكالة جديدة
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            delegations.map((delegation) => (
              <View
                key={delegation.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderLeftWidth: 4,
                  borderLeftColor: statusColors[delegation.status],
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
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
                      {delegation.delegation_name || "وكالة عامة"}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6B7280",
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      تم الإنشاء:{" "}
                      {new Date(delegation.created_at).toLocaleDateString(
                        "ar-SA",
                      )}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: `${statusColors[delegation.status]}15`,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                        marginRight: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: statusColors[delegation.status],
                        }}
                      >
                        {delegation.status === "active"
                          ? "نشط"
                          : delegation.status === "paused"
                            ? "متوقف"
                            : "غير نشط"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        padding: 4,
                      }}
                    >
                      <MoreVertical size={20} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Entities */}
                {delegation.entities && delegation.entities.length > 0 && (
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#374151",
                        marginBottom: 8,
                        textAlign: isRTL ? "right" : "left",
                      }}
                    >
                      الجهات المفوضة ({delegation.entities.length})
                    </Text>
                    <View
                      style={{
                        flexDirection: isRTL ? "row-reverse" : "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {delegation.entities.slice(0, 5).map((entity, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: isRTL ? "row-reverse" : "row",
                            alignItems: "center",
                            backgroundColor: "#F9FAFB",
                            borderRadius: 16,
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            marginRight: isRTL ? 0 : 6,
                            marginLeft: isRTL ? 6 : 0,
                            marginBottom: 6,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              marginRight: isRTL ? 0 : 4,
                              marginLeft: isRTL ? 4 : 0,
                            }}
                          >
                            {getEntityIcon(entity.entity_id)}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#6B7280",
                              textAlign: isRTL ? "right" : "left",
                            }}
                          >
                            {getEntityName(entity.entity_id)}
                          </Text>
                        </View>
                      ))}
                      {delegation.entities.length > 5 && (
                        <View
                          style={{
                            backgroundColor: "#E5E7EB",
                            borderRadius: 16,
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#6B7280",
                            }}
                          >
                            +{delegation.entities.length - 5}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}

                {/* Action Buttons */}
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: isRTL ? "row-reverse" : "row",
                    }}
                  >
                    {delegation.status === "active" ? (
                      <TouchableOpacity
                        onPress={() =>
                          handleDelegationAction(delegation.id, "pause")
                        }
                        style={{
                          backgroundColor: "#FEF3C7",
                          borderRadius: 8,
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          flexDirection: isRTL ? "row-reverse" : "row",
                          alignItems: "center",
                          marginRight: isRTL ? 0 : 8,
                          marginLeft: isRTL ? 8 : 0,
                        }}
                      >
                        <Pause size={14} color="#D97706" />
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: "#D97706",
                            marginLeft: isRTL ? 0 : 4,
                            marginRight: isRTL ? 4 : 0,
                          }}
                        >
                          إيقاف مؤقت
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          handleDelegationAction(delegation.id, "resume")
                        }
                        style={{
                          backgroundColor: "#D1FAE5",
                          borderRadius: 8,
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          flexDirection: isRTL ? "row-reverse" : "row",
                          alignItems: "center",
                          marginRight: isRTL ? 0 : 8,
                          marginLeft: isRTL ? 8 : 0,
                        }}
                      >
                        <Play size={14} color="#059669" />
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: "#059669",
                            marginLeft: isRTL ? 0 : 4,
                            marginRight: isRTL ? 4 : 0,
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
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        flexDirection: isRTL ? "row-reverse" : "row",
                        alignItems: "center",
                      }}
                    >
                      <Settings size={14} color="#6B7280" />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#6B7280",
                          marginLeft: isRTL ? 0 : 4,
                          marginRight: isRTL ? 4 : 0,
                        }}
                      >
                        تعديل
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Recent Activity */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 16,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            النشاط الأخير
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
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 1,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F3F4F6",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: isRTL ? 0 : 12,
                  marginLeft: isRTL ? 12 : 0,
                }}
              >
                <Text style={{ fontSize: 20 }}>
                  {getEntityIcon(activity.entity)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 2,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {activity.description}
                </Text>
                <View
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#6B7280",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {formatTime(activity.timestamp)}
                  </Text>

                  <View
                    style={{
                      flexDirection: isRTL ? "row-reverse" : "row",
                      alignItems: "center",
                    }}
                  >
                    {activity.amount && (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#059669",
                          marginRight: isRTL ? 0 : 8,
                          marginLeft: isRTL ? 8 : 0,
                        }}
                      >
                        {activity.amount} ريال
                      </Text>
                    )}

                    <View
                      style={{
                        backgroundColor:
                          activity.status === "completed"
                            ? "#D1FAE5"
                            : activity.status === "pending"
                              ? "#FEF3C7"
                              : "#FEE2E2",
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "600",
                          color:
                            activity.status === "completed"
                              ? "#059669"
                              : activity.status === "pending"
                                ? "#D97706"
                                : "#DC2626",
                        }}
                      >
                        {activity.status === "completed"
                          ? "مكتمل"
                          : activity.status === "pending"
                            ? "معلق"
                            : "فشل"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 16,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            الإجراءات السريعة
          </Text>

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 4,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#059669",
                borderRadius: 8,
                padding: 16,
                marginBottom: 4,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                إنشاء وكالة جديدة
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#F3F4F6",
                borderRadius: 8,
                padding: 16,
                marginBottom: 4,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                عرض التقارير المفصلة
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#F3F4F6",
                borderRadius: 8,
                padding: 16,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                إعدادات الأتمتة العامة
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
