import React from 'react'
import Hero        from '../components/Hero'
import ServerStats from '../components/ServerStats'
import OnlineTicker from '../components/OnlineTicker'
import Features    from '../components/Features'
import Community   from '../components/Community'
import HowToJoin from '../components/HowToJoin'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'
import { FAQ } from '../components/FAQ'

const Home = () => {
  return (
    <>
      <Hero />
      <ServerStats />
      <OnlineTicker />
      <Features />
      <Gallery/>
      <HowToJoin />
      <FAQ></FAQ>
      <Community />
      <Footer />   
    </>
  )
}

export default Home 