import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/about/About'
import { Services } from '@/components/services/Services'
import { Work } from '@/components/work/Work'
import { Process } from '@/components/process/Process'
import { Notes } from '@/components/notes/Notes'
import { Contact } from '@/components/contact/Contact'
import { Footer } from '@/components/footer/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Process />
      <Notes />
      <Contact />
      <Footer />
    </main>
  )
}
