'use client'

import Image from 'next/image'

export default function Kursed() {
  return (
    <div className="relative min-h-screen">
      <main className="max-w-4xl mx-auto px-24 min-h-screen pt-8">
        <div className="mt-32">
          <h1 className="text-4xl mt-8 mb-2">Kursed</h1>
          <p className="text-xl mb-8">Pilot Episode Launch: January 2025</p>

          <section className="mb-12">
            <div className="grid gap-6 mb-8">
              <div className="p-6 bg-black/10 rounded-lg">
                <h3 className="font-medium mb-2">The World</h3>
                <p>A peaceful island where animals live in harmony until mysterious cursed vegetables begin infecting the population.</p>
              </div>

              <div className="p-6 bg-black/10 rounded-lg">
                <h3 className="font-medium mb-2">The Story</h3>
                <p>Maru the cat and Pineabur the bear race against time in ancient temples and dark forests to save Maru's brother from a spreading curse.</p>
              </div>

              <div className="p-6 bg-black/10 rounded-lg">
                <h3 className="font-medium mb-2">Join Us</h3>
                <p>3D Artists • 2D Artists • Technical Artists • Animators • AI</p>
                <p className="mt-2">YouTube: February 1st, 2025</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <p>Contact: nostagrtz@gmail.com</p>
          </section>

          <a 
            href="https://www.youtube.com/watch?v=N1olGw2lqRg"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit hover:opacity-80 transition-opacity mb-12"
          >
            <Image 
              src="/kursed.jpg"
              alt="Kursed"
              width={170}
              height={170}
              className="w-[170px] h-auto"
              priority
            />
          </a>
        </div>
      </main>
    </div>
  );
}