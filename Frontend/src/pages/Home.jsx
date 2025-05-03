import React from 'react'
import { AuroraText } from '../components/magicui/aurora-text'
import { Particles } from '../components/magicui/particles'
import { SparklesText } from '../components/magicui/sparkles-text'
import { ShineBorder } from '../components/magicui/shine-border'
import { RainbowButton } from '../components/magicui/rainbow-button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='min-h-screen w-screen relative bg-gradient-to-b from-slate-100 to-blue-50 overflow-hidden'>
      <Particles
        className="absolute inset-0 z-0"
        quantity={500}
        ease={80}
        color={"#000000"}
        refresh
      />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Send with <AuroraText>HifazatInbox</AuroraText>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              <SparklesText>Powerful email marketing made simple</SparklesText>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <RainbowButton
              className="text-black hover:scale-105 transition-all duration-300 ease-in-out"
              variant=""
              size="lg"
            >
              <ShineBorder
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderWidth={2}
              />
              Get Started
            </RainbowButton>
            <Link
              to="/about"
              className="px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2">Bulk Email</h3>
              <p className="text-gray-600">Send personalized emails to multiple recipients at once</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">Track your email performance with detailed analytics</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Templates</h3>
              <p className="text-gray-600">Beautiful, customizable email templates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-50 to-transparent" />
    </div>
  )
}

export default Home