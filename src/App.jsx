import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  AlertTriangle, 
  Shield, 
  Search, 
  Zap, 
  Wind, 
  Thermometer, 
  Atom, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Microscope,
  AlertCircle,
  Home,
  BookOpen,
  Users,
  FileText,
  Lightbulb
} from 'lucide-react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 技術對照表數據
  const techComparisonData = [
    {
      tech: '光觸媒 (TiO₂)',
      claim: '光就能分解污染！',
      truth: '需UV-A/C 紫外光激發（波長＜385 nm），反應速率極慢，光照不足＝無效！',
      warning: '光照不足＝裝飾塗層！台灣多數產品僅使用可見光LED（400–700 nm），分解效率＜1%。',
      icon: <Zap className="w-6 h-6" />,
      status: 'warning'
    },
    {
      tech: '臭氧 (O₃)',
      claim: '無臭氧最安全／臭氧=毒氣',
      truth: '安全濃度＜50 ppb下，臭氧是天然淨化因子，但伴隨產生NO₂（毒性為O₃的10倍）。',
      warning: '劑量是關鍵！如同鹽巴，過量有害，但完全禁用可能錯失有效分解污染物的機會。',
      icon: <Atom className="w-6 h-6" />,
      status: 'caution'
    },
    {
      tech: '負離子/離子簇',
      claim: '釋放百萬負離子，清新殺菌',
      truth: '壽命＜10⁻⁶ 秒（0.000001秒），有效距離＜30公分，實際空間中幾乎立刻消失。',
      warning: '零作用魔術！如同點火瞬間火星閃過，無法煮飯。',
      icon: <Wind className="w-6 h-6" />,
      status: 'danger'
    },
    {
      tech: '電漿 (Plasma)',
      claim: '冷電漿殺菌淨化／瞬間殺菌無害',
      truth: '產生O₃、NOx、N₂O等副產物，濃度難控，長期暴露增加呼吸道風險。',
      warning: '副產物陷阱！殺菌可能伴隨產生更多污染，如同用高壓點火燒焦皮膚。',
      icon: <Zap className="w-6 h-6" />,
      status: 'danger'
    },
    {
      tech: '高溫裂解',
      claim: '熱裂解安全無毒／高溫燒掉異味',
      truth: '需300–800°C高溫才能分解污染物，家用設備達標率＜1%，溫度不足反生成醛類毒物。',
      warning: '工業技術誤植家用！高耗能且危險，如同用吹風機吹熱水無法煮沸。',
      icon: <Thermometer className="w-6 h-6" />,
      status: 'danger'
    },
    {
      tech: 'HEPA/活性炭濾網',
      claim: '濾網越厚越有效／永久過濾',
      truth: '只能阻擋≥0.3微米顆粒，對甲醛(0.0004微米)、VOCs等氣體污染物無效，且會二次污染。',
      warning: '濾網飽和後變成污染儲藏室！高濕環境下滋生黴菌，反而成為污染源。',
      icon: <Shield className="w-6 h-6" />,
      status: 'caution'
    }
  ]

  // 詐騙金句拆解數據
  const scamPhrases = [
    {
      category: '電漿淨化',
      claim: '電漿產生離子殺菌無害',
      truth: '伴隨產生O₃（臭氧）與NO₂（致癌物），濃度難控，長期暴露增加肺癌風險（WHO報告）。',
      action: '拒絕未標示副產物濃度的產品，要求第三方檢測報告（如SGS）。'
    },
    {
      category: '熱裂解除味',
      claim: '高溫燒掉異味',
      truth: '家用設備溫度＜200°C，反而生成甲醛、乙醛（致癌物），濃度超出台灣標準3倍。',
      action: '拒絕「高溫神話」，選擇可驗證溫度與副產物控制的工業級設備。'
    },
    {
      category: '離子簇技術',
      claim: '無臭氧，釋放清新氧分子殺菌',
      truth: '90%產品依賴臭氧反應，實測NO₂濃度＞100 ppb（超標3倍），但標示上刻意隱藏。',
      action: '要求廠商提供NO₂/O₃ 副產物檢測報告，並搭配臭氧吸附層濾材。'
    }
  ]

  // 消費者指南數據
  const consumerGuide = [
    {
      title: '拆解技術話術',
      description: '要求廠商提供反應式、滯留時間、能量輸入',
      example: '例：光觸媒需標示 UV波長（nm）與光強度（μW/cm²）',
      icon: <Search className="w-5 h-5" />
    },
    {
      title: '驗證實測數據',
      description: '拒絕僅標示「CADR值」的產品',
      example: '要求氣態污染物CADR與副產物濃度報告',
      icon: <Microscope className="w-5 h-5" />
    },
    {
      title: '環境適配性考量',
      description: '台灣高濕環境（RH＞70%）下的選擇',
      example: '選擇沸石+活性炭複合濾材或改性TiO₂光觸媒',
      icon: <Eye className="w-5 h-5" />
    }
  ]

  // 導航項目
  const navItems = [
    { id: 'home', label: '首頁', icon: <Home className="w-4 h-4" /> },
    { id: 'tech', label: '技術對照', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'scam', label: '詐騙核心', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'guide', label: '消費指南', icon: <Users className="w-4 h-4" /> },
    { id: 'magic', label: '魔術真相', icon: <Lightbulb className="w-4 h-4" /> }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 導航欄 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <span>空氣淨化真相</span>
            </div>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id 
                      ? 'bg-red-100 text-red-700' 
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            {/* 移動端菜單按鈕 */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <AlertTriangle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄區塊 */}
      <section id="home" className="pt-24 pb-16 px-4 relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-60"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="destructive" className="mb-6 text-sm animate-bounce">
              <AlertTriangle className="w-4 h-4 mr-1" />
              🚨 詐騙警告
            </Badge>
            
            {/* 主標題 - 分層設計增加震撼感 */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-black text-gray-800 mb-2 tracking-tight">
                空氣淨化界
              </h1>
              <div className="relative mb-4">
                <h1 className="text-5xl md:text-7xl font-black mb-4 relative z-10">
                  <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent drop-shadow-lg">
                    「黑科技」
                  </span>
                </h1>
                {/* 背景陰影效果 */}
                <div className="absolute inset-0 text-5xl md:text-7xl font-black text-red-200 blur-sm transform translate-x-1 translate-y-1 z-0">
                  「黑科技」
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-2">
                <span className="relative">
                  詐騙大揭秘
                  {/* 下劃線效果 */}
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300 opacity-60 transform -rotate-1"></div>
                </span>
              </h1>
            </div>
            
            <div className="relative mb-8">
              <p className="text-2xl md:text-3xl font-bold text-red-600 mb-2 animate-bounce">
                別再被這些話術騙了！
              </p>
              {/* 驚嘆號特效 */}
              <div className="absolute -right-4 -top-2 text-red-500 text-4xl animate-pulse">
                ⚠️
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 mb-8 border border-blue-200 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                空氣淨化技術的本質只有兩種：<br />
                <span className="font-bold text-blue-600">「分解」</span>（需能量與時間） 或 
                <span className="font-bold text-green-600">「吸附」</span>（需表面積與孔隙控制）
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg shadow-lg"
                onClick={() => scrollToSection('tech')}
              >
                立即了解真相
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 text-lg"
                onClick={() => scrollToSection('scam')}
              >
                揭露詐騙核心
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 技術對照表 */}
      <section id="tech" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              常見淨化技術的「魔術與真相」對照表
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              業界長期以「魔術話術」掩蓋科學原理，利用資訊不對稱誤導消費者
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {techComparisonData.map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'danger' ? 'bg-red-100' :
                        item.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                      }`}>
                        {item.icon}
                      </div>
                      <CardTitle className="text-lg">{item.tech}</CardTitle>
                    </div>
                    <Badge 
                      variant={item.status === 'danger' ? 'destructive' : 
                              item.status === 'warning' ? 'secondary' : 'default'}
                    >
                      {item.status === 'danger' ? '危險' : 
                       item.status === 'warning' ? '警告' : '注意'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      廣告話術：
                    </h4>
                    <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">「{item.claim}」</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      真相揭露：
                    </h4>
                    <p className="text-sm text-gray-700 bg-red-50 p-3 rounded-lg">{item.truth}</p>
                  </div>
                  <Alert className={`${
                    item.status === 'danger' ? 'border-red-200 bg-red-50' :
                    item.status === 'warning' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'
                  }`}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {item.warning}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 詐騙核心：滯留時間 */}
      <section id="scam" className="py-16 px-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              被刻意隱藏的詐騙核心：<span className="text-red-600">滯留時間</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              所有淨化反應皆需足夠的「能量」與「接觸時間」，但廠商從不提這關鍵參數！
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              {
                title: '手指快速戳熱水',
                description: '不會燙傷，因停留太短',
                conclusion: '污染物閃電式滑過反應區＝無效！',
                icon: <Clock className="w-8 h-8 text-red-500" />,
                color: 'red'
              },
              {
                title: '強風吹臭魚',
                description: '風量再大，只是擴散臭味',
                conclusion: '高風量＝快速送毒！',
                icon: <Wind className="w-8 h-8 text-orange-500" />,
                color: 'orange'
              },
              {
                title: '抹酒精5秒摸髒物',
                description: '以為消毒，實則無效',
                conclusion: '殺菌需足夠接觸時間與濃度！',
                icon: <Shield className="w-8 h-8 text-yellow-500" />,
                color: 'yellow'
              },
              {
                title: '點火瞬間火星閃過',
                description: '有火但無法煮熟東西',
                conclusion: '反應區無滯留空間＝裝飾！',
                icon: <Zap className="w-8 h-8 text-blue-500" />,
                color: 'blue'
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className={`mb-4 p-4 rounded-full bg-${item.color}-100 w-fit mx-auto`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-sm font-semibold text-red-700">{item.conclusion}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
              <Microscope className="w-6 h-6 mr-2" />
              科學原理
            </h3>
            <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
              <h4 className="font-bold text-lg mb-3">反應動力學公式：</h4>
              <p className="text-lg text-center font-mono bg-white p-4 rounded border shadow-sm">
                污染物去除率 ∝ （反應劑濃度 × 滯留時間 × 能量強度）
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-lg mb-2 text-green-800">實測數據：</h4>
                <ul className="space-y-2 text-sm">
                  <li>• 甲醛與OH•自由基反應需 ＞0.5秒</li>
                  <li>• UV殺菌需 ＞2秒照射時間（WHO標準）</li>
                  <li>• 光觸媒需 ＞1秒接觸時間才有效</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-bold text-lg mb-2 text-orange-800">消費者提問：</h4>
                <p className="text-sm text-gray-700">
                  「污染物在反應區停留多久？能量是否足夠？副產物如何控制？」
                  若廠商無法回答，其技術可能只是「空氣魔術秀」！
                </p>
              </div>
            </div>
          </div>
          
          {/* 新增濾網型淨化章節 */}
          <div className="bg-white rounded-xl p-8 shadow-xl mt-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-red-600 flex items-center justify-center">
              <Target className="w-6 h-6 mr-2" />
              🧠 真相大白：只要是「濾網型淨化」，就逃不過這三個命運
            </h3>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="border-2 border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-red-600" />
                  </div>
                  <CardTitle className="text-red-600">有耗材</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 text-center">
                    「吸附」是暫存，不是分解<br/>
                    放久了，變成污染儲藏室
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-600">有副作用</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 text-center">
                    二次污染、黴菌滋生<br/>
                    濾網只擋不殺
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-yellow-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <XCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                  <CardTitle className="text-yellow-600">有限制</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 text-center">
                    要淨化就得吹大風<br/>
                    高噪音 + 高耗能
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">🦠 二次污染：你買的不是保護罩，而是污染來源</AlertTitle>
                <AlertDescription className="text-red-700 mt-2">
                  <ul className="space-y-1 text-sm">
                    <li>• <strong>反釋污染物</strong>：活性碳釋放已吸附的化學氣體</li>
                    <li>• <strong>黴菌滋生</strong>：高濕環境＋積塵濾網＝霉菌培養皿</li>
                    <li>• <strong>病菌濃縮</strong>：濾網只是阻擋，並未殺死細菌或病毒</li>
                  </ul>
                </AlertDescription>
              </Alert>
              
              <Alert className="border-blue-200 bg-blue-50">
                <Microscope className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">🧪 HEPA 濾網無法處理化學異味？當然！</AlertTitle>
                <AlertDescription className="text-blue-700 mt-2">
                  <div className="text-sm space-y-2">
                    <p><strong>HEPA 設計目標</strong>：攔截粒徑 ≥0.3 微米的固體顆粒</p>
                    <p><strong>但異味分子大小</strong>：</p>
                    <ul className="ml-4 space-y-1">
                      <li>• 甲醛分子：約 0.0004 微米</li>
                      <li>• 氨氣、苯、VOCs：普遍在 0.001–0.005 微米</li>
                    </ul>
                    <p className="font-semibold text-blue-800">📌 用 HEPA 濾網「去異味」，就像拿漁網撈水——完全錯誤的工具！</p>
                  </div>
                </AlertDescription>
              </Alert>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold text-lg mb-2">🔊 CADR 公式揭密</h4>
                <p className="text-center font-mono bg-white p-3 rounded border mb-3">
                  CADR = 淨化效率 × 風量
                </p>
                <p className="text-sm text-gray-700">
                  <strong>高風量＝高耗能＋高噪音</strong>：要「乾淨」，就得「吹大風」；要吹大風，你就得忍受「噪音 + 電費」。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 詐騙金句拆解 */}
      <section id="magic" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              詐騙金句拆解：識破「科技神話」的三大指標
            </h2>
            <p className="text-lg text-gray-600">
              學會這些拆解技巧，再也不會被花俏的技術名詞欺騙
            </p>
          </div>

          <div className="space-y-6">
            {scamPhrases.map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span>{item.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="claim" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="claim">廣告話術</TabsTrigger>
                      <TabsTrigger value="truth">真相揭露</TabsTrigger>
                      <TabsTrigger value="action">行動建議</TabsTrigger>
                    </TabsList>
                    <TabsContent value="claim" className="mt-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-green-800 font-medium">「{item.claim}」</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="truth" className="mt-4">
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-red-800">{item.truth}</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="action" className="mt-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-blue-800">{item.action}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 消費者行動指南 */}
      <section id="guide" className="py-16 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              消費者行動指南：科學導向的選購原則
            </h2>
            <p className="text-lg text-gray-600">
              掌握這些原則，成為聰明的消費者
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {consumerGuide.map((item, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {item.icon}
                    </div>
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">{item.description}</p>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">{item.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">政策倡議與行動方案</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="font-bold text-lg mb-3 text-green-800">推動「全污染物CADR標準」</h4>
                <p className="text-gray-700 mb-3">
                  納入NO₂、VOCs檢測（參考歐盟EN1822）
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 要求標示氣態污染物去除率</li>
                  <li>• 強制檢測副產物濃度</li>
                  <li>• 建立第三方認證機制</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-bold text-lg mb-3 text-blue-800">要求淨化產品揭露副產物安全清單</h4>
                <p className="text-gray-700 mb-3">
                  如NO₂＜50 ppb、O₃＜50 ppb
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 公開反應機制與副產物</li>
                  <li>• 提供長期安全性數據</li>
                  <li>• 建立消費者申訴機制</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 結語 */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              科學是對抗詐騙的唯一武器
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              空氣淨化產業的亂象源於「技術黑箱化」與「文科行銷主導」。
              消費者需掌握基礎科學知識，並要求廠商公開完整實驗數據，
              才能打破「話術詐騙」。
            </p>
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
              <h3 className="text-xl font-bold mb-4">下次遇到天花亂墜的空氣淨化宣傳，請務必問一句：</h3>
              <p className="text-2xl text-red-600 font-bold mb-4">
                「我的污染物，到底去哪了？反應時間夠嗎？」
              </p>
              <p className="text-gray-600 text-lg">
                ——這才是真正保護你和家人健康的第一步。
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => scrollToSection('home')}
              >
                回到頂部
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 頁腳 */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-xl font-bold">空氣淨化真相</span>
          </div>
          <p className="text-gray-400 mb-4">
            致力於揭露空氣淨化產業的詐騙手法，保護消費者權益
          </p>
          <p className="text-sm text-gray-500">
            © 2024 空氣淨化真相網站. 本網站內容僅供教育參考，不構成投資或購買建議。
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

