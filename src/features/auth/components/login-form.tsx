import {FieldError, useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {useQueryClient} from '@tanstack/react-query'

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
    const queryClient = useQueryClient()
    const login = useLogin({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['authenticated-user'],
            })
            onSuccess()
        },
    })

    return (
        <div className="w-full px-3 py-10">
            <form
                onSubmit={handleSubmit(data => {
                    login.mutate({
                        userID: data.userID,
                        password: data.password,
                    })
                })}
                className="border border-gray-300 rounded-sm shadow-lg bg-white text-black p-6 flex flex-col gap-4 max-w-md m-auto"
            >
                <h1 className="text-xl font-bold mb-2">ログイン</h1>

                <Input
                    type="text"
                    label="User ID"
                    placeholder="User ID"
                    error={errors.userID as FieldError | undefined}
                    registration={register('userID', {
                        required: 'User ID を入力してください',
                    })}
                />
                <Input
                    type="password"
                    label="パスワード"
                    placeholder="Password"
                    error={errors.password as FieldError | undefined}
                    registration={register('password', {
                        required: 'パスワードを入力してください',
                    })}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    disabled={login.isPending}
                >
                    ログイン
                </Button>

                <div className="flex justify-between text-sm">
                    <div className="text-red-500">
                        {login.isError ? 'ログインに失敗しました' : ''}
                    </div>
                    <Link
                        to={paths.auth.register.getHref()}
                        className="text-lime-600 hover:underline"
                    >
                        新規登録
                    </Link>
                </div>
            </form>
        </div>
    )
}
