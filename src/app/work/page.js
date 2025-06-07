'use client';
import React from 'react';

const OurWork = () => {
  const cards = [
    {
      img: '/image.png',
      title: 'OJUS',
      url: 'https://ojus-culturals.vercel.app/',
      rotation: -4,
      endY: 0,
      duration: '6s',
    },
    {
      img: '/a2.jpg',
      title: 'PassVault',
      url: 'https://pass-vault-psi.vercel.app/',
      rotation: 3,
      endY: -1.025,
      duration: '6s',
    },
    {
      img: '/s1.jpg',
      title: 'MaiaEvents',
      url: 'https://maiaevents.in/',
      rotation: -1,
      endY: -2.25,
      duration: '6.5s',
    },
    {
      img: '/y1.jpg',
      title: 'TravelHub',
      url: 'https://travel-lovat-theta.vercel.app/',
      rotation: -5,
      endY: -3.75,
      duration: '6.75s',
    },
    {
      img: '/y2.jpg',
      title: 'Growth Chronicles',
      url: 'https://growth-chronicles.vercel.app/',
      rotation: -2,
      endY: -4.82,
      duration: '7s',
    },
    {
      img: 'a1.jpg',
      title: 'UrbanNest',
      url: 'https://urban-nest-6esd.vercel.app/',
      rotation: 2,
      endY: -5.85,
      duration: '7.25s',
    },
  ];

  return (
    <section
      className="w-full min-h-screen px-10 py-20 flex flex-col items-center justify-center bg-[#BBB8B2]"
      style={{
        // background:
        //   'linear-gradient(50deg, oklch(50% 0.0075 70), oklch(90% 0.0075 70))',
        backgroundAttachment: 'fixed',
      }}
    >
      <h2 className="text-4xl font-extrabold uppercase text-white mb-12 mt-20 text-center">
        Our Work
      </h2>

      <div
        className="flex flex-wrap gap-10 items-center justify-center w-full h-full group"
        style={{
          '--bg': '25% 0.0075 70',
          '--pink': '77.75% 0.1003 350.51',
          '--gold': '84.16% 0.1169 71.19',
          '--mint': '84.12% 0.1334 165.28',
          '--mobile-w': '360px',
          '--mobile-h': '540px',
          '--outline-w': '9px',
          '--preview-bg': '#fff',
        }}
      >
        {cards.map((card, i) => (
          <a
            key={i}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 no-underline"
          >
            <article
              tabIndex={0}
              className="relative border-[--outline-w] border-transparent rounded-4xl outline-[--outline-w] outline-[--preview-bg] transition-all duration-300 ease-in-out cursor-pointer"
              style={{
                backgroundImage: `url(${card.img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundPositionY: 0,
                width: 'var(--mobile-w)',
                height: 'var(--mobile-h)',
                minWidth: 'var(--mobile-w)',
                minHeight: 'var(--mobile-h)',
                maxWidth: 'var(--mobile-w)',
                maxHeight: 'var(--mobile-h)',
                boxShadow: `0 0 24px oklch(var(--bg))`,
                filter: 'grayscale(100%) sepia(5%)',
                mixBlendMode: 'multiply',
                opacity: 0.69,
                transform: `scale(0.85) rotate(${card.rotation}deg)`,
                animation: `bg-scroll-${i} ${card.duration} ease-out forwards`,
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 200px oklch(var(--gold))`;
                e.currentTarget.style.borderColor = 'oklch(var(--gold))';
                e.currentTarget.style.mixBlendMode = 'initial';
                e.currentTarget.style.filter = 'none';
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = `scale(1) rotate(0deg)`;
                e.currentTarget.style.zIndex = 6;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 24px oklch(var(--bg))`;
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.mixBlendMode = 'multiply';
                e.currentTarget.style.filter = 'grayscale(100%) sepia(5%)';
                e.currentTarget.style.opacity = '0.69';
                e.currentTarget.style.transform = `scale(0.85) rotate(${card.rotation}deg)`;
                e.currentTarget.style.zIndex = 1;
              }}
            />
            <p
              className="text-[#010101] text-xl text-center"
              style={{
                transform: `rotate(${card.rotation}deg)`,
              }}
            >
              {card.title}
            </p>
          </a>
        ))}
      </div>

      {/* Dynamic keyframes per card */}
      <style jsx>{`
        ${cards
          .map((card, i) => {
            return `
              @keyframes bg-scroll-${i} {
                to {
                  background-position-y: ${card.endY * 540}px;
                }
              }
            `;
          })
          .join('\n')}
      `}</style>
    </section>
  );
};

export default OurWork;
