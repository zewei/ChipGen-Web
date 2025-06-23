import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Users, Code, Cpu, CheckCircle, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { AgileChipExpertChat } from '../components/AgileChipExpertChat'
import { useLanguage } from '../contexts/LanguageContext'

interface WebsiteContent {
  title: string
  introduction: string
  sections: Array<{
    id: string
    title: string
    content: string
  }>
}

export function HomePage() {
  const [content, setContent] = useState<WebsiteContent | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    fetch('/data/agile_chip_website_content.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Failed to load content:', error))
  }, [])

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: t('feature.fast_iteration'),
      description: t('feature.fast_iteration_desc'),
      link: "/philosophy"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-400" />,
      title: t('feature.collaborative_teams'), 
      description: t('feature.collaborative_teams_desc'),
      link: "/philosophy"
    },
    {
      icon: <Code className="h-8 w-8 text-blue-400" />,
      title: t('feature.advanced_tools'),
      description: t('feature.advanced_tools_desc'),
      link: "/technology"
    },
    {
      icon: <Cpu className="h-8 w-8 text-blue-400" />,
      title: t('feature.success_cases'),
      description: t('feature.success_cases_desc'),
      link: "/projects"
    }
  ]

  const achievements = [
    { value: "2016", label: t('achievement.manifesto') },
    { value: "50+", label: t('achievement.projects') },
    { value: "10+", label: t('achievement.universities') },
    { value: "100%", label: t('achievement.open_source') }
  ]

  return (
    <div className="relative">
      {/* Hero Chat Section */}
      <section className="relative overflow-hidden">
        {/* Background for hero section only */}
        <div className="absolute inset-0">
          <img 
            src="/images/tech-bg.jpg" 
            alt="Technology Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/80 to-indigo-900/80"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/50 text-blue-300 text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              {t('home.subtitle')}
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {t('home.title')}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {t('home.ai_expert')}
              </span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('home.description')}
            </p>
          </div>

          {/* Chat Interface - Always Visible */}
          <div className="max-w-4xl mx-auto block">
            <AgileChipExpertChat />
          </div>

          {/* Quick Navigation */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">{t('home.explore_more')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
                <Link to="/philosophy">{t('nav.philosophy')}</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
                <Link to="/history">{t('nav.history')}</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
                <Link to="/projects">{t('nav.projects')}</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
                <Link to="/technology">{t('nav.technology')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('home.core_features')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('home.core_features_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/80 border-blue-700/30 hover:border-blue-600/50 transition-all duration-200 hover:shadow-xl group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-blue-900/30 rounded-xl w-fit group-hover:bg-blue-900/50 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button asChild variant="ghost" size="sm" className="w-full text-blue-400 hover:text-blue-300">
                    <Link to={feature.link}>{t('common.learn_more')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('home.achievements')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('home.achievements_desc')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">
                  {achievement.value}
                </div>
                <div className="text-gray-300 text-lg">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('home.cta_title')}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {t('home.cta_desc')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/philosophy">
                {t('home.learn_concepts')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
              <Link to="/history">{t('home.development_history')}</Link>
            </Button>
          </div>
        </div>
      </section>


    </div>
  )
}
