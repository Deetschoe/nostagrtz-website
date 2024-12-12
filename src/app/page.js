'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [position, setPosition] = useState({ x: 50, y: 40 })
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (e) => {
    setIsDragging(true)
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
  }

  return (
    <div>
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
          <h1 className="text-4xl mt-8 mb-2">Nostagrtz</h1>
          <p className="text-xl mb-8">animation studio creating stories using new tools and talent</p>

          <br></br>

          
          <section className="mb-12">
            <p>"Kursed"</p>
            <p>logline: on a remote island of animals, cursed vegetables are turning everyone into mindless monsters. When her brother eats one, Maru the cat must team up with a mysterious mute bear to track down the source of the curse before it's too late.
            </p>
          </section>
      
          <br>
          </br>
          <br>
          </br>
          <br>
          </br>
      


          <section className="mb-12">
            <h2 className="text-2xl mb-4">reach out if you animate, comfyui, voice act, machine learning, 3d stuff, have ideas, etc</h2>
<br></br>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl mb-4">x/twitter: @nostagrtz or @dieterschoening</h2>
            <h2 className="text-2xl mb-4">nostagrtz@gmail.com</h2>

          </section>
        </div>
      </main>
    </div>
  )
}