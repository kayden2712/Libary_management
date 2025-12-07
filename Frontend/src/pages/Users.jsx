import { useEffect, useState } from "react";
import api from "../api/api";
import PageLayout from "../components/PageLayout";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      let mounted = true;
      api.get('/users')
        .then(res => {
          if (mounted) setUsers(Array.isArray(res.data) ? res.data : []);
        })
        .catch((err) => {
          console.error('Fetch /users failed:', err);
          setUsers([]);
        });
      return () => { mounted = false; };
    }, []);

    return (
        <PageLayout title="Người dùng">
            <div className="overflow-x-auto bg-amber-50/90 rounded-lg p-4 border border-amber-200">
                <table className="table-auto border-collapse border border-amber-300 w-full">
                    <thead>
                    <tr className="bg-amber-100">
                        <th className="border px-4 py-2 text-left">Username</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2 text-left">Role</th>
                        <th className="border px-4 py-2 text-left">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(u => (
                        <tr key={u.id} className="even:bg-amber-50">
                            <td className="border px-4 py-2">{u.username}</td>
                            <td className="border px-4 py-2">{u.email}</td>
                            <td className="border px-4 py-2">{u.role}</td>
                            <td className="border px-4 py-2">{u.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </PageLayout>
    );
}