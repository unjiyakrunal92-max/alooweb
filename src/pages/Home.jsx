import React from 'react'
import Hero        from '../components/Hero'
import ServerStats from '../components/ServerStats'
import Features    from '../components/Features'
import Community   from '../components/Community'
import HowToJoinAndFAQ from '../components/HowToJoin'
import Gallery from '../components/Gallery'
import Footer from '../components/Footer'

// Coming soon:
// import HowToJoin from '../components/HowToJoin'
// import Footer    from '../components/Footer'

const Home = () => {
  return (
    <>
      <Hero />
      <ServerStats />
      <Features />
      <Gallery/>
      <HowToJoinAndFAQ/>
      <Community />
      <Footer />   
      {/* <HowToJoin /> */}
    </>
  )
}

export default Home