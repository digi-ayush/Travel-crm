// src/pages/Dashboards.js
import React, { useState, useEffect } from "react";
import Header from "./Header";
import LeadCard from "../components/Leadscard"; // note file name
import StatsCard from "./Statscard";
import AddLeadForm from "../components/AddLeadForm";
import Filters from "../components/Filters";

import axios from "axios";

const Dashboards = () => {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null); // <-- for edit


  // 🔍 Filters
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [sourceFilter, setSourceFilter] = useState("");


  // fetch function reused by the form after save
  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://localhost:5000/data");
      // backend returns { status: "ok", leads: [...] } as you said
      const fetched = response.data && response.data.leads ? response.data.leads : [];
      setLeads(fetched);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setLeads([]);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddNew = () => {
    setSelectedLead(null); // add mode
    setShowForm(true);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead); // edit mode with data
    setShowForm(true);
  };

  const stats = [
    { title: "Total Leads", count: leads.length, subtext: "+3 this week", icon: "bi-person", color: "#0d6efd" },
    { title: "Booked", count: leads.filter(l => l.status === "Booked").length, subtext: "33% conversion", icon: "bi-check-circle", color: "#198754" },
    { title: "Lost", count: leads.filter(l => l.status === "Lost").length, subtext: "Last 30 days", icon: "bi-x-circle", color: "#dc3545" },
    { title: "Today's Follow-ups", count: leads.filter(l => l.nextFollowUp).length, subtext: "4 pending", icon: "bi-calendar-event", color: "#fd7e14" },
  ];

  return (
    <div className="bg-light min-vh-100">
      <Header />

      <div className="container py-4">
        <div className="row mb-4">
          {stats.map((s, i) => (
            <StatsCard
              key={i}
              title={s.title}
              count={s.count}
              subtext={s.subtext}
              icon={<i className={`bi ${s.icon} fs-4`}></i>}
              color={s.color}
            />
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Leads</h4>
          <button className="btn btn-warning fw-semibold" onClick={handleAddNew}>
            <i className="bi bi-plus-lg me-1"></i> Add New Lead
          </button>
        </div>

        <div className="row">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <LeadCard key={lead._id} lead={lead} onEdit={() => handleEdit(lead)} />
            ))
          ) : (
            <p className="text-muted text-center">No leads found.</p>
          )}
        </div>
      </div>

      <AddLeadForm
        show={showForm}
        handleClose={() => { setShowForm(false); setSelectedLead(null); }}
        editLead={selectedLead}         // either null (add) or lead object (edit)
        refreshLeads={fetchLeads}       // so form can refresh list after save
      />
    </div>
  );
};

export default Dashboards;
