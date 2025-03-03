'use client'
import React, { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { toast } from 'sonner';

const templates = [
    { id: "blank-document", label: "Blank Document", imageUrl: '/blank-document.svg', initialContent: `` },
    {
        id: "software-proposal",
        label: "Software Proposal",
        imageUrl: '/software-proposal.svg',
        initialContent: `<p style="line-height: normal"></p>
            <p style="line-height: normal"></p>
            <p style="line-height: normal"></p>
            <h3 style="line-height: normal"><span
                    style="font-family: Arial, Helvetica, sans-serif; font-size: 67px; color: #055d75"><strong>Software
                        development proposal </strong></span></h3>
            <h3 style="line-height: normal"></h3>
            <p style="line-height: normal"></p>
            <p style="line-height: normal"><span style="font-size: 24px"><strong>PREPARED FOR </strong></span></p>
            <p style="line-height: normal">[Client Name]</p>
            <p style="line-height: normal">[Client Company Name]</p>
            <p style="line-height: normal"></p>
            <p style="line-height: normal"></p>
            <p style="line-height: normal"></p>
            <p style="line-height: normal"><span style="font-size: 25px"><strong>PREPARED BY</strong></span></p>
            <p style="line-height: normal">[Your Name]</p>
            <p style="line-height: normal">[Your Company Name]</p>` 
        },
    { id: "project-proposal", label: "Project Proposal", imageUrl: '/project-proposal.svg', initialContent: `<p style="line-height: normal"></p><img src="blob:http://localhost:3000/eae6def9-fa80-476d-b797-391005284cc2" style="width: 100%; height: auto; cursor: pointer;" draggable="true"><p style="line-height: normal"></p><p style="line-height: normal"></p><p style="line-height: normal"><span style="font-size: 42px; color: #633a11"><strong>Project Name </strong></span></p><p style="line-height: normal"></p><p style="line-height: normal"><span style="font-size: 19px; color: #633a11">09.04.20XX</span></p><p style="line-height: normal"></p><p style="line-height: normal"></p><p style="line-height: normal"></p><p style="line-height: normal"><span style="font-size: 19px; color: #633a11">Your Name</span></p><p style="line-height: normal"><span style="font-size: 19px; color: #633a11">Your Company</span></p><p style="line-height: normal"><span style="font-size: 19px; color: #633a11">123 Your Street</span></p><p style="line-height: normal"><span style="font-size: 19px; color: #633a11">Your City, ST 12345</span></p>` },
    { id: "businuss-letter", label: "Business Letter", imageUrl: '/business-letter.svg', initialContent: `<h5 style="line-height: normal"><span style="font-size: 48px">YOUR COMPANY</span></h5><hr><h5 style="line-height: normal"><br>📍 123 YOUR STREET<br>📍 YOUR CITY, ST 12345<br>📞 (123) 456-7890<br>📧 <a target="_blank" rel="noopener noreferrer nofollow" href="mailto:MYEMAIL@EXAMPLE.COM">MYEMAIL@EXAMPLE.COM</a></h5><p style="line-height: normal"></p><p style="line-height: normal">📅 September 24, 20XX</p><p style="line-height: normal"></p><p style="line-height: normal"><strong>Dear Ms. Reader,</strong></p><p style="line-height: normal"></p><p style="line-height: 2">    Thank you for your interest in our services.</p><p style="line-height: 2">    We are pleased to provide you with our latest product offerings.</p><p style="line-height: 2">    Our team has extensive experience in business solutions.</p><p style="line-height: 2">    We look forward to discussing this opportunity further.</p><p style="line-height: 2">    Please contact us if you have any questions.</p><p style="line-height: 2"></p><p style="line-height: 2"></p><p style="line-height: normal"><strong>Sincerely,</strong></p><p style="line-height: normal"></p><p style="line-height: normal"><strong>YOUR NAME</strong></p>` },
    { id: "resume", label: "resume", imageUrl: '/resume.svg', initialContent: ` <h2 style="color: red; margin-bottom: 5px;">Hello,</h2>
    <h1 style="margin-top: 0;">I'm Your Name</h1>
    
    <p>123 YOUR STREET <br>
       YOUR CITY, ST 12345 <br>
       TEL: 555.555.5555 <br>
       <a href="mailto:YOU.REPLY@EXAMPLE.COM">YOU.REPLY@EXAMPLE.COM</a>
    </p>
    
    <h3 style="color: red;">Skills</h3>
    <p>Skills description here. Core competencies and key abilities.</p>
    
    <h3 style="color: red;">Experience</h3>
    <p><strong>MONTH 20XX – MONTH 20YY</strong></p>
    <p><strong>Company Name, Location — Job Title</strong></p>
    <ul>
        <li>Key responsibility or achievement</li>
    </ul>
    
    <h3 style="color: red;">Education</h3>
    <p><strong>College Name, Location — Degree</strong></p>
    
    <h3 style="color: red;">Awards</h3>
    <p>Notable achievement or recognition.</p>` },
    { id: "cover-letter", label: "Cover Letter", imageUrl: '/cover-letter.svg', initialContent: `<div style="width: 100%;">
        <p style="font-weight: bold; font-size: 16pt;">Your Name</p>
        <p>123 Your Street<br>Your City, ST 12345<br>Phone: (555) 555-5555<br>Email: your.email@example.com</p>
        
        <p style="margin-top: 20px;">September 24, 2024</p>
        
        <p>
            Hiring Manager<br>
            Company Name<br>
            123 Company Street<br>
            Company City, ST 12345
        </p>
        
        <p style="margin-top: 20px;">Dear Hiring Manager,</p>
        
        <div style="border-top: 1px solid #000; margin-top: 10px; padding-top: 10px; width: 100%;"></div>
        <div style="border-top: 1px solid #000; margin-top: 5px; padding-top: 10px; width: 100%;"></div>
        <div style="border-top: 1px solid #000; margin-top: 5px; padding-top: 10px; width: 100%;"></div>
        <div style="border-top: 1px solid #000; margin-top: 5px; padding-top: 10px; width: 100%;"></div>
        
        <p style="margin-top: 20px;">Sincerely,</p>
        
        <p>Your Name</p>
    </div>` },
    { id: "letter", label: "Letter", imageUrl: '/letter.svg', initialContent: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Letter Template</title>
</head>
<body style="width: 210mm; height: 297mm; margin: 20mm auto; font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.6;">
    <div style="width: 100%;">
        <p style="font-weight: bold; font-size: 16pt;">Your Band</p>
        <p style="color: red;">September 24, 20XX</p>
        
        <h1 style="font-size: 24pt; margin-top: 20px;">Hello fan,</h1>
        
        <p style="font-weight: bold;">First, a big thank you!</p>
        
        <p>Thanks for being such an amazing supporter of our music.</p>
        <p>We're excited to announce our new album is coming soon.</p>
        <p>You'll be the first to hear our latest singles.</p>
        <p>We're planning something special for our loyal fans.</p>
        <p>Stay tuned for exclusive content and updates.</p>
        <p>Can't wait to see you at our next show.</p>
        
        <p style="margin-top: 30px; font-weight: bold;">Lots of love,</p>
        
        <p>Your Name</p>
    </div>` },
]

export const TemplateGallery = () => {

    const router = useRouter();
    const create = useMutation(api.documents.create)
    const [isCreating, setIsCreating] = useState(false);

    const onTemplateClick = (title: string, initialContent: string) => {
        setIsCreating(true);
        create({
            title,
            initialContent,
        })
            .catch(() => toast.error("Something went wrong"))
            .then((documentId) => {
                // console.log(documentId)
                toast.success("Document created")
                router.push(`documents/${documentId}`)
            }).finally(() => {
                setIsCreating(false);
            })
    }

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
                                        onClick={() => onTemplateClick(template.label, template.initialContent)}
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


