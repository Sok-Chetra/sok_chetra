'use client';

import React from 'react'

type Props = {}

function ButtonCV({ }: Props) {
    const handleDownloadCV = () => {
        // Replace with the actual path to your CV file in the public folder
        const cvUrl = '/Sok Chetra.pdf'; // or '/cv.docx' depending on your file type

        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = cvUrl;

        // This assumes your CV file is named "yourname-cv.pdf"
        // Change the download attribute to set the filename users will see
        link.download = 'Sok Chetra.pdf';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownloadCV}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
        >
            Download CV
        </button>
    )
}

export default ButtonCV