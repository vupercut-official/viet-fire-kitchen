import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Nav Animation
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'organic-nav', targets: navRef.current },
        onToggle: self => {
            if (self.isActive) {
                gsap.to(navRef.current, { backgroundColor: 'rgba(242, 240, 233, 0.8)', borderColor: 'rgba(26, 26, 26, 0.1)', duration: 0.3 });
                gsap.to('.nav-text', { color: '#1A1A1A', duration: 0.3 });
            } else {
                gsap.to(navRef.current, { backgroundColor: 'transparent', borderColor: 'transparent', duration: 0.3 });
                gsap.to('.nav-text', { color: '#F2F0E9', duration: 0.3 });
            }
        }
      });

      // Hero Animation
      gsap.fromTo('.hero-anim', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Noise Overlay */}
      <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Navbar: Floating Island */}
      <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-[2rem] px-8 py-4 flex justify-between items-center transition-all duration-300 border border-transparent">
        <div className="nav-text text-cream font-heading font-bold text-2xl tracking-tight transition-colors duration-300">
          Viet Fire Kitchen
        </div>
        <div className="hidden md:flex gap-10 font-sans text-sm font-medium tracking-wide nav-text text-cream transition-colors duration-300">
          <a href="#features" className="hover:-translate-y-[1px] transition-transform">Menu</a>
          <a href="#process" className="hover:-translate-y-[1px] transition-transform">Story</a>
        </div>
        <button className="bg-signal text-cream px-8 py-3 rounded-3xl font-sans font-semibold hover:scale-105 transition-transform duration-300 shadow-xl flex items-center gap-2 relative overflow-hidden group">
          <span className="relative z-10">Order Online</span>
          <div className="absolute inset-0 bg-moss translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-end pb-24 px-6 md:px-12 lg:px-24 bg-moss overflow-hidden">
        {/* Background Image / Texture */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=2000&auto=format&fit=crop" 
            alt="Organic Texture" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-moss via-moss/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end justify-between">
          <div className="max-w-4xl">
            <h1 className="flex flex-col gap-2">
              <span className="hero-anim font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-cream tracking-tight">
                Viet Fire Kitchen is the
              </span>
              <span className="hero-anim font-serif italic text-6xl md:text-8xl lg:text-[130px] leading-[0.9] text-signal drop-shadow-2xl translate-y-2">
                Authentic Home.
              </span>
            </h1>
            <p className="hero-anim font-sans text-cream/80 mt-10 text-xl md:text-2xl max-w-xl font-light">
              Home style, slightly elevated Vietnamese food taking tradition to the level of art.
            </p>
          </div>
          
          <div className="hero-anim shrink-0 mb-4">
             <button className="bg-cream text-charcoal px-10 py-5 rounded-[2.5rem] font-sans font-bold text-lg hover:scroll-mt-0 hover:scale-[1.03] transition-transform duration-300 organic-shadow flex items-center gap-3 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-3">View the Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" /></span>
              <div className="absolute inset-0 bg-signal translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
              <span className="absolute inset-0 flex relative z-10 items-center justify-center gap-3 translate-y-[-100%] group-hover:translate-y-0 text-cream font-bold transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                 View the Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="features" className="min-h-screen bg-cream py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <h2 className="font-serif italic text-6xl md:text-8xl mb-8 text-moss tracking-tight">Our Menu.</h2>
            <p className="font-sans text-charcoal/70 text-xl max-w-2xl mb-24 leading-relaxed">
              Curated, generation-old recipes crafted with patience and precision. No shortcuts.
            </p>
            
            <InteractiveMenu />
        </div>
      </section>

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Protocol Section */}
      <ProtocolSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// --- Feature Components ---

