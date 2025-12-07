import {useState} from 'react';
import {forgotPassword} from '../api';
import Modal from './Modal';
import api from '../api';

export default function ForgotPasswordModal({onClose}) {
    const [step, setStep] = useState(1); // 1: ask identifier, 2: reset password
    const [identifier, setIdentifier] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(''); // token returned by backend (or sent to email/phone)
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleRequest = async (e) => {
        e?.preventDefault();
        setError('');
        setLoading(true);
        try {
            // try POST /auth/forgot with { identifier }
            const res = await forgotPassword(identifier);
            // If backend returns a token in response (for demo), use it to go to reset step.
            if (res.data?.token) {
                setToken(res.data.token);
                setStep(2);
            } else {
                // If backend sends instruction (e.g., OTP/email), we still move to step 2 to let user input new password with token field optional.
                setStep(2);
            }
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Yêu cầu thất bại');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (e) => {
        e?.preventDefault();
        setError('');
        if (!password || password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        if (password !== confirm) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }
        setLoading(true);
        try {
            // POST /auth/reset with { identifier, token?, password }
            await api.post('/auth/reset', {identifier, token, password});
            // success -> close
            onClose();
            // optionally show a toast (caller can handle)
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || 'Đổi mật khẩu thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onClose}>
            <div>
                {step === 1 ? (
                    <div>
                        <h3 className="text-xl font-bold mb-3">Quên mật khẩu</h3>
                        <p className="text-sm text-amber-800 mb-2">Nhập username, email hoặc số điện thoại của bạn. Nếu
                            tồn tại, bạn sẽ nhận hướng dẫn đổi mật khẩu.</p>
                        <form onSubmit={handleRequest} className="space-y-2">
                            <input className="w-full border p-2" placeholder="Username / Email / SĐT" value={identifier}
                                   onChange={e => setIdentifier(e.target.value)} required/>
                            {error && <div className="text-red-600 text-sm">{error}</div>}
                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" className="px-3 py-1 bg-amber-100 rounded" onClick={onClose}>Hủy
                                </button>
                                <button type="submit" className="px-3 py-1 bg-amber-800 text-white rounded"
                                        disabled={loading}>{loading ? 'Đang gửi...' : 'Gửi yêu cầu'}</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-bold mb-3">Đổi mật khẩu</h3>
                        <p className="text-sm text-amber-800 mb-2">Nhập mật khẩu mới. Nếu bạn nhận được mã/ link, dán mã
                            vào ô 'Mã' (tùy backend).</p>
                        <form onSubmit={handleReset} className="space-y-2">
                            <input className="w-full border p-2" placeholder="Mã (nếu có)" value={token}
                                   onChange={e => setToken(e.target.value)}/>
                            <input className="w-full border p-2" placeholder="Mật khẩu mới" type="password"
                                   value={password} onChange={e => setPassword(e.target.value)} required/>
                            <input className="w-full border p-2" placeholder="Xác nhận mật khẩu" type="password"
                                   value={confirm} onChange={e => setConfirm(e.target.value)} required/>
                            {error && <div className="text-red-600 text-sm">{error}</div>}
                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" className="px-3 py-1 bg-amber-100 rounded" onClick={onClose}>Hủy
                                </button>
                                <button type="submit" className="px-3 py-1 bg-amber-800 text-white rounded"
                                        disabled={loading}>{loading ? 'Đang...' : 'Đổi mật khẩu'}</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Modal>
    );
}
