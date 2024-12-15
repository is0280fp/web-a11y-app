import FilterIcon from "../assets/FilterIcon";
import { useSortContext } from "../app/SortProvider";
import { FunctionComponent } from "react";

const Filter: FunctionComponent = () => {
  const { sortBy, setSortBy } = useSortContext();
  return (
    <div className="w-fit h-fit">
      <button className="rounded-lg border-[1px] border-solid border-gray-500 p-1">
        <div className="flex row gap-1">
          <FilterIcon></FilterIcon>
          <select
            className="appearance-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "likes")}
          >
            <option value="date">投稿順</option>
            <option value="likes">いいね数順</option>
          </select>
        </div>
      </button>
    </div>
  );
};

export default Filter;
