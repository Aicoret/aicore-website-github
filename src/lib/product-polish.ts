export type ProductStatus = "Client-Ready" | "MVP" | "Prototype" | "Internal Use";

export type ProductVisualKind =
  | "pipeline"
  | "warehouse"
  | "iot"
  | "fleet"
  | "energy"
  | "assistant";

export const productStatusOrder: Record<ProductStatus, number> = {
  "Client-Ready": 0,
  MVP: 1,
  Prototype: 2,
  "Internal Use": 3,
};

export const productMaturityDefinitions: Array<{
  status: ProductStatus;
  summary: string;
}> = [
  {
    status: "Client-Ready",
    summary: "Available for demos, adaptation, and client deployment.",
  },
  {
    status: "MVP",
    summary: "Core product functions exist; advanced workflows may still be evolving.",
  },
  {
    status: "Prototype",
    summary: "Early concept or pilot-stage product for validating a focused use case.",
  },
  {
    status: "Internal Use",
    summary: "Built for AICORE operations; useful as a reference for similar custom platforms.",
  },
];

export const productCtaLabels: Record<ProductStatus, string> = {
  "Client-Ready": "Request Demo",
  MVP: "Discuss Pilot",
  Prototype: "Discuss Concept",
  "Internal Use": "Discuss Similar Platform",
};

export const productStatusNotes: Record<ProductStatus, string> = {
  "Client-Ready": "Ready for guided demos and client adaptation.",
  MVP: "Core monitoring and workflow features are available; advanced reporting may be scoped per client.",
  Prototype: "Best discussed as a concept, pilot, or custom assistant build.",
  "Internal Use": "Used inside AICORE; available as a reference for a similar platform.",
};

export const productFeatureDescriptions: Record<string, Record<string, string>> = {
  "aicore-growthos": {
    "AI lead scoring": "Prioritises leads using fit, intent, source quality, and follow-up signals.",
    "Automated follow-ups": "Schedules reminders and response flows so promising leads do not go cold.",
    "Pipeline analytics": "Shows conversion movement, stalled deals, and team activity across stages.",
    "Contact intelligence": "Consolidates contact notes, source history, and engagement context.",
    "Deal forecasting": "Projects likely pipeline value from stage movement and current probabilities.",
    "Integration hub": "Connects forms, CRM data, messaging tools, and reporting workflows.",
  },
  "throughport-wms": {
    "Inventory tracking": "Tracks stock movement across locations with item-level status visibility.",
    "Goods-in/goods-out": "Digitises receiving, dispatch, transfers, and fulfilment events.",
    "Barcode/QR scanning": "Captures warehouse movement quickly using scan-first operational workflows.",
    "Real-time dashboards": "Shows stock levels, exceptions, throughput, and movement trends.",
    "Audit trail": "Records who moved what, when, and through which warehouse process.",
    "IoT integration": "Connects sensors, scanners, or edge devices where physical tracking is needed.",
  },
  "iot-monitoring-platform": {
    "Multi-protocol support (MQTT, Modbus, HTTP)": "Collects telemetry from modern sensors and legacy industrial equipment.",
    "Real-time dashboards": "Visualises device readings, operating ranges, and live field conditions.",
    "Alert and threshold engine": "Triggers notifications when sensor readings cross operational limits.",
    "Historical data storage": "Keeps time-series data for trend analysis and reporting.",
    "Device management": "Organises devices, sites, status, and configuration from one console.",
    "API access": "Exposes clean interfaces for integrations, dashboards, and downstream systems.",
  },
  "device-fleet-management-platform": {
    "OTA firmware updates": "Pushes staged firmware releases to connected devices without site visits.",
    "Remote diagnostics": "Surfaces device errors, logs, and health signals for faster triage.",
    "Fleet health dashboard": "Summarises online status, battery, signal, firmware, and fault states.",
    "Alert management": "Groups device exceptions and escalates urgent issues to operators.",
    "Device provisioning": "Registers, configures, and activates new field devices consistently.",
    "Audit logs": "Records update, diagnostic, and operator actions across the fleet.",
  },
  "smart-energy-monitoring-platform": {
    "Solar/inverter monitoring": "Tracks inverter output, site performance, and solar production status.",
    "Battery state tracking": "Monitors charge, health indicators, temperature, and backup readiness.",
    "Energy yield analytics": "Compares expected and actual yield to expose performance losses.",
    "Fault alerts": "Flags drops, outages, or abnormal readings before they become service calls.",
    "Export reports": "Produces operational summaries for managers, clients, or maintenance teams.",
    "Mobile access": "Keeps site performance and fault status visible to field operators.",
  },
  "ai-business-assistant-platform": {
    "Natural language queries": "Lets teams ask plain-language questions across connected business data.",
    "Document Q&A": "Answers from policies, reports, contracts, SOPs, and uploaded knowledge sources.",
    "Data insights": "Summarises trends, exceptions, and operational answers from structured data.",
    "Workflow triggers": "Turns approved assistant responses into repeatable business actions.",
    "Multi-source integration": "Connects documents, databases, apps, and internal knowledge bases.",
    "Audit trail": "Logs prompts, responses, sources, and triggered actions for governance.",
  },
};

export const productVisualMeta: Record<string, {
  kind: ProductVisualKind;
  label: string;
  caption: string;
}> = {
  "aicore-growthos": {
    kind: "pipeline",
    label: "Concept preview: AI-assisted pipeline dashboard",
    caption: "Lead stages, AI scores, follow-up queue, and conversion trend preview.",
  },
  "throughport-wms": {
    kind: "warehouse",
    label: "Concept preview: warehouse inventory control dashboard",
    caption: "Inventory movement, scan events, goods-in/goods-out, and stock traceability preview.",
  },
  "iot-monitoring-platform": {
    kind: "iot",
    label: "Concept preview: sensor-to-cloud monitoring flow",
    caption: "Sensor nodes, gateway, cloud ingestion, alerting, and live dashboard preview.",
  },
  "device-fleet-management-platform": {
    kind: "fleet",
    label: "Concept preview: connected device fleet dashboard",
    caption: "Device status, OTA rollout, remote diagnostics, and fleet health preview.",
  },
  "smart-energy-monitoring-platform": {
    kind: "energy",
    label: "Concept preview: solar and energy asset dashboard",
    caption: "Inverter status, yield trend, battery state, and fault alert preview.",
  },
  "ai-business-assistant-platform": {
    kind: "assistant",
    label: "Concept preview: AI assistant workspace",
    caption: "Chat, document context, suggested actions, and workflow trigger preview.",
  },
};

export function getProductStatus(status: string): ProductStatus {
  if (status === "Client-Ready" || status === "MVP" || status === "Prototype" || status === "Internal Use") {
    return status;
  }
  return "Prototype";
}
