// components/Slider.js
"use client"
import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import CowboyCarterSlider from '@/components/Slider'

const Page = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(Draggable, InertiaPlugin)

    function initSlider() {
      const wrapper = document.querySelector('[data-slider="list"]')
      const slides = gsap.utils.toArray('[data-slider="slide"]')

      const nextButton = document.querySelector('[data-slider="button-next"]')
      const prevButton = document.querySelector('[data-slider="button-prev"]')

      const totalElement = document.querySelector('[data-slide-count="total"]')
      const stepElement = document.querySelector('[data-slide-count="step"]')
      const stepsParent = stepElement.parentElement

      let activeElement
      const totalSlides = slides.length

      // Update total slides text, prepend 0 if less than 10
      totalElement.textContent = totalSlides < 10 ? `0${totalSlides}` : totalSlides

      // Create step elements dynamically
      stepsParent.innerHTML = '' // Clear any existing steps
      slides.forEach((_, index) => {
        const stepClone = stepElement.cloneNode(true) // Clone template
        stepClone.textContent = index + 1 < 10 ? `0${index + 1}` : index + 1
        stepsParent.appendChild(stepClone)
      })

      const allSteps = stepsParent.querySelectorAll('[data-slide-count="step"]')

      const loop = horizontalLoop(slides, {
        paused: true,
        draggable: true,
        center: false,
        onChange: (element, index) => {
          activeElement && activeElement.classList.remove('active')
          const nextSibling = element.nextElementSibling || slides[0]
          nextSibling.classList.add('active')
          activeElement = nextSibling

          // Move the numbers container
          gsap.to(allSteps, {
            y: -100 * index + '%',
            ease: 'power3',
            duration: 0.45,
          })
        },
      })

      slides.forEach((slide, i) =>
        slide.addEventListener('click', () =>
          loop.toIndex(i - 1, { ease: 'power3', duration: 0.725 })
        )
      )

      nextButton.addEventListener('click', () =>
        loop.next({ ease: 'power3', duration: 0.725 })
      )
      prevButton.addEventListener('click', () =>
        loop.previous({ ease: 'power3', duration: 0.725 })
      )
    }

    function horizontalLoop(items, config) {
      let timeline
      items = gsap.utils.toArray(items)
      config = config || {}
      gsap.context(() => {
        let onChange = config.onChange,
          lastIndex = 0,
          tl = gsap.timeline({
            repeat: config.repeat,
            onUpdate:
              onChange &&
              function () {
                let i = tl.closestIndex()
                if (lastIndex !== i) {
                  lastIndex = i
                  onChange(items[i], i)
                }
              },
            paused: config.paused,
            defaults: { ease: 'none' },
            onReverseComplete: () =>
              tl.totalTime(tl.rawTime() + tl.duration() * 100),
          }),
          length = items.length,
          startX = items[0].offsetLeft,
          times = [],
          widths = [],
          spaceBefore = [],
          xPercents = [],
          curIndex = 0,
          indexIsDirty = false,
          center = config.center,
          pixelsPerSecond = (config.speed || 1) * 100,
          snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
          timeOffset = 0,
          container =
            center === true
              ? items[0].parentNode
              : gsap.utils.toArray(center)[0] || items[0].parentNode,
          totalWidth,
          getTotalWidth = () =>
            items[length - 1].offsetLeft +
            (xPercents[length - 1] / 100) * widths[length - 1] -
            startX +
            spaceBefore[0] +
            items[length - 1].offsetWidth *
              gsap.getProperty(items[length - 1], 'scaleX') +
            (parseFloat(config.paddingRight) || 0),
          populateWidths = () => {
            let b1 = container.getBoundingClientRect(),
              b2
            items.forEach((el, i) => {
              widths[i] = parseFloat(
                gsap.getProperty(el, 'width', 'px')
              )
              xPercents[i] =
                snap(
                  (parseFloat(gsap.getProperty(el, 'x', 'px')) /
                    widths[i]) *
                    100 +
                    gsap.getProperty(el, 'xPercent')
                ) || 0
              b2 = el.getBoundingClientRect()
              spaceBefore[i] = i
                ? b2.left - b1.right
                : b2.left - b1.left
              b1 = b2
            })
            gsap.set(items, {
              xPercent: (i) => xPercents[i],
            })
            totalWidth = getTotalWidth()
          },
          timeWrap,
          populateOffsets = () => {
            timeOffset = center
              ? (tl.duration() * container.offsetWidth) / 2 / totalWidth
              : 0
            center &&
              times.forEach((t, i) => {
                times[i] = timeWrap(
                  tl.labels['label' + i] +
                    (tl.duration() * widths[i]) / 2 / totalWidth -
                    timeOffset
                )
              })
          },
          getClosest = (values, value, wrap) => {
            let i = values.length,
              closest = 1e10,
              index = 0,
              d
            while (i--) {
              d = Math.abs(values[i] - value)
              if (d > wrap / 2) {
                d = wrap - d
              }
              if (d < closest) {
                closest = d
                index = i
              }
            }
            return index
          },
          populateTimeline = () => {
            let i, item, curX, distanceToStart, distanceToLoop
            tl.clear()
            for (i = 0; i < length; i++) {
              item = items[i]
              curX = (xPercents[i] / 100) * widths[i]
              distanceToStart =
                item.offsetLeft +
                curX -
                startX +
                (spaceBefore[0] || 0)
              distanceToLoop =
                distanceToStart +
                widths[i] * gsap.getProperty(item, 'scaleX')
              tl.to(
                item,
                {
                  xPercent: snap(
                    ((curX - distanceToLoop) / widths[i]) * 100
                  ),
                  duration: distanceToLoop / pixelsPerSecond,
                },
                0
              )
                .fromTo(
                  item,
                  {
                    xPercent: snap(
                      ((curX - distanceToLoop + totalWidth) / widths[i]) *
                        100
                    ),
                  },
                  {
                    xPercent: xPercents[i],
                    duration:
                      (curX - distanceToLoop + totalWidth - curX) /
                      pixelsPerSecond,
                    immediateRender: false,
                  },
                  distanceToLoop / pixelsPerSecond
                )
                .add('label' + i, distanceToStart / pixelsPerSecond)
              times[i] = distanceToStart / pixelsPerSecond
            }
            timeWrap = gsap.utils.wrap(0, tl.duration())
          },
          refresh = (deep) => {
            let progress = tl.progress()
            tl.progress(0, true)
            populateWidths()
            deep && populateTimeline()
            populateOffsets()
            deep && tl.draggable
              ? tl.time(times[curIndex], true)
              : tl.progress(progress, true)
          },
          onResize = () => refresh(true),
          proxy

        gsap.set(items, { x: 0 })
        populateWidths()
        populateTimeline()
        populateOffsets()
        window.addEventListener('resize', onResize)

        function toIndex(index, vars) {
          vars = vars || {}
          Math.abs(index - curIndex) > length / 2 &&
            (index += index > curIndex ? -length : length)
          let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex]
          if (
            (time > tl.time() !== (index > curIndex)) &&
            index !== curIndex
          ) {
            time += tl.duration() * (index > curIndex ? 1 : -1)
          }
          if (time < 0 || time > tl.duration()) {
            vars.modifiers = { time: timeWrap }
          }
          curIndex = newIndex
          vars.overwrite = true
          gsap.killTweensOf(proxy)
          return vars.duration === 0
            ? tl.time(timeWrap(time))
            : tl.tweenTo(time, vars)
        }

        tl.toIndex = (index, vars) => toIndex(index, vars)
        tl.closestIndex = (setCurrent) => {
          let index = getClosest(times, tl.time(), tl.duration())
          if (setCurrent) {
            curIndex = index
            indexIsDirty = false
          }
          return index
        }
        tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex)
        tl.next = (vars) => toIndex(tl.current() + 1, vars)
        tl.previous = (vars) => toIndex(tl.current() - 1, vars)
        tl.times = times
        tl.progress(1, true).progress(0, true)
        if (config.reversed) {
          tl.vars.onReverseComplete()
          tl.reverse()
        }
        if (config.draggable && typeof Draggable === 'function') {
          proxy = document.createElement('div')
          let wrap = gsap.utils.wrap(0, 1),
            ratio,
            startProgress,
            draggable,
            dragSnap,
            lastSnap,
            initChangeX,
            wasPlaying,
            align = () =>
              tl.progress(
                wrap(
                  startProgress +
                    (draggable.startX - draggable.x) * ratio
                )
              ),
            syncIndex = () => tl.closestIndex(true)
          typeof InertiaPlugin === 'undefined' &&
            console.warn(
              'InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club'
            )
          draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode,
            type: 'x',
            onPressInit() {
              let x = this.x
              gsap.killTweensOf(tl)
              wasPlaying = !tl.paused()
              tl.pause()
              startProgress = tl.progress()
              refresh()
              ratio = 1 / totalWidth
              initChangeX = startProgress / -ratio - x
              gsap.set(proxy, { x: startProgress / -ratio })
            },
            onDrag: align,
            onThrowUpdate: align,
            overshootTolerance: 0,
            inertia: true,
            snap(value) {
              if (
                Math.abs(startProgress / -ratio - this.x) < 10
              ) {
                return lastSnap + initChangeX
              }
              let time = (-value * ratio) * tl.duration(),
                wrappedTime = timeWrap(time),
                snapTime = times[getClosest(times, wrappedTime, tl.duration())],
                dif = snapTime - wrappedTime
              Math.abs(dif) > tl.duration() / 2 &&
                (dif += dif < 0 ? tl.duration() : -tl.duration())
              lastSnap = (time + dif) / tl.duration() / -ratio
              return lastSnap
            },
            onRelease() {
              syncIndex()
              draggable.isThrowing && (indexIsDirty = true)
            },
            onThrowComplete: () => {
              syncIndex()
              wasPlaying && tl.play()
            },
          })[0]
          tl.draggable = draggable
        }
        tl.closestIndex(true)
        lastIndex = curIndex
        onChange && onChange(items[curIndex], curIndex)
        timeline = tl
        return () => window.removeEventListener('resize', onResize)
      })
      return timeline
    }

    initSlider()
  }, [])

  return (
    <>
      <section className="relative flex justify-center items-center min-h-screen text-[1.1vw] ">
        {/* Overlay */}
        <div
          className="absolute inset-0 left-0 flex items-center justify-start z-20 "
          style={{
            width: '37.5em',
            height: '100%',
            backgroundImage: 'linear-gradient(90deg, #010101 65%, transparent) ',
            paddingLeft: '2em',
          }}
        >
          <div className="flex flex-col justify-between items-start h-[28.125em] ">
            {/* Count Row */}
            <div className="flex items-center space-x-[0.2em] font-ppNeueCorp font-bold text-[5.625em] ">
              <div className="overflow-hidden h-[1em]">
                <h2
                  data-slide-count="step"
                  className="w-[2ch] leading-none m-0"
                >
                  01
                </h2>
              </div>
              <div className="bg-white w-[2px] h-[0.75em] transform rotate-[15deg]"></div>
              <div className="overflow-hidden h-[1em]">
                <h2
                  data-slide-count="total"
                  className="w-[2ch] leading-none m-0"
                >
                  04
                </h2>
              </div>
            </div>
            {/* Navigation Buttons */}
            <div className="flex space-x-12 gap-8">
              <button
                aria-label="previous slide"
                data-slider="button-prev"
                className="relative flex items-center justify-center w-[4em] h-[4em] border border-white/60 rounded-full bg-transparent text-white transition-transform duration-500 ease-[var(--cubic-default)] hover:opacity-100 hover:scale-[0.85] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 17 12"
                  fill="none"
                  className="w-[1em] h-[0.75em] flex-none"
                >
                  <path
                    d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                aria-label="next slide"
                data-slider="button-next"
                className="relative flex items-center justify-center w-[4em] h-[4em] border border-white/60 rounded-full bg-transparent text-white transition-transform duration-500 ease-[var(--cubic-default)] hover:opacity-100 hover:scale-[0.85]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 17 12"
                  fill="none"
                  className="w-[1em] h-[0.75em] flex-none rotate-180"
                >
                  <path
                    d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Slider */}
       <div className="absolute inset-0 overflow-hidden z-0 ">
  <div className="flex items-center h-full ">
    <div
      data-slider="list"
      className="flex relative gap-[1.25em] px-[1.25em] pr-[2.5em]"  
    >
      {/* Slide 1 */}
      <CowboyCarterSlider/>

      {/* Slide 2 */}
      <CowboyCarterSlider/>

      {/* Slide 3 */}
      <div
        data-slider="slide"
        className="flex-none w-[42.5em] h-[28em] opacity-20 transition-opacity duration-400"
      >
        <div className="relative w-full h-full rounded-[0.5em] overflow-hidden">
          <img
            src="https://cdn.prod.website-files.com/674d847bf8e817966d307714/674d90f7f7cce73267703347_slide-3.avif"
            loading="lazy"
            className="w-full h-full object-cover"
            alt="Slide 3"
          />
          <div className="absolute top-[1.25em] left-[1.25em] flex items-center bg-white text-black rounded-[0.25em] px-[0.75em] py-[0.4em] opacity-0 transform -translate-x-[25%] transition-opacity transition-transform duration-525 ease-[var(--cubic-default)]">
            <div className="w-[0.5em] h-[0.5em] bg-black rounded-full mr-[0.4em]"></div>
            <p className="text-[0.75em] font-arial m-0">Layout nº003</p>
          </div>
        </div>
      </div>

      {/* Slide 4 (Last) */}
      <div
        data-slider="slide"
        className="flex-none w-[42.5em] h-[28em] opacity-20 transition-opacity duration-400"
      >
        <div className="relative w-full h-full rounded-[0.5em] overflow-hidden">
          <img
            src="https://cdn.prod.website-files.com/674d847bf8e817966d307714/674d90f7ccfd203c82a46798_slide-4.avif"
            loading="lazy"
            className="w-full h-full object-cover"
            alt="Slide 4"
          />
          <div className="absolute top-[1.25em] left-[1.25em] flex items-center bg-white text-black rounded-[0.25em] px-[0.75em] py-[0.4em] opacity-0 transform -translate-x-[25%] transition-opacity transition-transform duration-525 ease-[var(--cubic-default)]">
            <div className="w-[0.5em] h-[0.5em] bg-black rounded-full mr-[0.4em]"></div>
            <p className="text-[0.75em] font-arial m-0">Layout nº004</p>
          </div>
        </div>
      </div>
      <div
        data-slider="slide"
        className="flex-none w-[42.5em] h-[28em] opacity-20 transition-opacity duration-400"
      >
        <div className="relative w-full h-full rounded-[0.5em] overflow-hidden">
          <img
            src="https://cdn.prod.website-files.com/674d847bf8e817966d307714/674d90f7ccfd203c82a46798_slide-4.avif"
            loading="lazy"
            className="w-full h-full object-cover"
            alt="Slide 4"
          />
          <div className="absolute top-[1.25em] left-[1.25em] flex items-center bg-white text-black rounded-[0.25em] px-[0.75em] py-[0.4em] opacity-0 transform -translate-x-[25%] transition-opacity transition-transform duration-525 ease-[var(--cubic-default)]">
            <div className="w-[0.5em] h-[0.5em] bg-black rounded-full mr-[0.4em]"></div>
            <p className="text-[0.75em] font-arial m-0">Layout nº004</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      </section>

      {/* Global Styles for Fonts, Cursors, and Variables */}
      <style jsx global>{`
        /* Font Faces */
        @font-face {
          font-family: 'PP Neue Corp';
          src: url('https://cdn.prod.website-files.com/6717aac16c9ea22eeef1e79e/6717de2d56e40b921572d2d9_PPNeueCorp-TightUltrabold.woff2')
            format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'PP Neue Montreal';
          src: url('https://cdn.prod.website-files.com/6819ed8312518f61b84824df/6819ed8312518f61b84825ba_PPNeueMontreal-Medium.woff2')
            format('woff2');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        /* CSS Variables */
        :root {
          --color-black: #000000;
          --color-light: #ffffff;
          --color-dark: #000000;
          --cubic-default: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        /* Body-level styling (if you want this globally, otherwise omit) */
        body {
          background-color: var(--color-black);
          color: var(--color-light);
          font-size: 1vw;
          cursor: url('https://cdn.prod.website-files.com/6708f85ff3d3cba6aff436fb/671251b239d7aeb290a31ac5_cursor-default@2x.svg')
              2 0,
            auto;
        }
        a,
        button {
          cursor: url('https://cdn.prod.website-files.com/6708f85ff3d3cba6aff436fb/671251b212e6b71494aa67ff_cursor-pointer@2x.svg')
              12 0,
            pointer;
        }

        /* Slider Slide Styling */
        [data-slider='slide'] {
          opacity: 0.2;
        }
        [data-slider='slide'].active {
          opacity: 1;
        }
        [data-slider='slide'].active .slide-caption {
          transition-delay: 0.3s;
        }
        .slide-caption {
          transition: transform 0.525s var(--cubic-default),
            opacity 0.525s var(--cubic-default);
          transition-delay: 0s;
        }
        html:not(.wf-design-mode) .slide-caption {
          opacity: 0;
          transform: translate(-25%, 0px);
        }
        html:not(.wf-design-mode) [data-slider='slide'].active .slide-caption {
          opacity: 1;
          transform: translate(0%, 0px);
        }

        /* Caption Text */
        .font-arial {
          font-family: Arial, sans-serif;
        }
      `}</style>
    </>
  )
}

export default Page;