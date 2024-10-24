import { useDispatch, useSelector } from "react-redux";
import {
  selectTitleFilter,
  resetFilters,
  setTitleFilter,
} from "../../redux/slices/filterSlice";
import "./Filter.css";

function Filter(props) {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            value={titleFilter}
            onChange={(e) => {
              dispatch(setTitleFilter(e.target.value));
            }}
          />
        </div>
        <button type="button" onClick={() => dispatch(resetFilters())}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
