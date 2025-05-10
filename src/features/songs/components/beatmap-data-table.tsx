import {Beatmap} from '@/types/api'

type BeatmapDataProps = {
    beatmap?: Beatmap
}

export const BeatmapData = ({beatmap}: BeatmapDataProps) => {
    return (
        <div>
            {beatmap ? (
                <div className="mt-6">
                    <div className="text-white text-lg font-semibold mb-2">
                        Note Count
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm text-white">
                        <div className="bg-slate-700 p-3 rounded shadow">
                            <div className="text-gray-400">Tap</div>
                            <div className="text-lg font-bold">
                                {beatmap.tap}
                            </div>
                        </div>
                        <div className="bg-slate-700 p-3 rounded shadow">
                            <div className="text-gray-400">Hold</div>
                            <div className="text-lg font-bold">
                                {beatmap.hold}
                            </div>
                        </div>
                        <div className="bg-slate-700 p-3 rounded shadow">
                            <div className="text-gray-400">Slide</div>
                            <div className="text-lg font-bold">
                                {beatmap.slide}
                            </div>
                        </div>
                        <div className="bg-slate-700 p-3 rounded shadow">
                            <div className="text-gray-400">Touch</div>
                            <div className="text-lg font-bold">
                                {beatmap.touch}
                            </div>
                        </div>
                        <div className="bg-slate-700 p-3 rounded shadow">
                            <div className="text-gray-400">Break</div>
                            <div className="text-lg font-bold">
                                {beatmap.break}
                            </div>
                        </div>
                        <div className="bg-slate-700 p-3 rounded shadow col-span-2 sm:col-span-1">
                            <div className="text-gray-400">Total Notes</div>
                            <div className="text-lg font-bold">
                                {beatmap.totalNotes}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-400">No beatmap for difficulty</div>
            )}
        </div>
    )
}
