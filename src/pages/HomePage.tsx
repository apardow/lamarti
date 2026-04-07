import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Testimonial from '../components/Testimonial';
import ImpactAreas from '../components/ImpactAreas';
import SEO from '../components/SEO';

const HomePage = () => {
  return (
    <>
      <SEO
        description="Corporación José Martí de Concepción, Chile. Más de 34 años de solidaridad internacionalista, formación política y cultura latinoamericana."
        url="/"
        image="/images/logo/lamarti.png"
      />
      <Hero />
      <Stats />
      <Testimonial />
      <ImpactAreas />
    </>
  );
};

export default HomePage;
