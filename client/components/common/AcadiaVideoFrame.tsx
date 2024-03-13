import React from 'react'
import Iframe from 'react-iframe';

interface AcadiaVideoFrameProps {
    videoId: string;
}

const AcadiaVideoFrame: React.FC<AcadiaVideoFrameProps> = (props) => {
    const { videoId } = props;
    return (
        <div className='w-full'>
            <Iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className='aspect-video w-full rounded-lg'
                url={"https://www.youtube.com/embed/" + videoId}
            ></Iframe>
        </div>
    )
}

export default AcadiaVideoFrame;