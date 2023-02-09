import { useState, useContext } from 'react'
import { axiosInstance } from '../../axiosConfig'
import classNames from 'classnames/bind'
import { CurPhoneNumContext } from '../../layouts/LoginLayout/LoginLayout'
import styles from './ValidatePage.module.scss'

const cx = classNames.bind(styles)

function ValidatePage() {
    const { phoneNum } = useContext(CurPhoneNumContext)
    const [accessCode, setAccessCode] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [pending, setPending] = useState(false)

    const validateLoginHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const { data } = await axiosInstance.post(
                '/api/auth/validate-login',
                { phoneNum: `+${phoneNum}`, accessCode },
                config,
            )
            setPending(false)
            if (data.success) {
                setError('')
                setSuccess(data.message)
            } else {
                setError(data.message)
                setTimeout(() => {
                    setError('')
                }, 3000)
            }
        } catch (error) {
            setError(error?.response?.data?.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={(e) => validateLoginHandler(e)}>
                <h2 className={cx('title')}>{`An access code is sent to +${phoneNum}`}</h2>
                <h3 className={cx('subtitle')}>Enter your access code to login</h3>
                {error && <span className={cx('message', 'error')}>{error}</span>}
                {success && <span className={cx('message', 'success')}>{success}</span>}
                {pending && <span className={cx('message', 'processing')}>Processing...</span>}
                <div>
                    <input
                        className={cx('form-control')}
                        type="text"
                        required
                        name="accessCode"
                        id="accessCode"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ValidatePage
