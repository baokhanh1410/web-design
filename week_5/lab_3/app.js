document.addEventListener("DOMContentLoaded", () => {
  const loadBtn = document.getElementById("load-btn");
  const statusMsg = document.getElementById("status-msg");
  const metaContainer = document.getElementById("meta-container");
  const metaContent = document.getElementById("meta-content");
  const tableWrapper = document.getElementById("table-wrapper");
  const tbody = document.getElementById("prediction-tbody");

  loadBtn.addEventListener("click", async () => {
    loadBtn.disabled = true;
    statusMsg.style.color = "#2563eb";

    try {
      const response = await fetch("./data.json");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const payload = await response.json();

      metaContent.innerHTML = `
            <div class="meta-item"><span>Model</span><strong>${payload.model_metadata.model_name}</strong></div>
            <div class="meta-item"><span>Framework</span><strong>${payload.model_metadata.framework}</strong></div>
            <div class="meta-item"><span>Batch ID</span><strong>${payload.model_metadata.batch_id}</strong></div>
            <div class="meta-item"><span>Latency</span><strong>${payload.model_metadata.execution_time_ms} ms</strong></div>
            <div class="meta-item"><span>Avg Confidence</span><strong>${(payload.prediction_summary.average_confidence * 100).toFixed(1)}%</strong></div>
          `;
      metaContainer.style.display = "block";

      tbody.innerHTML = payload.predictions
        .map(
          (item) => `
            <tr>
              <td>
                <strong>${item.customer_name}</strong><br>
                <small style="color: #64748b;">${item.customer_id}</small>
              </td>
              <td>${item.segment}</td>
              <td><span class="badge badge-${item.risk_level}">${item.predicted_label}</span></td>
              <td>
                Score: <strong>${item.risk_score}</strong><br>
                <small style="color: #64748b;">Conf: ${(item.confidence * 100).toFixed(0)}%</small>
              </td>
              <td>
                <ul class="features-list">
                  ${item.top_features.map((f) => `<li>${f.feature} (${f.impact})</li>`).join("")}
                </ul>
              </td>
              <td style="font-size: 13px; color: #334155;">${item.recommended_action}</td>
            </tr>
          `,
        )
        .join("");

      tableWrapper.style.display = "block";
      statusMsg.style.color = "#15803d";
      statusMsg.textContent = `${payload.predictions.length}`;
    } catch (error) {
      console.error(error);
      statusMsg.style.color = "#b91c1c";
      statusMsg.textContent = `${error.message}`;
    } finally {
      loadBtn.disabled = false;
    }
  });
});
