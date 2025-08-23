"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Users, UserPlus, Search, Bell, Settings, Home, FileText, BarChart3, Calendar, Mail, Phone, MapPin, Edit, Trash2, Plus, Filter, Download, Upload, Eye, MoreHorizontal, ChevronDown, PanelLeft, Menu, X, Crown, Shield, Clock, TrendingUp, Award, Target, Briefcase, GraduationCap, Star, CheckCircle, AlertCircle, UserCheck, Activity, User, LogOut, Camera } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Sample employee data
const employees = [
  {
    id: 1,
    name: "Айдар Нұрланов",
    position: "Бас менеджер",
    department: "Басқару",
    email: "aidar.nurlanov@company.kz",
    phone: "+7 777 123 4567",
    hireDate: "2020-03-15",
    salary: "500000",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 95,
    projects: 12,
    experience: "4 жыл",
  },
  {
    id: 2,
    name: "Гүлнар Сейітова",
    position: "HR маманы",
    department: "Адами ресурстар",
    email: "gulnar.seitova@company.kz",
    phone: "+7 777 234 5678",
    hireDate: "2021-07-20",
    salary: "350000",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 88,
    projects: 8,
    experience: "2.5 жыл",
  },
  {
    id: 3,
    name: "Ерлан Қасымов",
    position: "IT маманы",
    department: "Ақпараттық технологиялар",
    email: "erlan.kasymov@company.kz",
    phone: "+7 777 345 6789",
    hireDate: "2019-11-10",
    salary: "450000",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 92,
    projects: 15,
    experience: "4.2 жыл",
  },
  {
    id: 4,
    name: "Асель Тұрсынова",
    position: "Бухгалтер",
    department: "Қаржы",
    email: "asel.tursynova@company.kz",
    phone: "+7 777 456 7890",
    hireDate: "2022-01-15",
    salary: "320000",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 85,
    projects: 6,
    experience: "2 жыл",
  },
  {
    id: 5,
    name: "Дәурен Әлімов",
    position: "Сату менеджері",
    department: "Сату",
    email: "dauren.alimov@company.kz",
    phone: "+7 777 567 8901",
    hireDate: "2021-09-05",
    salary: "380000",
    avatar: "/placeholder.svg?height=40&width=40",
    performance: 90,
    projects: 10,
    experience: "2.3 жыл",
  },
]

// Sample departments
const departments = [
  { name: "Басқару", count: 3, budget: "2500000", head: "Айдар Нұрланов" },
  { name: "Адами ресурстар", count: 2, budget: "800000", head: "Гүлнар Сейітова" },
  { name: "Ақпараттық технологиялар", count: 4, budget: "1800000", head: "Ерлан Қасымов" },
  { name: "Қаржы", count: 3, budget: "1200000", head: "Асель Тұрсынова" },
  { name: "Сату", count: 5, budget: "2000000", head: "Дәурен Әлімов" },
  { name: "Маркетинг", count: 3, budget: "1500000", head: "Жанар Омарова" },
]

// Sample recent activities
const recentActivities = [
  {
    id: 1,
    type: "hire",
    message: "Жаңа қызметкер қосылды: Мерей Бекболатов",
    time: "2 сағат бұрын",
    user: "HR Департаменті",
  },
  {
    id: 2,
    type: "update",
    message: "Айдар Нұрланов профилі жаңартылды",
    time: "5 сағат бұрын",
    user: "Жүйе әкімшісі",
  },
  {
    id: 3,
    type: "promotion",
    message: "Гүлнар Сейітова жоғарылатылды",
    time: "1 күн бұрын",
    user: "Басқарма",
  },
]

