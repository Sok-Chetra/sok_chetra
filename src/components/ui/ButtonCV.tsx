'use client';

import React from 'react'

function ButtonCV() {
    const handleDownloadCV = () => {
        const cvUrl = '/Sok Chetra.pdf';
        const link = document.createElement('a');
        link.href = cvUrl;

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