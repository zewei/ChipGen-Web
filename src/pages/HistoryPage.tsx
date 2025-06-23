import { useState, useEffect } from 'react'
import { Calendar, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { useLanguage } from '../contexts/LanguageContext'

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
  const { language, t } = useLanguage()

  useEffect(() => {
    fetch('/data/agile_chip_website_content.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Failed to load content:', error))
  }, [])

  const historySection = content?.sections.find(section => section.id === 'history')

  const keyMilestones = [
    {
      year: '2001',
      title: t('history.milestone.2001.title'),
      description: t('history.milestone.2001.desc'),
      impact: t('history.milestone.2001.impact'),
      color: 'bg-blue-500'
    },
    {
      year: '2010',
      title: t('history.milestone.2010.title'),
      description: t('history.milestone.2010.desc'),
      impact: t('history.milestone.2010.impact'),
      color: 'bg-green-500'
    },
    {
      year: '2016',
      title: t('history.milestone.2016.title'),
      description: t('history.milestone.2016.desc'),
      impact: t('history.milestone.2016.impact'),
      color: 'bg-purple-500'
    },
    {
      year: '2019',
      title: t('history.milestone.2019.title'),
      description: t('history.milestone.2019.desc'),
      impact: t('history.milestone.2019.impact'),
      color: 'bg-orange-500'
    },
    {
      year: '2020+',
      title: t('history.milestone.2020.title'),
      description: t('history.milestone.2020.desc'),
      impact: t('history.milestone.2020.impact'),
      color: 'bg-red-500'
    }
  ]

  const evolutionPhases = [0, 1, 2].map(i => ({
    phase: t(`history.phase.${i}`),
    period: t(`history.phase.${i}.period`),
    description: t(`history.phase.${i}.desc`),
    characteristics: [0, 1, 2].map(j => t(`history.phase.${i}.char.${j}`))
  }))

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            {t('history.hero_tag')}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('history.hero_title')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {t('history.hero_subtitle')}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {historySection?.content || t('history.intro')}
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
              <h3 className="text-2xl font-bold text-white mb-2">{t('history.hero_img_title')}</h3>
              <p className="text-blue-200">{t('history.hero_img_desc')}</p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {t('history.timeline_title')}
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
            {t('history.evolution_title')}
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
                    <h4 className="text-white font-semibold text-sm">{t('history.evolution_feature')}</h4>
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
              {t('history.detail_timeline')}
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
              {t('history.future_title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('history.future_desc')}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
