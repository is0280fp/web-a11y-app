import FilterIcon from "../assets/FilterIcon"

export default function Filter({}) {
    return (
            <div className="w-fit h-fit">
                <button className="rounded-lg border-[1px] border-solid border-gray-500 p-1">
                    <div className="flex row gap-1">
                        <FilterIcon></FilterIcon>
                        <select className="appearance-none">
                            <option>投稿順</option>
                            <option>いいね数順</option>
                        </select>
                    </div>
                </button>
            </div>
    )
}