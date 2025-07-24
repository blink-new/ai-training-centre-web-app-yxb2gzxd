import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Play, Copy, Download, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'

interface CodePlaygroundProps {
  scenario: string
  initialCode?: string
  language?: string
}

export function CodePlayground({ scenario, initialCode = '', language = 'python' }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<Array<{ name: string; passed: boolean; message: string }>>([])

  const defaultCode = useMemo(() => ({
    python: `# AI Training Centre - Interactive Playground
# Scenario: ${scenario}

import numpy as np
import matplotlib.pyplot as plt

# Your code here
def main():
    print("Welcome to AI Training Centre!")
    print("Scenario: ${scenario}")
    
    # Example: Simple neural network prediction
    weights = np.random.randn(3, 1)
    inputs = np.array([[1, 2, 3]]).T
    
    prediction = np.dot(inputs.T, weights)
    print(f"Neural network prediction: {prediction[0][0]:.4f}")
    
    return prediction

if __name__ == "__main__":
    result = main()`,
    
    javascript: `// AI Training Centre - Interactive Playground
// Scenario: ${scenario}

console.log("Welcome to AI Training Centre!");
console.log("Scenario: ${scenario}");

// Example: Simple AI chatbot response
function generateResponse(input) {
    const responses = [
        "That's an interesting question about AI!",
        "Let me help you understand that concept.",
        "Great observation! Here's what I think...",
        "AI is fascinating, isn't it?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Test the chatbot
const userInput = "How does machine learning work?";
const botResponse = generateResponse(userInput);

console.log("User:", userInput);
console.log("AI Bot:", botResponse);`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Training Centre - ${scenario}</title>
    <style>
        body { font-family: 'Inter', sans-serif; margin: 20px; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; }
        .ai-demo { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .chat-bubble { background: #6366f1; color: white; padding: 12px 16px; border-radius: 18px; margin: 8px 0; }
        .user-bubble { background: #e5e7eb; color: #374151; margin-left: 40px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 AI Training Centre</h1>
        <h2>Scenario: ${scenario}</h2>
        
        <div class="ai-demo">
            <h3>Interactive AI Chat Demo</h3>
            <div class="chat-bubble">Hello! I'm your AI learning assistant. How can I help you today?</div>
            <div class="chat-bubble user-bubble">Can you explain machine learning?</div>
            <div class="chat-bubble">Machine learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed!</div>
        </div>
        
        <script>
            console.log("AI Training Centre - Interactive Demo Loaded");
            console.log("Scenario: ${scenario}");
        </script>
    </div>
</body>
</html>`
  }), [scenario])

  useEffect(() => {
    if (!code) {
      setCode(defaultCode[language as keyof typeof defaultCode] || defaultCode.python)
    }
  }, [language, scenario, code, defaultCode])

  const runCode = async () => {
    setIsRunning(true)
    setOutput('')
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const mockOutputs = {
      python: `Welcome to AI Training Centre!
Scenario: ${scenario}
Neural network prediction: 0.7834
Execution completed successfully! ✅

Performance Metrics:
- Execution time: 0.234s
- Memory usage: 12.4MB
- AI accuracy: 94.2%`,
      
      javascript: `Welcome to AI Training Centre!
Scenario: ${scenario}
User: How does machine learning work?
AI Bot: That's an interesting question about AI!
✅ Code executed successfully!

Console Output:
- Function calls: 3
- Response time: 45ms
- AI confidence: 87%`,
      
      html: `🌐 HTML Preview Generated!
✅ Page rendered successfully
📱 Mobile responsive: Yes
🎨 Styling applied: Complete
🤖 AI demo loaded: Active

View your interactive AI demo above!`
    }
    
    setOutput(mockOutputs[language as keyof typeof mockOutputs] || mockOutputs.python)
    
    // Mock test results
    setTestResults([
      { name: 'Code Syntax', passed: true, message: 'All syntax checks passed' },
      { name: 'AI Logic', passed: true, message: 'AI implementation is correct' },
      { name: 'Performance', passed: Math.random() > 0.3, message: 'Code efficiency within acceptable range' },
      { name: 'Best Practices', passed: Math.random() > 0.2, message: 'Follows AI development standards' }
    ])
    
    setIsRunning(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
  }

  const resetCode = () => {
    setCode(defaultCode[language as keyof typeof defaultCode] || defaultCode.python)
    setOutput('')
    setTestResults([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              🚀 Interactive Code Playground
              <Badge variant="outline">{language.toUpperCase()}</Badge>
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={copyCode}>
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button size="sm" variant="outline" onClick={resetCode}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Code Editor */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                placeholder="Write your AI code here..."
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-gray-800 text-gray-300">
                  Lines: {code.split('\n').length}
                </Badge>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button 
                  onClick={runCode} 
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isRunning ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                Scenario: <span className="font-medium">{scenario}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Output and Results */}
      {(output || testResults.length > 0) && (
        <Tabs defaultValue="output" className="space-y-4">
          <TabsList>
            <TabsTrigger value="output">Console Output</TabsTrigger>
            <TabsTrigger value="tests">Test Results</TabsTrigger>
            {language === 'html' && <TabsTrigger value="preview">Live Preview</TabsTrigger>}
          </TabsList>

          <TabsContent value="output">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Console Output</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                  {output || 'No output yet. Run your code to see results!'}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Automated Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testResults.map((test, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        test.passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      {test.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{test.name}</div>
                        <div className={`text-sm ${test.passed ? 'text-green-700' : 'text-red-700'}`}>
                          {test.message}
                        </div>
                      </div>
                      <Badge variant={test.passed ? 'default' : 'destructive'}>
                        {test.passed ? 'PASS' : 'FAIL'}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {language === 'html' && (
            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="w-full h-96 bg-white"
                      dangerouslySetInnerHTML={{ __html: code }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  )
}