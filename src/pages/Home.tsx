import "@stylesPages/Home.scss";

import {
  ContactSection,
  SmartSection,
  PersonalizedSection,
  PlansSection,
  RobotsSection,
  AboutSection,
  HeroSection,
  ModalPayment
} from "@components";

function Home() {
  return (
    <>
      <ModalPayment />
      <HeroSection />
      <AboutSection />
      <RobotsSection />
      <PlansSection />
      <PersonalizedSection />
      <SmartSection />
      <ContactSection />
    </>
  );
}

export default Home;
