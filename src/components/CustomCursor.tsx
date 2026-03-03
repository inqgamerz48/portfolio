'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        // Check for touch device
        if (window.matchMedia('(pointer: coarse)').matches) return

        let mouseX = 0, mouseY = 0
        let ringX = 0, ringY = 0

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            dot.style.left = `${mouseX}px`
            dot.style.top = `${mouseY}px`
        }

        // Smooth ring follow
        const animate = () => {
            ringX += (mouseX - ringX) * 0.15
            ringY += (mouseY - ringY) * 0.15
            ring.style.left = `${ringX}px`
            ring.style.top = `${ringY}px`
            requestAnimationFrame(animate)
        }

        // Hover detection
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest('a, button, input, textarea, select, [data-cursor-hover]')) {
                document.body.classList.add('cursor-hover')
            }
        }

        const onMouseOut = () => {
            document.body.classList.remove('cursor-hover')
        }

        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseover', onMouseOver)
        document.addEventListener('mouseout', onMouseOut)
        animate()

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseover', onMouseOver)
            document.removeEventListener('mouseout', onMouseOut)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    )
}
