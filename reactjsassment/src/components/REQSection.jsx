import React, { useEffect } from "react";
import TalentItem from "./TalentItem";

export default function REQSection({
  index,
  reqData,
  clientReqs,
  onChange,
  onRemove,
  readonly,
  errors,
  poType,
}) {
  // Make sure talents array exists
  useEffect(() => {
    if (!reqData.talents) {
      onChange({ ...reqData, talents: [] });
    }
  }, []);

  // Handle REQ dropdown change
  const handleReqChange = (e) => {
    const value = e.target.value;

    const selected = clientReqs.find((r) => r.id === value);

    const newTalentList = (selected?.talents || []).map((t) => ({
      id: t.id,
      name: t.name,
      stage: t.stage,
      selected: false,
      detail: "",
    }));

    onChange({
      ...reqData,
      reqId: value,
      talents: newTalentList,
    });
  };

  // Toggle checkbox selection
  const toggleTalent = (talentId, isChecked) => {
    const updated = reqData.talents.map((t) =>
      t.id === talentId ? { ...t, selected: isChecked } : t
    );

    onChange({ ...reqData, talents: updated });
  };

  // Update selected talent detail
  const updateTalentDetail = (talentId, value) => {
    const updated = reqData.talents.map((t) =>
      t.id === talentId ? { ...t, detail: value } : t
    );

    onChange({ ...reqData, talents: updated });
  };

  const reqError = errors[`req-${index}`];

  return (
    <div className="card p-3 mb-4 border rounded shadow-sm">
      {/* --- Header Row --- */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold m-0">Request {index + 1}</h6>

        {!readonly && poType === "Group PO" && (
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={onRemove}
          >
            Remove
          </button>
        )}
      </div>

      {/* --- REQ Dropdown --- */}
     <div className="row g-3">
        {/* Job Title / REQ Name */}
  <div className="col-12 col-md-6">
    <label className="form-label text-secondary">
      Job Title / REQ Name <span className="text-danger">*</span>
    </label>

    {!readonly ? (
      <select
        className="form-select"
        value={reqData.reqId}
        onChange={handleReqChange}
      >
        <option value="">Select REQ</option>
        {clientReqs.map((req) => (
          <option key={req.id} value={req.id}>
            {req.title}
          </option>
        ))}
      </select>
    ) : (
      <div className="readonly-field">
        {clientReqs.find((r) => r.id === reqData.reqId)?.title || "-"}
      </div>
    )}

    {reqError && <div className="text-danger small">{reqError}</div>}
  </div>

  {/* Job ID / REQ ID */}
  <div className="col-12 col-md-6">
    <label className="form-label text-secondary">
      Job ID / REQ ID <span className="text-danger">*</span>
    </label>

    <input
      className="form-control"
      value={reqData.reqId || ""}
      disabled
      />
    </div>
    </div>


     

      {/* --- Talent List --- */}
      <div>
        <label className="form-label">Talent List</label>

        {(reqData.talents || []).length === 0 && (
          <div className="text-muted small">
            Select a REQ to load talents.
          </div>
        )}

        {(reqData.talents || []).map((talent) => (
          <TalentItem
            key={talent.id}
            talent={talent}
            readonly={readonly}
            index={index}
            errors={errors}
            onToggle={(checked) => toggleTalent(talent.id, checked)}
            onDetailChange={(value) =>
              updateTalentDetail(talent.id, value)
            }
          />
        ))}
      </div>
    </div>
  );
}
