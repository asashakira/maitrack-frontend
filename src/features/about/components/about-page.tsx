import {Link} from 'react-router-dom'

export const AboutPage = () => {
    return (
        <div className="w-full px-1 my-4 space-y-10 text-gray-100">
            <section>
                <h1 className="text-2xl font-bold mb-2 text-white">
                    💡 maitrackとは？
                </h1>
                <p className="text-lg text-gray-300">
                    <strong className="text-white">maitrack</strong>{' '}
                    は、アーケード音楽ゲーム「
                    <strong className="text-white">maimaiでらっくす</strong>
                    」のプレイデータを
                    <span className="font-semibold text-white">
                        {' '}
                        記録・閲覧・共有
                    </span>
                    するための非公式Webアプリです。
                </p>
                <div className="mt-4">
                    <Link
                        to="/users/asashakira"
                        className="text-blue-400 hover:underline ml-1"
                    >
                        こんな感じ
                    </Link>
                </div>
                <blockquote className="mt-4 p-4 bg-gray-800 border-l-4 border-blue-500 italic text-sm text-gray-400">
                    maimaidx.jpでは直近50曲しか見れないのが不便だったので作りました。
                    <br />
                    今後いろいろ機能追加するつもり。
                </blockquote>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-white">
                    🛠 使い方
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-1 text-white">
                            1. アカウント登録（初回のみ）
                        </h3>
                        <p className="text-gray-300">
                            maitrackでは、あなたのスコア情報を取得するために
                            <strong className="text-white">
                                {' '}
                                maimaidx.jpのログイン情報
                            </strong>
                            （SEGA ID・パスワード）を保存します。
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-400 space-y-1">
                            <li>
                                🔐 情報は{' '}
                                <strong className="text-white">暗号化</strong>
                                された状態で保存されます
                            </li>
                            <li>
                                🔁{' '}
                                <strong className="text-white">
                                    定期的な自動ログイン
                                </strong>
                                のみに使用します
                            </li>
                            <li>🚫 他目的には一切使用しません</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-1 text-white">
                            2. ログイン後の操作
                        </h3>
                        <p className="text-gray-300">
                            ログインすると画面右上にあなたの名前が表示されます。
                            名前をクリック → 「
                            <strong className="text-white">Profile</strong>
                            」を選ぶとプロフィールページに移動します。
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-1 text-white">
                            3. スコアデータの更新
                        </h3>
                        <p className="text-gray-300">
                            「<strong className="text-white">Update</strong>
                            」ボタンを押すと、maimaidx.jpから最新のスコアデータを取得します。
                            反映まで{' '}
                            <strong className="text-white">2〜3分</strong>
                            ほどかかる場合があります。
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-1 text-white">
                            4. 自動更新
                        </h3>
                        <p className="text-gray-300">
                            毎日 <strong className="text-white">深夜1時</strong>{' '}
                            に、データが自動で更新されます。
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2 text-white">
                    ⚠ 注意事項
                </h2>
                <p className="text-red-400 font-medium">
                    maitrackは非公式の個人開発ツールです。セキュリティには最大限配慮していますが、利用は自己責任でお願いします。
                </p>
            </section>
        </div>
    )
}
