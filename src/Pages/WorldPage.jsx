import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';

const mapHotspotsData = [
    { id: 'hotspot-1', top: '15%', left: '18%', title: 'The Crystal Spires', info: 'A cluster of towering, crystalline islands that hum with raw Aether.' },
    { id: 'hotspot-2', top: '45%', left: '47%', title: 'The Sunken City', info: 'The ruins of the former capital city, perpetually shrouded in cloud.' },
    { id: 'hotspot-3', top: '50%', left: '90%', title: 'The Verdant Cradle', info: 'A lush, jungle-like biome teeming with oversized flora and fauna.' },
    { id: 'hotspot-4', top: '15%', left: '75%', title: 'Permorn Caity', info: 'A desolate, craggy region where strange energies coalesce, shrouded in perpetual storms.' }
];

function WorldPage() {
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

        // Cleanup observer on component unmount
        return () => sections.forEach(section => {
            if (section) observer.unobserve(section);
        });
    }, []); 
    
    return (
        <>
            <Navbar />
            
            <PageHeader 
                title="The World of Aetherion"
                subtitle="Once a thriving nexus of civilizations, now a breathtaking vista of ruin and wonder, floating amidst a sea of clouds."
                marqueeText="THE WORLD"
            />

            {/* Main Content */}
            <main className="bg-bg-dark py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Overview Section */}
                    <section id="overview" className="mb-28 fade-in-section">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="lg:pr-8">
                                <div className="section-title mb-6">
                                    <h2 className="text-4xl font-bold text-white tracking-tight">The Great Fracture</h2>
                                </div>
                                <div className="prose prose-lg prose-invert text-gray-300 max-w-none">
                                    <p>Centuries ago, the world was whole. A cataclysmic event of unknown origin, The Great Fracture, shattered the very landmass, sending continents hurtling into the sky. Now, these floating islands, known as the Shattered Isles, are all that remain...</p> {/* Shortened for brevity, use full text */}
                                    <p>The source of this power, a mysterious energy called Aether, now flows freely through the isles, imbuing the world with both wondrous life and terrible danger.</p>
                                </div>
                            </div>
                            <div className="image-placeholder min-h-[50vh]">
                                <span className="placeholder-text">Concept art depicting the world shattering during The Great Fracture.</span>
                            </div>
                        </div>
                    </section>

                    {/* Map Section */}
                    <section id="map" className="mb-28 fade-in-section">
                        <div className="section-title mb-12 max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white tracking-tight">Explore the Shattered Isles</h2>
                            <p className="text-lg text-text-muted mt-2">Hover over a hotspot to learn more.</p>
                        </div>

                        <div className="relative">
                            <img src="/src/assets/Aetherion-World-v2.png" alt="A top-down artistic map of the Shattered Isles." className="w-full h-auto rounded-lg shadow-2xl" /> 
                            
                            {/* Dynamically render hotspots */}
                            {mapHotspotsData.map(hotspot => (
                                <div 
                                    key={hotspot.id} 
                                    id={hotspot.id} 
                                    className="map-hotspot" 
                                    style={{ top: hotspot.top, left: hotspot.left }} 
                                    data-title={hotspot.title} // Keep data-title for potential future use
                                >
                                    <span className="hover-info">{hotspot.info}</span>
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

export default WorldPage;