import { PRIORITY_LABELS, STATUS_LABELS, CREW_STATUS_LABELS } from '../lib.js';

export const PriorityBadge = ({ priority }) => (
    <span className={`badge badge-${priority}`}>{PRIORITY_LABELS[priority]}</span>
);

export const StatusBadge = ({ status }) => (
    <span className={`badge badge-status-${status}`}>{STATUS_LABELS[status]}</span>
);

export const CrewBadge = ({ status }) => (
    <span className={`badge badge-crew-${status}`}>{CREW_STATUS_LABELS[status]}</span>
);
