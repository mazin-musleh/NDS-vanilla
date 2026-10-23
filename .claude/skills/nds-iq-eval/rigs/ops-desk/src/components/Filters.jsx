import DatePicker from 'react-datepicker';
import Select from './Select.jsx';
import SavedViews from './SavedViews.jsx';
import { useStore } from '../store.js';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, DISTRICT_OPTIONS, toDay, fromDay } from '../lib.js';

const pickMany = (options, values) => options.filter((o) => values.includes(o.value));

export default function Filters() {
    const filters = useStore((s) => s.filters);
    const setFilter = useStore((s) => s.setFilter);
    const setFilters = useStore((s) => s.setFilters);
    const resetFilters = useStore((s) => s.resetFilters);

    const dirty = filters.status.length || filters.priority || filters.district.length || filters.from || filters.to || filters.q;

    return (
        <div className="filters">
            <div className="field field-search">
                <label htmlFor="f-q">Search</label>
                <input
                    id="f-q"
                    type="search"
                    placeholder="ID, title, label..."
                    value={filters.q}
                    onChange={(e) => setFilter('q', e.target.value)}
                />
            </div>
            <div className="field">
                <label htmlFor="f-status">Status</label>
                <Select
                    inputId="f-status"
                    isMulti
                    options={STATUS_OPTIONS}
                    placeholder="Any status"
                    value={pickMany(STATUS_OPTIONS, filters.status)}
                    onChange={(list) => setFilter('status', list.map((o) => o.value))}
                />
            </div>
            <div className="field">
                <label htmlFor="f-priority">Priority</label>
                <Select
                    inputId="f-priority"
                    isClearable
                    options={PRIORITY_OPTIONS}
                    placeholder="Any priority"
                    value={PRIORITY_OPTIONS.find((o) => o.value === filters.priority) || null}
                    onChange={(o) => setFilter('priority', o ? o.value : '')}
                />
            </div>
            <div className="field">
                <label htmlFor="f-district">Districts</label>
                <Select
                    inputId="f-district"
                    isMulti
                    options={DISTRICT_OPTIONS}
                    placeholder="All districts"
                    value={pickMany(DISTRICT_OPTIONS, filters.district)}
                    onChange={(list) => setFilter('district', list.map((o) => o.value))}
                />
            </div>
            <div className="field">
                <label htmlFor="f-created">Created</label>
                <DatePicker
                    id="f-created"
                    selectsRange
                    isClearable
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Any date"
                    portalId="popups"
                    startDate={filters.from ? fromDay(filters.from) : null}
                    endDate={filters.to ? fromDay(filters.to) : null}
                    onChange={([start, end]) =>
                        setFilters({ ...filters, from: start ? toDay(start) : '', to: end ? toDay(end) : '' })
                    }
                />
            </div>
            <div className="filters-actions">
                <button type="button" className="btn" onClick={resetFilters} disabled={!dirty}>
                    Clear filters
                </button>
            </div>
            <SavedViews />
        </div>
    );
}
