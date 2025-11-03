// src/components/GuardiansPage.jsx
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'; // Assuming Navbar is always present
import Footer from '../components/Footer'; // Assuming Footer is always present
import PageHeader from '../components/PageHeader'; // Reusable header component
// Data for upcoming guardians (can be moved to a separate file later)
const upcomingGuardians = [
    { name: "The Sunstone Archer", alt: "The Sunstone Archer", imgSrc: "/src/assets/Guardians/The Sunstone Archer.jpg" }, // Adjust paths as needed
    { name: "The Tide-Singer", alt: "The Tide-Singer", imgSrc: "/src/assets/Guardians/The Tide Singer.jpg" },
    { name: "The Iron Juggernaut", alt: "The Iron Juggernaut", imgSrc: "/src/assets/Guardians/The Iron Juggernaut.jpg" },
    { name: "The Shadow Weaver", alt: "The Shadow Weaver", imgSrc: "/src/assets/Guardians/The Shadow Weaver.jpg" },
];

function GuardiansPage() {
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

            {/* Header with Marquee */}
            <PageHeader 
                title="The Guardians"
                subtitle="Ancient protectors wielding immense power, standing between civilization and chaos."
                marqueeText="THE GUARDIANS"
            />

            {/* Main Content */}
            <main className="bg-bg-dark py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Valerius Section */}
                    <section id="valerius" className="mb-28 fade-in-section">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"> 
                            <div className="lg:col-span-2">
                                {/* Placeholder - Add hover logic later if needed */}
                                <div className={`image-placeholder min-h-[60vh]`}>
                                    {/* === IMPORTANT: Update image path === */}
                                    <img src="/src/assets/Guardians/Valerius.jpg" alt="Valerius - The Bone King" className="w-full h-full object-cover rounded-lg" />
                                </div>
                            </div>
                            <div className="lg:col-span-3">
                                <h2 className="text-5xl font-bold text-white mb-2">Valerius</h2>
                                <p className="text-2xl font-semibold gradient-text mb-6">The Bone King</p>
                                {/* Using Tailwind Prose for better text formatting */}
                                <div className="prose prose-lg prose-invert text-gray-300 max-w-none">
                                    <p>Among the oldest of the Guardians, Valerius is a solemn sentinel who has witnessed empires turn to dust. He was a master tactician and king in a forgotten age, and the Fracture reawakened him from his eternal rest, binding him to the very bones of the shattered isles. He is not evil, but grimly pragmatic, seeing his command over the dead as a necessary tool to preserve what little life remains.</p>
                                    <p>Valerius fights with a slow, deliberate style, using his immense power to control the battlefield. He can raise armies of skeletal warriors, shape the terrain with bone constructs, and unleash devastating attacks of pure Aether, channeled through his ancient staff.</p>
                                </div>
                                
                                <div className="mt-12">
                                    <h3 className="text-2xl font-bold text-white mb-6">Core Abilities</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="ability-card p-6 rounded-lg">
                                            <h4 className="font-bold text-lg text-primary">Bone Barricade</h4>
                                            <p className="text-sm text-gray-400 mt-2">Erects a towering wall of dense bone to absorb enemy attacks and control movement.</p>
                                        </div>
                                         <div className="ability-card p-6 rounded-lg">
                                            <h4 className="font-bold text-lg text-primary">Aether Spear</h4>
                                            <p className="text-sm text-gray-400 mt-2">Conjures and launches a spear of pure energy that pierces through multiple foes.</p>
                                        </div>
                                         <div className="ability-card p-6 rounded-lg">
                                            <h4 className="font-bold text-lg text-primary">Grave Legion</h4>
                                            <p className="text-sm text-gray-400 mt-2">Summons a cadre of skeletal minions to fight alongside him, overwhelming his enemies.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Roster Section */}
                    <section id="roster" className="py-20 fade-in-section">
                         <div className="section-title mb-12 max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white tracking-tight">The Roster is Growing</h2>
                            <p className="text-lg text-text-muted mt-2">Valerius is but one of the legendary figures you will encounter. Stay tuned for reveals of other Guardians who will shape the fate of Aetherion.</p>
                         </div>
                         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            {/* Dynamically render upcoming guardians */}
                            {upcomingGuardians.map((guardian, index) => (
                                <div key={index} className="text-center">
                                    <div className="image-placeholder min-h-[300px] guardian-teaser">
                                        {/* === IMPORTANT: Update image paths === */}
                                        <img src={guardian.imgSrc} alt={guardian.alt} className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <h3 className="mt-4 text-xl font-bold text-gray-500">{guardian.name}</h3>
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

export default GuardiansPage;