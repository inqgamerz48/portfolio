'use client'

import { motion } from 'framer-motion'

export function SmokeEffect() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${10 + i * 20}%`,
            width: 200 + i * 50,
            height: 200 + i * 50,
            background: 'radial-gradient(circle, rgba(193,18,31,0.3) 0%, rgba(232,93,4,0.1) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -200],
            opacity: [0, 0.4, 0],
            scale: [1, 1.5],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
