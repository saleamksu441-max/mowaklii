import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Shield,
  CheckCircle2,
  FileText,
  Clock,
  Zap,
  ArrowRight,
  ArrowLeft,
  Users,
  Lock,
  Star,
} from "lucide-react-native";
import { useLanguage } from "@/utils/language";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function DelegationIntroPage() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const introSlides = [
    {
      titleKey: "delegationTitle",
      subtitleKey: "delegationSubtitle",
      description: "منصة ذكية لأتمتة جميع خدماتك الحكومية عبر أبشر",
      icon: "🤖",
      color: "#059669",
      features: [
        "أتمتة كاملة للمعاملات الحكومية",
        "مراقبة ذكية للمواعيد والصلاحيات",
        "تنفيذ العمليات حسب تفضيلاتك",
        "أمان متعدد الطبقات",
      ],
    },
    {
      titleKey: "governmentEntities",
      subtitleKey: "selectEntities",
      description: "تفويض موكِّل للتعامل مع 10 جهات حكومية رئيسية",
      icon: "🏛️",
      color: "#3B82F6",
      features: [
        "البريد السعودي - توصيل الوثائق",
        "الأحوال المدنية - تجديد الهوية",
        "الجوازات - خدمات السفر",
        "المرور - رخص القيادة والمركبات",
      ],
    },
    {
      titleKey: "automationLevel",
      subtitleKey: "securityVerification",
      description: "تحكم كامل في مستوى الأتمتة والأمان",
      icon: "⚙️",
      color: "#8B5CF6",
      features: [
        "تنفيذ تلقائي للعمليات الروتينية",
        "طلب موافقة للعمليات المالية",
        "مراقبة فقط للحالات الحساسة",
        "تشفير متقدم وحماية البيانات",
      ],
    },
  ];

  const serviceFeatures = [
    {
      titleKey: "smartNotifications",
      description: "إشعارات استباقية قبل انتهاء الصلاحيات",
      icon: <CheckCircle2 size={24} color="#059669" />,
    },
    {
      titleKey: "autoPayment",
      description: "دفع تلقائي للرسوم ضمن الحدود المحددة",
      icon: <Zap size={24} color="#F59E0B" />,
    },
    {
      titleKey: "documentTracking",
      description: "تتبع شامل لجميع الوثائق والمعاملات",
      icon: <FileText size={24} color="#3B82F6" />,
    },
    {
      titleKey: "priorityHandling",
      description: "معالجة ذكية حسب الأولوية والاستعجال",
      icon: <Star size={24} color="#EF4444" />,
    },
  ];

  const handleStartDelegation = () => {
    router.push("/(tabs)/delegation-setup");
  };

  const nextSlide = () => {
    if (currentSlide < introSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#059669",
          paddingTop: insets.top + 20,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: isRTL ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#fff",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            موكِّل الافتراضي
          </Text>
          <View
            style={{
              backgroundColor: "#D1FAE5",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "#065F46",
              }}
            >
              أبشر أفراد
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: "#D1FAE5",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          الخدمات الذكية - الوكيل الافتراضي
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Slides */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: `${introSlides[currentSlide].color}15`,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={{ fontSize: 40 }}>
                  {introSlides[currentSlide].icon}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                {t(introSlides[currentSlide].titleKey)}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#6B7280",
                  textAlign: "center",
                  lineHeight: 24,
                }}
              >
                {introSlides[currentSlide].description}
              </Text>
            </View>

            <View style={{ marginBottom: 20 }}>
              {introSlides[currentSlide].features.map((feature, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: isRTL ? "row-reverse" : "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <CheckCircle2
                    size={20}
                    color={introSlides[currentSlide].color}
                    style={{
                      marginRight: isRTL ? 0 : 12,
                      marginLeft: isRTL ? 12 : 0,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#374151",
                      textAlign: isRTL ? "right" : "left",
                      flex: 1,
                    }}
                  >
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* Slide Navigation */}
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={prevSlide}
                disabled={currentSlide === 0}
                style={{
                  backgroundColor: currentSlide === 0 ? "#F3F4F6" : "#E5E7EB",
                  borderRadius: 8,
                  padding: 8,
                  opacity: currentSlide === 0 ? 0.5 : 1,
                }}
              >
                {isRTL ? (
                  <ArrowRight size={20} color="#6B7280" />
                ) : (
                  <ArrowLeft size={20} color="#6B7280" />
                )}
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {introSlides.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor:
                        index === currentSlide
                          ? introSlides[currentSlide].color
                          : "#E5E7EB",
                      marginHorizontal: 4,
                    }}
                  />
                ))}
              </View>

              <TouchableOpacity
                onPress={nextSlide}
                disabled={currentSlide === introSlides.length - 1}
                style={{
                  backgroundColor:
                    currentSlide === introSlides.length - 1
                      ? "#F3F4F6"
                      : "#E5E7EB",
                  borderRadius: 8,
                  padding: 8,
                  opacity: currentSlide === introSlides.length - 1 ? 0.5 : 1,
                }}
              >
                {isRTL ? (
                  <ArrowLeft size={20} color="#6B7280" />
                ) : (
                  <ArrowRight size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Service Features */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: "#111827",
              marginBottom: 20,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            الميزات المتقدمة
          </Text>
          {serviceFeatures.map((feature, index) => (
            <View
              key={index}
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
                  marginRight: isRTL ? 0 : 12,
                  marginLeft: isRTL ? 12 : 0,
                }}
              >
                {feature.icon}
              </View>
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
                  {t(feature.titleKey)}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Security Notice */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "#FEF3C7",
            borderRadius: 12,
            padding: 20,
            marginBottom: 30,
            borderLeftWidth: 4,
            borderLeftColor: "#F59E0B",
          }}
        >
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Shield size={24} color="#D97706" />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#92400E",
                marginLeft: isRTL ? 0 : 8,
                marginRight: isRTL ? 8 : 0,
              }}
            >
              إشعار الأمان والخصوصية
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: "#92400E",
              lineHeight: 20,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            جميع البيانات محمية بتشفير عالي المستوى. لن يتم تنفيذ أي عملية دون
            التحقق من هويتك والصلاحيات المحددة مسبقاً. يمكنك إلغاء أو تعديل
            الوكالة في أي وقت.
          </Text>
        </View>

        {/* Terms and Conditions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
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
              الشروط والأحكام
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                lineHeight: 20,
                marginBottom: 12,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              • سيتم إنشاء وكالة رقمية رسمية مع منصة أبشر
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                lineHeight: 20,
                marginBottom: 12,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              • تحديد الصلاحيات والحدود حسب اختيارك الشخصي
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                lineHeight: 20,
                marginBottom: 12,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              • إمكانية إيقاف أو تعديل الوكالة في أي وقت
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7280",
                lineHeight: 20,
                textAlign: isRTL ? "right" : "left",
              }}
            >
              • سجل كامل لجميع العمليات والمعاملات
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={handleStartDelegation}
            style={{
              backgroundColor: "#059669",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
              marginBottom: 12,
              shadowColor: "#059669",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <View
              style={{
                flexDirection: isRTL ? "row-reverse" : "row",
                alignItems: "center",
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
                بدء إعداد الوكالة
              </Text>
              {isRTL ? (
                <ArrowLeft size={20} color="#fff" />
              ) : (
                <ArrowRight size={20} color="#fff" />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
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
              قراءة المزيد عن الخدمة
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
