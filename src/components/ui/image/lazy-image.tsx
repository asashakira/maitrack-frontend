import {useInView} from 'react-intersection-observer'

export type LazyImageProps = {
    src: string
    alt: string
    className?: string
}

export const LazyImage = ({src, alt, className}: LazyImageProps) => {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <div ref={ref} className="flex-shrink-0">
            {inView ? (
                <img
                    src={src}
                    alt={alt}
                    className={`bg-gray-200 ${className}`}
                />
            ) : (
                <div className={`bg-gray-200 animate-pulse ${className}`} />
            )}
        </div>
    )
}
