import { useState, useEffect } from 'react'
import { Settings, Code2, GitBranch, Zap, Database, Terminal } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

interface Technology {
  name: string
  category: string
}

interface ProjectsSection {
  id: string
  title: string
  content: string
  key_technologies?: Technology[]
}

interface WebsiteContent {
  sections: ProjectsSection[]
}

export function TechnologyPage() {
  const [content, setContent] = useState<WebsiteContent | null>(null)

  useEffect(() => {
    fetch('/data/agile_chip_website_content.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Failed to load content:', error))
  }, [])

  const projectsSection = content?.sections.find(section => section.id === 'projects')

  const technologyDetails = {
    "Chisel/FIRRTL": {
      icon: <Code2 className="h-8 w-8 text-blue-400" />,
      description: "基于Scala的现代硬件构造语言，支持高层次抽象和参数化设计",
      features: ["类型安全的硬件描述", "强大的参数化能力", "自动生成Verilog", "内置验证框架"],
      useCases: ["处理器设计", "系统级芯片", "IP核开发", "原型验证"]
    },
    "Python (PyMTL, PyRTL)": {
      icon: <Terminal className="h-8 w-8 text-green-400" />,
      description: "Python生态中的硬件建模和自动化工具，提供灵活的脚本化解决方案",
      features: ["PyMTL建模框架", "PyRTL硬件描述", "丰富的库生态", "易于集成"],
      useCases: ["快速原型", "测试生成", "设计自动化", "数据分析"]
    },
    "Git": {
      icon: <GitBranch className="h-8 w-8 text-purple-400" />,
      description: "分布式版本控制系统，支持硬件设计的协作开发和版本管理",
      features: ["分支管理", "合并冲突解决", "历史追踪", "协作开发"],
      useCases: ["代码版本控制", "团队协作", "发布管理", "回退机制"]
    },
    "Jenkins, GitLab CI": {
      icon: <Zap className="h-8 w-8 text-orange-400" />,
      description: "持续集成/持续部署工具，实现硬件设计流程的自动化",
      features: ["自动化构建", "测试执行", "部署管道", "通知机制"],
      useCases: ["自动编译", "回归测试", "流片准备", "质量保证"]
    },
    "QEMU, KVM": {
      icon: <Database className="h-8 w-8 text-red-400" />,
      description: "虚拟化和仿真平台，支持软硬件协同开发和验证",
      features: ["全系统仿真", "硬件虚拟化", "调试支持", "性能分析"],
      useCases: ["系统级验证", "软件调试", "性能评估", "早期开发"]
    },
    "OpenROAD, Yosys": {
      icon: <Settings className="h-8 w-8 text-cyan-400" />,
      description: "开源EDA工具链，提供从RTL到GDSII的完整设计流程",
      features: ["逻辑综合", "布局布线", "时序分析", "功耗优化"],
      useCases: ["芯片实现", "面积优化", "时序收敛", "工艺迁移"]
    }
  }

  const developmentStages = [
    {
      stage: "需求分析",
      description: "敏捷方法强调快速响应需求变化",
      tools: ["用户故事", "迭代规划", "需求追踪"],
      color: "border-blue-500"
    },
    {
      stage: "架构设计", 
      description: "采用模块化、参数化的设计思路",
      tools: ["Chisel", "SystemVerilog", "高层建模"],
      color: "border-green-500"
    },
    {
      stage: "编码实现",
      description: "使用现代HDL和自动化工具",
      tools: ["Chisel/FIRRTL", "Python脚本", "代码生成"],
      color: "border-purple-500"
    },
    {
      stage: "验证测试",
      description: "测试驱动开发和持续验证",
      tools: ["单元测试", "集成测试", "形式化验证"],
      color: "border-orange-500"
    },
    {
      stage: "集成部署",
      description: "持续集成和自动化流程",
      tools: ["Jenkins", "GitLab CI", "自动化脚本"],
      color: "border-red-500"
    },
    {
      stage: "迭代优化",
      description: "基于反馈持续改进设计",
      tools: ["性能分析", "面积优化", "功耗优化"],
      color: "border-cyan-500"
    }
  ]

  const bestPractices = [
    {
      title: "版本控制最佳实践",
      items: [
        "使用Git进行代码版本管理",
        "采用分支策略管理功能开发",
        "编写清晰的提交信息", 
        "定期进行代码审查"
      ]
    },
    {
      title: "持续集成流程",
      items: [
        "自动化编译和语法检查",
        "运行回归测试套件",
        "生成测试覆盖率报告",
        "自动部署到测试环境"
      ]
    },
    {
      title: "测试驱动开发",
      items: [
        "先编写测试用例再实现功能",
        "保持高的测试覆盖率",
        "使用形式化验证方法",
        "建立完整的测试基础设施"
      ]
    },
    {
      title: "团队协作规范",
      items: [
        "建立清晰的编码规范",
        "定期举行技术分享会议",
        "使用敏捷开发方法论",
        "保持开放的沟通文化"
      ]
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium mb-6">
            <Settings className="h-4 w-4 mr-2" />
            核心技术
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            技术
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              工具链
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            深入了解敏捷芯片开发所依托的现代化技术栈，从高级硬件描述语言到自动化工具链的完整生态系统。
          </p>
        </div>

        {/* Technology Overview */}
        <section className="mb-20">
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-800">
              <TabsTrigger value="tools" className="data-[state=active]:bg-blue-600">核心工具</TabsTrigger>
              <TabsTrigger value="workflow" className="data-[state=active]:bg-blue-600">开发流程</TabsTrigger>
              <TabsTrigger value="practices" className="data-[state=active]:bg-blue-600">最佳实践</TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries(technologyDetails).map(([name, details]) => (
                  <Card key={name} className="bg-slate-800/80 border-blue-700/30 hover:border-blue-600/50 transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-slate-700/50 rounded-lg">
                          {details.icon}
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{name}</CardTitle>
                          <Badge variant="outline" className="border-blue-600 text-blue-400 text-xs mt-1">
                            {projectsSection?.key_technologies?.find(t => t.name === name)?.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 leading-relaxed mb-4">
                        {details.description}
                      </CardDescription>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-2">主要特性：</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {details.features.map((feature, index) => (
                              <div key={index} className="text-gray-400 text-xs flex items-center">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-2">应用场景：</h4>
                          <div className="flex flex-wrap gap-1">
                            {details.useCases.map((useCase, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {useCase}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {developmentStages.map((stage, index) => (
                  <Card key={index} className={`bg-slate-800/80 border-2 ${stage.color} transition-all duration-200 hover:shadow-lg`}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <CardTitle className="text-white text-lg">
                          {stage.stage}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 leading-relaxed mb-4">
                        {stage.description}
                      </CardDescription>
                      
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-2">关键工具：</h4>
                        <ul className="space-y-1">
                          {stage.tools.map((tool, toolIndex) => (
                            <li key={toolIndex} className="text-gray-400 text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practices" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {bestPractices.map((practice, index) => (
                  <Card key={index} className="bg-slate-800/80 border-blue-700/30">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">
                        {practice.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {practice.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-300 flex items-start">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Technology Stack Visualization */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            技术栈架构
          </h2>
          
          <div className="relative">
            <img 
              src="/images/circuit-board.webp" 
              alt="Technology Stack"
              className="w-full h-64 lg:h-80 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent rounded-2xl"></div>
            
            {/* Technology Layers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-bold text-white mb-6">分层技术架构</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                  <div className="bg-blue-900/70 backdrop-blur-sm rounded-lg p-4 border border-blue-600/50">
                    <h4 className="text-white font-semibold mb-2">开发层</h4>
                    <p className="text-blue-200 text-sm">Chisel, Python, HDL</p>
                  </div>
                  <div className="bg-blue-900/70 backdrop-blur-sm rounded-lg p-4 border border-blue-600/50">
                    <h4 className="text-white font-semibold mb-2">工具层</h4>
                    <p className="text-blue-200 text-sm">Git, CI/CD, 仿真</p>
                  </div>
                  <div className="bg-blue-900/70 backdrop-blur-sm rounded-lg p-4 border border-blue-600/50">
                    <h4 className="text-white font-semibold mb-2">实现层</h4>
                    <p className="text-blue-200 text-sm">EDA, 综合, 布局</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Technologies */}
        <section className="bg-gradient-to-r from-blue-900/20 to-slate-800/20 rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <Code2 className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">
              未来技术趋势
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              随着AI技术的发展，机器学习将深度融入芯片设计流程，包括智能布局布线、自动化验证、
              设计空间探索等领域。同时，云原生EDA工具和分布式计算将进一步提升开发效率。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🤖</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">AI辅助设计</h3>
                <p className="text-gray-400 text-sm">机器学习优化设计流程</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">☁️</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">云原生EDA</h3>
                <p className="text-gray-400 text-sm">弹性扩展的设计工具</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔗</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">开放生态</h3>
                <p className="text-gray-400 text-sm">标准化的协作平台</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
