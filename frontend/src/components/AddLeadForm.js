// src/components/AddLeadForm.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const AddLeadForm = ({ show, handleClose, editLead = null, refreshLeads }) => {
  const [loading, setLoading] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [guest, setGuest] = useState("");
  const [budget, setBudget] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("Website");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("New");
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [notes, setNotes] = useState("");

  // populate when editing
  useEffect(() => {
    if (editLead) {
      setName(editLead.name || "");
      setPhone(editLead.phone || "");
      setDestination(editLead.destination || "");
      setTravelDate(editLead.travelDate || "");
      setGuest(editLead.guest || "");
      setBudget(editLead.budget || "");
      setEmail(editLead.email || "");
      setSource(editLead.source || "Website");
      setAssignedTo(editLead.assignedTo || "");
      setStatus(editLead.status || "New");
      // convert backend nextFollowUp to datetime-local value if present
      if (editLead.nextFollowUp) {
        try {
          const dt = new Date(editLead.nextFollowUp);
          const local = dt.toISOString().slice(0, 16); // yyyy-mm-ddTHH:MM
          setNextFollowUp(local);
        } catch (e) {
          setNextFollowUp(editLead.nextFollowUp);
        }
      } else {
        setNextFollowUp("");
      }
      setNotes(editLead.notes || "");
    } else {
      // reset form for Add
      setName("");
      setPhone("");
      setDestination("");
      setTravelDate("");
      setGuest("");
      setBudget("");
      setEmail("");
      setSource("Website");
      setAssignedTo("");
      setStatus("New");
      setNextFollowUp("");
      setNotes("");
    }
  }, [editLead, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // prepare payload — convert nextFollowUp to ISO (optional)
    const payload = {
      name,
      phone,
      destination,
      travelDate,
      guest,
      budget,
      email,
      source,
      assignedTo,
      status,
      nextFollowUp: nextFollowUp ? new Date(nextFollowUp).toISOString() : null,
      notes,
    };

    try {
      if (editLead && editLead._id) {
        // UPDATE
        const res = await axios.put(`http://localhost:5000/data/${editLead._id}`, payload);
        if (res.data.status === "ok") {
          // refresh parent and close
          refreshLeads && refreshLeads();
          handleClose();
        } else {
          alert(res.data.error || "Update failed");
        }
      } else {
        // CREATE
        const res = await axios.post("http://localhost:5000/data", payload);
        if (res.data.status === "ok") {
          refreshLeads && refreshLeads();
          handleClose();
        } else {
          alert(res.data.error || "Create failed");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const title = editLead ? "Edit Lead" : "Add New Lead";

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Full Name *</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Destination *</Form.Label>
                <Form.Control type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Travel Date</Form.Label>
                <Form.Control type="text" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Guests</Form.Label>
                <Form.Control type="number" value={guest} onChange={(e) => setGuest(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Budget</Form.Label>
                <Form.Control type="text" value={budget} onChange={(e) => setBudget(e.target.value)} />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Assigned To</Form.Label>
                <Form.Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} >
                  <option value="">Unassigned</option>
                  <option value="Ayush">Ayush</option>
                  <option value="Pushpam">Pushpam</option>
                  <option value="Rohan">Rohan</option>
                  <option value="Aniket">Aniket</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Source</Form.Label>
                <Form.Select value={source} onChange={(e) => setSource(e.target.value)}>
                  <option>Website</option>
                  <option>Instagram</option>
                  <option>Meta Ads</option>
                  <option>Referral</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Follow-up</option>
                  <option>Booked</option>
                  <option>Lost</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Next Follow-up</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={nextFollowUp}
                  onChange={(e) => setNextFollowUp(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
            <Button type="submit" variant="warning" disabled={loading} style={{ background: "#ff7a00", border: "none" }}>
              {loading ? "Saving..." : editLead ? "Save Changes" : "Add Lead"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddLeadForm;
