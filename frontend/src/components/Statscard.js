// components/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, count, subtext, icon, color }) => (
  <div className="col-md-3 mb-3">
    <div className="card shadow-sm border-0 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h6 className="text-secondary mb-1">{title}</h6>
          <h4 className="fw-bold">{count}</h4>
          <small className="text-muted">{subtext}</small>
        </div>
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: 40,
            height: 40,
            backgroundColor: color,
            color: "white",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  </div>
);

export default StatsCard;
