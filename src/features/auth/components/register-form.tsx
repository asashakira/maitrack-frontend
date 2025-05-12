import {FieldError, useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/form'
import {paths} from '@/config/paths'
import {useRegister} from '@/lib/auth'

type RegisterFormProps = {
    onSuccess: () => void
}

export const RegisterForm = ({onSuccess}: RegisterFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()
    const registering = useRegister({onSuccess})

    return (
        <div className="w-full px-3 py-10">
            <form
                onSubmit={handleSubmit(data => {
                    registering.mutate({
                        username: data.username,
                        password: data.password,
                        segaID: data.segaID,
                        segaPassword: data.segaPassword,
                        gameName: data.gameName,
                        tagLine: data.tagLine,
                    })
                })}
                className="border border-gray-300 rounded-sm shadow-lg bg-white text-black p-6 flex flex-col gap-4 max-w-md m-auto"
            >
                <h1 className="text-xl font-bold mb-2">Register</h1>

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
                <Input
                    type="text"
                    label="SEGA ID"
                    placeholder="SEGA ID"
                    error={errors.segaID as FieldError | undefined}
                    registration={register('segaID', {
                        required: 'SEGA ID is required',
                    })}
                />
                <Input
                    type="password"
                    label="SEGA Password"
                    placeholder="SEGA Password"
                    error={errors.segaPassword as FieldError | undefined}
                    registration={register('segaPassword', {
                        required: 'SEGA Password is required',
                    })}
                />
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            type="text"
                            label="Game Name"
                            placeholder="Game Name"
                            error={errors.gameName as FieldError | undefined}
                            registration={register('gameName', {
                                required: 'Game Name is required',
                            })}
                        />
                    </div>
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-[29px] text-gray-400 text-sm">
                            #
                        </span>
                        <Input
                            type="text"
                            label="Tag Line"
                            placeholder="Tag Line"
                            error={errors.tagLine as FieldError | undefined}
                            registration={register('tagLine', {
                                required: 'Tag Line is required',
                            })}
                            className="pl-6"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    isLoading={registering.isPending}
                >
                    Register
                </Button>

                <div className="flex justify-between text-sm">
                    <div className="text-red-500">
                        {registering.isError ? 'Register Failed' : ''}
                    </div>
                    <Link
                        to={paths.auth.login.getHref()}
                        className="text-lime-600 hover:underline"
                    >
                        Log in
                    </Link>
                </div>
            </form>
        </div>
    )
}
