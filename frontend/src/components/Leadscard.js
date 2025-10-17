// src/components/LeadCard.jsx
import React from "react";

const LeadCard = ({ lead, onEdit }) => {
  // destructure fields from lead object
  const {
    name,
    destination,
    travelDate,
    guest,
    budget,
    source,
    nextFollowUp,
    notes,
    status,
    phone,
    assignedTo,
  } = lead;

  const statusStyles = {
    New: { color: "#0d6efd", bg: "#e7f1ff" },
    "In Progress": { color: "#ffc107", bg: "#fff8e1" },
    "Follow-up": { color: "#0dcaf0", bg: "#e0f7fa" },
    Lost: { color: "#dc3545", bg: "#fdecea" },
  };
  const statusStyle = statusStyles[status] || { color: "#6c757d", bg: "#f8f9fa" };

  const formattedFollowUp = nextFollowUp
    ? new Date(nextFollowUp).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="col-md-4 mb-4">
      <div className="card border-0 shadow-sm rounded-4 h-100">
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 className="fw-bold mb-0">{name}</h5>
              <small className="text-muted">{destination}</small>
            </div>

            <span
              className="px-3 py-1 rounded-pill fw-semibold"
              style={{ fontSize: "0.8rem", backgroundColor: statusStyle.bg, color: statusStyle.color }}
            >
              {status}
            </span>
          </div>

          <ul className="list-unstyled small mb-3">
            <li className="mb-1"><i className="bi bi-calendar-event me-2 text-primary"></i><strong>Date:</strong> {travelDate}</li>
            <li className="mb-1"><i className="bi bi-people me-2 text-success"></i><strong>Guests:</strong> {guest}</li>
            <li className="mb-1"><i className="bi bi-cash-coin me-2 text-warning"></i><strong>Budget:</strong> ₹{budget}</li>
            <li className="mb-1"><i className="bi bi-megaphone me-2 text-danger"></i><strong>Source:</strong> {source}</li>
            {phone && <li className="mb-1"><i className="bi bi-telephone me-2"></i><strong>Phone:</strong> {phone}</li>}
            {assignedTo && <li className="mb-1"><i className="bi bi-person-check me-2"></i><strong>Assigned:</strong> {assignedTo}</li>}
          </ul>

          {formattedFollowUp && (
            <div className="p-2 rounded-3 mb-3" style={{ backgroundColor: "#fef7e0", border: "1px dashed #ffd54f" }}>
              <i className="bi bi-clock-history text-warning me-2"></i>
              <strong>Next Follow-up:</strong> {formattedFollowUp}
            </div>
          )}

          {notes && (
            <p className="text-muted small mb-3"><i className="bi bi-journal-text me-2 text-info"></i>{notes}</p>
          )}

          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-secondary btn-sm" onClick={() => phone && (window.location.href = `tel:${phone}`)}>
              <i className="bi bi-telephone me-1"></i> Call
            </button>

            <button className="btn btn-success btn-sm" onClick={() => phone && window.open(`https://wa.me/${phone.replace(/\D/g, "")}`, "_blank")}>
              <i className="bi bi-whatsapp me-1"></i> WhatsApp
            </button>

            <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit && onEdit(lead)}>
              <i className="bi bi-pencil me-1"></i> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
