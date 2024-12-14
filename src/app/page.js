'use client'

import Image from 'next/image'
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

  // Handle video end
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
      {/* Video overlay */}
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
        className="max-w-4xl mx-auto px-24 min-h-screen pt-8"
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
          <p className="text-xl mb-8">Indie animation studio blending traditional and new tech.
          </p>

  
          <br />

       

          <section className="mb-12">
            <p>Kursed (In Production Pilot Episode)</p>
            <p>on a remote island of animals, cursed vegetables are turning everyone into mindless monsters. When her brother eats one, Maru the cat must team up with a mysterious mute bear to track down the source of the curse before it's too late.</p>
          </section>
          <br></br>
          <a 
  href="https://www.youtube.com/watch?v=N1olGw2lqRg
"
  target="_blank"
  rel="noopener noreferrer"
  className="block w-fit hover:opacity-80 transition-opacity"
>

 
  <Image 
    src="/kursed.jpg"
    alt="Kursed"
    width={170}
    height={170}
    className="w-[50px] h-auto"
    priority
  />
</a>
<br></br>
<br></br>

<section className="mb-12">
            <p>Forgetful Memories (Canceled Pilot Episode)</p>
            <p>Yusuke a Japanese spy is forced to forget his wife and joins forces with the man who made him forget in order to bring her back
            </p>
          </section>
          <br></br>
          <a 
  href="https://www.youtube.com/watch?v=Wk1Qb0hujRw"
  target="_blank"
  rel="noopener noreferrer"
  className="block w-fit hover:opacity-80 transition-opacity"
>

 
  <Image 
    src="/spy.jpg"
    alt="Kursed"
    width={170}
    height={170}
    className="w-[50px] h-auto"
    priority
  />
</a>


          <br />
          <br />


          <p>Interested in helping?</p>

          <section className="mb-12">
            <h2 className="text-2xl mb-4">We are looking for highly creative individuals with different skills whether it is 3d, 2d, ai, or anything! reach out to us we are looking to hire</h2>
            <br />
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
<br>
</br>
<br>
</br>

        </div>
      </main>
    </div>
  )
}