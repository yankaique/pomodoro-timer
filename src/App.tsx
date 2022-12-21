import { ThemeProvider } from 'styled-components'
import { Button } from './components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello Word</h1>
      <Button variant="primary" />
      <Button variant="danger" />
      <Button variant="secondary" />
      <Button variant="sucess" />
      <GlobalStyle />
    </ThemeProvider>
  )
}
