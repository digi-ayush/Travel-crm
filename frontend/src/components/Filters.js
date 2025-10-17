const Filters = ({ filters, setFilters }) => {
  return (
    <div className="d-flex gap-3 mb-3">
      <input
        type="text"
        placeholder="Search by name, phone or trip..."
        className="form-control"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        className="form-select"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option>All</option>
        <option>New</option>
        <option>In Progress</option>
        <option>Booked</option>
        <option>Lost</option>
      </select>
      <select
        className="form-select"
        value={filters.source}
        onChange={(e) => setFilters({ ...filters, source: e.target.value })}
      >
        <option>All</option>
        <option>Instagram</option>
        <option>WhatsApp</option>
        <option>Website</option>
        <option>Referral</option>
      </select>
    </div>
  );
};
