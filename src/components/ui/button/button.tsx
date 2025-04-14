type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    variant?: 'contained' | 'outlined'
    size?: 'small' | 'medium' | 'large'
    isLoading?: boolean
    disabled?: boolean
    className?: string
}

export const Button = ({
    children,
    variant = 'contained',
    size = 'medium',
    isLoading = false,
    disabled = false,
    className,
    ...rest
}: ButtonProps) => {
    const buttonDisabled = isLoading || disabled

    const baseStyle = 'border-1 border-lime-400 rounded py-2 px-4'

    const variantStyles = {
        contained: 'bg-lime-400 text-black hover:bg-lime-800 hover:text-white',
        outlined: 'text-white hover:bg-lime-400 hover:text-black',
    }

    const sizeStyles = {
        small: 'text-sm',
        medium: 'text-md',
        large: 'text-lg',
    }

    const disabledStyle = 'bg-gray-400 cursor-default'

    const cursorStyle = buttonDisabled ? 'cursor-default' : 'cursor-pointer'

    const finalStyle = [
        baseStyle,
        cursorStyle,
        buttonDisabled ? disabledStyle : variantStyles[variant],
        sizeStyles[size],
        'transition duration-200 ease-in-out',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button disabled={buttonDisabled} className={finalStyle} {...rest}>
            {isLoading ? 'Loading' : children}
        </button>
    )
}
