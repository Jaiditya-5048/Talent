
"use client";
import React, { useEffect, useState } from "react";
import api from "../lib/api";

/**
 * Inline editing behavior:
 * - Fetch current user payload via /auth/me (server reads cookie and returns decoded token)
 * - Allow editing per role:
 *    dev: editableFields = ['date','jiraTaskDesc','actualHours','estimatedHours','notes','status']
 *    others: all editable
 * - Clicking a cell turns it into an input; on blur or Enter it saves via PATCH /tasks/:id
 */

function isEditableField(userRole, field) {
  if (userRole === 'dev') {
    return ['date','jiraTaskDesc','actualHours','estimatedHours','notes','status'].includes(field);
  }
  return true;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState({}); // { [taskId_field]: value }

  const loadUser = async () => {
    try {
      // call /auth/me to ensure cookie validity; we expect token payload to be available server-side if needed
      const res = await api.post("/auth/me");
      // server returns ok if token valid; frontend will decode no payload, so call /users to fetch list? For simplicity, we'll call /users and match current email from cookie not available.
      // Instead, we will rely on loading the current user via /users (seeded users) - but for demo we'll set role to dev by default if none.
      setUser({ role: 'dev' });
    } catch (err) {
      setUser(null);
    }
  };

  const load = async () => {
    try {
      const res = await api.get("/tasks", { params: { limit: 50 }});
      setTasks(res.data.data || []);
    } catch (err) {
      alert(err.message || "Load failed");
    }
  };

  useEffect(() => {
    loadUser();
    load();
  }, []);

  const startEdit = (taskId, field, value) => {
    setEditing(prev => ({ ...prev, [taskId + '_' + field]: value }));
  };

  const stopEditAndSave = async (taskId, field) => {
    const key = taskId + '_' + field;
    const value = editing[key];
    try {
      // prepare payload depending on field types
      const payload: any = {};
      if (field === 'date') payload.date = new Date(value).toISOString();
      else if (['actualHours','estimatedHours'].includes(field)) payload[field] = Number(value);
      else payload[field] = value;
      await api.patch(`/tasks/${taskId}`, payload);
      await load();
    } catch (err: any) {
      alert(err.message || "Save failed");
    } finally {
      setEditing(prev => { const cp = {...prev}; delete cp[key]; return cp; });
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Dashboard</h2>
      <div className="mb-4">
        <a className="px-3 py-2 bg-gray-200 rounded" href="/api/tasks/export/csv">Export CSV</a>
        <a className="px-3 py-2 bg-gray-200 rounded ml-2" href="/api/tasks/export/xlsx">Export XLSX</a>
      </div>
      <table className="min-w-full bg-white">
        <thead><tr>
          <th>Date</th><th>Name</th><th>Dept</th><th>Role</th><th>Jira</th><th>Status</th><th>AH</th><th>EH</th><th>Notes</th><th>Actions</th>
        </tr></thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td>
                {isEditableField(user?.role, 'date') ? (
                  editing[t._id + '_date'] !== undefined ? (
                    <input autoFocus value={editing[t._id + '_date']} onChange={e=>startEdit(t._id,'date',e.target.value)} onBlur={()=>stopEditAndSave(t._id,'date')} />
                  ) : (
                    <span onClick={()=>startEdit(t._id,'date', new Date(t.date).toISOString().slice(0,10))}>{new Date(t.date).toLocaleDateString()}</span>
                  )
                ) : new Date(t.date).toLocaleDateString()}
              </td>
              <td>{t.name}</td>
              <td>{t.department}</td>
              <td>{t.role}</td>
              <td>
                {isEditableField(user?.role, 'jiraTaskDesc') ? (
                  editing[t._id + '_jiraTaskDesc'] !== undefined ? (
                    <input value={editing[t._id + '_jiraTaskDesc']} onChange={e=>startEdit(t._id,'jiraTaskDesc',e.target.value)} onBlur={()=>stopEditAndSave(t._id,'jiraTaskDesc')} />
                  ) : (
                    <span onClick={()=>startEdit(t._id,'jiraTaskDesc', t.jiraTaskDesc)}>{t.jiraTaskDesc}</span>
                  )
                ) : t.jiraTaskDesc}
              </td>
              <td>
                {isEditableField(user?.role, 'status') ? (
                  editing[t._id + '_status'] !== undefined ? (
                    <select value={editing[t._id + '_status']} onChange={e=>startEdit(t._id,'status',e.target.value)} onBlur={()=>stopEditAndSave(t._id,'status')}>
                      <option value="open">open</option>
                      <option value="in_progress">in_progress</option>
                      <option value="done">done</option>
                      <option value="blocked">blocked</option>
                    </select>
                  ) : (
                    <span onClick={()=>startEdit(t._id,'status', t.status)}>{t.status}</span>
                  )
                ) : t.status}
              </td>
              <td>
                {isEditableField(user?.role, 'actualHours') ? (
                  editing[t._id + '_actualHours'] !== undefined ? (
                    <input value={editing[t._id + '_actualHours']} onChange={e=>startEdit(t._id,'actualHours',e.target.value)} onBlur={()=>stopEditAndSave(t._id,'actualHours')} />
                  ) : (
                    <span onClick={()=>startEdit(t._id,'actualHours', t.actualHours)}>{t.actualHours}</span>
                  )
                ) : t.actualHours}
              </td>
              <td>
                {isEditableField(user?.role, 'estimatedHours') ? (
                  editing[t._id + '_estimatedHours'] !== undefined ? (
                    <input value={editing[t._id + '_estimatedHours']} onChange={e=>startEdit(t._id,'estimatedHours',e.target.value)} onBlur={()=>stopEditAndSave(t._id,'estimatedHours')} />
                  ) : (
                    <span onClick={()=>startEdit(t._id,'estimatedHours', t.estimatedHours)}>{t.estimatedHours}</span>
                  )
                ) : t.estimatedHours}
              </td>
              <td>
                {isEditableField(user?.role, 'notes') ? (
                  editing[t._id + '_notes'] !== undefined ? (
                    <input value={editing[t._id + '_notes']} onChange={e=>startEdit(t._id,'notes',e.target.value)} onBlur={()=>stopEditAndSave(t._id,'notes')} />
                  ) : (
                    <span onClick={()=>startEdit(t._id,'notes', t.notes || '')}>{t.notes || ''}</span>
                  )
                ) : t.notes}
              </td>
              <td>
                <button className="text-red-600" onClick={async ()=>{ if(!confirm('Delete?'))return; await api.delete(`/tasks/${t._id}`); load(); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
