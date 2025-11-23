import React from "react";

export default function TalentItem({
  talent,
  readonly,
  onToggle,
  onDetailChange,
  onFieldChange,
  errors,
  index,
}) {
  const errorKey = `req-${index}-talent-${talent.id}-detail`;

  return (
    <div className="border rounded p-3 mb-3">
      {/* Checkbox */}
      <div className="form-check">
        {!readonly ? (
          <input
            type="checkbox"
            className="form-check-input"
            checked={talent.selected}
            onChange={(e) => onToggle(e.target.checked)}
          />
        ) : (
          <input
            type="checkbox"
            className="form-check-input"
            checked={talent.selected}
            readOnly
          />
        )}

        <label className="form-check-label ms-2 fw-semibold">
          {talent.name}{" "}
        </label>
      </div>

      {/* EXPANDED FIELDS */}
      {talent.selected && (
        <div className="mt-3">

          {/* Contract Duration */}
          <div className="mb-3">
            <label className="form-label text-secondary">Contract Duration</label>
            {!readonly ? (
              <input
                type="text"
                className="form-control"
                value={talent.contractDuration || ""}
                onChange={(e) =>
                  onFieldChange(talent.id, "contractDuration", e.target.value)
                }
                placeholder="Enter duration in months"
              />
            ) : (
              <div className="readonly-field">{talent.contractDuration || "-"}</div>
            )}
          </div>

          {/* Bill Rate + Currency */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-secondary">Bill Rate</label>
              {!readonly ? (
                <input
                  type="number"
                  className="form-control"
                  value={talent.billRate || ""}
                  onChange={(e) =>
                    onFieldChange(talent.id, "billRate", e.target.value)
                  }
                  placeholder="0.00"
                />
              ) : (
                <div className="readonly-field">{talent.billRate || "-"}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">Currency</label>
              {!readonly ? (
                <select
                  className="form-select"
                  value={talent.billRateCurrency || "INR"}
                  onChange={(e) =>
                    onFieldChange(talent.id, "billRateCurrency", e.target.value)
                  }
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              ) : (
                <div className="readonly-field">{talent.billRateCurrency}</div>
              )}
            </div>
          </div>

          {/* Standard Time BR + Currency */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-secondary">
                Standard Time BR
              </label>
              {!readonly ? (
                <input
                  type="number"
                  className="form-control"
                  value={talent.standardBR || ""}
                  onChange={(e) =>
                    onFieldChange(talent.id, "standardBR", e.target.value)
                  }
                  placeholder="0.00"
                />
              ) : (
                <div className="readonly-field">{talent.standardBR || "-"}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">Currency</label>
              {!readonly ? (
                <select
                  className="form-select"
                  value={talent.standardBRCurrency || "INR"}
                  onChange={(e) =>
                    onFieldChange(
                      talent.id,
                      "standardBRCurrency",
                      e.target.value
                    )
                  }
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              ) : (
                <div className="readonly-field">
                  {talent.standardBRCurrency}
                </div>
              )}
            </div>
          </div>

          {/* Over Time BR + Currency */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label text-secondary">
                Over Time BR
              </label>
              {!readonly ? (
                <input
                  type="number"
                  className="form-control"
                  value={talent.overtimeBR || ""}
                  onChange={(e) =>
                    onFieldChange(talent.id, "overtimeBR", e.target.value)
                  }
                  placeholder="0.00"
                />
              ) : (
                <div className="readonly-field">{talent.overtimeBR || "-"}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label text-secondary">Currency</label>
              {!readonly ? (
                <select
                  className="form-select"
                  value={talent.overtimeCurrency || "INR"}
                  onChange={(e) =>
                    onFieldChange(
                      talent.id,
                      "overtimeCurrency",
                      e.target.value
                    )
                  }
                >
                  <option>INR</option>
                  <option>USD</option>
                  <option>EUR</option>
                </select>
              ) : (
                <div className="readonly-field">
                  {talent.overtimeCurrency}
                </div>
              )}
            </div>
          </div>

      
        </div>
      )}
    </div>
  );
}
