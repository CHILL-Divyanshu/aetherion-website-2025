import React, { useEffect, useState, useRef } from 'react'; // Added useState, useRef
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader'; // keep this import


const socialPlatforms = [
    { name: "Discord", description: "Join our main community hub for direct chat with the devs and other fans.", link: "#" },
    { name: "X / Twitter", description: "For real-time updates, sneak peeks, and daily content.", link: "#" },
    { name: "YouTube", description: "Watch trailers, dev diaries, and gameplay showcases.", link: "#" },
    { name: "Instagram", description: "A visual journey through the art and world of Aetherion.", link: "#" }
];

// Data for fan art placeholders
const fanArtPlaceholders = [
    "Fan art of Valerius",
    "A landscape painting",
    "A weapon design",
    "Character sketch"
];

function CommunityPage() {
    // State for the AI Forge
    const ideaInputRef = useRef(null); // Ref to access input value
    const [ideaOutput, setIdeaOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    // Function to handle AI Idea Generation (mock)
    const handleGenerateIdea = () => {
        const idea = ideaInputRef.current.value;
        if (!idea) return;

        setIdeaOutput('<p class="p-4">Forging your concept...</p>'); // Use setIdeaOutput
        setIsLoading(true); // Show loading indicator

        // Simulate API call
        setTimeout(() => {
            const concept = `<h4>The Sentinel's Echo</h4><p>A shield forged from a fallen Guardian's memory. It starts weak, but with every blow it successfully blocks, it "learns" the attack, gaining a shimmering, ethereal layer of that damage type. After absorbing enough energy, the wielder can unleash the stored power in a devastating nova, its element reflecting the last attack type learned.</p>`;
            setIdeaOutput(concept); // Use setIdeaOutput
            setIsLoading(false); // Hide loading indicator
        }, 1500);
    };


    return (
        <>
            {/* Loading Modal - Controlled by isLoading state */}
            <div id="loading-modal" className={`fixed inset-0 bg-black/80 flex items-center justify-center z-[100] transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <div className="w-16 h-16 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
            </div>

            <Navbar />

            {/* Reusable header */}
            <PageHeader
              title="Join the Community"
              subtitle="Aetherion is built with its players. Connect with us, share your creativity, and become part of the journey."
              marqueeText="COMMUNITY HUB"
            />

            {/* Main Content */}
            <main className="bg-bg-dark py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Socials Section */}
                    <section id="socials" className="mb-28 fade-in-section">
                        <div className="section-title mb-12 max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white tracking-tight">Connect With Us</h2>
                            <p className="text-lg text-text-muted mt-2">Follow our development, join the conversation, and be the first to see exclusive content.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {socialPlatforms.map((platform, index) => (
                                <a key={index} href={platform.link} target="_blank" rel="noopener noreferrer" className="social-card p-8 rounded-lg text-center">
                                    <h3 className="text-2xl font-bold text-white">{platform.name}</h3>
                                    <p className="text-gray-400 mt-2">{platform.description}</p>
                                </a>
                            ))}
                        </div>
                    </section>
                    
                    {/* Shape The World Section */}
                    <section id="shape-the-world" className="mb-28 fade-in-section">
                        <div className="section-title mb-12 max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white tracking-tight">Shape The World</h2>
                            <p className="text-lg text-text-muted mt-2">Your creativity can inspire the future of Aetherion. Submit an idea and let our AI help forge it into a game-ready concept.</p>
                        </div>
                        <div className="max-w-3xl mx-auto bg-black/20 p-8 rounded-lg">
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 mb-4">
                                 <input 
                                     ref={ideaInputRef} 
                                     id="idea-input" 
                                     type="text" 
                                     placeholder="e.g., A shield that remembers every blow it takes" 
                                     className="flex-grow bg-bg-light border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-white" 
                                 />
                                <button 
                                    id="generate-idea-btn" 
                                    onClick={handleGenerateIdea} 
                                    className="ai-button font-bold py-2 px-5 rounded-lg whitespace-nowrap"
                                >
                                    ✨ Forge My Idea
                                </button>
                            </div>
                             {/* Use dangerouslySetInnerHTML to render the HTML from the mock API */}
                             <div 
                                 id="idea-output" 
                                 className="ai-output-box p-4 rounded-md text-gray-300 text-left"
                                 dangerouslySetInnerHTML={{ __html: ideaOutput }}
                             ></div>
                        </div>
                    </section>

                    {/* Fan Art Section */}
                    <section id="fan-art" className="fade-in-section">
                        <div className="section-title mb-12 max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-bold text-white tracking-tight">Community Showcase</h2>
                            <p className="text-lg text-text-muted mt-2">We are constantly amazed by the creativity of our community. Share your art with #AetherionArt!</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {fanArtPlaceholders.map((altText, index) => (
                                <div key={index} className="image-placeholder min-h-[300px]">
                                    <span className="placeholder-text">{altText}</span>
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

export default CommunityPage;