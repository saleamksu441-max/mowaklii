import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const translations = {
  en: {
    // App Name
    appName: "Mawakkil",
    appSubtitle: "Your Smart Government Services Agent",

    // Navigation
    home: "Home",
    services: "Services",
    alerts: "Alerts",
    settings: "Settings",
    aiAgent: "AI Agent",

    // Home Screen
    activeMonitoring: "Active Monitoring",
    upcomingServices: "Upcoming Services",
    recentActivity: "Recent Activity",
    daysRemaining: "days remaining",

    // AI Agent
    aiAgentTitle: "AI Agent",
    aiAgentSubtitle: "Automated Absher Services Management",
    agentStatus: "Agent Status",
    agentActive: "Active",
    agentInactive: "Inactive",
    agentPaused: "Paused",
    enableAgent: "Enable AI Agent",
    disableAgent: "Disable AI Agent",
    pauseAgent: "Pause Agent",
    resumeAgent: "Resume Agent",

    // AI Capabilities
    capabilities: "AI Capabilities",
    autoPayment: "Auto Payment",
    autoRenewal: "Auto Renewal",
    documentTracking: "Document Tracking",
    absherIntegration: "Absher Integration",
    smartNotifications: "Smart Notifications",
    priorityHandling: "Priority Handling",

    // Payment Management
    paymentManagement: "Payment Management",
    defaultPaymentMethod: "Default Payment Method",
    paymentLimits: "Payment Limits",
    dailyLimit: "Daily Limit",
    monthlyLimit: "Monthly Limit",
    requireApproval: "Require Approval for",
    paymentsOver: "Payments over",
    sar: "SAR",

    // Automation Settings
    automationSettings: "Automation Settings",
    renewBefore: "Renew Before Expiry",
    payImmediately: "Pay Immediately",
    notifyBeforeAction: "Notify Before Action",
    workingHours: "Working Hours Only",
    weekendsEnabled: "Include Weekends",

    // AI Activity
    aiActivity: "AI Agent Activity",
    recentActions: "Recent Actions",
    paidFees: "Paid Fees",
    renewedServices: "Renewed Services",
    processedDocuments: "Processed Documents",
    savedTime: "Time Saved",
    hours: "hours",

    // Actions
    actionPaid: "Paid",
    actionRenewed: "Renewed",
    actionSubmitted: "Submitted",
    actionProcessed: "Processed",
    actionNotified: "Notified",

    // Services Screen
    myServices: "My Services",
    manageServices: "Manage your government services",
    activeServices: "Active Services",
    availableServices: "Available Services",
    autoRenewal: "Auto-Renewal",
    expires: "Expires",
    tapToEnable: "Tap to enable monitoring",

    // Notifications Screen
    notifications: "Notifications",
    stayUpdated: "Stay updated on your services",
    new: "New",
    earlier: "Earlier",

    // Settings Screen
    managePreferences: "Manage your preferences",
    profile: "Profile",
    pushNotifications: "Push Notifications",
    emailAlerts: "Email Alerts",
    smsAlerts: "SMS Alerts",
    account: "Account",
    securityPrivacy: "Security & Privacy",
    paymentMethods: "Payment Methods",
    language: "Language",
    support: "Support",
    helpCenter: "Help Center",
    aboutMawakkil: "About Mawakkil",
    signOut: "Sign Out",
    version: "Mawakkil v1.0.0",

    // Services
    iqamaRenewal: "Iqama Renewal",
    drivingLicense: "Driving License",
    passportRenewal: "Passport Renewal",
    vehicleRegistration: "Vehicle Registration",
    exitReentryVisa: "Exit/Re-entry Visa",
    familyDependent: "Family Dependent",
    businessLicense: "Business License",

    // Notifications
    iqamaRenewalDue: "Iqama Renewal Due Soon",
    iqamaRenewalMessage:
      "Your Iqama expires in 15 days. Auto-renewal will begin in 7 days.",
    vehicleRegistrationCompleted: "Vehicle Registration Completed",
    vehicleRegistrationMessage:
      "Your vehicle registration has been successfully renewed.",
    drivingLicenseCheck: "Driving License Check",
    drivingLicenseMessage:
      "Your driving license is valid for 45 more days. No action needed.",
    paymentRequired: "Payment Required",
    paymentRequiredMessage:
      "Please authorize payment for passport renewal (SAR 300).",
    exitReentryVisaApproved: "Exit/Re-entry Visa Approved",
    exitReentryVisaMessage:
      "Your exit/re-entry visa has been processed successfully.",
    aiPaymentCompleted: "AI Agent Payment Completed",
    aiPaymentMessage:
      "AI agent successfully paid 200 SAR for vehicle registration renewal.",
    aiRenewalCompleted: "AI Agent Renewal Completed",
    aiRenewalMessage:
      "AI agent automatically renewed your driving license. Valid until 2027.",

    // Time
    hoursAgo: "hours ago",
    daysAgo: "days ago",
    weekAgo: "week ago",
    weeksAgo: "weeks ago",

    // User
    userId: "ID",

    // Status
    processing: "Processing",
    completed: "Completed",
    failed: "Failed",
    pending: "Pending",

    // UI States
    loading: "Loading",
    noActivityYet: "No activity yet",

    // Delegation Flow
    delegationFlow: "Delegation Flow",
    delegationSetup: "Setup Delegation",
    delegationTitle: "Mawakkil Delegation",
    delegationSubtitle: "Grant smart automation permissions to your AI agent",
    chooseDelegationType: "Choose Delegation Type",
    generalLimitedDelegation: "General Limited Delegation",
    specificDelegationPerEntity: "Specific Delegation Per Entity",

    // Security & Permissions
    securityVerification: "Security Verification",
    termsAndConditions: "Terms and Conditions",
    twoFactorAuth: "Two-Factor Authentication",
    otpVerification: "OTP Verification",
    grantPermissions: "Grant Permissions",
    reviewPermissions: "Review Permissions",
    confirmDelegation: "Confirm Delegation",

    // Government Entities
    governmentEntities: "Government Entities",
    selectEntities: "Select Entities",
    entityPostal: "Saudi Post (Sabil)",
    entityCivilAffairs: "Civil Affairs",
    entityPassports: "General Directorate of Passports",
    entityTraffic: "Traffic Department",
    entityPublicSecurity: "Public Security",
    entityPublicServices: "Public Services",
    entityMartyrsFamilies: "Martyrs and Injured Families Care",
    entityPrisons: "General Directorate of Prisons",
    entityProsecution: "Public Prosecution Services",
    entityEmirates: "Emirates and Regions",

    // Automation Levels
    automationLevel: "Automation Level",
    fullAutomation: "Full Automation",
    requiresApproval: "Requires Approval",
    monitoringOnly: "Monitoring Only",

    // Services per Entity
    postalServices: "Document Delivery Services",
    civilAffairsServices: "ID Renewal & Civil Services",
    passportServices: "Passport & Visa Services",
    trafficServices: "Driving License & Vehicle Services",
    securityServices: "Security & Lost Documents",
    publicServices: "Certificates & Government Services",
    martyrsServices: "Family Support & Benefits",
    prisonServices: "Prison & Legal Services",
    prosecutionServices: "Legal Documents & Reports",
    emiratesServices: "Regional Services & Permits",

    // Action Types
    renewDocument: "Renew Document",
    payFees: "Pay Fees",
    deliveryService: "Delivery Service",
    issueReplacement: "Issue Replacement",
    monitorExpiry: "Monitor Expiry",
    processApplication: "Process Application",
    trackStatus: "Track Status",
    sendNotification: "Send Notification",

    // Status Messages
    delegationCreated: "Delegation Created Successfully",
    delegationActive: "Your smart delegation is now active",
    delegationPending: "Delegation Setup Pending",
    permissionsGranted: "Permissions Granted",
  },
  ar: {
    // App Name
    appName: "موكلي",
    appSubtitle: "وكيلك الذكي للخدمات الحكومية",

    // Navigation
    home: "الرئيسية",
    services: "الخدمات",
    alerts: "التنبيهات",
    settings: "الإعدادات",
    aiAgent: "الوكيل الذكي",

    // Home Screen
    activeMonitoring: "المراقبة النشطة",
    upcomingServices: "الخدمات القادمة",
    recentActivity: "النشاط الأخير",
    daysRemaining: "يوم متبقي",

    // AI Agent
    aiAgentTitle: "الوكيل الذكي",
    aiAgentSubtitle: "أتمتة خدمات أبشر",
    agentStatus: "حالة الوكيل",
    agentActive: "نشط",
    agentInactive: "غير نشط",
    agentPaused: "متوقف مؤقتاً",
    enableAgent: "تفعيل الوكيل الذكي",
    disableAgent: "إيقاف الوكيل الذكي",
    pauseAgent: "إيقاف مؤقت",
    resumeAgent: "استئناف",

    // AI Capabilities
    capabilities: "قدرات الذكاء الاصطناعي",
    autoPayment: "الدفع التلقائي",
    autoRenewal: "التجديد التلقائي",
    documentTracking: "تتبع الوثائق",
    absherIntegration: "تكامل مع أبشر",
    smartNotifications: "التنبيهات الذكية",
    priorityHandling: "التعامل حسب الأولوية",

    // Payment Management
    paymentManagement: "إدارة المدفوعات",
    defaultPaymentMethod: "طريقة الدفع الافتراضية",
    paymentLimits: "حدود الدفع",
    dailyLimit: "الحد اليومي",
    monthlyLimit: "الحد الشهري",
    requireApproval: "يتطلب موافقة للمبالغ",
    paymentsOver: "المدفوعات أكثر من",
    sar: "ريال",

    // Automation Settings
    automationSettings: "إعدادات الأتمتة",
    renewBefore: "التجديد قبل انتهاء الصلاحية",
    payImmediately: "الدفع فوراً",
    notifyBeforeAction: "الإشعار قبل العمل",
    workingHours: "ساعات العمل فقط",
    weekendsEnabled: "تشمل عطلة نهاية الأسبوع",

    // AI Activity
    aiActivity: "نشاط الوكيل الذكي",
    recentActions: "العمليات الأخيرة",
    paidFees: "الرسوم المدفوعة",
    renewedServices: "الخدمات المجددة",
    processedDocuments: "الوثائق المعالجة",
    savedTime: "الوقت الموفر",
    hours: "ساعة",

    // Actions
    actionPaid: "تم الدفع",
    actionRenewed: "تم التجديد",
    actionSubmitted: "تم التقديم",
    actionProcessed: "تم المعالجة",
    actionNotified: "تم الإشعار",

    // Services Screen
    myServices: "خدماتي",
    manageServices: "إدارة خدماتك الحكومية",
    activeServices: "الخدمات النشطة",
    availableServices: "الخدمات المتاحة",
    autoRenewal: "التجديد التلقائي",
    expires: "تنتهي في",
    tapToEnable: "اضغط لتفعيل المراقبة",

    // Notifications Screen
    notifications: "الإشعارات",
    stayUpdated: "ابق على اطلاع بخدماتك",
    new: "جديد",
    earlier: "سابق",

    // Settings Screen
    managePreferences: "إدارة تفضيلاتك",
    profile: "الملف الشخصي",
    pushNotifications: "الإشعارات الفورية",
    emailAlerts: "تنبيهات البريد الإلكتروني",
    smsAlerts: "تنبيهات الرسائل النصية",
    account: "الحساب",
    securityPrivacy: "الأمان والخصوصية",
    paymentMethods: "طرق الدفع",
    language: "اللغة",
    support: "الدعم",
    helpCenter: "مركز المساعدة",
    aboutMawakkil: "حول موكلي",
    signOut: "تسجيل الخروج",
    version: "موكلي الإصدار 1.0.0",

    // Services
    iqamaRenewal: "تجديد الإقامة",
    drivingLicense: "رخصة القيادة",
    passportRenewal: "تجديد جواز السفر",
    vehicleRegistration: "تسجيل المركبة",
    exitReentryVisa: "تأشيرة خروج وعودة",
    familyDependent: "التابع العائلي",
    businessLicense: "رخصة العمل",

    // Notifications
    iqamaRenewalDue: "موعد تجديد الإقامة قريب",
    iqamaRenewalMessage:
      "تنتهي صلاحية إقامتك خلال 15 يوم. سيبدأ التجديد التلقائي خلال 7 أيام.",
    vehicleRegistrationCompleted: "اكتمل تسجيل المركبة",
    vehicleRegistrationMessage: "تم تجديد تسجيل مركبتك بنجاح.",
    drivingLicenseCheck: "فحص رخصة القيادة",
    drivingLicenseMessage:
      "رخصة قيادتك صالحة لـ 45 يوم آخر. لا حاجة لأي إجراء.",
    paymentRequired: "مطلوب دفع",
    paymentRequiredMessage:
      "يرجى الموافقة على دفع رسوم تجديد جواز السفر (300 ريال سعودي).",
    exitReentryVisaApproved: "تمت الموافقة على تأشيرة خروج وعودة",
    exitReentryVisaMessage: "تمت معالجة تأشيرة خروج وعودة بنجاح.",
    aiPaymentCompleted: "الوكيل الذكي أكمل الدفع",
    aiPaymentMessage:
      "قام الوكيل الذكي بدفع 200 ريال لتجديد تسجيل المركبة بنجاح.",
    aiRenewalCompleted: "الوكيل الذكي أكمل التجديد",
    aiRenewalMessage:
      "قام الوكيل الذكي بتجديد رخصة قيادتك تلقائياً. صالحة حتى 2027.",

    // Time
    hoursAgo: "ساعة مضت",
    daysAgo: "يوم مضى",
    weekAgo: "أسبوع مضى",
    weeksAgo: "أسبوع مضى",

    // User
    userId: "الهوية",

    // Status
    processing: "جاري المعالجة",
    completed: "مكتمل",
    failed: "فشل",
    pending: "في الانتظار",

    // UI States
    loading: "جاري التحميل",
    noActivityYet: "لا توجد أنشطة حتى الآن",

    // Delegation Flow
    delegationFlow: "تسلسل الوكالة",
    delegationSetup: "إعداد الوكالة",
    delegationTitle: "وكالة موكِّل",
    delegationSubtitle: "منح صلاحيات الأتمتة الذكية لوكيلك الافتراضي",
    chooseDelegationType: "اختيار نوع الوكالة",
    generalLimitedDelegation: "وكالة عامة محدودة الصلاحيات",
    specificDelegationPerEntity: "وكالة خاصة لكل جهة على حدة",

    // Security & Permissions
    securityVerification: "التحقق الأمني",
    termsAndConditions: "الشروط والأحكام",
    twoFactorAuth: "التحقق الثنائي",
    otpVerification: "تحقق OTP",
    grantPermissions: "منح الصلاحيات",
    reviewPermissions: "مراجعة الصلاحيات",
    confirmDelegation: "تأكيد الوكالة",

    // Government Entities
    governmentEntities: "الجهات الحكومية",
    selectEntities: "اختيار الجهات",
    entityPostal: "البريد السعودي (سبل)",
    entityCivilAffairs: "الأحوال المدنية",
    entityPassports: "المديرية العامة للجوازات",
    entityTraffic: "المرور",
    entityPublicSecurity: "الأمن العام",
    entityPublicServices: "الخدمات العامة",
    entityMartyrsFamilies: "رعاية أسر الشهداء والمصابين",
    entityPrisons: "المديرية العامة للسجون",
    entityProsecution: "خدمات النيابة العامة",
    entityEmirates: "الإمارات والمناطق",

    // Automation Levels
    automationLevel: "مستوى الأتمتة",
    fullAutomation: "تنفيذ تلقائي بالكامل",
    requiresApproval: "يتطلب موافقة المستخدم",
    monitoringOnly: "مراقبة فقط بدون تنفيذ",

    // Services per Entity
    postalServices: "خدمات توصيل الوثائق",
    civilAffairsServices: "تجديد الهوية والخدمات المدنية",
    passportServices: "خدمات الجوازات والتأشيرات",
    trafficServices: "رخصة القيادة وخدمات المركبات",
    securityServices: "الأمن والوثائق المفقودة",
    publicServices: "الشهادات والخدمات الحكومية",
    martyrsServices: "دعم الأسر والإعانات",
    prisonServices: "خدمات السجون والقانونية",
    prosecutionServices: "الوثائق القانونية والتقارير",
    emiratesServices: "الخدمات الإقليمية والتصاريح",

    // Action Types
    renewDocument: "تجديد الوثيقة",
    payFees: "دفع الرسوم",
    deliveryService: "خدمة التوصيل",
    issueReplacement: "إصدار بدل",
    monitorExpiry: "مراقبة انتهاء الصلاحية",
    processApplication: "معالجة الطلب",
    trackStatus: "تتبع الحالة",
    sendNotification: "إرسال إشعار",

    // Status Messages
    delegationCreated: "تم إنشاء الوكالة بنجاح",
    delegationActive: "وكالتك الذكية نشطة الآن",
    delegationPending: "إعداد الوكالة في الانتظار",
    permissionsGranted: "تم منح الصلاحيات",
  },
};

export const useLanguage = () => {
  const [language, setLanguage] = useState("ar"); // Default to Arabic

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error("Error loading language:", error);
    }
  };

  const changeLanguage = async (newLanguage) => {
    try {
      await AsyncStorage.setItem("language", newLanguage);
      setLanguage(newLanguage);
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const isRTL = language === "ar";

  return {
    language,
    changeLanguage,
    t,
    isRTL,
  };
};
