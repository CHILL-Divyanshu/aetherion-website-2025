import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'; // Assuming Navbar is always present
import Footer from '../components/Footer'; // Assuming Footer is always present
import PageHeader from '../components/PageHeader'; // Reusable header component
// Data for philosophy cards (makes it easier to manage/update)
const philosophyPoints = [
    { title: "Community First", description: "We build *with* our players, not just for them. Your feedback shapes the world." },
    { title: "Uncompromising Quality", description: "Every aspect, from art to code, is crafted with the highest attention to detail." },
    { title: "Ethical Monetization", description: "No pay-to-win. We respect your time and money. Cosmetics and expansions only." },
    { title: "A Living World", description: "Launch is just the beginning. We are committed to a long-term plan of updates and new stories." }
];
    
// Data for roadmap items
const roadmapItems = [
    {
        icon: '✓', // Checkmark for complete
        date: 'Q4 2024',
        title: 'Phase 1: Prototype',
        status: 'Complete',
        statusColor: 'text-green-400', // Tailwind class for status color
        details: [
            'Core combat system validated',
            'Aether skill system proof-of-concept',
            'Basic enemy AI implemented'
        ],
        current: false // Not the current phase
    },
    {
        icon: '...', // Ellipsis for in progress
        date: 'Q1-Q3 2025',
        title: 'Phase 2: Vertical Slice',
        status: 'In Progress',
        statusColor: 'text-primary', // Use your primary color variable via Tailwind
        details: [
            'First playable level: "The Crystal Spires"',
            'Valerius character model & animations',
            'Community testers onboarding'
        ],
        current: true // This is the current phase
    },
    {
        icon: '', // Empty for upcoming
        date: 'Q4 2025 - 2026',
        title: 'Phase 3: Production',
        status: 'Upcoming',
        statusColor: 'text-gray-500',
        details: [
            'Full content creation begins',
            'Alpha and Beta testing phases',
            'Story and quests implementation'
        ],
        current: false
    }
];

function DevHubPage() {
    // Re-add Intersection Observer logic for fade-in effect on this page
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        const sections = document.querySelectorAll('.fade-in-section');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => {
             if(section) observer.unobserve(section);
        });
    }, []);

    return (
        <>
            <Navbar />

            <PageHeader 
                title="Development Hub"
                subtitle="Track the evolution of Aetherion and stay updated with our latest progress."
                marqueeText="THE DEV HUB"
            />

            {/* Main Content */}
            <main className="bg-bg-dark py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Philosophy Section */}
                    <section id="philosophy" className="mb-28 fade-in-section">
                        <div className="section-title mb-12 max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white tracking-tight">Our Development Philosophy</h2>
                            <p className="text-lg text-text-muted mt-2">More than just a game, it's a commitment.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {philosophyPoints.map((point, index) => (
                                <div key={index} className="philosophy-card p-6 rounded-lg text-center">
                                    <h3 className="text-xl font-bold text-white">{point.title}</h3>
                                    {/* Use dangerouslySetInnerHTML for simple markdown like *bold* - use with caution */}
                                    <p className="text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: point.description.replace(/\*(.*?)\*/g, '<strong>$1</strong>') }}></p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Roadmap Section */}
                    <section id="roadmap" className="mb-28 fade-in-section">
                        <div className="section-title mb-16 max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white tracking-tight">Development Roadmap</h2>
                            <p className="text-lg text-text-muted mt-2">Our journey towards launch and beyond. This is a living document that will evolve with the project.</p>
                        </div>

                        <div className="relative max-w-4xl mx-auto">
                            {/* Timeline Line */}
                            <div className="timeline-line absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-0.5 bg-secondary opacity-30"></div>
                            
                            {/* Dynamically render roadmap items */}
                            {roadmapItems.map((item, index) => (
                                <div key={index} className={`timeline-item relative mb-12 flex items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Icon */}
                                    <div className="icon absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                                        {item.icon || ''}
                                    </div>
                                    {/* Date */}
                                    <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:pl-8 text-left' : 'md:pr-8 text-right'} hidden md:block`}>
                                        <p className="text-gray-400">{item.date}</p>
                                    </div>
                                    {/* Content Box */}
                                    <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} ml-12 md:ml-0`}>
                                        <div className={`p-6 bg-bg-light rounded-lg shadow-lg ${item.current ? 'border-2 border-primary' : (item.status === 'Complete' ? '' : 'opacity-60')}`}>
                                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                            <p className="text-text-muted">Status: <span className={item.statusColor}>{item.status}</span></p>
                                            <ul className="list-disc list-inside text-gray-400 mt-2 text-sm text-left"> {/* Ensure text-left for list */}
                                                {item.details.map((detail, idx) => (
                                                    <li key={idx}>{detail}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </main>
            
            <Footer />
        </>
    );
}

export default DevHubPage;