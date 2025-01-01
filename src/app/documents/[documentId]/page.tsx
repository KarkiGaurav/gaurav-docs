import React from 'react'
import Editor from './editor';

interface DocumentIdPageProps{
  params: Promise< {documentId: string}>;
  
}

const DocumentIdPage = async ( { params }: DocumentIdPageProps ) => {

    const { documentId } = await params

  return (
    <div className='min-h-screen bg-slate-100'>
       <Editor />
    </div>
  )
}

export default DocumentIdPage
