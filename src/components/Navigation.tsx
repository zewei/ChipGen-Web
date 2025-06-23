import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Cpu, Globe } from 'lucide-react'
import { Button } from './ui/button'
import { useLanguage } from '../contexts/LanguageContext'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/philosophy', label: t('nav.philosophy') },
    { path: '/history', label: t('nav.history') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/technology', label: t('nav.technology') },
  ]

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-blue-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
            <Cpu className="h-8 w-8" />
            <span className="text-xl font-bold">{t('home.title')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-400 bg-blue-900/30'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-blue-900/20'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="text-gray-300 hover:text-blue-400 flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language === 'zh' ? 'EN' : '中文'}</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="text-gray-300 hover:text-blue-400"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-blue-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 rounded-lg mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-400 bg-blue-900/30'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-900/20'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
