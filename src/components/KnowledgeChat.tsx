import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ScrollArea } from './ui/scroll-area'

interface QAPair {
  question: string
  answer: string
}

interface KnowledgeBase {
  name: string
  version: string
  domain: string
  language: string
  qa_pairs: QAPair[]
}

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export function KnowledgeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '您好！我是敏捷芯片开发知识助手。请问有什么关于敏捷芯片开发的问题我可以帮助您解答？',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load knowledge base
  useEffect(() => {
    fetch('/data/agile_chip_chatbot_kb.json')
      .then(response => response.json())
      .then(data => setKnowledgeBase(data))
      .catch(error => console.error('Failed to load knowledge base:', error))
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findBestAnswer = (userQuestion: string): string => {
    if (!knowledgeBase) {
      return '抱歉，知识库暂时无法访问，请稍后再试。'
    }

    const question = userQuestion.toLowerCase().trim()
    
    // 直接匹配
    const exactMatch = knowledgeBase.qa_pairs.find(pair => 
      pair.question.toLowerCase().includes(question) || 
      question.includes(pair.question.toLowerCase())
    )
    
    if (exactMatch) {
      return exactMatch.answer
    }

    // 关键词匹配
    const keywords = [
      { terms: ['敏捷', '敏捷开发', 'agile'], answers: knowledgeBase.qa_pairs.filter(pair => 
        pair.question.includes('敏捷') || pair.answer.includes('敏捷')) },
      { terms: ['chisel'], answers: knowledgeBase.qa_pairs.filter(pair => 
        pair.question.toLowerCase().includes('chisel') || pair.answer.toLowerCase().includes('chisel')) },
      { terms: ['risc-v', 'riscv'], answers: knowledgeBase.qa_pairs.filter(pair => 
        pair.question.toLowerCase().includes('risc-v') || pair.answer.toLowerCase().includes('risc-v')) },
      { terms: ['持续集成', 'ci', '集成'], answers: knowledgeBase.qa_pairs.filter(pair => 
        pair.question.includes('持续集成') || pair.answer.includes('持续集成')) },
      { terms: ['案例', '项目', '成功'], answers: knowledgeBase.qa_pairs.filter(pair => 
        pair.question.includes('案例') || pair.answer.includes('案例')) },
      { terms: ['传统', '区别', '不同'], answers: knowledgeBase.qa_pairs.filter(pair => 
        pair.question.includes('传统') || pair.answer.includes('传统')) },
    ]

    for (const keywordGroup of keywords) {
      const hasKeyword = keywordGroup.terms.some(term => question.includes(term))
      if (hasKeyword && keywordGroup.answers.length > 0) {
        return keywordGroup.answers[0].answer
      }
    }

    // 模糊匹配
    const fuzzyMatch = knowledgeBase.qa_pairs.find(pair => {
      const pairWords = pair.question.toLowerCase().split(/\s+/)
      const questionWords = question.split(/\s+/)
      return questionWords.some(word => 
        pairWords.some(pairWord => 
          pairWord.includes(word) || word.includes(pairWord)
        )
      )
    })

    if (fuzzyMatch) {
      return fuzzyMatch.answer
    }

    return `抱歉，我暂时无法回答这个问题。您可以尝试询问以下相关话题：

• 什么是敏捷芯片开发？
• 敏捷开发和传统芯片开发有什么不同？
• 什么是Chisel？
• RISC-V和敏捷开发有什么关系？
• 敏捷芯片开发的成功案例
• 如何实现持续集成？

或者您可以浏览网站的其他页面获取更多信息。`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: findBestAnswer(userMessage.content),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200 hover:shadow-xl"
        style={{ zIndex: 9999 }}
        size="lg"
        aria-label="打开知识助手"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 sm:w-96 h-96 bg-slate-800/95 border-blue-700/50 shadow-2xl" style={{ zIndex: 9999 }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-blue-900/30">
        <CardTitle className="text-lg font-semibold text-white flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-400" />
          <span>知识助手</span>
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-80">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />}
                    {message.type === 'user' && <User className="h-4 w-4 mt-0.5 text-blue-200 flex-shrink-0" />}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-blue-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-slate-700">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="请输入您的问题..."
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
