import { useState, createContext } from 'react'
import classNames from 'classnames/bind'
import styles from './LoginLayout.module.scss'

const cx = classNames.bind(styles)
const CurPhoneNumContext = createContext()

function LoginLayout({ children }) {
    const [phoneNum, setPhoneNum] = useState('')

    return (
        <div className={cx('wrapper')}>
            <CurPhoneNumContext.Provider value={{ phoneNum, setPhoneNum }}>{children}</CurPhoneNumContext.Provider>
        </div>
    )
}

export default LoginLayout
export { CurPhoneNumContext }
