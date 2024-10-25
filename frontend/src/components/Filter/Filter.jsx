import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  selectAuthorFilter,
  selectOnlyFavorite,
  selectTitleFilter,
  setAuthorFilter,
  setOnlyFavorite,
  setTitleFilter,
} from "../../redux/slices/filterSlice";
import "./Filter.css";

function Filter(props) {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavorite = useSelector(selectOnlyFavorite);

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
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by author..."
            value={authorFilter}
            onChange={(e) => {
              dispatch(setAuthorFilter(e.target.value));
            }}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="">
            <input
              type="checkbox"
              checked={onlyFavorite}
              onChange={() => dispatch(setOnlyFavorite())}
            />
            Only Favotire
          </label>
        </div>
        <button type="button" onClick={() => dispatch(resetFilters())}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
