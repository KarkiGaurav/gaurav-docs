'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils';

const templates = [
    { id: "blank-document", label: "Blank Document", imageUrl: '/blank-document.svg' },
    { id: "software-proposal", label: "Software Proposal", imageUrl: '/software-proposal.svg' },
    { id: "project-proposal", label: "Project Proposal", imageUrl: '/project-proposal.svg' },
    { id: "businuss-letter", label: "Business Letter", imageUrl: '/business-letter.svg' },
    { id: "resume", label: "resume", imageUrl: '/resume.svg' },
    { id: "cover-letter", label: "Cover Letter", imageUrl: '/cover-letter.svg' },
    { id: "letter", label: "Letter", imageUrl: '/letter.svg' },
]

export const TemplateGallery = () => {

    const isCreating = false;

    return (
        <div className='bg-[#F1F3F4]'>
            <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
                <h3 className="">Start a new document</h3>
                <Carousel className="">
                    <CarouselContent className="-ml-1">
                        {templates.map((template, index) => (
                            <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4">
                                <div className={cn('aspect-[3/4] flex flex-col gap-y-2.5', isCreating && 'pointer-events-none opacity-50')}>
                                   <button
                                   disabled={isCreating}
                                   onClick={() => {}}
                                   style={{
                                    backgroundImage: `url(${template.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                   }}
                                   className='size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 flex flex-col items-center justify-center transition gap-y-4 bg-white'
                                   />
                                    <p className="text-sm font-medium truncate">
                                        {template.label}
                                    </p>

                                  
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </div>
    )
}


