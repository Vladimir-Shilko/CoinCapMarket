import React, { useState } from 'react';

interface ImageWithLoaderProps {
    src?: string ;
    alt?: string;
    width?: string;
    ImageLoaded?: () => void;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, width,alt, ImageLoaded }) => {
    const [loaded, setLoaded] = useState(false);

    const handleImageLoad = () => {
        setLoaded(true);
        ImageLoaded && ImageLoaded();
    };

    return (
        <div>
            {!loaded && <div>Загрузка...</div>}
            <img src={src} onLoad={handleImageLoad} style={{ display: loaded ? 'block' : 'none' }} alt={alt} width={width} />
        </div>
    );
};

export default ImageWithLoader;