function InteractiveMenu() {
  const menuItems = [
    {
      id: 1,
      title: "Traditional Pho",
      desc: "Our signature 24-hour simmered bone broth, fresh rice noodles, rare steak, brisket, and a fragrant bouquet of Thai basil, cilantro, and bean sprouts.",
      price: "$16",
      image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Classic Banh Mi",
      desc: "Crispy, airy French baguette loaded with savory grilled pork, house-made pâté, pickled daikon and carrots, fresh cucumber, and spicy jalapeños.",
      price: "$12",
      image: "https://images.unsplash.com/photo-1616886477028-c149eb007e05?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Fresh Spring Rolls",
      desc: "Delicate rice paper wrapping steamed shrimp, lean pork, vermicelli noodles, and fresh mint. Served with our rich peanut dipping sauce.",
      price: "$9",
      image: "https://images.unsplash.com/photo-1551460515-db25291be146?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate each menu item in sequence as they scroll into view
      const items = gsap.utils.toArray('.menu-item');
      
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        // Image parallax effect
        const img = item.querySelector('.menu-img');
        if (img) {
            gsap.fromTo(img,
                { y: -30, scale: 1.1 },
                {
                    y: 30,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col gap-24 lg:gap-32" ref={containerRef}>
      {menuItems.map((item, index) => (
        <div key={item.id} className={`menu-item flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
          
          {/* Image Container */}
          <div className="w-full md:w-1/2 aspect-[4/3] rounded-[2rem] overflow-hidden organic-shadow relative group">
             <div className="absolute inset-0 bg-charcoal/10 mix-blend-multiply z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>
             <img 
               src={item.image} 
               alt={item.title} 
               className="menu-img w-full h-[120%] object-cover -translate-y-[10%] transition-transform duration-700 group-hover:scale-105"
             />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="flex justify-between items-end border-b border-charcoal/20 pb-4 mb-6">
                <h3 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-moss">{item.title}</h3>
                <span className="font-mono text-signal text-xl md:text-2xl">{item.price}</span>
            </div>
            <p className="font-sans text-charcoal/80 text-lg leading-relaxed mb-8">
              {item.desc}
            </p>
            <button className="flex items-center gap-3 font-sans font-bold text-moss hover:text-signal transition-colors w-fit group">
                <span className="uppercase tracking-widest text-sm">Add to Order</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

function PhilosophySection() {
    const textRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.phil-text',
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    stagger: 0.2, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, textRef);
        return () => ctx.revert();
    }, []);

    return (
        <section className="relative py-48 px-6 bg-charcoal text-cream overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" 
                    alt="Organic Texture" 
                    className="w-full h-full object-cover opacity-15 grayscale mix-blend-screen"
                />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto" ref={textRef}>
                <p className="phil-text font-mono text-cream/50 uppercase tracking-widest text-sm mb-8">The Manifesto</p>
                <div className="space-y-12">
                    <p className="phil-text font-sans font-light text-2xl md:text-4xl lg:text-5xl text-cream/70 leading-relaxed md:leading-tight">
                        Most modern cuisine focuses on: <br/><span className="font-normal italic">Pretentious presentation and complex alterations.</span>
                    </p>
                    <p className="phil-text font-serif italic text-5xl md:text-7xl lg:text-[100px] leading-none text-cream mt-8">
                        We focus on: <br/><span className="text-signal">Soulful Perfection.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

function ProtocolSection() {
    const containerRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);
    const svgRefs = {
        wokBody: useRef(null),
        wokFood: useRef(null),
        heat1: useRef(null),
        heat2: useRef(null),
        heat3: useRef(null),
        chopsticks: useRef(null),
        noodle: useRef(null)
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Master timeline for pinning and stacking
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                }
            });

            // Card 2 covers Card 1
            tl.to(card1Ref.current, { scale: 0.9, opacity: 0.3, filter: 'blur(10px)', duration: 1 })
              .fromTo(card2Ref.current, { y: '100%' }, { y: '0%', duration: 1 }, "<");

            // Card 3 covers Card 2
            tl.to(card2Ref.current, { scale: 0.9, opacity: 0.3, filter: 'blur(10px)', duration: 1 })
              .to(card1Ref.current, { scale: 0.8, opacity: 0.1, duration: 1 }, "<")
              .fromTo(card3Ref.current, { y: '100%' }, { y: '0%', duration: 1 }, "<");

            // --- SVG 1: Wok Toss Animation ---
            const wokTl = gsap.timeline({ repeat: -1 });
            // Toss motion: Wok pulls back slightly, then jerks forward/up
            wokTl.to(svgRefs.wokBody.current, { rotation: -15, transformOrigin: '20% 80%', duration: 0.3, ease: 'power1.inOut' })
                 .to(svgRefs.wokBody.current, { rotation: 25, transformOrigin: '20% 80%', duration: 0.2, ease: 'power2.out' })
                 .to(svgRefs.wokBody.current, { rotation: 0, transformOrigin: '20% 80%', duration: 0.5, ease: 'power1.inOut', delay: 0.5 })
            // Food tossing motion: Follows wok up, hangs in air, falls back
            gsap.to(svgRefs.wokFood.current, { 
                y: -60, x: -10, rotation: -30, 
                duration: 0.35, 
                ease: 'power2.out', 
                repeat: -1, 
                repeatDelay: 0.85,
                delay: 0.35 
            });

            // --- SVG 2: Simmering Heat Waves ---
            [svgRefs.heat1.current, svgRefs.heat2.current, svgRefs.heat3.current].forEach((heat, i) => {
                gsap.fromTo(heat, 
                    { y: 20, opacity: 0, scaleY: 0.8 },
                    { 
                        y: -30, 
                        opacity: 0.6, 
                        scaleY: 1.2, 
                        duration: 2.5, 
                        repeat: -1, 
                        yoyo: true, 
                        ease: "sine.inOut", 
                        delay: i * 0.8 
                    }
                );
            });

            // --- SVG 3: Chopsticks & Noodle Lift ---
            const chopTl = gsap.timeline({ repeat: -1 });
            chopTl.to(svgRefs.chopsticks.current, { y: -40, rotation: -5, duration: 1.5, ease: 'power2.inOut' })
                  .to(svgRefs.chopsticks.current, { y: 0, rotation: 0, duration: 1.5, ease: 'power2.inOut', delay: 0.5 });
            
            // Noodle stretches and follows
            gsap.to(svgRefs.noodle.current, {
                attr: { d: "M70 120 Q 80 80 85 40 Q 90 60 75 120" }, // Stretched path
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
                repeatDelay: 0.5
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="process" className="relative h-screen bg-cream" ref={containerRef}>
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cream z-20 pointer-events-none"></div>

            {/* Card 1: The Harvest -> Wok Toss */}
            <div ref={card1Ref} className="absolute inset-0 p-6 md:p-12 lg:p-24 flex flex-col justify-center bg-cream border-b border-charcoal/10">
                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <span className="font-mono text-signal text-lg uppercase tracking-widest mb-6 block">01 / Process</span>
                        <h2 className="font-heading font-bold text-6xl md:text-8xl lg:text-[100px] tracking-tight mb-8 text-moss leading-none">The Harvest.</h2>
                        <p className="font-serif italic text-3xl md:text-4xl text-charcoal/80 leading-relaxed">Sourcing the freshest local ingredients and traditional spices necessary to construct authentic flavor profiles.</p>
                    </div>
                    <div className="w-72 h-72 shrink-0 border border-charcoal/15 rounded-full flex items-center justify-center p-8 bg-cream relative overflow-hidden shadow-2xl">
                        <svg width="100%" height="100%" viewBox="0 0 150 150" fill="none" className="overflow-visible">
                             {/* Wok Base Elements */}
                             <path d="M10 110 L40 110" stroke="#CC5833" strokeWidth="4" strokeLinecap="round" />
                             
                             <g ref={svgRefs.wokBody} className="origin-bottom-left">
                                 {/* Handle */}
                                 <path d="M20 90 L50 100" stroke="#2E4036" strokeWidth="6" strokeLinecap="round" />
                                 {/* Wok Pan */}
                                 <path d="M40 70 Q 100 130 140 70" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" fill="none" />
                                 <path d="M40 70 Q 90 90 140 70" fill="#2E4036" opacity="0.1" />
                             </g>

                             {/* Food Flipping */}
                             <g ref={svgRefs.wokFood} className="origin-center" transform="translate(90, 80)">
                                 {/* Vegetables/Meat bits represented organically */}
                                 <path d="M0 0 Q -10 -20 10 -15 T -5 5" fill="#E63B2E" />
                                 <circle cx="-15" cy="-10" r="4" fill="#2E4036" />
                                 <path d="M10 -5 L 15 -25 L 20 -5 Z" fill="#CC5833" />
                                 <circle cx="5" cy="10" r="6" fill="#F2F0E9" stroke="#1A1A1A" strokeWidth="2" />
                             </g>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Card 2: The Simmer -> Heat Waves */}
            <div ref={card2Ref} className="absolute inset-0 p-6 md:p-12 lg:p-24 flex flex-col justify-center bg-moss organic-shadow origin-bottom translate-y-[100%] z-10 border-b border-charcoal">
                 <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <span className="font-mono text-signal text-lg uppercase tracking-widest mb-6 block">02 / Process</span>
                        <h2 className="font-heading font-bold text-6xl md:text-8xl lg:text-[100px] tracking-tight mb-8 text-cream leading-none">The Simmer.</h2>
                        <p className="font-serif italic text-3xl md:text-4xl text-cream/80 leading-relaxed">Patience is an ingredient. Broths simmered for 24 hours to extract maximum depth and healing properties.</p>
                    </div>
                    <div className="w-72 h-72 shrink-0 bg-charcoal/50 rounded-full flex flex-col items-center justify-center relative overflow-hidden shadow-2xl border-4 border-cream/10">
                         {/* Bowl Bottom */}
                         <div className="absolute bottom-0 w-[120%] h-[40%] bg-[#1A1A1A] rounded-t-[100%]"></div>
                         
                         {/* Steam Waves */}
                         <svg width="100%" height="80%" viewBox="0 0 100 100" fill="none" className="absolute bottom-[20%] overflow-visible">
                            <path ref={svgRefs.heat1} d="M30 100 Q 15 70 30 50 T 30 0" stroke="#F2F0E9" strokeWidth="4" strokeLinecap="round" fill="none" className="origin-bottom"/>
                            <path ref={svgRefs.heat2} d="M50 110 Q 70 80 50 60 T 50 10" stroke="#E63B2E" strokeWidth="3" strokeLinecap="round" fill="none" className="origin-bottom"/>
                            <path ref={svgRefs.heat3} d="M70 105 Q 55 75 70 55 T 70 5" stroke="#F2F0E9" strokeWidth="4" strokeLinecap="round" fill="none" className="origin-bottom"/>
                         </svg>
                    </div>
                </div>
            </div>

             {/* Card 3: The Art -> Chopsticks */}
             <div ref={card3Ref} className="absolute inset-0 p-6 md:p-12 lg:p-24 flex flex-col justify-center bg-charcoal text-cream transform origin-bottom translate-y-[100%] z-20">
                 <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <span className="font-mono text-signal text-lg uppercase tracking-widest mb-6 block">03 / Process</span>
                        <h2 className="font-heading font-bold text-6xl md:text-8xl lg:text-[100px] tracking-tight mb-8 text-cream leading-none">The Art.</h2>
                        <p className="font-serif italic text-3xl md:text-4xl text-cream/70 leading-relaxed">Final assembly of fresh herbs, proteins, and steaming broth. A mindful composition served to you.</p>
                    </div>
                    <div className="w-72 h-72 shrink-0 border border-signal/20 rounded-full flex items-center justify-center p-6 bg-charcoal shadow-[0_0_50px_rgba(230,59,46,0.1)] relative overflow-hidden">
                        
                        <svg width="100%" height="100%" viewBox="0 0 150 150" fill="none" className="overflow-visible mix-blend-screen leading-none">
                            {/* Bowl */}
                            <path d="M20 120 Q 75 160 130 120 L 140 110 L 10 110 Z" fill="#2E4036" />
                            <path d="M10 110 C 10 90, 140 90, 140 110" fill="#CC5833" opacity="0.5" />
                            
                            {/* Animated Noodle */}
                            <path ref={svgRefs.noodle} d="M40 120 Q 55 90 85 80 Q 110 100 110 120" stroke="#F2F0E9" strokeWidth="5" strokeLinecap="round" fill="none" />
                            <path d="M60 120 Q 60 100 85 85 Q 120 100 100 120" stroke="#F2F0E9" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7"/>

                            {/* Animated Chopsticks */}
                            <g ref={svgRefs.chopsticks}>
                                <line x1="120" y1="-20" x2="80" y2="80" stroke="#E63B2E" strokeWidth="6" strokeLinecap="round" />
                                <line x1="105" y1="-25" x2="90" y2="80" stroke="#CC5833" strokeWidth="5" strokeLinecap="round" />
                            </g>
                        </svg>

                        <div className="absolute inset-0 border-[10px] border-moss/30 rounded-full pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-moss text-cream pt-32 pb-12 px-6 rounded-t-[4rem] relative z-30">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 mb-32">
                    <div>
                        <h2 className="font-heading font-bold text-5xl md:text-7xl mb-12 tracking-tight leading-tight">Bring tradition<br/>to your table.</h2>
                        <button className="bg-signal text-cream px-12 py-6 text-xl rounded-[3rem] font-sans font-bold hover:scale-[1.03] transition-transform duration-300 flex items-center gap-4 relative overflow-hidden group shadow-2xl">
                            <span className="relative z-10 flex items-center gap-3">Order Online Now <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" /></span>
                            <div className="absolute inset-0 bg-cream translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0"></div>
                            <span className="absolute inset-0 flex relative z-10 items-center justify-center gap-3 translate-y-[-100%] group-hover:translate-y-0 text-moss font-bold transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                Order Online Now <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                    </div>
                    <div className="flex flex-col md:items-end justify-between">
                         <div className="font-mono text-sm uppercase tracking-widest text-cream/50 flex flex-col gap-6 mb-12 md:mb-0">
                             <a href="#" className="hover:text-signal transition-colors inline-block w-fit">Instagram</a>
                             <a href="#" className="hover:text-signal transition-colors inline-block w-fit">Yelp</a>
                             <a href="#" className="hover:text-signal transition-colors inline-block w-fit">Catering Inquiries</a>
                         </div>
                         <div className="flex items-center gap-3 font-mono text-xs bg-charcoal/20 px-5 py-2.5 rounded-full border border-cream/10 backdrop-blur-sm">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#A3D9A5] animate-pulse shadow-[0_0_10px_#A3D9A5]"></div>
                            KITCHEN IS OPEN
                         </div>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-cream/10 text-cream/40 font-sans text-sm font-light">
                    <p>&copy; {new Date().getFullYear()} Viet Fire Kitchen. Authentic flavors.</p>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-cream transition-colors">Allergen Info</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default App;
