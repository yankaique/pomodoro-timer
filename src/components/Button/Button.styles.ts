import styled from 'styled-components'

export type TButtonVariant = 'primary' | 'secondary' | 'danger' | 'sucess'

interface IButtonProps {
  variant: TButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  sucess: 'green',
}

export const ButtonContainer = styled.button<IButtonProps>`
  width: 100px;
  height: 40px;
  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  border-radius: 5px;
  /* background-color: ${(props) => `${buttonVariants[props.variant]}`}; */
`
