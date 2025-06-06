"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/LinearDialog';
import { Plus } from 'lucide-react';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const items = [
  {
    id: 1,
    lottie:
      'https://lottie.host/a4d9c0c3-a070-40f9-bfd4-b0a38f6659b4/Wvw3AHCEwE.lottie',
    title: 'Web Design',
    description: 'Elevate your online presence with our bespoke web design services, crafting visually stunning and user-centric websites that captivate and convert. Our designs blend aesthetic brilliance with intuitive navigation, ensuring seamless experiences across all devices. From bold color palettes to sleek layouts, we tailor every pixel to reflect your brand’s unique story, leaving a lasting impression on your audience.',
    tags: ['Creative', 'Responsive', 'User-Friendly', 'Modern', 'Engaging']
  },
  {
    id: 2,
    lottie:
      'https://lottie.host/7767cc7e-d3e3-40ac-a910-69cf81e56d00/31Fv4TNy96.lottie',
    title: 'Web Dev',
    description: 'Transform your vision into reality with our cutting-edge web development solutions. We build robust, scalable, and high-performance websites powered by the latest technologies. From custom functionalities to seamless integrations, our development process ensures your site is fast, secure, and tailored to your business needs, delivering exceptional user experiences every time.',
    tags: ['Custom', 'Scalable', 'Secure', 'Fast', 'Innovative']
  },
  {
    id: 3,
    lottie:
      'https://lottie.host/8a086287-2276-4e9a-b505-3f09650a83a3/5hGnThW4t7.lottie',
    title: 'Branding',
    description: 'Craft a memorable identity with our comprehensive branding services, designed to make your business stand out in a crowded market. We create cohesive and impactful brand stories through logos, typography, and visual elements that resonate with your audience. Our strategic approach ensures your brand connects emotionally, builds trust, and drives loyalty.',
    tags: ['Identity', 'Memorable', 'Cohesive', 'Strategic', 'Authentic']
  },
  {
    id: 4,
     lottie:
      'https://lottie.host/b6d38626-6874-4fce-9192-846aae338466/dXlVQrj2Mo.lottie',
    title: 'SEO',
    description: 'Boost your visibility and dominate search rankings with our expert SEO optimization services. We employ data-driven strategies, from keyword research to on-page and off-page optimization, to drive organic traffic and enhance your online reach. Our tailored approach ensures your website ranks higher, attracts the right audience, and achieves lasting results.',
    tags: ['Search', 'Traffic', 'Rankings', 'Optimized', 'Data-Driven']
  },
];
export default function LinearCard() {
  return (
    <div className="flex min-h-screen bg-black items-center justify-center flex-col">
      <div className="max-w-6xl mx-auto text-center pt-24 sm:pt-28 md:pt-32">
        <TypingAnimation className="text-white text-4xl font-bold">What We Offer</TypingAnimation>
      </div>
      <div className="flex flex-col sm:flex-col md:flex-row gap-4 max-w-7xl mx-auto p-4">
        {items.map((item, i) => {
          return (
            <Dialog
              key={item.id}
              transition={{
                type: 'spring',
                bounce: 0.05,
                duration: 0.5,
              }}>
              <DialogTrigger
                style={{
                  borderRadius: '12px',
                }}
                className="flex w-full md:min-w-[300px] min-w-[250px] flex-col overflow-hidden border border-yellow-400 bg-white hover:bg-gray-100 dark:bg-white dark:hover:bg-gray-100">
                <div className="w-full h-40">
                  <DotLottieReact src={item.lottie} loop autoplay />
                </div>
                <div className="flex flex-grow flex-row items-end justify-between p-3">
                  <div>
                    <DialogTitle className="text-black text-xl">
                      {item.title}
                    </DialogTitle>
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-gray-400 hover:bg-gray-500 rounded-full dark:bg-gray-400 dark:hover:bg-gray-500">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </DialogTrigger>
              <DialogContainer className="pt-20">
                <DialogContent
                  style={{
                    borderRadius: '24px',
                  }}
                  className="relative flex h-full mx-auto flex-col overflow-y-auto border bg-white hover:bg-gray-100 dark:bg-white dark:hover:bg-gray-100 lg:w-[1000px] w-[90%]">
                  <div className="w-full h-100">
                    <DotLottieReact src={item.lottie} loop autoplay />
                  </div>
                  <div className="p-6">
                    <DialogTitle className="text-yellow-500 text-5xl">
                      {item.title}
                    </DialogTitle>
                    <DialogDescription
                      disableLayoutAnimation
                      variants={{
                        initial: { opacity: 0, scale: 0.8, y: -40 },
                        animate: { opacity: 1, scale: 1, y: 0 },
                        exit: { opacity: 0, scale: 0.8, y: -50 },
                      }}>
                      <p className="mt-2 text-black">
                        {item.description}
                      </p>
                    </DialogDescription>
                  </div>
                  <DialogClose className="text-zinc-50 bg-gray-400 p-4 hover:bg-gray-500 rounded-full dark:bg-gray-400 dark:hover:bg-gray-500" />
                </DialogContent>
              </DialogContainer>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}