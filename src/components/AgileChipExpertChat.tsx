import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, Bot, User, Sparkles, Cpu, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'
import { useLanguage } from '../contexts/LanguageContext'

interface Message {
  id: string
  type: 'user' | 'agent' | 'thinking'
  content: string
  timestamp: Date
  isThinking?: boolean
}

interface KnowledgeItem {
  question: string
  answer: string
  keywords?: string[]
}

export function AgileChipExpertChat() {
  const { language, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([{
      id: '1',
      type: 'agent',
      content: t('chat.welcome'),
      timestamp: new Date()
    }])
  }, [language, t])

  // Load knowledge base
  useEffect(() => {
    const kbFile = language === 'zh' ? 'agile_chip_chatbot_kb.json' : 'chipgen_chatbot_kb_en.json'
    fetch(`/data/${kbFile}`)
      .then(response => response.json())
      .then(data => {
        if (data.qa_pairs && Array.isArray(data.qa_pairs)) {
          setKnowledgeBase(data.qa_pairs)
        } else if (Array.isArray(data)) {
          setKnowledgeBase(data)
        }
      })
      .catch(error => console.error('Failed to load knowledge base:', error))
  }, [language])

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Advanced knowledge search function
  const searchKnowledge = (query: string): string => {
    if (!query.trim() || knowledgeBase.length === 0) {
      return t('chat.no_understanding')
    }

    const queryLower = query.toLowerCase()
    
    // Exact match first
    const exactMatch = knowledgeBase.find(item => 
      item.question.toLowerCase().includes(queryLower) ||
      queryLower.includes(item.question.toLowerCase())
    )
    
    if (exactMatch) return exactMatch.answer

    // Keyword matching (if keywords exist)
    const keywordMatches = knowledgeBase.filter(item =>
      item.keywords && item.keywords.some(keyword => 
        queryLower.includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(queryLower)
      )
    )

    if (keywordMatches.length > 0) {
      return keywordMatches[0].answer
    }

    // Content-based matching for questions and answers
    const contentMatches = knowledgeBase.filter(item => {
      const questionLower = item.question.toLowerCase()
      const answerLower = item.answer.toLowerCase()
      
      // Check if query words appear in question or answer
      const queryWords = queryLower.split(/\s+/).filter(word => word.length > 1)
      return queryWords.some(word => 
        questionLower.includes(word) || answerLower.includes(word)
      )
    })

    if (contentMatches.length > 0) {
      // Return the best match
      return contentMatches[0].answer
    }

    // Fuzzy matching for common topics
    const topics = [
      { keywords: ['敏捷', 'agile', '迭代', '快速'], answer: "敏捷芯片开发是一种借鉴软件工程敏捷思想的硬件设计方法论。它强调通过快速迭代、紧密协作、持续验证和高度自动化来应对传统芯片开发的挑战，目标是更快、更灵活地交付高质量芯片。核心原则包括：1）个体和交互胜过过程和工具；2）可工作的软硬件胜过详尽的文档；3）客户协作胜过合同谈判；4）响应变化胜过遵循计划。" },
      { keywords: ['soc', '芯片', 'chip', '处理器'], answer: "SoC（System-on-Chip）是在单个芯片上集成了完整系统功能的集成电路。在敏捷开发中，SoC设计采用模块化、可重用的IP组件，支持并行开发和快速原型验证。主要特点包括：1）系统级设计；2）IP复用；3）并行开发；4）快速验证；5）持续集成。" },
      { keywords: ['risc-v', 'riscv', '开源', '香山'], answer: "RISC-V是推动敏捷芯片开发的重要开源指令集架构。香山处理器是中科院计算所基于RISC-V架构开发的高性能处理器，采用敏捷开发方法论，通过Chisel硬件描述语言、Git版本控制、持续集成等工具实现快速迭代和验证。" },
      { keywords: ['工具', 'chisel', 'firrtl', '开发'], answer: "敏捷芯片开发采用现代化的工具链：1）Chisel/FIRRTL用于高级硬件描述；2）Git进行版本控制和协作；3）Jenkins/GitLab CI实现持续集成；4）Docker确保环境一致性；5）Verilator等进行快速仿真验证。这些工具支持自动化、可重复的开发流程。" }
    ]

    for (const topic of topics) {
      if (topic.keywords.some(keyword => queryLower.includes(keyword))) {
        return topic.answer
      }
    }

    return t('chat.general_help')
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    const userQuery = inputValue.trim()
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Generate unique ID for this conversation
    const thinkingId = `thinking-${Date.now()}`

    // Step 1: Add thinking message immediately
    const thinkingMessage: Message = {
      id: thinkingId,
      type: 'thinking',
      content: t('thinking.analyzing'),
      timestamp: new Date(),
      isThinking: true
    }
    setMessages(prev => [...prev, thinkingMessage])

    // Step 2: Update thinking after 1 second
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === thinkingId 
          ? { ...msg, content: t('thinking.consulting'), timestamp: new Date() }
          : msg
      ))
    }, 1000)

    // Step 3: Update thinking after 2.5 seconds
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === thinkingId 
          ? { ...msg, content: t('thinking.integrating'), timestamp: new Date() }
          : msg
      ))
    }, 2500)

    // Step 4: Update thinking after 4 seconds
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === thinkingId 
          ? { ...msg, content: t('thinking.generating'), timestamp: new Date() }
          : msg
      ))
    }, 4000)

    // Step 5: Replace with final answer after 5.5 seconds
    setTimeout(() => {
      const response = searchKnowledge(userQuery)
      
      setMessages(prev => prev.map(msg => 
        msg.id === thinkingId 
          ? {
              id: thinkingId,
              type: 'agent',
              content: response,
              timestamp: new Date()
            }
          : msg
      ))
      setIsLoading(false)
    }, 5500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }



  return (
    <div className="w-full h-full">
      <Card className="h-[450px] bg-gradient-to-br from-slate-900/95 to-blue-900/90 border border-blue-500/30 shadow-2xl backdrop-blur-md">
        <CardHeader className="border-b border-blue-400/30 bg-gradient-to-r from-blue-800/40 to-blue-900/60">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <Sparkles className="h-2 w-2 text-slate-900" />
              </div>
            </div>
            <div>
              <CardTitle className="text-white text-lg flex items-center font-semibold">
                {t('chat.expert_title')}
                <Cpu className="ml-2 h-5 w-5 text-cyan-400" />
              </CardTitle>
              <p className="text-sm text-cyan-200">{t('chat.expert_subtitle')}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                      : message.type === 'thinking'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse'
                        : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : message.type === 'thinking' ? (
                      <Zap className="h-4 w-4 text-white animate-pulse" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl shadow-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                      : message.type === 'thinking'
                        ? 'bg-gradient-to-r from-amber-600/30 to-orange-500/30 text-amber-100 border border-amber-400/50 backdrop-blur-sm animate-pulse'
                        : 'bg-gradient-to-r from-slate-700/90 to-slate-800/90 text-gray-100 border border-cyan-400/20 backdrop-blur-sm'
                  }`}>
                    <div className="flex items-center">
                      {message.type === 'thinking' && (
                        <div className="flex space-x-1 mr-2">
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                        </div>
                      )}
                      <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                        message.type === 'thinking' ? 'italic' : ''
                      }`}>
                        {message.content}
                      </p>
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-md">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-slate-700/90 to-slate-800/90 border border-cyan-400/20 p-3 rounded-2xl shadow-lg backdrop-blur-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>



          {/* Input Area */}
          <div className="p-4 border-t border-cyan-400/20 bg-gradient-to-r from-slate-800/60 to-blue-900/40">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chat.placeholder')}
                  className="min-h-[44px] max-h-32 resize-none bg-slate-800/80 border-cyan-400/30 text-white placeholder-cyan-200/60 pr-12 focus:border-cyan-400/60 focus:ring-cyan-400/20"
                  disabled={isLoading}
                />
                <div className="absolute right-2 bottom-2 text-xs text-cyan-300/70">
                  {t('chat.send_hint')}
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 h-[44px] shadow-lg transition-all duration-200"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