// Sidebar navigation items
const sidebarItems = [
  {
    title: "Басты бет",
    icon: <Home />,
    tab: "home",
  },
  {
    title: "Қызметкерлер",
    icon: <Users />,
    badge: "17",
    tab: "employees",
    items: [
      { title: "Барлық қызметкерлер", url: "#" },
      { title: "Жаңа қызметкер", url: "#" },
    ],
  },
  {
    title: "Департаменттер",
    icon: <Building2 />,
    badge: "6",
    tab: "departments",
    items: [
      { title: "Барлық департаменттер", url: "#" },
      { title: "Басқару", url: "#" },
      { title: "HR", url: "#" },
      { title: "IT", url: "#" },
      { title: "Қаржы", url: "#" },
      { title: "Сату", url: "#" },
    ],
  },
  {
    title: "Профиль",
    icon: <User />,
    tab: "profile",
  },
  {
    title: "Күнтізбе",
    icon: <Calendar />,
    items: [
      { title: "Жұмыс күнтізбесі", url: "#" },
      { title: "Демалыс", url: "#" },
      { title: "Мерекелер", url: "#" },
    ],
  },
  {
    title: "Құжаттар",
    icon: <FileText />,
    items: [
      { title: "Шарттар", url: "#" },
      { title: "Саясаттар", url: "#" },
      { title: "Нұсқаулықтар", url: "#" },
    ],
  },
]

