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
                        userID: data.userID,
                        password: data.password,
                        displayName: data.displayName,
                        segaID: data.segaID,
                        segaPassword: data.segaPassword,
                    })
                })}
                className="border border-gray-300 rounded-sm shadow-lg bg-white text-black p-6 flex flex-col gap-4 max-w-md m-auto"
            >
                <h1 className="text-xl font-bold mb-2">新規登録</h1>

                <Input
                    type="text"
                    label="User ID"
                    placeholder="User ID"
                    error={errors.username as FieldError | undefined}
                    registration={register('userID', {
                        required: 'User IDは必須です',
                    })}
                />
                <Input
                    type="text"
                    label="表示名"
                    placeholder="Display Name"
                    error={errors.displayName as FieldError | undefined}
                    registration={register('displayName', {
                        required: '表示名は必須です',
                    })}
                />
                <Input
                    type="password"
                    label="パスワード"
                    placeholder="Password"
                    error={errors.password as FieldError | undefined}
                    registration={register('password', {
                        required: 'パスワードは必須です',
                    })}
                />
                <Input
                    type="text"
                    label="SEGA ID"
                    placeholder="SEGA ID"
                    error={errors.segaID as FieldError | undefined}
                    registration={register('segaID', {
                        required: 'SEGA ID は必須です',
                    })}
                />
                <Input
                    type="password"
                    label="SEGA パスワード"
                    placeholder="SEGA Password"
                    error={errors.segaPassword as FieldError | undefined}
                    registration={register('segaPassword', {
                        required: 'SEGA パスワード は必須です',
                    })}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    isLoading={registering.isPending}
                >
                    登録
                </Button>

                <div className="flex justify-between text-sm">
                    <div className="text-red-500">
                        {registering.isError ? '登録に失敗しました' : ''}
                    </div>
                    <Link
                        to={paths.auth.login.getHref()}
                        className="text-lime-600 hover:underline"
                    >
                        ログイン
                    </Link>
                </div>
            </form>
        </div>
    )
}
