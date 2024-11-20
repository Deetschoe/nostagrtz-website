"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Instagram, Twitter, Play, ChevronLeft, ChevronRight, X, Mail } from 'lucide-react';


const StarField = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const generateStars = () => {
      return [...Array(100)].map((_, i) => ({
        id: i,
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 2,
        color: ['#ff7eae', '#7eff8b', '#ff9d7e'][Math.floor(Math.random() * 3)],
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5
      }));
    };
    
    const handleResize = () => {
      setStars(generateStars());
    };

    // Generate initial stars
    handleResize();

    // Update stars on window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: star.left + 'px',
            top: star.top + 'px',
            width: star.size + 'px',
            height: star.size + 'px',
            backgroundColor: star.color,
            boxShadow: '0 0 15px currentColor',
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: star.delay + 's',
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 70%, #0a0a0a)',
          zIndex: 1
        }}
      />
    </div>
  );
};


const ThankYouModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '1rem',
        maxWidth: '400px',
        width: '90%',
        position: 'relative',
      }}>
        {/* Close button (X) */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={24} color="white" />
        </button>

        <h3 style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          textAlign: 'center',
        }}>
          Thank you for subscribing!
        </h3>
        <p style={{
          textAlign: 'center',
          color: '#999',
          marginBottom: '1rem'
        }}>
          Expect an email in the next couple weeks with more info on preorders and your $10 off code.
        </p>
      </div>
    </div>
  );
};


