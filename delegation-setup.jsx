import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Shield,
  ChevronRight,
  CheckCircle2,
  Circle,
  Settings,
  FileText,
  Clock,
  Zap,
  Eye,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react-native";
import { useLanguage } from "@/utils/language";

export default function DelegationSetupPage() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [delegationType, setDelegationType] = useState(null);
  const [selectedEntities, setSelectedEntities] = useState({});
  const [otpCode, setOtpCode] = useState("");
  const [delegationData, setDelegationData] = useState({});
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, titleKey: "chooseDelegationType" },
    { id: 2, titleKey: "selectEntities" },
    { id: 3, titleKey: "automationLevel" },
    { id: 4, titleKey: "securityVerification" },
    { id: 5, titleKey: "reviewPermissions" },
  ];

  const entities = [
    {
      id: "postal",
      nameKey: "entityPostal",
      servicesKey: "postalServices",
      icon: "📮",
      color: "#059669",
    },
    {
      id: "civil_affairs",
      nameKey: "entityCivilAffairs",
      servicesKey: "civilAffairsServices",
      icon: "🆔",
      color: "#DC2626",
    },
    {
      id: "passports",
      nameKey: "entityPassports",
      servicesKey: "passportServices",
      icon: "✈️",
      color: "#7C3AED",
    },
    {
      id: "traffic",
      nameKey: "entityTraffic",
      servicesKey: "trafficServices",
      icon: "🚗",
      color: "#F59E0B",
    },
    {
      id: "security",
      nameKey: "entityPublicSecurity",
      servicesKey: "securityServices",
      icon: "🛡️",
      color: "#1F2937",
    },
    {
      id: "public_services",
      nameKey: "entityPublicServices",
      servicesKey: "publicServices",
      icon: "🏛️",
      color: "#3B82F6",
    },
    {
      id: "martyrs_families",
      nameKey: "entityMartyrsFamilies",
      servicesKey: "martyrsServices",
      icon: "❤️",
      color: "#EF4444",
    },
    {
      id: "prisons",
      nameKey: "entityPrisons",
      servicesKey: "prisonServices",
      icon: "⚖️",
      color: "#6B7280",
    },
    {
      id: "prosecution",
      nameKey: "entityProsecution",
      servicesKey: "prosecutionServices",
      icon: "📋",
      color: "#8B5CF6",
    },
    {
      id: "emirates",
      nameKey: "entityEmirates",
      servicesKey: "emiratesServices",
      icon: "🏰",
      color: "#10B981",
    },
  ];

  const automationLevels = [
    {
      id: "full_automation",
      titleKey: "fullAutomation",
      descriptionKey: "renewDocument",
      icon: <Zap size={24} color="#059669" />,
      color: "#059669",
    },
    {
      id: "requires_approval",
      titleKey: "requiresApproval",
      descriptionKey: "payFees",
      icon: <Shield size={24} color="#F59E0B" />,
      color: "#F59E0B",
    },
    {
      id: "monitoring_only",
      titleKey: "monitoringOnly",
      descriptionKey: "trackStatus",
      icon: <Eye size={24} color="#6B7280" />,
      color: "#6B7280",
    },
  ];

  const handleEntitySelection = (entityId) => {
    setSelectedEntities((prev) => {
      const newState = { ...prev };
      if (newState[entityId]) {
        delete newState[entityId];
      } else {
        newState[entityId] = {
          enabled: true,
          automationLevel: "requires_approval",
        };
      }
      return newState;
    });
  };

  const updateEntityAutomation = (entityId, level) => {
    setSelectedEntities((prev) => ({
      ...prev,
      [entityId]: {
        ...prev[entityId],
        automationLevel: level,
      },
    }));
  };

  const handleOTPVerification = async () => {
    if (otpCode.length !== 6) {
      Alert.alert("خطأ", "يرجى إدخال رمز التحقق المكون من 6 أرقام");
      return;
    }

    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(5);
    }, 2000);
  };

  const createDelegation = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/delegations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          delegationType,
          entities: selectedEntities,
          otpCode,
        }),
      });

      if (response.ok) {
        Alert.alert(t("delegationCreated"), t("delegationActive"), [
          {
            text: "موافق",
            onPress: () => {
              // Navigate back to AI Agent page
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert("خطأ", "حدث خطأ أثناء إنشاء الوكالة");
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <View
      style={{
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "center",
        marginVertical: 20,
        paddingHorizontal: 20,
      }}
    >
      {steps.map((step, index) => (
        <View
          key={step.id}
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: currentStep >= step.id ? "#059669" : "#E5E7EB",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentStep > step.id ? (
              <Check size={16} color="#fff" />
            ) : (
              <Text
                style={{
                  color: currentStep >= step.id ? "#fff" : "#6B7280",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {step.id}
              </Text>
            )}
          </View>
          {index < steps.length - 1 && (
            <View
              style={{
                width: 40,
                height: 2,
                backgroundColor: currentStep > step.id ? "#059669" : "#E5E7EB",
                marginHorizontal: 8,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderDelegationTypeStep = () => (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#111827",
          marginBottom: 8,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t("chooseDelegationType")}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#6B7280",
          marginBottom: 24,
          textAlign: isRTL ? "right" : "left",
          lineHeight: 24,
        }}
      >
        {t("delegationSubtitle")}
      </Text>

      <TouchableOpacity
        onPress={() => setDelegationType("general_limited")}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          borderWidth: 2,
          borderColor:
            delegationType === "general_limited" ? "#059669" : "#E5E7EB",
        }}
      >
        <View
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 4,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("generalLimitedDelegation")}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              وكالة شاملة لجميع الجهات مع تحديد الصلاحيات
            </Text>
          </View>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor:
                delegationType === "general_limited" ? "#059669" : "#D1D5DB",
              backgroundColor:
                delegationType === "general_limited" ? "#059669" : "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {delegationType === "general_limited" && (
              <Check size={12} color="#fff" />
            )}
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setDelegationType("specific_per_entity")}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 20,
          marginBottom: 32,
          borderWidth: 2,
          borderColor:
            delegationType === "specific_per_entity" ? "#059669" : "#E5E7EB",
        }}
      >
        <View
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#111827",
                marginBottom: 4,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {t("specificDelegationPerEntity")}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              وكالة منفصلة لكل جهة حكومية
            </Text>
          </View>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor:
                delegationType === "specific_per_entity"
                  ? "#059669"
                  : "#D1D5DB",
              backgroundColor:
                delegationType === "specific_per_entity" ? "#059669" : "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {delegationType === "specific_per_entity" && (
              <Check size={12} color="#fff" />
            )}
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => delegationType && setCurrentStep(2)}
        disabled={!delegationType}
        style={{
          backgroundColor: delegationType ? "#059669" : "#E5E7EB",
          borderRadius: 12,
          padding: 16,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: delegationType ? "#fff" : "#9CA3AF",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          متابعة
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEntitySelectionStep = () => (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#111827",
          marginBottom: 8,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t("selectEntities")}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#6B7280",
          marginBottom: 24,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        اختر الجهات الحكومية التي تريد منح الوكيل صلاحية التعامل معها
      </Text>

      {entities.map((entity) => (
        <TouchableOpacity
          key={entity.id}
          onPress={() => handleEntitySelection(entity.id)}
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 2,
            borderColor: selectedEntities[entity.id] ? entity.color : "#E5E7EB",
          }}
        >
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
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
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: `${entity.color}15`,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: isRTL ? 0 : 12,
                  marginLeft: isRTL ? 12 : 0,
                }}
              >
                <Text style={{ fontSize: 24 }}>{entity.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: 2,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(entity.nameKey)}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(entity.servicesKey)}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedEntities[entity.id]
                  ? entity.color
                  : "#D1D5DB",
                backgroundColor: selectedEntities[entity.id]
                  ? entity.color
                  : "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedEntities[entity.id] && <Check size={12} color="#fff" />}
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View
        style={{
          flexDirection: isRTL ? "row-reverse" : "row",
          justifyContent: "space-between",
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => setCurrentStep(1)}
          style={{
            backgroundColor: "#F3F4F6",
            borderRadius: 12,
            padding: 16,
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            flex: 1,
            marginRight: isRTL ? 0 : 8,
            marginLeft: isRTL ? 8 : 0,
          }}
        >
          {isRTL ? (
            <ArrowRight size={20} color="#6B7280" />
          ) : (
            <ArrowLeft size={20} color="#6B7280" />
          )}
          <Text
            style={{
              color: "#6B7280",
              fontSize: 16,
              fontWeight: "600",
              marginLeft: isRTL ? 0 : 8,
              marginRight: isRTL ? 8 : 0,
            }}
          >
            السابق
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Object.keys(selectedEntities).length > 0 && setCurrentStep(3)
          }
          disabled={Object.keys(selectedEntities).length === 0}
          style={{
            backgroundColor:
              Object.keys(selectedEntities).length > 0 ? "#059669" : "#E5E7EB",
            borderRadius: 12,
            padding: 16,
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            flex: 1,
            marginLeft: isRTL ? 0 : 8,
            marginRight: isRTL ? 8 : 0,
          }}
        >
          <Text
            style={{
              color:
                Object.keys(selectedEntities).length > 0 ? "#fff" : "#9CA3AF",
              fontSize: 16,
              fontWeight: "600",
              marginRight: isRTL ? 0 : 8,
              marginLeft: isRTL ? 8 : 0,
            }}
          >
            التالي
          </Text>
          {isRTL ? (
            <ArrowLeft
              size={20}
              color={
                Object.keys(selectedEntities).length > 0 ? "#fff" : "#9CA3AF"
              }
            />
          ) : (
            <ArrowRight
              size={20}
              color={
                Object.keys(selectedEntities).length > 0 ? "#fff" : "#9CA3AF"
              }
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAutomationLevelStep = () => (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#111827",
          marginBottom: 8,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t("automationLevel")}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#6B7280",
          marginBottom: 24,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        حدد مستوى الأتمتة لكل جهة حكومية
      </Text>

      {Object.keys(selectedEntities).map((entityId) => {
        const entity = entities.find((e) => e.id === entityId);
        return (
          <View
            key={entityId}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginRight: isRTL ? 0 : 8,
                  marginLeft: isRTL ? 8 : 0,
                }}
              >
                {entity.icon}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#111827",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {t(entity.nameKey)}
              </Text>
            </View>

            {automationLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                onPress={() => updateEntityAutomation(entityId, level.id)}
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor:
                    selectedEntities[entityId]?.automationLevel === level.id
                      ? `${level.color}15`
                      : "#F9FAFB",
                  borderRadius: 8,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor:
                    selectedEntities[entityId]?.automationLevel === level.id
                      ? level.color
                      : "#E5E7EB",
                }}
              >
                <View
                  style={{
                    marginRight: isRTL ? 0 : 12,
                    marginLeft: isRTL ? 12 : 0,
                  }}
                >
                  {level.icon}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: 2,
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t(level.titleKey)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: "#6B7280",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t(level.descriptionKey)}
                  </Text>
                </View>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor:
                      selectedEntities[entityId]?.automationLevel === level.id
                        ? level.color
                        : "#D1D5DB",
                    backgroundColor:
                      selectedEntities[entityId]?.automationLevel === level.id
                        ? level.color
                        : "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedEntities[entityId]?.automationLevel === level.id && (
                    <Check size={10} color="#fff" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}

      <View
        style={{
          flexDirection: isRTL ? "row-reverse" : "row",
          justifyContent: "space-between",
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => setCurrentStep(2)}
          style={{
            backgroundColor: "#F3F4F6",
            borderRadius: 12,
            padding: 16,
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            flex: 1,
            marginRight: isRTL ? 0 : 8,
            marginLeft: isRTL ? 8 : 0,
          }}
        >
          {isRTL ? (
            <ArrowRight size={20} color="#6B7280" />
          ) : (
            <ArrowLeft size={20} color="#6B7280" />
          )}
          <Text
            style={{
              color: "#6B7280",
              fontSize: 16,
              fontWeight: "600",
              marginLeft: isRTL ? 0 : 8,
              marginRight: isRTL ? 8 : 0,
            }}
          >
            السابق
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentStep(4)}
          style={{
            backgroundColor: "#059669",
            borderRadius: 12,
            padding: 16,
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            flex: 1,
            marginLeft: isRTL ? 0 : 8,
            marginRight: isRTL ? 8 : 0,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
              marginRight: isRTL ? 0 : 8,
              marginLeft: isRTL ? 8 : 0,
            }}
          >
            التالي
          </Text>
          {isRTL ? (
            <ArrowLeft size={20} color="#fff" />
          ) : (
            <ArrowRight size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSecurityStep = () => (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#111827",
          marginBottom: 8,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t("securityVerification")}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#6B7280",
          marginBottom: 24,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        تم إرسال رمز التحقق إلى جوالك المسجل في أبشر
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#111827",
            marginBottom: 12,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          رمز التحقق (OTP)
        </Text>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: otpCode.length === 6 ? "#059669" : "#E5E7EB",
            borderRadius: 8,
            padding: 16,
            fontSize: 18,
            textAlign: "center",
            fontWeight: "600",
          }}
          value={otpCode}
          onChangeText={setOtpCode}
          placeholder="000000"
          keyboardType="numeric"
          maxLength={6}
        />
      </View>

      <View
        style={{
          flexDirection: isRTL ? "row-reverse" : "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => setCurrentStep(3)}
          style={{
            backgroundColor: "#F3F4F6",
            borderRadius: 12,
            padding: 16,
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            flex: 1,
            marginRight: isRTL ? 0 : 8,
            marginLeft: isRTL ? 8 : 0,
          }}
        >
          {isRTL ? (
            <ArrowRight size={20} color="#6B7280" />
          ) : (
            <ArrowLeft size={20} color="#6B7280" />
          )}
          <Text
            style={{
              color: "#6B7280",
              fontSize: 16,
              fontWeight: "600",
              marginLeft: isRTL ? 0 : 8,
              marginRight: isRTL ? 8 : 0,
            }}
          >
            السابق
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOTPVerification}
          disabled={otpCode.length !== 6 || loading}
          style={{
            backgroundColor:
              otpCode.length === 6 && !loading ? "#059669" : "#E5E7EB",
            borderRadius: 12,
            padding: 16,
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            flex: 1,
            marginLeft: isRTL ? 0 : 8,
            marginRight: isRTL ? 8 : 0,
          }}
        >
          <Text
            style={{
              color: otpCode.length === 6 && !loading ? "#fff" : "#9CA3AF",
              fontSize: 16,
              fontWeight: "600",
              marginRight: isRTL ? 0 : 8,
              marginLeft: isRTL ? 8 : 0,
            }}
          >
            {loading ? "جاري التحقق..." : "تحقق"}
          </Text>
          {!loading && (
            <>
              {isRTL ? (
                <ArrowLeft
                  size={20}
                  color={otpCode.length === 6 ? "#fff" : "#9CA3AF"}
                />
              ) : (
                <ArrowRight
                  size={20}
                  color={otpCode.length === 6 ? "#fff" : "#9CA3AF"}
                />
              )}
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReviewStep = () => (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#111827",
          marginBottom: 8,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t("reviewPermissions")}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#6B7280",
          marginBottom: 24,
          textAlign: isRTL ? "right" : "left",
        }}
      >
        راجع الصلاحيات المحددة قبل إنشاء الوكالة
      </Text>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#111827",
            marginBottom: 16,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          نوع الوكالة
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#6B7280",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {delegationType === "general_limited"
            ? t("generalLimitedDelegation")
            : t("specificDelegationPerEntity")}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#111827",
            marginBottom: 16,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          الجهات المفوضة ({Object.keys(selectedEntities).length})
        </Text>
        {Object.keys(selectedEntities).map((entityId) => {
          const entity = entities.find((e) => e.id === entityId);
          const level = automationLevels.find(
            (l) => l.id === selectedEntities[entityId].automationLevel,
          );
          return (
            <View
              key={entityId}
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#F3F4F6",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginRight: isRTL ? 0 : 8,
                  marginLeft: isRTL ? 8 : 0,
                }}
              >
                {entity.icon}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#111827",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(entity.nameKey)}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: level?.color || "#6B7280",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(level?.titleKey)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={createDelegation}
        disabled={loading}
        style={{
          backgroundColor: loading ? "#E5E7EB" : "#059669",
          borderRadius: 12,
          padding: 16,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: loading ? "#9CA3AF" : "#fff",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {loading ? "جاري إنشاء الوكالة..." : t("confirmDelegation")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setCurrentStep(4)}
        style={{
          backgroundColor: "#F3F4F6",
          borderRadius: 12,
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
          السابق
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderDelegationTypeStep();
      case 2:
        return renderEntitySelectionStep();
      case 3:
        return renderAutomationLevelStep();
      case 4:
        return renderSecurityStep();
      case 5:
        return renderReviewStep();
      default:
        return renderDelegationTypeStep();
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
          {t("delegationTitle")}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: "#D1FAE5",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          إعداد وكالة موكِّل الافتراضي
        </Text>
      </View>

      {renderStepIndicator()}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {renderCurrentStep()}
      </ScrollView>
    </View>
  );
}
