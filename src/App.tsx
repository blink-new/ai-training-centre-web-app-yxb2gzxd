import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  BookOpen, 
  Trophy, 
  Users, 
  Play, 
  Star, 
  ArrowRight, 
  Code, 
  Zap, 
  Target,
  Menu,
  X,
  ChevronRight,
  Clock,
  Award,
  TrendingUp,
  MessageCircle,
  Sparkles,
  Rocket,
  Shield,
  Globe
} from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Progress } from './components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'

// Mock data
const courses = [
  {
    id: 1,
    title: "Build Your First ChatGPT Clone",
    description: "Learn to create conversational AI applications using modern frameworks and APIs",
    level: "Beginner",
    duration: "4 weeks",
    students: 2847,
    rating: 4.9,
    progress: 0,
    image: "🤖",
    skills: ["React", "OpenAI API", "Node.js"],
    scenario: "Create a customer service chatbot for an e-commerce platform"
  },
  {
    id: 2,
    title: "Computer Vision Mastery",
    description: "Master image recognition, object detection, and real-world CV applications",
    level: "Intermediate",
    duration: "6 weeks",
    students: 1923,
    rating: 4.8,
    progress: 65,
    image: "👁️",
    skills: ["Python", "OpenCV", "TensorFlow"],
    scenario: "Build a smart security system with facial recognition"
  },
  {
    id: 3,
    title: "AI-Powered Recommendation Systems",
    description: "Design intelligent systems that predict user preferences and behaviors",
    level: "Advanced",
    duration: "8 weeks",
    students: 1456,
    rating: 4.9,
    progress: 30,
    image: "🎯",
    skills: ["Machine Learning", "Python", "AWS"],
    scenario: "Create Netflix-style content recommendations"
  }
]

const achievements = [
  { id: 1, title: "First Steps", description: "Complete your first lesson", icon: "🚀", unlocked: true },
  { id: 2, title: "Code Warrior", description: "Write 100 lines of AI code", icon: "⚔️", unlocked: true },
  { id: 3, title: "Scenario Master", description: "Complete 5 real-world scenarios", icon: "🏆", unlocked: false },
  { id: 4, title: "AI Architect", description: "Build your first complete AI system", icon: "🏗️", unlocked: false }
]

// Navigation Component
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AI Training Centre</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/courses' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Courses
            </Link>
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/dashboard' ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
              }`}
            >
              Dashboard
            </Link>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                  Home
                </Link>
                <Link to="/courses" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                  Courses
                </Link>
                <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                  Dashboard
                </Link>
                <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

// Home Page Component
function HomePage() {
  const [activeDemo, setActiveDemo] = useState(0)

  const demos = [
    {
      title: "AI Chat Interface",
      description: "Interactive conversation with AI",
      code: `const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Hello!" }]
});`
    },
    {
      title: "Image Recognition",
      description: "Classify images with computer vision",
      code: `import cv2
import tensorflow as tf

model = tf.keras.models.load_model('vision_model.h5')
prediction = model.predict(image_array)`
    },
    {
      title: "Recommendation Engine",
      description: "Personalized content suggestions",
      code: `from sklearn.metrics.pairwise import cosine_similarity

