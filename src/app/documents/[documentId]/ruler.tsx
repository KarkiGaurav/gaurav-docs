import React, { useRef, useState } from 'react'
import { FaCaretDown } from "react-icons/fa";

const markers = Array.from({ length: 83 }, (_, i) => i)

export const Ruler = () => {

  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
  const [isDragggingLeft, setIsDraggingLeft] = useState(false)
  const [isDragggingRight, setIsDraggingRight] = useState(false)
  const rulerRef = useRef<HTMLDivElement>(null)

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true)
  }

  const handleRightMouseDown = () => {
    setIsDraggingRight(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDragggingLeft || isDragggingRight) && rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");

      if (container) {
        const containerReact = container.getBoundingClientRect();
        const relativeX = e.clientX - containerReact.left;
        const rawPosition = Math.max(0, Math.min(816, relativeX))

        if (isDragggingLeft) {
          const maxLeftPosition = 816 - rightMargin - 100;
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        } else if (isDragggingRight) {
          const maxRightPosition = 816 - (leftMargin + 100);
          const newRightPosition = Math.max(816 - rawPosition, 0);
          const constrainedRightPostion = Math.min(newRightPosition, maxRightPosition)
          setRightMargin(constrainedRightPostion);
        }
      }
    }
  }


  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false)
  }

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  }

  const handleRightDoublecClick = () => {
    setRightMargin(56);
  }

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className='h-6 w-[816px] mx-auto border-b border-gray-300 flex items-end relative'>
      <div id='ruler-container' className=" w-full h-full relative">
        <Marker
          position={leftMargin}
          isLeft={true}
          isDraggging={isDragggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />

        <Marker
          position={rightMargin}
          isLeft={false}
          isDraggging={isDragggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoublecClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className='relative h-full w-[816px]'>
            {
              markers.map((marker) => {
                const position = (marker * 816) / 82;

                return (
                  <div key={marker} className="absolute bottom-0" style={{ left: `${position}px` }}>
                    {
                      marker % 10 === 0 && (
                        <>
                          <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                          <span className="absolute bottom-2 text-[10px] text-neutral-500 transform translate-x-1/2">
                            {marker / 10 + 1}
                          </span>
                        </>
                      )
                    }
                    {
                      marker % 5 === 0 && marker % 10 !== 0 && (
                        <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                      )
                    }
                    {
                      marker % 5 !== 0 && (
                        <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                      )
                    }
                  </div>
                )

              })
            }
          </div>
        </div>
      </div>

    </div>
  )
}




interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDraggging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDraggging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className='absolute left-1/2 top-0 h-full fill-blue-500 transform translate-x-1/2' />
      <div className='absolute left-1/2 top-4 transform -translate-x-1/2 duration-150' style={{ height: "100vh", width: "1px", transform: "scaleX(0.5)", backgroundColor: "#3b72f6", display: isDraggging ? "block" : "none" }} />
    </div>
  )

}