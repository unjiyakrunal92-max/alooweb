import React from 'react';
import Hero from '../components/Hero';
import ServerStats from '../components/ServerStats';
import OnlineTicker from '../components/OnlineTicker';
import Features from '../components/Features';
import ServerOverview from '../components/ServerOverview';
import Gallery from '../components/Gallery';
import HowToJoin from '../components/HowToJoin';
import { FAQ } from '../components/FAQ';
import Community from '../components/Community';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <ServerStats />
      <OnlineTicker />
      <Features />
      <ServerOverview />
      <Gallery />
      <HowToJoin />
      <FAQ />
      <Community />
      <Footer />
    </>
  );
};

export default Home;