export default function CorporateEmployeeManagement() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: ''
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    // Simple validation - in real app, this would be API call
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    // Simple validation
    if (registerData.password && registerData.email && registerData.name) {
      setIsLoggedIn(true);
    }
  };

  const handleLoginInputChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterInputChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [notifications, setNotifications] = useState(3)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const [isEditEmployeeOpen, setIsEditEmployeeOpen] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState<any>(null);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleEditEmployee = (employee: any) => {
    setEditEmployeeData(employee);
    setIsEditEmployeeOpen(true);
  };

  const handleCloseEditEmployee = () => {
    setIsEditEmployeeOpen(false);
    setEditEmployeeData(null);
  };

  const handleSaveEmployee = () => {
    // Save logic here
    setIsEditEmployeeOpen(false);
    setEditEmployeeData(null);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditEmployeeData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSidebarItemClick = (item: any) => {
    if (item.tab) {
      setActiveTab(item.tab);
    }
    if (item.items) {
      toggleExpanded(item.title);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 -z-10 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
              "radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.5) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
              "radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.5) 0%, rgba(16, 185, 129, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
              "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.5) 0%, rgba(147, 51, 234, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            ],
          }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="w-full max-w-md mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-2xl p-8 border"
          >
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-white p-2">
                  <img src="/images/qazpost-logo.svg" alt="Qazpost" className="size-10 object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Қазпошта</h1>
                  <p className="text-sm text-muted-foreground">Ұлттық пошта қызметі</p>
                </div>
              </div>
            </div>

            {showLogin && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Вход</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                      Имя пользователя
                    </Label>
                    <Input
                      id="username"
                      name="email"
                      type="text"
                      value={loginData.email}
                      onChange={handleLoginInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Пароль
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-medium"
                  >
                    Войти
                  </Button>
                </form>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Нет аккаунта?{' '}
                    <button
                      onClick={() => {
                        setShowLogin(false);
                        setShowRegister(true);
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Регистрация
                    </button>
                  </p>
                </div>
              </div>
            )}

            {showRegister && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Регистрация</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username" className="text-sm font-medium text-gray-700">
                      Имя пользователя
                    </Label>
                    <Input
                      id="reg-username"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email" className="text-sm font-medium text-gray-700">
                      Email адрес
                    </Label>
                    <Input
                      id="reg-email"
                      name="email"
                      type="email"
                      value={registerData.email}
                      onChange={handleRegisterInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <p className="text-xs text-orange-600">Email немесе телефон нөмірі міндетті</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone" className="text-sm font-medium text-gray-700">
                      Телефон нөмірі
                    </Label>
                    <Input
                      id="reg-phone"
                      name="phone"
                      placeholder="+7 (777) 123-45-67"
                      value={registerData.phone || ''}
                      onChange={handleRegisterInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <p className="text-xs text-orange-600">Email немесе телефон нөмірі міндетті</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password" className="text-sm font-medium text-gray-700">
                      Пароль
                    </Label>
                    <Input
                      id="reg-password"
                      name="password"
                      type="password"
                      value={registerData.password}
                      onChange={handleRegisterInputChange}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium"
                  >
                    Зарегистрироваться
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Уже есть аккаунт?{' '}
                    <button
                      onClick={() => {
                        setShowRegister(false);
                        setShowLogin(true);
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Войти
                    </button>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.5) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.5) 0%, rgba(96, 165, 250, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(96, 165, 250, 0.5) 0%, rgba(37, 99, 235, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.5) 0%, rgba(59, 130, 246, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-white p-1">
                  <img src="/images/qazpost-logo.svg" alt="Qazpost" className="size-8 object-contain" />
                </div>
                <div>
                  <h2 className="font-semibold">Қазпошта</h2>
                  <p className="text-xs text-muted-foreground">Ұлттық пошта қызметі</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Іздеу..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      activeTab === item.tab ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => handleSidebarItemClick(item)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <ChevronDown
                        className={cn(
                          "ml-2 h-4 w-4 transition-transform",
                          expandedItems[item.title] ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>

                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                        >
                          {subItem.title}
                          {subItem.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted text-red-600">
                <LogOut className="h-5 w-5" />
                <span>Шығу</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <UserCheck className="h-5 w-5" />
                <span>Аккаунт ауыстыру</span>
              </button>
              <button 
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted",
                  activeTab === "settings" ? "bg-primary/10 text-primary" : ""
                )}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-5 w-5" />
                <span>Баптаулар</span>
              </button>
              <button 
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted",
                  activeTab === "profile" ? "bg-primary/10 text-primary" : ""
                )}
                onClick={() => setActiveTab("profile")}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>АД</AvatarFallback>
                  </Avatar>
                  <span>Әкімші</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Admin
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-64 transform border-r bg-background transition-transform duration-300 ease-in-out md:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-white p-1">
                  <img src="/images/qazpost-logo.svg" alt="Qazpost" className="size-8 object-contain" />
                </div>
                <div>
                  <h2 className="font-semibold">Қазпошта</h2>
                  <p className="text-xs text-muted-foreground">Ұлттық пошта қызметі</p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Іздеу..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <div key={item.title} className="mb-1">
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
                      activeTab === item.tab ? "bg-primary/10 text-primary" : "hover:bg-muted",
                    )}
                    onClick={() => handleSidebarItemClick(item)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.items && (
                      <ChevronDown
                        className={cn(
                          "ml-2 h-4 w-4 transition-transform",
                          expandedItems[item.title] ? "rotate-180" : "",
                        )}
                      />
                    )}
                  </button>

                  {item.items && expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.url}
                          className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                        >
                          {subItem.title}
                          {subItem.badge && (
                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                              {subItem.badge}
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t p-3">
            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted text-red-600">
                <LogOut className="h-5 w-5" />
                <span>Шығу</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
                <UserCheck className="h-5 w-5" />
                <span>Аккаунт ауыстыру</span>
              </button>
              <button 
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted",
                  activeTab === "settings" ? "bg-primary/10 text-primary" : ""
                )}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-5 w-5" />
                <span>Баптаулар</span>
              </button>
              <button 
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted",
                  activeTab === "profile" ? "bg-primary/10 text-primary" : ""
                )}
                onClick={() => setActiveTab("profile")}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>АД</AvatarFallback>
                  </Avatar>
                  <span>Әкімші</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  Admin
                </Badge>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold">Қазпошта - Қызметкерлер басқару жүйесі</h1>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-2xl relative">
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {notifications}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Хабарландырулар</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button 
                variant="ghost" 
                className="flex items-center gap-2 rounded-2xl"
                onClick={() => setActiveTab("profile")}
              >
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback>АД</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full max-w-[700px] grid-cols-5 rounded-2xl p-1">
                <TabsTrigger value="home" className="rounded-xl data-[state=active]:rounded-xl">
                  Басты бет
                </TabsTrigger>
                <TabsTrigger value="employees" className="rounded-xl data-[state=active]:rounded-xl">
                  Қызметкерлер
                </TabsTrigger>
                <TabsTrigger value="departments" className="rounded-xl data-[state=active]:rounded-xl">
                  Департаменттер
                </TabsTrigger>
                <TabsTrigger value="profile" className="rounded-xl data-[state=active]:rounded-xl">
                  Профиль
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-xl data-[state=active]:rounded-xl">
                  Баптаулар
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex gap-2">
                <Button variant="outline" className="rounded-2xl">
                  <Download className="mr-2 h-4 w-4" />
                  Экспорт
                </Button>
                <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
                  <DialogTrigger asChild>
                    <Button className="rounded-2xl">
                      <Plus className="mr-2 h-4 w-4" />
                      Жаңа қызметкер
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Жаңа қызметкер қосу</DialogTitle>
                      <DialogDescription>
                        Жаңа қызметкердің мәліметтерін енгізіңіз
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Толық аты-жөні</Label>
                          <Input id="name" placeholder="Мысалы: Айдар Нұрланов" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Лауазымы</Label>
                          <Input id="position" placeholder="Мысалы: Менеджер" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="department">Департамент</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Департамент таңдаңыз" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="management">Басқару</SelectItem>
                              <SelectItem value="hr">Адами ресурстар</SelectItem>
                              <SelectItem value="it">IT</SelectItem>
                              <SelectItem value="finance">Қаржы</SelectItem>
                              <SelectItem value="sales">Сату</SelectItem>
                              <SelectItem value="marketing">Маркетинг</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salary">Жалақы (тенге)</Label>
                          <Input id="salary" type="number" placeholder="350000" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="example@company.kz" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input id="phone" placeholder="+7 777 123 4567" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Қосымша ақпарат</Label>
                        <Textarea id="notes" placeholder="Қосымша ескертпелер..." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                        Бас тарту
                      </Button>
                      <Button onClick={() => setIsAddEmployeeOpen(false)}>
                        Қызметкер қосу
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="home" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-4">
                          <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">Корпоративтік</Badge>
                          <h2 className="text-3xl font-bold">Қазпошта қызметкерлер жүйесіне қош келдіңіз</h2>
                          <p className="max-w-[600px] text-white/80">
                            Қазпошта компаниясының қызметкерлерін тиімді басқару үшін арналған заманауи жүйе
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <Button className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90">
                              Жаңа қызметкер қосу
                            </Button>
                            <Button
                              variant="outline"
                              className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                            >
                              Есеп алу
                            </Button>
                          </div>
                        </div>
                        <div className="hidden lg:block">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="relative h-40 w-40"
                          >
                            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
                            <div className="absolute inset-4 rounded-full bg-white/20" />
                            <div className="absolute inset-8 rounded-full bg-white/30" />
                            <div className="absolute inset-12 rounded-full bg-white/40" />
                            <div className="absolute inset-16 rounded-full bg-white/50" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  {/* Statistics Cards */}
                  <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Жалпы қызметкерлер</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">17</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-600">+2</span> өткен айға қарағанда
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Департаменттер</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">
                          Белсенді департаменттер
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Орташа өнімділік</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">90%</div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-green-600">+5%</span> өткен айға қарағанда
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Жалпы жалақы қоры</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">9.8М ₸</div>
                        <p className="text-xs text-muted-foreground">
                          Айлық жалақы қоры
                        </p>
                      </CardContent>
                    </Card>
                  </section>

                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Recent Employees */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Жақында қосылған қызметкерлер</h2>
                        <Button variant="ghost" className="rounded-2xl">
                          Барлығын көру
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {employees.slice(0, 4).map((employee) => (
                            <motion.div
                              key={employee.id}
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              className="flex items-center justify-between p-4"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                                  <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{employee.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {employee.position} • {employee.department}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="rounded-xl">
                                  Көру
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Recent Activities */}
                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Соңғы әрекеттер</h2>
                        <Button variant="ghost" className="rounded-2xl">
                          Барлығын көру
                        </Button>
                      </div>
                      <div className="rounded-3xl border">
                        <div className="grid grid-cols-1 divide-y">
                          {recentActivities.map((activity) => (
                            <motion.div
                              key={activity.id}
                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                              className="p-4"
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                  {activity.type === 'hire' && <UserPlus className="h-4 w-4 text-green-600" />}
                                  {activity.type === 'update' && <Edit className="h-4 w-4 text-blue-600" />}
                                  {activity.type === 'promotion' && <TrendingUp className="h-4 w-4 text-purple-600" />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{activity.message}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {activity.user} • {activity.time}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Departments Overview */}
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Департаменттер шолуы</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        Толық есеп
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {departments.slice(0, 6).map((dept) => (
                        <motion.div key={dept.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{dept.name}</CardTitle>
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span>Қызметкерлер саны:</span>
                                <span className="font-medium">{dept.count}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Бюджет:</span>
                                <span className="font-medium">{parseInt(dept.budget).toLocaleString()} ₸</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Басшы: </span>
                                <span className="font-medium">{dept.head}</span>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button variant="secondary" className="w-full rounded-2xl">
                                Толығырақ
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="employees" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Қызметкерлер тізімі</h2>
                          <p className="max-w-[600px] text-white/80">
                            Компанияның барлық қызметкерлерін басқару және олардың мәліметтерін көру
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-emerald-700 hover:bg-white/90">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Жаңа қызметкер
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <Users className="mr-2 h-4 w-4" />
                      Барлық қызметкерлер
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Filter className="mr-2 h-4 w-4" />
                      Сүзгі
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Қызметкер іздеу..."
                        className="w-full rounded-2xl pl-9 md:w-[250px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Барлық қызметкерлер</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <Download className="mr-2 h-4 w-4" />
                          Экспорт
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <Upload className="mr-2 h-4 w-4" />
                          Импорт
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {employees.map((employee) => (
                        <motion.div key={employee.id} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                                  <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                                  <CardDescription>{employee.position}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Building2 className="h-4 w-4 text-muted-foreground" />
                                  <span>{employee.department}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span>{employee.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span>{employee.phone}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Өнімділік:</span>
                                  <span className="font-medium">{employee.performance}%</span>
                                </div>
                                <Progress value={employee.performance} className="h-2 rounded-xl" />
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Briefcase className="h-3 w-3" />
                                  {employee.projects} жоба
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {employee.experience}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                              <Dialog open={isEditEmployeeOpen && editEmployeeData?.id === employee.id} onOpenChange={setIsEditEmployeeOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="secondary" className="flex-1 rounded-2xl" onClick={() => handleEditEmployee(employee)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Өзгерту
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>{editEmployeeData?.name}</DialogTitle>
                                    <DialogDescription>
                                      Қызметкердің толық мәліметтерін өзгерту
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="flex items-center gap-4">
                                      <Avatar className="h-16 w-16">
                                        <AvatarImage src={editEmployeeData?.avatar || "/placeholder.svg"} alt={editEmployeeData?.name} />
                                        <AvatarFallback>{editEmployeeData?.name?.split(' ').map((n: any) => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="text-lg font-semibold">{editEmployeeData?.name}</h3>
                                        <p className="text-muted-foreground">{editEmployeeData?.position}</p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-sm font-medium">Департамент</Label>
                                        <Input
                                          className="text-sm text-muted-foreground"
                                          name="department"
                                          value={editEmployeeData?.department || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Жалақы</Label>
                                        <Input
                                          className="text-sm text-muted-foreground"
                                          name="salary"
                                          value={editEmployeeData?.salary || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Email</Label>
                                        <Input
                                          className="text-sm text-muted-foreground"
                                          name="email"
                                          value={editEmployeeData?.email || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Телефон</Label>
                                        <Input
                                          className="text-sm text-muted-foreground"
                                          name="phone"
                                          value={editEmployeeData?.phone || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Жұмысқа кірген күні</Label>
                                        <Input
                                          className="text-sm text-muted-foreground"
                                          name="hireDate"
                                          value={editEmployeeData?.hireDate || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Тәжірибе</Label>
                                        <Input
                                          className="text-sm text-muted-foreground"
                                          name="experience"
                                          value={editEmployeeData?.experience || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Лауазымы</Label>
                                        <Input
                                          className="text-sm text-muted-foreground"
                                          name="position"
                                          value={editEmployeeData?.position || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-sm font-medium">Аты-жөні</Label>
                                        <Input
                                          className="text-sm text-muted-foreground"
                                          name="name"
                                          value={editEmployeeData?.name || ""}
                                          onChange={handleInputChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">Өнімділік: {editEmployeeData?.performance}%</Label>
                                      <Progress value={editEmployeeData?.performance} className="h-3 rounded-xl" />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={handleCloseEditEmployee}>
                                      Бас тарту
                                    </Button>
                                    <Button onClick={handleSaveEmployee}>
                                      Сақтау
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="icon" className="rounded-2xl">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="departments" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Департаменттер</h2>
                          <p className="max-w-[600px] text-white/80">
                            Компанияның барлық департаменттерін және олардың статистикасын көру
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-red-700 hover:bg-white/90">
                          <Plus className="mr-2 h-4 w-4" />
                          Жаңа департамент
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Барлық департаменттер</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {departments.map((dept) => (
                        <motion.div key={dept.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-xl">{dept.name}</CardTitle>
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                                  <Building2 className="h-6 w-6" />
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Қызметкерлер</p>
                                  <p className="text-2xl font-bold">{dept.count}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Бюджет</p>
                                  <p className="text-lg font-semibold">{(parseInt(dept.budget) / 1000000).toFixed(1)}М ₸</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Департамент басшысы</p>
                                <p className="font-medium">{dept.head}</p>
                              </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                              <Button variant="secondary" className="flex-1 rounded-2xl">
                                Толығырақ
                              </Button>
                              <Button variant="outline" size="icon" className="rounded-2xl">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="profile" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Менің профилім</h2>
                          <p className="max-w-[600px] text-white/80">
                            Жеке мәліметтерді көру және өзгерту
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-green-700 hover:bg-white/90">
                          <Edit className="mr-2 h-4 w-4" />
                          Профильді өзгерту
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Profile Card */}
                    <Card className="rounded-3xl lg:col-span-1">
                      <CardHeader className="text-center">
                        <div className="flex justify-center mb-4 relative">
                          <Avatar className="h-24 w-24 border-4 border-primary">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Admin" />
                            <AvatarFallback className="text-2xl">АД</AvatarFallback>
                          </Avatar>
                          <Button 
                            size="icon" 
                            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                            onClick={() => document.getElementById('photo-upload')?.click()}
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                          <input 
                            id="photo-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              // Handle photo upload logic here
                              console.log('Photo selected:', e.target.files?.[0]);
                            }}
                          />
                        </div>
                        <CardTitle className="text-xl">Әкімші Пайдаланушы</CardTitle>
                        <CardDescription>Жүйе әкімшісі</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>admin@qazpost.kz</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>+7 777 000 0000</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>Басқару департаменті</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>2019 жылдан бастап</span>
                          </div>
                        </div>
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span>Профиль толтырылуы:</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-2 rounded-xl" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Personal Information */}
                    <Card className="rounded-3xl lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Жеке мәліметтер</CardTitle>
                        <CardDescription>Жеке ақпаратыңызды басқару</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Аты</Label>
                            <Input id="firstName" defaultValue="Әкімші" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Тегі</Label>
                            <Input id="lastName" defaultValue="Пайдаланушы" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email мекенжайы</Label>
                            <Input id="email" type="email" defaultValue="admin@qazpost.kz" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Телефон нөмірі</Label>
                            <Input id="phone" defaultValue="+7 777 000 0000" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="position">Лауазымы</Label>
                            <Input id="position" defaultValue="Жүйе әкімшісі" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Департамент</Label>
                            <Select defaultValue="management">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="management">Басқару</SelectItem>
                                <SelectItem value="hr">Адами ресурстар</SelectItem>
                                <SelectItem value="it">IT</SelectItem>
                                <SelectItem value="finance">Қаржы</SelectItem>
                                <SelectItem value="sales">Сату</SelectItem>
                                <SelectItem value="marketing">Маркетинг</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Өзім туралы</Label>
                          <Textarea 
                            id="bio" 
                            placeholder="Өзіңіз туралы қысқаша мәлімет жазыңыз..."
                            defaultValue="Қазпошта компаниясының жүйе әкімшісі ретінде қызмет етемін. IT саласында 5 жылдан астам тәжірибем бар."
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button className="rounded-2xl">
                            Өзгерістерді сақтау
                          </Button>
                          <Button variant="outline" className="rounded-2xl">
                            Бас тарту
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Security Settings */}
                  <Card className="rounded-3xl">
                    <CardHeader>
                      <CardTitle>Қауіпсіздік баптаулары</CardTitle>
                      <CardDescription>Аккаунтыңыздың қауіпсіздігін басқару</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Пароль өзгерту</h3>
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Ағымдағы пароль</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">Жаңа пароль</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Парольді растау</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                          <Button className="w-full rounded-2xl">
                            Парольді өзгерту
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Қосымша қауіпсіздік</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-2xl">
                              <div>
                                <p className="font-medium">Екі факторлы аутентификация</p>
                                <p className="text-sm text-muted-foreground">SMS арқылы қосымша қорғаныс</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Қосу
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-2xl">
                              <div>
                                <p className="font-medium">Сессия хабарландырулары</p>
                                <p className="text-sm text-muted-foreground">Жаңа кіру туралы хабарлау</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Қосулы
                              </Button>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-2xl">
                              <div>
                                <p className="font-medium">Белсенді сессиялар</p>
                                <p className="text-sm text-muted-foreground">3 құрылғыда белсенді</p>
                              </div>
                              <Button variant="outline" size="sm">
                                Көру
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Жүйе баптаулары</h2>
                          <p className="max-w-[600px] text-white/80">
                            Жүйенің жалпы баптауларын басқару және конфигурациялау
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-slate-700 hover:bg-white/90">
                          <Settings className="mr-2 h-4 w-4" />
                          Баптауларды сақтау
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card className="rounded-3xl">
                      <CardHeader>
                        <CardTitle>Жалпы баптаулар</CardTitle>
                        <CardDescription>Жүйенің негізгі параметрлері</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="company-name">Компания атауы</Label>
                          <Input id="company-name" defaultValue="Қазпошта АҚ" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="admin-email">Әкімші email</Label>
                          <Input id="admin-email" type="email" defaultValue="admin@qazpost.kz" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Уақыт белдеуі</Label>
                          <Select defaultValue="almaty">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="almaty">Алматы (UTC+6)</SelectItem>
                              <SelectItem value="astana">Астана (UTC+6)</SelectItem>
                              <SelectItem value="moscow">Мәскеу (UTC+3)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardHeader>
                        <CardTitle>Хабарландыру баптаулары</CardTitle>
                        <CardDescription>Email және жүйелік хабарландырулар</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Жаңа қызметкер хабарландыруы</p>
                            <p className="text-sm text-muted-foreground">Жаңа қызметкер қосылғанда email жіберу</p>
                          </div>
                          <Button variant="outline" size="sm">Қосу</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Демалыс хабарландыруы</p>
                            <p className="text-sm text-muted-foreground">Қызметкер демалысқа кеткенде хабарлау</p>
                          </div>
                          <Button variant="outline" size="sm">Қосу</Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Есеп хабарландыруы</p>
                            <p className="text-sm text-muted-foreground">Айлық есептер дайын болғанда хабарлау</p>
                          </div>
                          <Button variant="outline" size="sm">Қосу</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardHeader>
                        <CardTitle>Қауіпсіздік</CardTitle>
                        <CardDescription>Жүйенің қауіпсіздік параметрлері</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Пароль саясаты</Label>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Минимум ұзындығы</span>
                              <span>8 символ</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Сандар қажет</span>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span>Арнайы символдар</span>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full rounded-2xl">
                          <Shield className="mr-2 h-4 w-4" />
                          Пароль саясатын өзгерту
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="rounded-3xl">
                      <CardHeader>
                        <CardTitle>Деректер базасы</CardTitle>
                        <CardDescription>Деректер базасының күйі мен резервтік көшірмелер</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Соңғы резервтік көшірме</p>
                            <p className="text-sm text-muted-foreground">2024-01-15 14:30</p>
                          </div>
                          <Badge variant="outline" className="rounded-xl">
                            <CheckCircle className="mr-1 h-3 w-3 text-green-600" />
                            Сәтті
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Деректер базасының өлшемі</p>
                            <p className="text-sm text-muted-foreground">24.5 MB</p>
                          </div>
                          <Badge variant="outline" className="rounded-xl">Қалыпты</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 rounded-2xl">
                            <Download className="mr-2 h-4 w-4" />
                            Резервтік көшірме
                          </Button>
                          <Button variant="outline" className="flex-1 rounded-2xl">
                            <Upload className="mr-2 h-4 w-4" />
                            Қалпына келтіру
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