const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['/thumbnail.jpg', '/thumbnail1.jpg', '/thumbnail2.jpg'];

  const scroll = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(curr => (curr > 0 ? curr - 1 : images.length - 1));
    } else {
      setCurrentIndex(curr => (curr < images.length - 1 ? curr + 1 : 0));
    }
  };

  return (
    <div className="relative" style={{ marginBottom: '2rem' }}>
      <div style={{
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(4px)',
      }}>
        <div style={{
          display: 'flex',
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product view ${index + 1}`}
              style={{
                minWidth: '100%',
                height: '400px',
                objectFit: 'cover',
              }}
            />
          ))}
        </div>
        
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            backdropFilter: 'blur(4px)',
          }}
        >
          <ChevronLeft color="white" size={24} />
        </button>
        
        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            backdropFilter: 'blur(4px)',
          }}
        >
          <ChevronRight color="white" size={24} />
        </button>
        
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px'
        }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const EmailModal = ({ isOpen, onClose, onSubmit }) => {
  const [modalEmail, setModalEmail] = useState('');
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(modalEmail);
    setModalEmail(''); // Reset the input
  };
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '1rem',
        maxWidth: '400px',
        width: '90%',
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          textAlign: 'center',
        }}>
          First access to preorders + receive $10 off
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={modalEmail}
            onChange={(e) => setModalEmail(e.target.value)}
            placeholder="deet@nostagrtz.com"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.5rem',
              color: 'white',
            }}
          />
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                borderRadius: '0.5rem',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              nevermind
            </button>
            <button
  type="submit"
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'scale(1.02)';
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  }}
  style={{
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '0.5rem',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  }}
>
  Subscribe
</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '1.5rem',
          opacity: 0.8
        }}>
          v1 video demo
        </h2>
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        }}>
          {!isPlaying ? (
            <div
              onClick={() => setIsPlaying(true)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                src="/image.jpg"
                alt="Video thumbnail"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Play size={40} color="black" />
              </div>
            </div>
          ) : (
            <iframe
              src="YOUR_YOUTUBE_EMBED_URL?autoplay=1"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>

      {/* Demo link section with underline and hover effect */}
      <section style={{ marginBottom: '5rem' }}>
       
      </section>
    </>
  );
};

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const router = useRouter();

  const submitToAirtable = async (email) => {
    console.log('Submitting email:', email);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) throw new Error('Submission failed');
      return await response.json();
    } catch (error) {
      console.error('Airtable error:', error);
      throw error;
    }
  };
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
  
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }
  
      console.log('Submission successful:', data);
      setEmail('');
      setError('');
      setIsModalOpen(false);
      setIsThankYouModalOpen(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Email submission error:', err);
    }
  };

  const handleDemoClick = () => {
    setIsThankYouModalOpen(false);
    router.push('/hrtz');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: 'white',
      overflow: 'hidden'
    }}>
      <style jsx global>{`
        @keyframes twinkle {
  0%, 100% { 
    opacity: 0.2;
    transform: translate(-50%, -50%) scale(1);
  }
  50% { 
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

        @media (max-width: 768px) {
          .title {
            font-size: 4rem !important;
          }
          .subtitle {
            font-size: 1rem !important;
            margin-top: -30px !important;
          }
        }

        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background-color: #0a0a0a;
        }
      `}</style>
      
      <StarField />
      
      <main style={{ position: 'relative', zIndex: 10, padding: '0 1rem' }}>
        <div style={{ 
          maxWidth: '64rem',
          margin: '0 auto',
          paddingBottom: '8rem'
        }}>
          <h1 className="title" style={{ 
            fontSize: '8rem',
            marginTop: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: 'white',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
          }}>
            Nostagrtz
          </h1>
          <h1 className="subtitle" style={{ 
            fontSize: '1.5rem',
            opacity: 0.4,
            fontWeight: '20',
            textAlign: 'center',
            marginTop: '-55.5px',
            marginBottom: '4rem',
            color: 'white',
            textShadow: '0 0 40px rgba(255, 252, 97, 0.5)'
          }}>
            Enhanced Interactive Entertainment Devices
          </h1>

          <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}>
            <ProductCarousel />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>v1</h3>
              <p style={{ color: '#d0d0d0', marginBottom: '2rem' }}>
  Watch your favorite music, bring to events and parties, and create unique shapes using{' '}
  <a 
    href="https://deet.bio/hrtz" 
    style={{ 
      color: '#d0d0d0', 
      textDecoration: 'underline',
      transition: 'all 0.3s ease',
      textShadow: 'none'
    }}
    className="hover:text-white hover:brightness-125"
    onMouseOver={(e) => {
      e.currentTarget.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
      e.currentTarget.style.color = 'white';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.textShadow = 'none';
      e.currentTarget.style.color = '#d0d0d0';
    }}
    target="_blank" 
    rel="noopener noreferrer"
  >
    Nostagrtz Layering
  </a>.
</p>

<p style={{ color: '#d0d0d0', marginBottom: '1.5rem' }}>
              preorders open up January 2024, prices will become avaliable then
              </p>

              <button
  onClick={() => setIsModalOpen(true)}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'scale(1.01)';
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  }}
  style={{
    padding: '0.75rem 2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1rem',
    width: 'fit-content',
    transition: 'all 0.3s ease'
  }}
>
  Sign Up For Preorder
</button>


            </div>
          </section>

          <VideoSection />

          <section style={{ marginBottom: '5rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '1.5rem',
              opacity: 0.8
            }}>
              Sign up now and receive $10 off your first preorder
            </h2>
            <form onSubmit={handleEmailSubmit} style={{ maxWidth: '28rem', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deet@nostagrtz.com"
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    outline: 'none'
                  }}
                />
                {error && <p style={{ color: '#ff6b6b', fontSize: '0.875rem' }}>{error}</p>}
                <button
  type="submit"
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'scale(1.01)';
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  }}
  style={{
    padding: '0.75rem 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '0.5rem',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  }}
>
  Subscribe
</button>




            </div>
            </form>
          </section>
        </div>
      </main>

      <EmailModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSubmit={async (email) => {
    try {
      await submitToAirtable(email);
      setIsModalOpen(false);
      setIsThankYouModalOpen(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      console.error('Email submission error:', err);
    }
  }}
/>
<ThankYouModal
  isOpen={isThankYouModalOpen}
  onClose={() => setIsThankYouModalOpen(false)}
/>
<footer style={{
  position: 'relative',
  zIndex: 10,
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2rem 0'
}}>
  <div style={{
    maxWidth: '64rem',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem'
  }}>
    <a href="https://twitter.com/nostagrtz" target="_blank" rel="noopener noreferrer" style={{ color: '#a0a0a0', transition: 'color 0.2s' }}
       onMouseOver={(e) => e.currentTarget.style.color = 'white'}
       onMouseOut={(e) => e.currentTarget.style.color = '#a0a0a0'}>
      <Twitter size={24} />
    </a>
    <a href="https://instagram.com/nostagrtz" target="_blank" rel="noopener noreferrer" style={{ color: '#a0a0a0', transition: 'color 0.2s' }}
       onMouseOver={(e) => e.currentTarget.style.color = 'white'}
       onMouseOut={(e) => e.currentTarget.style.color = '#a0a0a0'}>
      <Instagram size={24} />
    </a>
    <a href="mailto:nostagrtz@gmail.com" rel="noopener noreferrer" style={{ color: '#a0a0a0', transition: 'color 0.2s' }}
       onMouseOver={(e) => e.currentTarget.style.color = 'white'}
       onMouseOut={(e) => e.currentTarget.style.color = '#a0a0a0'}>
      <Mail size={24} />
    </a>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;