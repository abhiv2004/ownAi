import React, { useState, useEffect } from "react";
import { clients, reqsByClient, currencies } from "../data";
import REQSection from "./REQSection";
const initialForm = {
  clientId: "",
  poType: "",
  poNo: "",
  receivedOn: "",
  receivedName: "",
  receivedEmail: "",
  startDate: "",
  endDate: "",
  budget: "",
  currency: currencies[0],
  reqs: [],
};
export default function PurchaseOrderForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [readonly, setReadonly] = useState(false);

  useEffect(() => {
    if (form.clientId) {
      const reqs = reqsByClient[form.clientId] || [];

      // if no reqs selected yet, default to first
      if (form.reqs.length === 0 && reqs.length > 0) {
        setForm((f) => ({
          ...f,
          reqs: [
            {
              reqId: reqs[0].id,
              talents: (reqs[0].talents || []).map((t) => ({
                id: t.id,
                name: t.name,
                selected: false,
                detail: "",
              })),
            },
          ],
        }));
      }
    } else {
      setForm((f) => ({ ...f, reqs: [] }));
    }
  }, [form.clientId]);

  function validate() {
    const e = {};
    if (!form.clientId) e.clientId = "Client required";
    if (!form.poType) e.poType = "PO Type required";
    if (!form.poNo) e.poNo = "PO No required";
    if (!form.receivedOn) e.receivedOn = "Received date required";
    if (!form.receivedName) e.receivedName = "Received from - Name required";
    if (!form.receivedEmail) e.receivedEmail = "Received from - Email required";
    if (!form.startDate) e.startDate = "Start date required";
    if (!form.endDate) e.endDate = "End date required";
    if (!form.budget) e.budget = "Budget required";

    if (form.startDate && form.endDate) {
      if (new Date(form.endDate) < new Date(form.startDate))
        e.endDate = "End date cannot be before start date";
    }
    if (form.budget && String(form.budget).length > 5)
      e.budget = "Budget max 5 digits";

    if (!form.reqs || form.reqs.length === 0)
      e.reqs = "At least one REQ required";

    // for each req ensure talents selection rules
    form.reqs.forEach((r, idx) => {
      const selectedTalents = (r.talents || []).filter((t) => t.selected);
      if (!r.reqId) {
        e[`req-${idx}`] = "Select REQ";
      } else if (form.poType === "Individual PO") {
        if (selectedTalents.length !== 1)
          e[`req-${idx}`] = "Individual PO requires exactly one talent";
      } else if (form.poType === "Group PO") {
        if (selectedTalents.length < 2)
          e[`req-${idx}`] = "Group PO requires at least two talents";
      }

      (r.talents || []).forEach((t, tIdx) => {
        if (t.selected) {
          if (!t.detail || t.detail.trim() === "") {
            e[`req-${idx}-talent-${t.id}-detail`] =
              "Detail required for selected talent";
          }
        }
      });
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      console.log("FORM SUBMIT", form);
      setReadonly(true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function handleReset() {
    setForm(initialForm);
    setErrors({});
    setReadonly(false);
  }
  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function addREQ() {
    setForm((f) => ({ ...f, reqs: [...f.reqs, { reqId: "", talents: [] }] }));
  }
  function updateREQ(index, newREQ) {
    setForm((f) => {
      const copy = [...f.reqs];
      copy[index] = newREQ;
      return { ...f, reqs: copy };
    });
  }
  function removeREQ(index) {
    setForm((f) => ({ ...f, reqs: f.reqs.filter((_, i) => i !== index) }));
  }
  const clientReqs = reqsByClient[form.clientId] || [];

  return (
    <div>
   
      <div className="d-flex justify-content-between align-items-center border-bottom py-3 mt-3 mx-4">
        <h5 className="fw-semibold m-0"> Purchase Order</h5>
      </div>
     
      <div className="bg-white p-4  ">
        <div className="row g-3 mb-4">
          
          {/* Client Name */}
          <div className="col-12 col-md-3">
            <label className="form-label text-secondary">
              Client Name <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <select
                className="form-select"
                value={form.clientId}
                onChange={(e) => updateField("clientId", e.target.value)}
              >
                <option value="">Select client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="readonly-field">
                {clients.find((c) => c.id === form.clientId)?.name || "-"}
              </div>
            )}
            {errors.clientId && (
              <div className="error text-danger"> {errors.clientId}</div>
            )}
          </div>

          {/* Purchase Order Type */}
          <div className="col-12 col-md-3">
            <label className="form-label  text-secondary">
              Purchase Order Type <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <select
                className="form-select"
                value={form.poType}
                onChange={(e) => updateField("poType", e.target.value)}
              >
                <option value="" disabled>
                  Select type
                </option>
                <option>Group PO</option>
                <option>Individual PO</option>
              </select>
            ) : (
              <div className="readonly-field">{form.poType}</div>
            )}
            {errors.poType && (
              <div className="error text-danger"> {errors.poType}</div>
            )}
          </div>

          {/* PO Number */}
          <div className="col-12 col-md-3">
            <label className="form-label  text-secondary">
              Purchase Order No. <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <input
                className="form-control"
                value={form.poNo}
                onChange={(e) => updateField("poNo", e.target.value)}
                placeholder="PO Number"
              />
            ) : (
              <div className="readonly-field">{form.poNo}</div>
            )}
            {errors.poNo && (
              <div className="error text-danger"> {errors.poNo}</div>
            )}
          </div>

          {/* Received On */}
          <div className="col-12 col-md-3">
            <label className="form-label  text-secondary">
              Received On <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <input
                type="date"
                className="form-control"
                placeholder="Received On"
                value={form.receivedOn}
                onChange={(e) => updateField("receivedOn", e.target.value)}
              />
            ) : (
              <div className="readonly-field"> {form.receivedOn}</div>
            )}
            {errors.receivedOn && (
              <div className="error text-danger"> {errors.receivedOn}</div>
            )}
          </div>
        </div>

        <div className="row g-3 mb-5">
          {/* Received From Name */}
          <div className="col-12 col-md-3">
            <label className="form-label  text-secondary">
              Received From <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <input
                className="form-control"
                value={form.receivedName}
                onChange={(e) => updateField("receivedName", e.target.value)}
                placeholder="Received From Name"
              />
            ) : (
              <div className="readonly-field">{form.receivedName}</div>
            )}
            {errors.receivedName && (
              <div className="error text-danger"> {errors.receivedName}</div>
            )}
          </div>

          {/* Received From Email */}
          <div className="col-12 col-md-3 ">
            <label className="form-label small">&nbsp;</label>
            {!readonly ? (
              <input
                type="email"
                className="form-control"
                value={form.receivedEmail}
                onChange={(e) => updateField("receivedEmail", e.target.value)}
                placeholder="Received From Email ID"
              />
            ) : (
              <div className="readonly-field">{form.receivedEmail}</div>
            )}
            {errors.receivedEmail && (
              <div className="error text-danger"> {errors.receivedEmail}</div>
            )}
          </div>

          {/* Start Date */}
          <div className="col-12 col-md-3" style={{ width: 152 }}>
            <label className="form-label  text-secondary">
              PO Start Date <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <input
                type="date"
                className="form-control"
                value={form.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
              />
            ) : (
              <div className="readonly-field">{form.startDate}</div>
            )}
            {errors.startDate && (
              <div className="error text-danger"> {errors.startDate}</div>
            )}
          </div>

          {/* End Date */}
          <div className="col-12 col-md-3" style={{ width: 152 }}>
            <label className="form-label  text-secondary">
              PO End Date <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <input
                type="date"
                className="form-control"
                min={form.startDate || ""}
                value={form.endDate}
                onChange={(e) => updateField("endDate", e.target.value)}
              />
            ) : (
              <div className="readonly-field">{form.endDate}</div>
            )}
            {errors.endDate && (
              <div className="error text-danger"> {errors.endDate}</div>
            )}
          </div>

          {/* Budget */}
          <div className="col-12 col-md-3" style={{ width: 115 }}>
            <label className="form-label  text-secondary">
              Budget <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <input
                type="number"
                className="form-control"
                value={form.budget}
                onChange={(e) => updateField("budget", e.target.value)}
                placeholder="Budget"
              />
            ) : (
              <div className="readonly-field">{form.budget}</div>
            )}
            {errors.budget && (
              <div className="error text-danger"> {errors.budget}</div>
            )}
          </div>
          {/* Currency */}
          <div className="col-12 col-md-3" style={{ width: 115 }}>
            <label className="form-label  text-secondary">
              Currency <span className="text-danger">*</span>
            </label>
            {!readonly ? (
              <select
                className="form-select"
                value={form.currency}
                onChange={(e) => updateField("currency", e.target.value)}
              >
                {currencies.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            ) : (
              <div className="readonly-field">{form.currency}</div>
            )}
            {errors.currencies && (
              <div className="error text-danger"> {errors.currencies}</div>
            )}
          </div>
        </div>

        {/* --- TALENT DETAILS SECTION HEADER --- */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
          <h6 className="fw-semibold m-0">Talent Detail</h6>

          {form.poType === "Group PO" && !readonly && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={addREQ}
            >
              + Add Another
            </button>
          )}
        </div>

        {/* --- TALENT DETAILS --- */}
        {form.reqs.map((r, idx) => (
          <REQSection
            key={idx}
            index={idx}
            readonly={readonly}
            reqData={r}
            clientReqs={clientReqs}
            onChange={(newREQ) => updateREQ(idx, newREQ)}
            onRemove={() => removeREQ(idx)}
            errors={errors}
            poType={form.poType}
          />
        ))}

        {/* --- ACTION BUTTONS --- */}
        <div className="d-flex gap-3 mt-4 justify-content-center">
          {!readonly ? (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-dark px-4"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary px-4"
              >
                Reset
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setReadonly(false)}
              className="btn btn-secondary px-4"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
