import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const heroSlides = [
  { image: '/images/hero/0.png', slogan: 'Solidaridad con Cuba, defensa de la soberanía de los pueblos.' },
  { image: '/images/hero/1.png', slogan: 'Contra el imperialismo, por la dignidad y la autodeterminación.' },
  { image: '/images/hero/2.png', slogan: 'Cuba resiste, los pueblos avanzan.' },
  { image: '/images/hero/3.png', slogan: 'Solidaridad internacionalista frente al bloqueo y la dominación imperial.' },
];

const SLIDE_DURATION = 6000;
const TYPE_SPEED = 40;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Clear any pending typewriter timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setDisplayedText('');

    const fullText = heroSlides[currentIndex].slogan;

    for (let i = 0; i <= fullText.length; i++) {
      const id = window.setTimeout(() => {
        setDisplayedText(fullText.slice(0, i));
      }, i * TYPE_SPEED);
      timeoutsRef.current.push(id);
    }

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [currentIndex]);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={`Hero ${index}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-marti-black/85 via-marti-black/40 to-marti-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/images/logo/lamarti-logo.png"
                alt="Logo Corporación José Martí"
                className="w-28 h-28 md:w-36 md:h-36 object-contain mb-6 drop-shadow-lg"
              />
              <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-4 leading-[1.1] text-balance">
                Corporación José Martí
              </h1>
              <h4 className="text-2xl md:text-3xl font-display font-extrabold text-marti-red">
                Concepción – Chile
              </h4>
            </motion.div>
          </div>

          <div className="lg:max-w-xl xl:max-w-2xl lg:text-right lg:pr-8">
            <blockquote className="relative">
              <span className="absolute -top-6 -left-2 lg:-top-8 lg:-left-6 text-6xl lg:text-8xl text-white/15 font-editorial select-none leading-none">"</span>
              <p
                className="font-editorial italic text-2xl md:text-3xl lg:text-[2.5rem] xl:text-5xl text-white leading-tight lg:leading-[1.2] min-h-[3em] lg:min-h-[3.5em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] tracking-tight"
              >
                {displayedText}
                <span className="inline-block w-[2px] h-[0.8em] bg-white/70 ml-1 align-middle animate-pulse" />
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
