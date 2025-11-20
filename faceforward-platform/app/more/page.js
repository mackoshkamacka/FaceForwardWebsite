"use client"

import React, { useState } from 'react';
import './more.css';

export default function More() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Sample photos - replace with your own image URLs
    const photos = [
        { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', caption: 'Mountain Vista' },
        { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', caption: 'Forest Path' },
        { url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5', caption: 'Ocean Waves' },
        { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b', caption: 'Desert Sunset' },
        { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', caption: 'Lake Reflection' }
    ];

    const nextPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const prevPhoto = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    const goToPhoto = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="album-container">
            <div className="album-header">
                <h1>our work</h1>
            </div>
            
            <div className="album-viewer">
                <button className="nav-button prev" onClick={prevPhoto}>
                    ‹
                </button>
                
                <div className="photo-frame">
                    <img 
                        src={photos[currentIndex].url} 
                        alt={photos[currentIndex].caption}
                        className="photo"
                    />
                    <div className="photo-caption">
                        {photos[currentIndex].caption}
                    </div>
                </div>
                
                <button className="nav-button next" onClick={nextPhoto}>
                    ›
                </button>
            </div>
            
            {/* <div className="photo-counter">
                {currentIndex + 1} / {photos.length}
            </div> */}
            
            <div className="thumbnail-container">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToPhoto(index)}
                    >
                        <img src={photo.url} alt={photo.caption} />
                    </div>
                ))}
            </div>
            <div className = "ourImpactSection">

            
                <div className = "seperater">
                    <h1 className = "OISHeader">
                        our impact
                    </h1>
                    <div className = "measuringImpact">
                        <h2 className = "how">How we measure impact: </h2>
                        <ul className="unordered">
                            <li>Patient satisfaction & feedback</li>
                            <li>Positive event ratings</li>
                            <li>Increased dialogue between students, artists, and healthcare teams</li>
                        </ul>
                        <em>Success means smiles, conversations, and community building.</em>
                    </div>
                </div>
                
                
                

                

            </div>

        </div>
    );
}