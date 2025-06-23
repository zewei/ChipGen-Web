import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'zh' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.philosophy': '核心理念',
    'nav.history': '发展历史',
    'nav.projects': '关键项目',
    'nav.technology': '核心技术',
    
    // Homepage
    'home.title': '敏捷芯片开发',
    'home.ai_expert': 'AI专家',
    'home.subtitle': '敏捷芯片开发专家助手',
    'home.description': '与敏捷芯片开发专家AI对话，获取关于SoC设计、RISC-V架构、敏捷方法论等专业知识和指导',
    'home.explore_more': '探索更多内容',
    'home.core_features': '敏捷芯片开发核心特性',
    'home.core_features_desc': '了解敏捷方法如何应用于芯片开发，带来前所未有的效率和创新',
    'home.achievements': '发展成果',
    'home.achievements_desc': '敏捷芯片开发在全球范围内取得的显著成就',
    'home.cta_title': '开始您的敏捷芯片开发之旅',
    'home.cta_desc': '深入了解敏捷方法论，探索成功案例，掌握核心技术，加入全球开源芯片开发社区',
    'home.learn_concepts': '学习核心理念',
    'home.development_history': '了解发展历程',
    
    // Features
    'feature.fast_iteration': '快速迭代',
    'feature.fast_iteration_desc': '通过短周期Sprint实现芯片设计的敏捷开发',
    'feature.collaborative_teams': '协作团队',
    'feature.collaborative_teams_desc': '打破传统孤岛，建立灵活协作的开发团队',
    'feature.advanced_tools': '先进工具',
    'feature.advanced_tools_desc': '采用Chisel、RISC-V等现代化开发工具和平台',
    'feature.success_cases': '成功案例',
    'feature.success_cases_desc': '香山处理器、Berkeley RISC-V等项目验证敏捷方法',
    'common.learn_more': '了解更多',
    
    // Achievements
    'achievement.manifesto': '敏捷硬件宣言发布',
    'achievement.projects': '开源芯片项目',
    'achievement.universities': '知名大学参与',
    'achievement.open_source': '开放源代码',
    
    // Chat
    'chat.expert_title': '敏捷芯片开发专家',
    'chat.expert_subtitle': 'AI助手 · 在线回答',
    'chat.placeholder': '询问敏捷芯片开发相关问题...',
    'chat.send_hint': 'Enter发送',
    'chat.welcome': '您好！我是敏捷芯片开发专家助手。我可以回答关于敏捷硬件开发方法论、SoC设计流程、开源芯片项目等相关问题。请问有什么可以帮助您的吗？',
    
    // Thinking process
    'thinking.analyzing': '🤔 正在分析您的问题，搜索相关的敏捷芯片开发知识...',
    'thinking.consulting': '🔍 正在查阅敏捷硬件宣言和SoC设计最佳实践...',
    'thinking.integrating': '⚡ 正在整合RISC-V、香山处理器等成功案例经验...',
    'thinking.generating': '💡 正在生成专业的技术解答和建议...',
    
    // Chat error messages
    'chat.no_understanding': '抱歉，我没有理解您的问题。请尝试询问关于敏捷芯片开发、SoC设计、或开源芯片项目的问题。',
    'chat.general_help': '很抱歉，我暂时无法回答这个问题。但我可以为您介绍敏捷芯片开发的基本概念、核心工具、成功案例等内容。请尝试询问更具体的问题。'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.philosophy': 'Philosophy',
    'nav.history': 'History',
    'nav.projects': 'Projects',
    'nav.technology': 'Technology',
    
    // Homepage
    'home.title': 'ChipGen',
    'home.ai_expert': 'AI Expert',
    'home.subtitle': 'Agile Chip Development Expert Assistant',
    'home.description': 'Engage with ChipGen AI expert for professional guidance on SoC design, RISC-V architecture, agile methodologies, and cutting-edge chip development practices',
    'home.explore_more': 'Explore More Content',
    'home.core_features': 'Core Features of Agile Chip Development',
    'home.core_features_desc': 'Discover how agile methodologies revolutionize chip development with unprecedented efficiency and innovation',
    'home.achievements': 'Development Achievements',
    'home.achievements_desc': 'Significant milestones achieved by agile chip development worldwide',
    'home.cta_title': 'Start Your Agile Chip Development Journey',
    'home.cta_desc': 'Deep dive into agile methodologies, explore success stories, master core technologies, and join the global open-source chip development community',
    'home.learn_concepts': 'Learn Core Concepts',
    'home.development_history': 'Development History',
    
    // Features
    'feature.fast_iteration': 'Fast Iteration',
    'feature.fast_iteration_desc': 'Achieve agile chip design through short-cycle Sprints',
    'feature.collaborative_teams': 'Collaborative Teams',
    'feature.collaborative_teams_desc': 'Break traditional silos, build flexible collaborative development teams',
    'feature.advanced_tools': 'Advanced Tools',
    'feature.advanced_tools_desc': 'Leverage modern development tools and platforms like Chisel and RISC-V',
    'feature.success_cases': 'Success Cases',
    'feature.success_cases_desc': 'Proven agile methods through projects like Xiangshan and Berkeley RISC-V',
    'common.learn_more': 'Learn More',
    
    // Achievements
    'achievement.manifesto': 'Agile Hardware Manifesto Published',
    'achievement.projects': 'Open Source Chip Projects',
    'achievement.universities': 'Leading Universities Involved',
    'achievement.open_source': 'Open Source Code',
    
    // Chat
    'chat.expert_title': 'ChipGen Expert',
    'chat.expert_subtitle': 'AI Assistant · Online',
    'chat.placeholder': 'Ask questions about agile chip development...',
    'chat.send_hint': 'Press Enter',
    'chat.welcome': 'Hello! I\'m your ChipGen expert assistant. I can answer questions about agile hardware development methodologies, SoC design processes, open-source chip projects, and more. How can I help you today?',
    
    // Thinking process
    'thinking.analyzing': '🤔 Analyzing your question and searching relevant agile chip development knowledge...',
    'thinking.consulting': '🔍 Consulting agile hardware manifesto and SoC design best practices...',
    'thinking.integrating': '⚡ Integrating experiences from RISC-V, Xiangshan processor and other success cases...',
    'thinking.generating': '💡 Generating professional technical insights and recommendations...',
    
    // Chat error messages
    'chat.no_understanding': 'Sorry, I didn\'t understand your question. Please try asking about agile chip development, SoC design, or open-source chip projects.',
    'chat.general_help': 'I apologize, but I cannot answer this question at the moment. However, I can introduce you to the basic concepts, core tools, and success stories of agile chip development. Please try asking more specific questions.'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
