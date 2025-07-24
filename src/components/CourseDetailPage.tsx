import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Clock, Users, Star, Award, CheckCircle, Lock } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { CodePlayground } from './CodePlayground'
import { AILearningAssistant } from './AILearningAssistant'

interface CourseDetailPageProps {
  courseId: number
  onBack: () => void
}

const courseData = {
  1: {
    title: "Build Your First ChatGPT Clone",
    description: "Learn to create conversational AI applications using modern frameworks and APIs",
    level: "Beginner",
    duration: "4 weeks",
    students: 2847,
    rating: 4.9,
    progress: 0,
    image: "🤖",
    skills: ["React", "OpenAI API", "Node.js"],
    scenario: "Create a customer service chatbot for an e-commerce platform",
    instructor: "Dr. Sarah Chen",
    instructorBio: "AI Research Scientist with 8+ years in conversational AI",
    modules: [
      {
        id: 1,
        title: "Introduction to Conversational AI",
        duration: "45 min",
        completed: false,
        locked: false,
        lessons: [
          "What is Conversational AI?",
          "ChatGPT Architecture Overview",
          "Setting up Development Environment"
        ]
      },
      {
        id: 2,
        title: "Building the Chat Interface",
        duration: "1.5 hours",
        completed: false,
        locked: false,
        lessons: [
          "React Components for Chat",
          "State Management",
          "Real-time Message Updates"
        ]
      },
      {
        id: 3,
        title: "Integrating OpenAI API",
        duration: "2 hours",
        completed: false,
        locked: true,
        lessons: [
          "API Authentication",
          "Prompt Engineering",
          "Response Handling"
        ]
      },
      {
        id: 4,
        title: "Advanced Features",
        duration: "2.5 hours",
        completed: false,
        locked: true,
        lessons: [
          "Context Management",
          "Custom Personalities",
          "Error Handling"
        ]
      }
    ]
  },
  2: {
    title: "Computer Vision Mastery",
    description: "Master image recognition, object detection, and real-world CV applications",
    level: "Intermediate",
    duration: "6 weeks",
    students: 1923,
    rating: 4.8,
    progress: 65,
    image: "👁️",
    skills: ["Python", "OpenCV", "TensorFlow"],
    scenario: "Build a smart security system with facial recognition",
    instructor: "Prof. Michael Rodriguez",
    instructorBio: "Computer Vision expert, former Google AI researcher",
    modules: [
      {
        id: 1,
        title: "Computer Vision Fundamentals",
        duration: "1 hour",
        completed: true,
        locked: false,
        lessons: [
          "Image Processing Basics",
          "OpenCV Introduction",
          "Image Filters and Transformations"
        ]
      },
      {
        id: 2,
        title: "Object Detection",
        duration: "2 hours",
        completed: true,
        locked: false,
        lessons: [
          "YOLO Algorithm",
          "Bounding Box Detection",
          "Real-time Object Tracking"
        ]
      },
      {
        id: 3,
        title: "Facial Recognition",
        duration: "2.5 hours",
        completed: false,
        locked: false,
        lessons: [
          "Face Detection Algorithms",
          "Feature Extraction",
          "Recognition Models"
        ]
      },
      {
        id: 4,
        title: "Security System Integration",
        duration: "3 hours",
        completed: false,
        locked: true,
        lessons: [
          "Camera Integration",
          "Alert Systems",
          "Database Management"
        ]
      }
    ]
  }
}

export function CourseDetailPage({ courseId, onBack }: CourseDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  
  const course = courseData[courseId as keyof typeof courseData]
  
  if (!course) {
    return <div>Course not found</div>
  }

  const completedModules = course.modules.filter(m => m.completed).length
  const totalModules = course.modules.length

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{course.image}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                    {course.level}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-6">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Certificate included
                  </div>
                </div>

                {/* Progress */}
                {course.progress > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Your Progress</span>
                      <span className="text-sm text-gray-600">{completedModules}/{totalModules} modules completed</span>
                    </div>
                    <Progress value={course.progress} className="h-3" />
                  </div>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    <Play className="w-5 h-5 mr-2" />
                    {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </Button>
                  <Button size="lg" variant="outline">
                    Preview Course
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-semibold text-lg">{course.instructor}</h3>
                  <p className="text-sm text-gray-600 mt-2">{course.instructorBio}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Real-world Scenario */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Real-World Scenario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <h3 className="font-semibold text-amber-800 mb-2">Project: {course.scenario}</h3>
                  <p className="text-amber-700">
                    Throughout this course, you'll build a complete {course.scenario.toLowerCase()}. 
                    This hands-on project will give you practical experience with real-world AI implementation, 
                    from initial setup to deployment.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Core AI concepts and terminology",
                    "Hands-on coding with industry tools",
                    "Real-world problem solving",
                    "Best practices and optimization",
                    "Testing and debugging techniques",
                    "Deployment and scaling strategies"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`cursor-pointer transition-all ${
                    selectedModule === module.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                  } ${module.locked ? 'opacity-60' : ''}`}>
                    <CardHeader 
                      className="pb-3"
                      onClick={() => !module.locked && setSelectedModule(
                        selectedModule === module.id ? null : module.id
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            module.completed 
                              ? 'bg-green-100 text-green-600' 
                              : module.locked 
                                ? 'bg-gray-100 text-gray-400'
                                : 'bg-indigo-100 text-indigo-600'
                          }`}>
                            {module.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : module.locked ? (
                              <Lock className="w-5 h-5" />
                            ) : (
                              <span className="font-semibold">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{module.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>{module.duration}</span>
                              <span>{module.lessons.length} lessons</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {module.completed && (
                            <Badge className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                          {module.locked && (
                            <Badge variant="secondary">
                              Locked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    {selectedModule === module.id && !module.locked && (
                      <CardContent className="pt-0">
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-3">Lessons:</h4>
                          <div className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                                  {lessonIndex + 1}
                                </div>
                                <span className="text-sm">{lesson}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t">
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                              {module.completed ? 'Review Module' : 'Start Module'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playground" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Code Playground</h2>
              <p className="text-gray-600">
                Practice your skills with hands-on coding exercises related to {course.title.toLowerCase()}.
              </p>
            </div>
            
            <CodePlayground 
              scenario={course.scenario}
              language={course.skills.includes('Python') ? 'python' : 'javascript'}
            />
          </TabsContent>

          <TabsContent value="assistant" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Learning Assistant</h2>
              <p className="text-gray-600">
                Get personalized help and guidance for {course.title}. Ask questions, get explanations, and receive learning recommendations.
              </p>
            </div>
            
            <div className="max-w-4xl">
              <AILearningAssistant 
                context={`${course.title} - ${course.scenario}`}
                onSuggestionClick={(suggestion) => {
                  console.log('Suggestion clicked:', suggestion)
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}