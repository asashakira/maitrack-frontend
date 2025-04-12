type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    variant?: 'contained' | 'outlined'
    size?: 'small' | 'medium' | 'large'
    isLoading?: boolean
    className?: string
}

export const Button = ({
    children,
    variant = 'contained',
    size = 'medium',
    isLoading = false,
    className,
    ...rest
}: ButtonProps) => {
    const baseStyle =
        'border-1 border-lime-400 rounded py-2 px-4 cursor-pointer'

    const variantStyles = {
        contained: 'bg-lime-400 text-black hover:bg-lime-800 hover:text-white',
        outlined: 'text-white hover:bg-lime-400 hover:text-black',
    }

    const sizeStyles = {
        small: 'text-sm',
        medium: 'text-md',
        large: 'text-lg',
    }

    const loadingStyle = 'bg-gray-400 cursor-not-allowed'

    const finalStyle = [
        baseStyle,
        isLoading ? loadingStyle : variantStyles[variant],
        sizeStyles[size],
        'transition duration-200 ease-in-out',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button disabled={isLoading} className={finalStyle} {...rest}>
            {isLoading ? 'Loading...' : children}
        </button>
    )
}
