import { useState, useEffect } from 'react'
import { ExternalLink, Github, Star, Rocket, Cpu, Code } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

interface CaseStudy {
  name: string
  organization: string
  description: string
  url: string
}

interface Technology {
  name: string
  category: string
}

interface ProjectsSection {
  id: string
  title: string
  content: string
  case_studies?: CaseStudy[]
  key_technologies?: Technology[]
}

interface WebsiteContent {
  sections: ProjectsSection[]
}

export function ProjectsPage() {
  const [content, setContent] = useState<WebsiteContent | null>(null)

  useEffect(() => {
    fetch('/data/agile_chip_website_content.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Failed to load content:', error))
  }, [])

  const projectsSection = content?.sections.find(section => section.id === 'projects')

  const categoryColors: { [key: string]: string } = {
    "高级硬件构造语言": "bg-blue-500",
    "脚本与自动化": "bg-green-500", 
    "版本控制": "bg-purple-500",
    "持续集成": "bg-orange-500",
    "虚拟化与仿真": "bg-red-500",
    "开源EDA": "bg-cyan-500"
  }

  const projectIcons: { [key: string]: JSX.Element } = {
    "香山": <Cpu className="h-6 w-6" />,
    "UC Berkeley": <Star className="h-6 w-6" />,
    "OpenPiton": <Code className="h-6 w-6" />,
    "ESP": <Rocket className="h-6 w-6" />
  }

  const getProjectIcon = (name: string) => {
    const key = Object.keys(projectIcons).find(k => name.includes(k))
    return key ? projectIcons[key] : <Github className="h-6 w-6" />
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium mb-6">
            <Rocket className="h-4 w-4 mr-2" />
            关键项目与技术
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            成功
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              案例展示
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {projectsSection?.content || "探索全球范围内敏捷芯片开发的成功项目，了解先进技术和工具的实际应用。"}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-20">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="/images/riscv-arch.png" 
              alt="RISC-V Architecture"
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white mb-2">开源驱动创新</h3>
              <p className="text-blue-200">RISC-V生态推动敏捷芯片开发蓬勃发展</p>
            </div>
          </div>
        </div>

        {/* Case Studies Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            成功案例
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsSection?.case_studies?.map((project, index) => (
              <Card key={index} className="bg-slate-800/80 border-blue-700/30 hover:border-blue-600/50 transition-all duration-200 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-900/30 rounded-lg group-hover:bg-blue-900/50 transition-colors">
                        {getProjectIcon(project.name)}
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl mb-1">
                          {project.name}
                        </CardTitle>
                        <Badge variant="outline" className="border-blue-600 text-blue-400 text-sm">
                          {project.organization}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    {project.description}
                  </CardDescription>
                  <Button 
                    asChild 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      访问项目
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Technologies Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            核心技术栈
          </h2>
          
          <div className="mb-8">
            <p className="text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
              敏捷芯片开发依托于现代化的工具链和技术栈，这些技术为快速迭代、自动化验证和协作开发提供了强有力的支撑。
            </p>
          </div>

          {/* Technology Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(
              projectsSection?.key_technologies?.reduce((acc, tech) => {
                if (!acc[tech.category]) {
                  acc[tech.category] = []
                }
                acc[tech.category].push(tech)
                return acc
              }, {} as { [key: string]: Technology[] }) || {}
            ).map(([category, technologies]) => (
              <Card key={category} className="bg-slate-800/60 border-blue-700/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${categoryColors[category] || 'bg-gray-500'}`}></div>
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                        <span className="text-gray-300 text-sm">{tech.name}</span>
                        <div className={`w-2 h-2 rounded-full ${categoryColors[category] || 'bg-gray-500'}`}></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Highlights */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            技术亮点
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-900/30 to-slate-800/30 rounded-xl border border-blue-700/30">
                <h3 className="text-xl font-bold text-white mb-3">Chisel/FIRRTL</h3>
                <p className="text-gray-300 leading-relaxed">
                  基于Scala的现代硬件构造语言，提供强大的参数化设计能力，
                  支持高层次抽象和代码生成，是敏捷硬件开发的核心使能技术。
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-900/30 to-slate-800/30 rounded-xl border border-green-700/30">
                <h3 className="text-xl font-bold text-white mb-3">持续集成/验证</h3>
                <p className="text-gray-300 leading-relaxed">
                  通过Jenkins、GitLab CI等工具建立自动化工作流，
                  实现代码提交后的自动编译、仿真和验证，确保快速反馈。
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-purple-900/30 to-slate-800/30 rounded-xl border border-purple-700/30">
                <h3 className="text-xl font-bold text-white mb-3">开源EDA工具</h3>
                <p className="text-gray-300 leading-relaxed">
                  OpenROAD、Yosys等开源工具链降低了准入门槛，
                  支持完全开放的设计流程，促进创新和协作。
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-orange-900/30 to-slate-800/30 rounded-xl border border-orange-700/30">
                <h3 className="text-xl font-bold text-white mb-3">虚拟化仿真</h3>
                <p className="text-gray-300 leading-relaxed">
                  利用QEMU、KVM等虚拟化技术进行软硬件协同仿真，
                  在早期阶段验证系统级功能和性能。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Circuit Board Image */}
        <section className="mb-20">
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="/images/circuit-board.webp" 
              alt="Circuit Board Development"
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-4">现代化开发环境</h3>
                <p className="text-xl text-blue-200 max-w-2xl">
                  集成先进工具链，实现从设计到验证的全流程自动化
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-900/20 to-slate-800/20 rounded-2xl p-8 lg:p-12 text-center">
          <Github className="h-16 w-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">
            加入开源生态
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            这些成功项目展示了敏捷芯片开发的巨大潜力。
            通过参与开源社区，您也可以成为推动硬件开发创新的一份子。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Github className="h-5 w-5 mr-2" />
              探索开源项目
            </Button>
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
              了解技术详情
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
