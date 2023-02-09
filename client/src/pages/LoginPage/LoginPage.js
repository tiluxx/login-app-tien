import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axiosConfig'
import classNames from 'classnames/bind'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { CurPhoneNumContext } from '../../layouts/LoginLayout/LoginLayout'

import styles from './LoginPage.module.scss'

const cx = classNames.bind(styles)

function LoginPage() {
    const { phoneNum, setPhoneNum } = useContext(CurPhoneNumContext)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [pending, setPending] = useState(false)

    const navigate = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const { data } = await axiosInstance.post(
                '/api/auth/login',
                { phoneNum: `+${phoneNum}` },
                config,
            )
            setPending(false)
            if (data.success) {
                setSuccess(data.message)
                navigate('/validate-login')
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
            }, 3000)
        }
    }
    return (
        <div className={cx('wrapper')}>
            <form onSubmit={(e) => {
                setPending(true)
                loginHandler(e)}
            }>
                <h2 className={cx('title')}>Welcome back</h2>
                <h3 className={cx('subtitle')}>Enter your phone number to login</h3>
                {success && <span className={cx('message', 'success')}>{success}</span>}
                {error && <span className={cx('message', 'error')}>{error}</span>}
                {pending && <span className={cx('message', 'processing')}>Processing...</span>}
                <PhoneInput
                    country={'us'}
                    value={phoneNum}
                    inputProps={{
                        name: 'phone',
                        id: 'phone',
                        required: true,
                        autoFocus: true,
                    }}
                    specialLabel=""
                    onChange={(phone) => setPhoneNum(phone)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LoginPage
