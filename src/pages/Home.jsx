import Layout from '../components/Layout.jsx'
import StructuredData from '../components/StructuredData.jsx'
import Hero from '../sections/Hero.jsx'
import Manifesto from '../sections/Manifesto.jsx'
import Reel from '../sections/Reel.jsx'
import Work from '../sections/Work.jsx'
import Services from '../sections/Services.jsx'
import Marquee from '../sections/Marquee.jsx'
import Featured from '../sections/Featured.jsx'
import Contact from '../sections/Contact.jsx'

export default function Home() {
  return (
    <Layout home>
      <StructuredData />
      <Hero />
      <Manifesto />
      <Reel />
      <Work />
      <Services />
      <Marquee />
      <Featured />
      <Contact />
    </Layout>
  )
}
