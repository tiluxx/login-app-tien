import LoginLayout from '../layouts/LoginLayout/LoginLayout'
import LoginPage from '../pages/LoginPage'
import ValidatePage from '../pages/ValidatePage'
import NotFound from '../pages/NotFound'

const loginRoutes = [
    { path: '/', component: LoginPage, layout: LoginLayout },
    { path: '/validate-login', component: ValidatePage, layout: LoginLayout },
    { path: '*', component: NotFound, layout: null },
]

export { loginRoutes }
