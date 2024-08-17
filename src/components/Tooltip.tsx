export default function Tooltip({message}) {
    return (
            <div className="group relative flex">
                <span className="absolute -top-9 rounded bg-gray-800 p-2 text-xs text-white">{message}</span>
            </div>
    )
}