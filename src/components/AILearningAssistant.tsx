import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Lightbulb, Code, BookOpen, Zap, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AILearningAssistantProps {
  context?: string
  onSuggestionClick?: (suggestion: string) => void
}

export function AILearningAssistant({ context = '', onSuggestionClick }: AILearningAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI Learning Assistant. I'm here to help you master AI concepts through interactive learning. ${context ? `I see you're working on: ${context}` : 'What would you like to learn about today?'}`,
      timestamp: new Date(),
      suggestions: [
        'Explain machine learning basics',
        'Help me debug my code',
        'Show me real-world AI examples',
        'What should I learn next?'
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const aiResponses = {
    'machine learning': {
      content: "Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed. Here are the key concepts:\n\n🧠 **Supervised Learning**: Learning from labeled examples\n📊 **Unsupervised Learning**: Finding patterns in unlabeled data\n🔄 **Reinforcement Learning**: Learning through trial and error\n\nWould you like me to show you a practical example?",
      suggestions: ['Show me a code example', 'Explain neural networks', 'What are algorithms?', 'Real-world applications']
    },
    'debug': {
      content: "I'd be happy to help debug your code! Here's my systematic approach:\n\n🔍 **Step 1**: Read the error message carefully\n🧪 **Step 2**: Check variable types and values\n🔧 **Step 3**: Verify function calls and syntax\n📝 **Step 4**: Test with simple inputs\n\nShare your code and I'll help you identify the issue!",
      suggestions: ['Common Python errors', 'JavaScript debugging tips', 'Best practices', 'Testing strategies']
    },
    'examples': {
      content: "Here are some exciting real-world AI applications:\n\n🚗 **Autonomous Vehicles**: Tesla's self-driving cars use computer vision\n🎵 **Music Recommendation**: Spotify analyzes your listening patterns\n🏥 **Medical Diagnosis**: AI helps doctors detect diseases in X-rays\n💬 **Language Translation**: Google Translate breaks down language barriers\n🛒 **E-commerce**: Amazon's recommendation engine boosts sales\n\nWhich area interests you most?",
      suggestions: ['Computer vision projects', 'NLP applications', 'Recommendation systems', 'AI in healthcare']
    },
    'next': {
      content: "Based on your current progress, here's your personalized learning path:\n\n📚 **Immediate Next Steps**:\n• Complete your current scenario project\n• Practice with the code playground\n• Join a study group discussion\n\n🎯 **Recommended Topics**:\n• Deep Learning fundamentals\n• Computer Vision with OpenCV\n• Natural Language Processing\n\nWhat excites you most?",
      suggestions: ['Start deep learning', 'Explore computer vision', 'Try NLP projects', 'Join study group']
    },
    'default': {
      content: "That's a great question! Let me help you understand that better. AI is all about creating systems that can perform tasks that typically require human intelligence.\n\nHere are some key areas we can explore together:\n\n🤖 **Machine Learning**: Teaching computers to learn from data\n👁️ **Computer Vision**: Helping computers 'see' and understand images\n💬 **Natural Language Processing**: Enabling computers to understand human language\n🧠 **Neural Networks**: Brain-inspired computing models\n\nWhat would you like to dive into?",
      suggestions: ['Machine learning basics', 'Computer vision intro', 'NLP fundamentals', 'Neural network concepts']
    }
  }

  const getAIResponse = (userMessage: string): { content: string; suggestions: string[] } => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('machine learning') || message.includes('ml')) {
      return aiResponses['machine learning']
    } else if (message.includes('debug') || message.includes('error') || message.includes('help')) {
      return aiResponses['debug']
    } else if (message.includes('example') || message.includes('real world') || message.includes('application')) {
      return aiResponses['examples']
    } else if (message.includes('next') || message.includes('what should') || message.includes('recommend')) {
      return aiResponses['next']
    } else {
      return aiResponses['default']
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500))

    const aiResponse = getAIResponse(inputValue)
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse.content,
      timestamp: new Date(),
      suggestions: aiResponse.suggestions
    }

    setMessages(prev => [...prev, aiMessage])
    setIsTyping(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    if (onSuggestionClick) {
      onSuggestionClick(suggestion)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          AI Learning Assistant
          <Badge variant="outline" className="ml-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            Smart
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'ai' && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white ml-auto'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && message.type === 'ai' && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-7 px-3 hover:bg-indigo-50 hover:border-indigo-200"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-indigo-100 text-indigo-600">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about AI..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2 mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestionClick('Explain this concept')}
              className="text-xs"
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Explain
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestionClick('Show me code example')}
              className="text-xs"
            >
              <Code className="w-3 h-3 mr-1" />
              Code
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestionClick('What should I learn next?')}
              className="text-xs"
            >
              <BookOpen className="w-3 h-3 mr-1" />
              Learn
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestionClick('Give me a challenge')}
              className="text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              Challenge
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}