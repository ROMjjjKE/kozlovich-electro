import Header from './components/Header';
import Hero from './components/Hero';
import Jobs from './components/Jobs';
import Board from './components/Board';
import Interview from './components/Interview';
import Partners from './components/Partners';
import Start from './components/Start';
import Faq from './components/Faq';
import Ask from './components/Ask';
import Footer from './components/Footer';
import { useLenis } from './components/useLenis';
import { useReveal } from './components/useReveal';

export default function App() {
  useLenis();
  useReveal('home');

  return (
    <>
      <a className="skip" href="#raboty">К содержанию</a>
      <Header />
      <main>
        <Hero />
        <Jobs />
        <Board />
        <Interview />
        <Partners />
        <Start />
        <Faq />
        <Ask />
      </main>
      <Footer />
    </>
  );
}
