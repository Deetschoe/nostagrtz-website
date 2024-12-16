'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [position, setPosition] = useState({ x: 50, y: 40 })
  const [isDragging, setIsDragging] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [videoOpacity, setVideoOpacity] = useState(0)
  const pressTimer = useRef(null)
  const videoRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    pressTimer.current = setTimeout(() => {
      setShowVideo(true)
      requestAnimationFrame(() => {
        setVideoOpacity(1)
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                videoRef.current.muted = false;
              })
              .catch(error => {
                console.log("Video play error:", error);
              });
          }
        }, 500);
      });
    }, 3000);
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 50,
        y: e.clientY - 50
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    clearTimeout(pressTimer.current)
  }

  const closeVideo = () => {
    setVideoOpacity(0)
    setTimeout(() => {
      setShowVideo(false)
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }, 1000)
  }

  useEffect(() => {
    const videoElement = videoRef.current;
    
    const handleVideoEnd = () => {
      closeVideo();
    };

    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {showVideo && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            transition: 'opacity 1s ease-in-out',
            opacity: videoOpacity
          }}
        >
          <div className="relative bg-black rounded-lg overflow-hidden border border-gray-600 max-w-[60%] max-h-[70vh]">
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video
              ref={videoRef}
              className="w-full h-full"
              style={{
                transition: 'opacity 1s ease-in-out',
                opacity: videoOpacity
              }}
              playsInline
              autoPlay
              controls={false}
              muted
            >
              <source src="/logo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      <main 
        className="max-w-4xl mx-auto min-h-screen pt-8"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            cursor: isDragging ? 'grabbing' : 'grab',
            width: '100px',
            height: '100px',
            zIndex: 10
          }}
          onMouseDown={handleMouseDown}
        >
          <Image
            src="https://cloud-9giq8hxku-hack-club-bot.vercel.app/0transparent.png"
            alt="Nostagrtz Studio Logo"
            width={70}
            height={70}
            className="w-full h-auto"
            priority
            unoptimized
            draggable="false"
          />
        </div>
        
        <div className="mt-64">
          <h1 className="text-4xl mt-8 mb-2">Nostagrtz (based in san francisco, ca)</h1>
          <p className="text-xl mb-8">animation studio pioneering a new era of animation          </p>

          <br />

          <section className="mb-12">
            <a 
              href="https://www.youtube.com/watch?v=N1olGw2lqRg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="kursed-link group inline-block"
            >
              <span className="inline-flex items-center">
                Kursed <span className="ml-1">(First Animated Series)</span>
              </span>
            </a>
            <p className="mt-2">on a remote island of animals, cursed vegetables are turning everyone into mindless monsters. When her brother eats one, Maru the cat must team up with a mysterious mute bear to track down the source of the curse before it's too late.</p>
          </section>
          <br></br>
          <div className="image-hover-container w-[200px] h-[200px]">
            <a 
              href="https://www.youtube.com/watch?v=N1olGw2lqRg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <Image 
                src="/kursed.png"
                alt="Kursed"
                width={200}
                height={200}
                className="object-contain"
                priority
              />
            </a>
          </div>

          <br /><br />
  
          <p>Interested in helping?</p>

          <section className="mb-12">
            <h2 className="text-2xl mb-4">We are looking for highly creative individuals with different skills whether it is 3d, 2d, ai, or anything! reach out to us we are looking to hire</h2>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl mb-4">
              send all inquires to{' '}
              <a 
                href="https://x.com/dieterschoening" 
                target="_blank" 
                rel="noopener noreferrer"
                className="dimmed-link"
              >
                @dieterschoening
              </a>
              {' '}on x or{' '}
              <a 
                href="mailto:nostagrtz@gmail.com"
                className="dimmed-link"
              >
                nostagrtz@gmail.com
              </a>
            </h2>
          </section>
        
          <div className="social-icons-container mt-4">
  <a 
    href="https://twitter.com/nostagrtz" 
    target="_blank" 
    rel="noopener noreferrer"
    className="social-icon-link"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="25" 
      height="25" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  </a>
  <a 
    href="https://instagram.com/nostagrtz" 
    target="_blank" 
    rel="noopener noreferrer"
    className="social-icon-link"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="25" 
      height="25" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  </a>
</div>
          <br /><br />
        </div>
      </main>
    </div>
  )
}