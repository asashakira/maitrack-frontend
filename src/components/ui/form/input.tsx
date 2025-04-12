import type {FieldError, UseFormRegisterReturn} from 'react-hook-form'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string
    label?: string
    error?: FieldError | undefined
    registration: Partial<UseFormRegisterReturn>
}

export const Input = ({
    className,
    type,
    label,
    error,
    registration,
    ...props
}: InputProps) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={props.name} className="mb-1 text-xs">
                {label}
            </label>
            <input
                type={type}
                className={`border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } w-full rounded px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 ${className}`}
                {...registration}
                {...props}
            />
            {error?.message && (
                <div
                    role="alert"
                    aria-label={error.message}
                    className="text-xs text-red-500 mt-1"
                >
                    {error.message}
                </div>
            )}
        </div>
    )
}
