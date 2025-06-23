import { useState, useEffect } from 'react'
import { BookOpen, Target, Users, Code, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

interface PhilosophySection {
  id: string
  title: string
  content: string
  subsections?: Array<{
    title: string
    content: string
  }>
}

interface WebsiteContent {
  sections: PhilosophySection[]
}

export function PhilosophyPage() {
  const [content, setContent] = useState<WebsiteContent | null>(null)

  useEffect(() => {
    fetch('/data/agile_chip_website_content.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Failed to load content:', error))
  }, [])

  const philosophySection = content?.sections.find(section => section.id === 'philosophy')

  const principles = [
    {
      icon: <Target className="h-8 w-8 text-blue-400" />,
      title: "可工作的原型优于全面的文档",
      description: "注重快速构建可验证的硬件原型，而非完美的设计文档"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: "协作灵活的团队优于僵化的孤岛",
      description: "打破传统部门壁垒，建立跨学科协作的敏捷团队"
    },
    {
      icon: <Code className="h-8 w-8 text-blue-400" />,
      title: "改进工具和生成器优于改进实例",
      description: "投资于开发工具和自动化，提高整体开发效率"
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-blue-400" />,
      title: "响应变化优于遵循计划",
      description: "保持灵活性，能够快速适应需求变化和技术发展"
    }
  ]

  const methodologies = [
    {
      name: "Scrum for Hardware",
      description: "将Scrum框架应用于硬件开发",
      color: "bg-blue-500"
    },
    {
      name: "测试驱动开发",
      description: "TDD方法在硬件设计中的应用",
      color: "bg-green-500"
    },
    {
      name: "持续集成/验证",
      description: "CI/CV在芯片开发中的实践",
      color: "bg-purple-500"
    },
    {
      name: "模型驱动开发",
      description: "MDD提高设计抽象层次",
      color: "bg-orange-500"
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4 mr-2" />
            核心理念与方法论
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            敏捷芯片开发
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              核心理念
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {philosophySection?.content || "敏捷芯片开发借鉴了软件工程的敏捷思想，旨在应对传统芯片开发模式的挑战。"}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-20">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="/images/agile-team.jpeg" 
              alt="Agile Development Team"
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
          </div>
        </div>

        {/* Agile Hardware Manifesto */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            敏捷硬件宣言
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <Card key={index} className="bg-slate-800/80 border-blue-700/30 hover:border-blue-600/50 transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-900/30 rounded-lg">
                      {principle.icon}
                    </div>
                    <CardTitle className="text-white text-lg leading-tight">
                      {principle.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Methodologies Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            关键方法论
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {methodologies.map((methodology, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className={`w-3 h-3 rounded-full ${methodology.color}`}></div>
                <div>
                  <h3 className="text-white font-semibold">{methodology.name}</h3>
                  <p className="text-gray-400 text-sm">{methodology.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Methodologies */}
          <div className="space-y-8">
            {philosophySection?.subsections?.map((subsection, index) => (
              <Card key={index} className="bg-slate-800/60 border-blue-700/20">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge variant="outline" className="mr-3 border-blue-600 text-blue-400">
                      {index + 1}
                    </Badge>
                    {subsection.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {subsection.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gradient-to-r from-blue-900/20 to-slate-800/20 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            敏捷方法的优势
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">提高效率</h3>
              <p className="text-gray-300">
                通过短周期迭代和快速反馈，大幅缩短开发周期
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">降低风险</h3>
              <p className="text-gray-300">
                早期验证和持续测试，及时发现和解决问题
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">增强创新</h3>
              <p className="text-gray-300">
                灵活响应变化，促进创新思维和技术探索
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
