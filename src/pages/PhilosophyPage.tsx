import { useState, useEffect } from 'react'
import { BookOpen, Target, Users, Code, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useLanguage } from '../contexts/LanguageContext'

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
  const { language, t } = useLanguage()

  useEffect(() => {
    fetch('/data/agile_chip_website_content.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Failed to load content:', error))
  }, [])

  const philosophySection = content?.sections.find(section => section.id === 'philosophy')

  const principles = [0, 1, 2, 3].map(i => ({
    icon: [<Target className="h-8 w-8 text-blue-400" />, <Users className="h-8 w-8 text-blue-400" />, <Code className="h-8 w-8 text-blue-400" />, <RefreshCw className="h-8 w-8 text-blue-400" />][i],
    title: t(`philosophy.principle.${i}.title`),
    description: t(`philosophy.principle.${i}.desc`)
  }))

  const methodologies = [0, 1, 2, 3].map(i => ({
    name: t(`philosophy.method.${i}.name`),
    description: t(`philosophy.method.${i}.desc`),
    color: ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"][i]
  }))

  const benefits = [0, 1, 2].map(i => ({
    icon: [<span className="text-2xl font-bold text-white">⚡</span>, <span className="text-2xl font-bold text-white">🎯</span>, <span className="text-2xl font-bold text-white">🚀</span>][i],
    color: ["bg-blue-600", "bg-green-600", "bg-purple-600"][i],
    title: t(`philosophy.benefit.${i}.title`),
    desc: t(`philosophy.benefit.${i}.desc`)
  }))

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium mb-6">
            <BookOpen className="h-4 w-4 mr-2" />
            {t('philosophy.hero_tag')}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('philosophy.hero_title')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('philosophy.hero_subtitle')}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {philosophySection?.content || t('philosophy.intro')}
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
            {t('philosophy.manifesto_title')}
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
            {t('philosophy.methodologies_title')}
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
            {t('philosophy.benefits_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div className="text-center" key={index}>
                <div className={`w-16 h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
