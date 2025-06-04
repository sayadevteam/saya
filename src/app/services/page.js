
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const services = [
  {
    title: 'Web Design',
    description: 'Stunning, user-focused design tailored for all devices.',
    lottie:
      'https://lottie.host/a4d9c0c3-a070-40f9-bfd4-b0a38f6659b4/Wvw3AHCEwE.lottie',
  },
  {
    title: 'Web Development',
    description: 'Robust and scalable web solutions using modern stacks.',
    lottie:
      'https://lottie.host/7767cc7e-d3e3-40ac-a910-69cf81e56d00/31Fv4TNy96.lottie',
  },
  {
    title: 'Branding',
    description: 'Creating cohesive brand identities that resonate.',
    lottie:
      'https://lottie.host/8a086287-2276-4e9a-b505-3f09650a83a3/5hGnThW4t7.lottie',
  },
  {
    title: 'SEO & Marketing',
    description: 'Optimize and promote your site for maximum visibility.',
    lottie:
      'https://lottie.host/b6d38626-6874-4fce-9192-846aae338466/dXlVQrj2Mo.lottie',
  },
];

export default function Page() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
      <section
        ref={containerRef}
        className="py-20 px-6 bg-gradient-to-b from-white to-slate-100 dark:from-[#0a0a0a] dark:to-[#1a1a1a] relative"
      >

      <div className="max-w-6xl mx-auto text-center">
        <TypingAnimation>What We Offer</TypingAnimation>
      </div>

      <div className="relative mt-12">
        {/* Timeline line that starts from the first marker */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full">
          <motion.div
  className="w-0.5 bg-black dark:bg-white origin-top"
  style={{
    height: '100%',
    scaleY,
  }}
/>

        </div>

        <div className="space-y-20">
          {services.map((service, index) => (
            <TimelineCard key={index} index={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({ index, title, description, lottie }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={`flex justify-between items-center w-full ${
        index % 2 === 0 ? 'flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />

      {/* Timeline Dot */}
      <div className="z-20">
        <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full">
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>

      <motion.div
        className="w-5/12"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card className="relative overflow-hidden transition-transform duration-300 shadow-md hover:shadow-xl">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-30 h-30">
              <DotLottieReact src={lottie} loop autoplay />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