similarity_matrix = cosine_similarity(user_features)
recommendations = get_top_recommendations(user_id, similarity_matrix)`
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [demos.length])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master AI with
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Real Scenarios
                </span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Learn AI through hands-on projects, interactive simulations, and real-world challenges. 
                Build ChatGPT clones, computer vision systems, and recommendation engines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3">
                  Start Learning
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Scenarios</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">AI Playground</span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-green-400 text-sm mb-2">
                      # {demos[activeDemo].title}
                    </div>
                    <div className="text-gray-300 text-xs mb-4">
                      {demos[activeDemo].description}
                    </div>
                    <pre className="text-blue-300 text-sm overflow-x-auto">
                      <code>{demos[activeDemo].code}</code>
                    </pre>
                  </motion.div>
                </AnimatePresence>

                {/* Demo indicators */}
                <div className="flex gap-2 mt-6">
                  {demos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveDemo(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeDemo ? 'bg-indigo-500' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Training?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most interactive and practical AI education platform designed for real-world success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8" />,
                title: "Hands-on Coding",
                description: "Write real AI code in interactive playgrounds with instant feedback and guidance"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Real Scenarios",
                description: "Practice with actual industry challenges like building recommendation systems"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Interactive Learning",
                description: "Engage with AI simulations, quizzes, and gamified progress tracking"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Support",
                description: "Learn alongside peers, share projects, and get help from mentors"
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Achievement System",
                description: "Earn badges, certificates, and showcase your AI skills to employers"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Career Ready",
                description: "Build a portfolio of AI projects that demonstrate real-world capabilities"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular AI Courses
            </h2>
            <p className="text-xl text-gray-600">
              Start your AI journey with our most loved courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="text-4xl mb-4">{course.image}</div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {course.level}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {course.description}
                    </CardDescription>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {course.students.toLocaleString()} students
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Start Course
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                View All Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Courses Page Component
function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesLevel && matchesSearch
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Courses & Scenarios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master AI through interactive courses designed around real-world scenarios and hands-on projects
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? 'default' : 'outline'}
                onClick={() => setSelectedLevel(level)}
                className={selectedLevel === level ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="text-4xl mb-4">{course.image}</div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {course.description}
                  </CardDescription>
                  
                  {/* Real-world Scenario */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">Real Scenario</span>
                    </div>
                    <p className="text-sm text-amber-700">{course.scenario}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()} students
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                        {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <span className="text-3xl">{course.image}</span>
                          {course.title}
                        </DialogTitle>
                        <DialogDescription className="text-base">
                          {course.description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Course Preview */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-3">What you'll build:</h4>
                          <p className="text-gray-700">{course.scenario}</p>
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className="font-semibold mb-3">Skills you'll learn:</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.skills.map((skill) => (
                              <Badge key={skill} className="bg-indigo-100 text-indigo-800">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Demo */}
                        <div className="bg-gray-900 rounded-lg p-4">
                          <div className="text-green-400 text-sm mb-2"># Interactive Preview</div>
                          <div className="text-gray-300 text-sm">
                            Try the course playground and see what you'll build!
                          </div>
                        </div>

                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" size="lg">
                          {course.progress > 0 ? 'Continue Learning' : 'Start Learning Now'}
                          <Play className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Dashboard Page Component
function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Learning Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Track your AI learning progress and achievements
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Courses Completed", value: "3", icon: <BookOpen className="w-6 h-6" />, color: "bg-green-500" },
                { title: "Hours Learned", value: "47", icon: <Clock className="w-6 h-6" />, color: "bg-blue-500" },
                { title: "Achievements", value: "12", icon: <Trophy className="w-6 h-6" />, color: "bg-yellow-500" },
                { title: "Streak Days", value: "15", icon: <TrendingUp className="w-6 h-6" />, color: "bg-purple-500" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.title}</p>
                          <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Current Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.filter(c => c.progress > 0).map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{course.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{course.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <Progress value={course.progress} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">{course.progress}%</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        Continue
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Mentor Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  AI Learning Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-indigo-100 text-indigo-600">AI</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        Great progress on your Computer Vision course! Ready to tackle object detection next? 
                        I can help you understand the concepts better.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Ask your AI mentor anything..." className="flex-1" />
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">{course.image}</div>
                      <Badge variant={course.progress > 0 ? 'default' : 'secondary'}>
                        {course.progress > 0 ? 'In Progress' : 'Not Started'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {course.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                    <Button className="w-full" variant={course.progress > 0 ? 'default' : 'outline'}>
                      {course.progress > 0 ? 'Continue' : 'Start Course'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`${achievement.unlocked ? 'border-yellow-200 bg-yellow-50' : 'opacity-60'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{achievement.title}</h3>
                          <p className="text-gray-600">{achievement.description}</p>
                          {achievement.unlocked && (
                            <Badge className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                              <Award className="w-3 h-3 mr-1" />
                              Unlocked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Discussion Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Discussions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      user: "Sarah Chen",
                      topic: "Help with TensorFlow implementation",
                      replies: 5,
                      time: "2 hours ago"
                    },
                    {
                      user: "Mike Johnson",
                      topic: "Sharing my ChatGPT clone project",
                      replies: 12,
                      time: "4 hours ago"
                    },
                    {
                      user: "Alex Rivera",
                      topic: "Computer Vision career advice",
                      replies: 8,
                      time: "1 day ago"
                    }
                  ].map((discussion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{discussion.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{discussion.topic}</h4>
                        <p className="text-xs text-gray-600">
                          by {discussion.user} • {discussion.replies} replies • {discussion.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Study Groups */}
              <Card>
                <CardHeader>
                  <CardTitle>Study Groups</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Computer Vision Beginners",
                      members: 234,
                      activity: "Very Active"
                    },
                    {
                      name: "AI Career Switchers",
                      members: 156,
                      activity: "Active"
                    },
                    {
                      name: "Advanced ML Projects",
                      members: 89,
                      activity: "Moderate"
                    }
                  ].map((group, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold">{group.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">{group.members} members</span>
                        <Badge variant="outline">{group.activity}</Badge>
                      </div>
                      <Button size="sm" className="w-full mt-3" variant="outline">
                        Join Group
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App