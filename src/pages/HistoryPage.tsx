import { useState, useEffect } from 'react'
import { Calendar, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

interface TimelineEvent {
  year: string
  event: string
}

interface HistorySection {
  id: string
  title: string
  content: string
  timeline?: TimelineEvent[]
}

interface WebsiteContent {
  sections: HistorySection[]
}

export function HistoryPage() {
  const [content, setContent] = useState<WebsiteContent | null>(null)

  useEffect(() => {
    fetch('/data/agile_chip_website_content.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Failed to load content:', error))
  }, [])

  const historySection = content?.sections.find(section => section.id === 'history')

  const keyMilestones = [
    {
      year: "2001",
      title: "敏捷宣言诞生",
      description: "软件工程领域发布敏捷宣言，为后续硬件敏捷开发奠定理论基础",
      impact: "理论基础",
      color: "bg-blue-500"
    },
    {
      year: "2010",
      title: "Chisel语言发布",
      description: "UC Berkeley发布Chisel硬件构造语言，提供敏捷硬件开发的关键工具",
      impact: "工具创新",
      color: "bg-green-500"
    },
    {
      year: "2016",
      title: "敏捷硬件宣言",
      description: "加州大学伯克利分校正式提出敏捷硬件宣言，标志着敏捷理念系统性应用于硬件",
      impact: "方法论确立",
      color: "bg-purple-500"
    },
    {
      year: "2019",
      title: "RISC-V生态繁荣",
      description: "RISC-V指令集架构成熟，为敏捷芯片开发提供开放平台",
      impact: "生态建设",
      color: "bg-orange-500"
    },
    {
      year: "2020+",
      title: "全球化应用",
      description: "香山处理器等项目证明敏捷方法在大型芯片项目中的成功应用",
      impact: "产业验证",
      color: "bg-red-500"
    }
  ]

  const evolutionPhases = [
    {
      phase: "萌芽期",
      period: "2001-2010",
      description: "软件敏捷方法论成熟，开始探索在硬件领域的应用可能性",
      characteristics: ["理论探索", "工具缺乏", "概念验证"]
    },
    {
      phase: "发展期",
      period: "2010-2016",
      description: "关键工具如Chisel出现，学术界开始系统性研究硬件敏捷开发",
      characteristics: ["工具涌现", "学术研究", "小规模实践"]
    },
    {
      phase: "成熟期",
      period: "2016-至今",
      description: "敏捷硬件宣言发布，大型开源项目验证方法论可行性",
      characteristics: ["方法论确立", "生态完善", "产业应用"]
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            发展历史
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            敏捷芯片开发
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              发展历程
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {historySection?.content || "追溯敏捷方法论在芯片开发领域的演进历程，了解关键里程碑和发展趋势。"}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-20">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="/images/silicon-wafer.jpg" 
              alt="Silicon Wafer"
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white mb-2">从软件到硬件的敏捷之路</h3>
              <p className="text-blue-200">见证芯片设计方法论的革命性变革</p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            关键时间节点
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            <div className="space-y-12">
              {keyMilestones.map((milestone, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Timeline dot */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full ${milestone.color} border-4 border-slate-900 z-10`}></div>
                  
                  {/* Content */}
                  <div className="ml-20">
                    <Card className="bg-slate-800/80 border-blue-700/30 hover:border-blue-600/50 transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-xl">
                            {milestone.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="border-blue-600 text-blue-400">
                              {milestone.year}
                            </Badge>
                            <Badge className={`${milestone.color} text-white`}>
                              {milestone.impact}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-300 leading-relaxed">
                          {milestone.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evolution Phases */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            发展阶段
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {evolutionPhases.map((phase, index) => (
              <Card key={index} className="bg-slate-800/80 border-blue-700/30 hover:border-blue-600/50 transition-all duration-200 group">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-white text-xl">
                      {phase.phase}
                    </CardTitle>
                  </div>
                  <div className="flex items-center text-blue-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {phase.period}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    {phase.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="text-white font-semibold text-sm">主要特征：</h4>
                    <ul className="space-y-1">
                      {phase.characteristics.map((char, charIndex) => (
                        <li key={charIndex} className="text-gray-400 text-sm flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Original Timeline from Data */}
        {historySection?.timeline && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              详细时间线
            </h2>
            
            <div className="space-y-6">
              {historySection.timeline.map((event, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex-shrink-0">
                    <Badge variant="outline" className="border-blue-600 text-blue-400 text-lg px-3 py-1">
                      {event.year}
                    </Badge>
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    {event.event}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Future Outlook */}
        <section className="bg-gradient-to-r from-blue-900/20 to-slate-800/20 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <TrendingUp className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">
              未来展望
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              随着开源EDA工具的成熟、AI技术的融入以及更多成功案例的涌现，
              敏捷芯片开发方法论将在未来十年内成为业界主流，
              推动整个半导体行业向着更加开放、高效、创新的方向发展。
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
