import {FieldError, useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/form'
import {paths} from '@/config/paths'
import {useLogin} from '@/lib/auth'

type LoginFormProps = {
    onSuccess: () => void
}

export const LoginForm = ({onSuccess}: LoginFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()
    const login = useLogin({onSuccess})

    return (
        <div className="w-full px-3 py-10">
            <form
                onSubmit={handleSubmit(data => {
                    login.mutate({
                        username: data.username,
                        password: data.password,
                    })
                })}
                className="border border-gray-300 rounded-sm shadow-lg bg-white p-6 flex flex-col gap-4 max-w-md m-auto"
            >
                <h1 className="text-xl font-bold mb-2">Log in</h1>

                <Input
                    type="text"
                    label="Username"
                    placeholder="Username"
                    error={errors.username as FieldError | undefined}
                    registration={register('username', {
                        required: 'Username is required',
                    })}
                />
                <Input
                    type="password"
                    label="Password"
                    placeholder="Password"
                    error={errors.password as FieldError | undefined}
                    registration={register('password', {
                        required: 'Password is required',
                    })}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    disabled={login.isPending}
                >
                    Log in
                </Button>

                <div className="flex justify-between text-sm">
                    <div className="text-red-500">
                        {login.isError ? 'Login Failed' : ''}
                    </div>
                    <Link
                        to={paths.auth.register.getHref()}
                        className="text-lime-600 hover:underline"
                    >
                        Register
                    </Link>
                </div>
            </form>
        </div>
    )
}
